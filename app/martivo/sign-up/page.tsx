"use client";
import React, { Suspense } from "react";
import MartivoSignupPage from "./_components/MartivoSignupPage";

const SpawellSignup = () => {
  return (
    <Suspense fallback={<></>}>
      <MartivoSignupPage />
    </Suspense>
  );
};

export default SpawellSignup;
