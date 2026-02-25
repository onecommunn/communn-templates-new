"use client";
import React from "react";
import PhotographyBio from "./_components/PhotographyBio";
import PhotographyHighlights from "./_components/PhotographyHighlights";
import PhotographyBreadcum from "../_components/PhotographyBreadcum";
import { useCMS } from "../CMSProvider.client";
import {
  AboutSection,
  PhotographyAboutPage,
  HeroSection,
  BioSection,
  HighlightsSection,
} from "@/models/templates/photography/photography-about-model";
import { aboutDummyData } from "./about-dummy-data";

const PhotographyPageRoot = () => {
  const { about } = useCMS();
  const isLoading = about === undefined;
  const source: PhotographyAboutPage | undefined = !isLoading
    ? ((about as PhotographyAboutPage | undefined) ?? aboutDummyData)
    : undefined;

  const heroSectionData: HeroSection | undefined = source?.sections?.find(
    (s: AboutSection): s is HeroSection =>
      s.sectionName === "heroSection" && s.isActive,
  );

  const bioSection: BioSection | undefined = source?.sections?.find(
    (s: AboutSection): s is BioSection =>
      s.sectionName === "bioSection" && s.isActive,
  );

  const highlightsSection: HighlightsSection | undefined =
    source?.sections?.find(
      (s: AboutSection): s is HighlightsSection =>
        s.sectionName === "highlightsSection" && s.isActive,
    );
  return (
    <>
      {heroSectionData && (
        <PhotographyBreadcum
          image={
            heroSectionData?.content?.image ??
            "https://upload-community-files-new.s3.ap-south-1.amazonaws.com/uploads/wedding-2.jpg"
          }
          title={heroSectionData?.content?.title}
          heading={heroSectionData?.content?.heading}
        />
      )}

      {bioSection && <PhotographyBio data={bioSection} />}
      {highlightsSection && <PhotographyHighlights data={highlightsSection} />}
    </>
  );
};

export default PhotographyPageRoot;
