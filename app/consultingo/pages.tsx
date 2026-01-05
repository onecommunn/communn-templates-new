"use client";
import React from "react";
import ConsultingoHero from "./_components/ConsultingoHero";
import ConsultingoTrustedBy from "./_components/ConsultingoTrustedBy";
import ConsultingoFeatures from "./_components/ConsultingoFeatures";
import ConsultingoSustainability from "./_components/ConsultingoSustainability";
import ConsultingoServices from "./_components/ConsultingoServices";
import ConsultingoAppointments from "./_components/ConsultingoAppointments";
import ConsultingoPlans from "./_components/ConsultingoPlans";
import ConsultingoEvents from "./_components/ConsultingoEvents";
import ConsultingoTestimonial from "./_components/ConsultingoTestimonial";
import { useCMS } from "./CMSProvider.client";
import {
  ConsultingoHomePage,
  HeroSection,
  HomeSection,
} from "@/models/templates/consultingo/consultingo-home-model";

const ConsultingoRoot = () => {
  const { home } = useCMS();
  const isLoading = home === undefined;
  const source: ConsultingoHomePage | undefined = !isLoading
    ? (home as ConsultingoHomePage | undefined)
    : undefined;

  const heroSectionData = source?.sections?.find(
    (s: HomeSection): s is HeroSection =>
      s.sectionName === "heroSection" && s.isActive
  );
  return (
    <>
      {heroSectionData && <ConsultingoHero />}

      <ConsultingoTrustedBy />
      <ConsultingoFeatures />
      <ConsultingoSustainability />
      <ConsultingoServices />
      <ConsultingoAppointments />
      <ConsultingoPlans />
      <ConsultingoEvents />
      <ConsultingoTestimonial />
    </>
  );
};

export default ConsultingoRoot;
