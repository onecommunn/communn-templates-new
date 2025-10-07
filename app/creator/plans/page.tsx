"use client";
import React from "react";
import CreatorPlansSection from "./_components/CreatorPlansSection";
import { useCMS } from "../CMSProvider.client";
import { CreatorHomePage } from "@/models/templates/creator/creator-home.model";

const CreatorPlans = () => {
  const { home } = useCMS();
  const isLoading = home === undefined;
  const source: CreatorHomePage | undefined = !isLoading
    ? (home as CreatorHomePage | undefined)
    : undefined;
  const primaryColor = source?.color?.primary || "#fff";
  const secondaryColor = source?.color?.secondary || "#000";
  return (
    <>
      <div>
        <CreatorPlansSection
          primaryColor={primaryColor}
          secondaryColor={secondaryColor}
        />
      </div>
    </>
  );
};

export default CreatorPlans;
