"use client";
import React from "react";
import ConsultingoAboutUsHero from "./_components/ConsultingoAboutUsHero";
import ConsultingoAboutusValues from "./_components/ConsultingoAboutusValues";
import ConsultingoAboutusFounder from "./_components/ConsultingoAboutusFounder";
import ConsultingoAboutusOurTeam from "./_components/ConsultingoAboutusOurTeam";
import { useCMS } from "../CMSProvider.client";
import {
  AboutSection,
  ConsultingoAboutUsPage,
  FounderSection,
  HeroSection,
  TeamSection,
  ValuesSection,
} from "@/models/templates/consultingo/consultingo-aboutUs-model";
import { aboutUsData } from "./aboutUs-dummy-date";

const ConsultingoAboutUsRoot = () => {
  const { aboutUs } = useCMS();
  const isLoading = aboutUs === undefined;
  const source: ConsultingoAboutUsPage | undefined = !isLoading
    ? ((aboutUs as ConsultingoAboutUsPage | undefined) ?? aboutUsData)
    : undefined;

  const primaryColor = source?.color?.primary || "#BC4C37";
  const secondaryColor = source?.color?.secondary || "#4F2910";
  const neutralColor = source?.color?.neutral || "#fcf6e8";

  const heroSectionData = source?.sections?.find(
    (s: AboutSection): s is HeroSection =>
      s.sectionName === "heroSection" && s.isActive,
  );

  const valuesSectionData = source?.sections?.find(
    (s: AboutSection): s is ValuesSection =>
      s.sectionName === "valuesSection" && s.isActive,
  );

  const founderSectionData = source?.sections?.find(
    (s: AboutSection): s is FounderSection =>
      s.sectionName === "founderSection" && s.isActive,
  );

  const teamSectionData = source?.sections?.find(
    (s: AboutSection): s is TeamSection =>
      s.sectionName === "teamSection" && s.isActive,
  );

  return (
    <>
      {heroSectionData && (
        <ConsultingoAboutUsHero
          data={heroSectionData}
          primaryColor={primaryColor}
          secondaryColor={secondaryColor}
          neutralColor={neutralColor}
        />
      )}
      {valuesSectionData && (
        <ConsultingoAboutusValues
          data={valuesSectionData}
          primaryColor={primaryColor}
          secondaryColor={secondaryColor}
          neutralColor={neutralColor}
        />
      )}
      {founderSectionData && (
        <ConsultingoAboutusFounder
          data={founderSectionData}
          primaryColor={primaryColor}
          secondaryColor={secondaryColor}
          neutralColor={neutralColor}
        />
      )}
      {teamSectionData && (
        <ConsultingoAboutusOurTeam
          data={teamSectionData}
          primaryColor={primaryColor}
          secondaryColor={secondaryColor}
          neutralColor={neutralColor}
        />
      )}
    </>
  );
};

export default ConsultingoAboutUsRoot;
