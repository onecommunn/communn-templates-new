"use client";
import { Suspense } from "react";
import YoganaSignupPage from "./_components/YoganaSignupPage";

const YoganaSignup = () => {
  return (
    <Suspense fallback={<></>}>
      <YoganaSignupPage />
    </Suspense>
  );
};

export default YoganaSignup;
