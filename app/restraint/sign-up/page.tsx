"use client";
import React, { Suspense } from "react";
import RestraintSignupPage from "./_components/RestraintSignupPage";

const RestraintSignup = () => {
  return (
    <Suspense fallback={<></>}>
      <RestraintSignupPage />
    </Suspense>
  );
};

export default RestraintSignup;
