"use client"
import React from "react";
import RestraintEventsPage from "./_components/RestraintEventsPage";
import { useCMS } from "../CMSProvider.client";
import { EventsSection, HomeSection, RestarintHomePage } from "@/models/templates/restraint/restraint-home-model";
import { dummyData } from "../DummyData";

const RestraintEventsRoot = () => {
  const { home } = useCMS();
  const isLoading = home === undefined;
  const source: RestarintHomePage | undefined = !isLoading
    ? (home as RestarintHomePage | undefined) ?? dummyData
    : undefined;

  const primaryColor = source?.color?.primary || "#3D493A";
  const secondaryColor = source?.color?.secondary || "#AEA17E";

  const eventsSectionData = source?.sections?.find(
    (s: HomeSection): s is EventsSection =>
      s.sectionName == "eventsSection" && s.isActive
  );

  return (
    <RestraintEventsPage
      primaryColor={primaryColor}
      secondaryColor={secondaryColor}
      data={eventsSectionData}
    />
  );
};

export default RestraintEventsRoot;
