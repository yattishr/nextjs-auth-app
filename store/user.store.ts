import { create } from "zustand";
import { ID, databases, storage, account } from "@/appwrite";

interface UserState {
  getCurrentUser: () => Promise<void>;
  loginUser: (loginuserInfo: LoginUser) => Promise<void>;
  isLoggedIn: () => Promise<void>;

  // new user initialization.
  newUser: string;
  setNewUser: (newUser: string) => void;

  logoutUser: () => Promise<void>;

  createUserAccount: (userInfo: UserAccount) => Promise<void>;
}

export const useUserStore = create<UserState>((set, get) => ({
  // initialize state variables
  newUser: "",
  setNewUser: (newUser) => set({ newUser }),

  // get current user function
  getCurrentUser: async () => {
    // code below
  },

  // log in the user
  loginUser: async (loginuserInfo) => {
    // code below
    try {
      await account.createEmailSession(loginuserInfo.email, loginuserInfo.password);
    } catch (error) {
      throw error;
      console.log(`Error ${error} ocurred while logging out.`);
    }
  },

  // check if user isLoggedIn
  isLoggedIn: async () => {
    // code below
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
      get().setNewUser(userId);
    } catch (error) {
      throw error;
      console.log(`Error ${error} ocurred while creating new user.`);
    }
  },
}));
