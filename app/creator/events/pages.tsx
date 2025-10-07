"use client"
import React from "react";
import CreatorEventsPage from "./_components/CreatorEvents";
import { useCMS } from "../CMSProvider.client";
import { CreatorHomePage } from "@/models/templates/creator/creator-home.model";

const CreatorEvents = () => {
  const { home } = useCMS();
  const isLoading = home === undefined;
  const source: CreatorHomePage | undefined = !isLoading
    ? (home as CreatorHomePage | undefined)
    : undefined;
  const primaryColor = source?.color?.primary || "#fff";
  const secondaryColor = source?.color?.secondary || "#000";
  return (
    <>
      <CreatorEventsPage
        primaryColor={primaryColor}
        secondaryColor={secondaryColor}
      />
    </>
  );
};

export default CreatorEvents;
