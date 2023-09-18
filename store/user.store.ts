import { create } from "zustand";
import { ID, databases, storage, account } from "@/appwrite";
import { it } from "node:test";

interface UserState {
  getCurrentUser: () => Promise<void>;
  loginUser: (loginuserInfo: LoginUser) => Promise<object>;
  isLoggedIn: () => Promise<boolean>;

  // new user initialization.
  newUser: string;
  setNewUser: (newUser: string) => void;

  // error handling. NOT using this error handling state just yet.
  errorOccured: boolean;
  seterrorOccured: (errorOccured: boolean) => void;
  errorMessage: string;
  seterrorMessage: (errorMessage: string) => void;

  logoutUser: () => Promise<void>;

  createUserAccount: (userInfo: NewUserAccount) => Promise<object>;
}

export const useUserStore = create<UserState>((set, get) => ({
  // initialize state variables
  newUser: "",
  setNewUser: (newUser) => set({ newUser }),

  errorOccured: false,
  seterrorOccured: (errorOccured) => set({errorOccured}),

  errorMessage: "",
  seterrorMessage: (errorMessage) => set({errorMessage}),

  // get current user function
  getCurrentUser: async () => {
    // code below
  },

  // log in the user
  loginUser: async (loginuserInfo) => {
    try {
      const userSession = await account.createEmailSession(
        loginuserInfo.email,
        loginuserInfo.password
      );
      return account.get();
    } catch (error) {
      throw error;
      console.log(`Error ${error} ocurred while logging out.`);
    }
  },

  // check if user isLoggedIn
  isLoggedIn: async () => {
    try {
      const data = await account.getSession("current");
      return Boolean(data);
    } catch (error) {
      throw error;
      console.log(`Error ${error} ocurred while getting user session.`);
    }
  },

  // log out user
  logoutUser: async () => {
    try {
      await account.deleteSession("current");
      console.log("Logout user activated...");
    } catch (error) {
      throw error;
      console.log(`Error ${error} ocurred while logging out.`);
    }
  },

  // create user account function.
  createUserAccount: async (userInfo) => {
    try {
      const user = await account.create(
        ID.unique(),
        userInfo.email,
        userInfo.password,
        userInfo.name
      );      
      // Set the newUser state variable to the user value
      const userId = user.$id;
      const userName = user.name;
      const userEmail = user.email;
      get().setNewUser(userId);
      return account.get();
    } catch (error) {
      throw error;
      console.log(`Error ${error} ocurred while creating new user.`);
    }
  },
}));

/**
 * TO DO:
1. After user account is created, need to store user Account data into 
  a State variable so the Dashboard can access it
2. Display Alert (tailwind CSS) when an error occurs on Signup OR Login - DONE. Y.R 18-Sept-2023
3. Implement protected routes so only authenticated users can access Dashboard.
 */