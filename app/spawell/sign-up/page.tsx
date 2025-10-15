"use client";
import React, { Suspense } from "react";
import SpawellSignupPage from "./_components/SpawellSignupPage";

const SpawellSignup = () => {
  return (
    <Suspense fallback={<></>}>
      <SpawellSignupPage />
    </Suspense>
  );
};

export default SpawellSignup;
