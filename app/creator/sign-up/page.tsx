"use client";
import React, { Suspense } from "react";
import CreatorSignupPage from "./_components/CreatorSignupPage";

const CreatorSignup = () => {
  return (
    <Suspense fallback={<></>}>
      <CreatorSignupPage />
    </Suspense>
  );
};

export default CreatorSignup;
