"use client";
import React, { Suspense } from "react";
import FitKitSignupPage from "./_components/FitKitSignupPage";

const FitKitSignup = () => {
  return (
    <Suspense fallback={<></>}>
      <FitKitSignupPage />
    </Suspense>
  );
};

export default FitKitSignup;
