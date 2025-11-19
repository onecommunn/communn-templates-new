"use client";
import React, { Suspense } from "react";
import FitKitSignupPage from "./_components/FitKitSignupPage";
import { useCMS } from "../CMSProvider.client";
import { FitkitHomePage } from "@/models/templates/fitkit/fitkit-home-model";
import { dummyData } from "../dummyData";

const FitKitSignup = () => {
  const { home } = useCMS();
  const isLoading = home === undefined;
  const source: FitkitHomePage | undefined = !isLoading
    ? (home as FitkitHomePage | undefined) ?? dummyData
    : undefined;

  const primaryColor = source?.color?.primary || "#141414";
  const secondaryColor = source?.color?.secondary || "#F41E1E";
  return (
    <Suspense fallback={<></>}>
      <FitKitSignupPage
        primaryColor={primaryColor}
        secondaryColor={secondaryColor}
      />
    </Suspense>
  );
};

export default FitKitSignup;
