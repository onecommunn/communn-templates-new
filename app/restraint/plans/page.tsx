"use client"
import React from "react";
import RestraintPlansPage from "./_components/RestraintPlansPage";
import { useCMS } from "../CMSProvider.client";
import { RestarintHomePage } from "@/models/templates/restraint/restraint-home-model";
import { dummyData } from "../DummyData";

const RestraintPlansRoot = () => {
  const { home } = useCMS();
  const isLoading = home === undefined;
  const source: RestarintHomePage | undefined = !isLoading
    ? (home as RestarintHomePage | undefined) ?? dummyData
    : undefined;

  const primaryColor = source?.color?.primary || "#3D493A";
  const secondaryColor = source?.color?.secondary || "#AEA17E";
  return (
    <RestraintPlansPage
      primaryColor={primaryColor}
      secondaryColor={secondaryColor}
    />
  );
};

export default RestraintPlansRoot;
