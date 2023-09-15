"use client";
import React, { useEffect, useState } from "react";
import Signin from "@/app/components/Signin";

function SignInPage() {
  return (
    <section className="px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
      <Signin />
    </section>
  );
}

export default SignInPage;
