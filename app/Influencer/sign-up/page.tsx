"use client";
import React, { Suspense } from "react";
import InfluencerSignupPage from "./_components/InfluencerSignupPage";

const InfluencerSignup = () => {
  return (
    <Suspense fallback={<></>}>
      <InfluencerSignupPage />
    </Suspense>
  );
};

export default InfluencerSignup;
