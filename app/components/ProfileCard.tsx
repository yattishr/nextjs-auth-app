"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Signup from "./Signup";
import { useUserStore } from "@/store/user.store";

const ProfileCard = () => {
  const router = useRouter();
  const [newUser, createUserAccount, logoutUser] = useUserStore(
    (state) => [
      state.newUser,
      state.createUserAccount,
      state.logoutUser,
    ]
  )

  return (
    <>
      <div className="flex gap-y-6 flex-wrap">
        <div className="flex w-full gap-x-4 items-center">
          <div className="shrink-0 w-20">
            <img src="/favicon.ico" alt="Logo" />
          </div>
          <div className="relative">
            <p className="font-bold text-xl w-full mb-1">Username</p>
            <div className="text-[12px] p-0.5 inline-block rounded-md bg-gradient-to-tr from-primary to-secondary">
              <Link
                href="pages/signup"
                type="button"
                onClick={() => router.push("pages/signup")}
                className="rounded-md bg-transparent px-3 py-2 text-sm font-semibold text-primary hover:bg-primary/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              >
                SIGN UP
              </Link>
            </div>
          </div>
        </div>
        <div className="bg-gray-200/70 rounded-xl px-8 py-8 w-full flex gap-y-4 flex-wrap">
          <div className="relative w-full">
            <p className="text-sm text-gray-700">Display Name</p>
            <p className="font-semibold">Username</p>
          </div>
          <div className="relative w-full">
            <p className="text-sm text-gray-700">Email Id</p>
            <p className="font-semibold">User email</p>
          </div>
          <div className="relative w-full">
            <p className="text-sm text-gray-700">Phone Number</p>
            <p className="font-semibold">999-888-7777</p>
          </div>
          <div className="relative w-full">
            <p className="text-sm text-gray-700">Password</p>
            <p className="font-semibold">********</p>
          </div>
        </div>
        <div className="w-full flex justify-center">
          <Link
            href={"/"}
            type="button"            
            onClick={() => {
              logoutUser(); // Call the logoutUser function
              router.push("/"); // Redirect to the home page ("/") after logout
            }}
            className="bg-gray-200/70 rounded-xl px-6 py-3 inline-block hover:bg-gray-100 duration-150"
          >
            Logout
          </Link>
        </div>
      </div>
    </>
  );
};

export default ProfileCard;
