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
  AppointmentSection,
  ConsultingoHomePage,
  EventsSection,
  FeaturesSection,
  HeroSection,
  HomeSection,
  PlansSection,
  ServicesSection,
  SustainabilitySection,
  TestimonialSection,
  TrustedBySection,
} from "@/models/templates/consultingo/consultingo-home-model";

const ConsultingoRoot = () => {
  const { home } = useCMS();
  const isLoading = home === undefined;
  const source: ConsultingoHomePage | undefined = !isLoading
    ? (home as ConsultingoHomePage | undefined)
    : undefined;

  const primaryColor = source?.color?.primary || "#BC4C37";
  const secondaryColor = source?.color?.secondary || "#4F2910";
  const neutralColor = source?.color?.neutral || "#fcf6e8";

  const heroSectionData = source?.sections?.find(
    (s: HomeSection): s is HeroSection =>
      s.sectionName === "heroSection" && s.isActive,
  );

  const trustedBySectionData = source?.sections?.find(
    (s: HomeSection): s is TrustedBySection =>
      s.sectionName === "trustedBySection" && s.isActive,
  );

  const featuresSectionData = source?.sections?.find(
    (s: HomeSection): s is FeaturesSection =>
      s.sectionName === "featuresSection" && s.isActive,
  );

  const sustainabilitySectionData = source?.sections?.find(
    (s: HomeSection): s is SustainabilitySection =>
      s.sectionName === "sustainabilitySection" && s.isActive,
  );

  const servicesSectionData = source?.sections?.find(
    (s: HomeSection): s is ServicesSection =>
      s.sectionName === "servicesSection" && s.isActive,
  );

  const appointmentSectionData = source?.sections?.find(
    (s: HomeSection): s is AppointmentSection =>
      s.sectionName === "appointmentSection" && s.isActive,
  );

  const plansSectionData = source?.sections?.find(
    (s: HomeSection): s is PlansSection =>
      s.sectionName === "plansSection" && s.isActive,
  );

  const eventsSectionData = source?.sections?.find(
    (s: HomeSection): s is EventsSection =>
      s.sectionName === "eventsSection" && s.isActive,
  );

  const testimonialSectionData = source?.sections?.find(
    (s: HomeSection): s is TestimonialSection =>
      s.sectionName === "testimonialSection" && s.isActive,
  );

  return (
    <>
      {heroSectionData && (
        <ConsultingoHero
          data={heroSectionData}
          primaryColor={primaryColor}
          secondaryColor={secondaryColor}
          neutralColor={neutralColor}
        />
      )}

      {trustedBySectionData && (
        <ConsultingoTrustedBy
          data={trustedBySectionData}
          primaryColor={primaryColor}
          secondaryColor={secondaryColor}
          neutralColor={neutralColor}
        />
      )}

      {featuresSectionData && (
        <ConsultingoFeatures
          data={featuresSectionData}
          primaryColor={primaryColor}
          secondaryColor={secondaryColor}
          neutralColor={neutralColor}
        />
      )}

      {sustainabilitySectionData && (
        <ConsultingoSustainability
          data={sustainabilitySectionData}
          primaryColor={primaryColor}
          secondaryColor={secondaryColor}
          neutralColor={neutralColor}
        />
      )}

      {servicesSectionData && (
        <ConsultingoServices
          data={servicesSectionData}
          primaryColor={primaryColor}
          secondaryColor={secondaryColor}
          neutralColor={neutralColor}
        />
      )}

      {appointmentSectionData && (
        <ConsultingoAppointments
          data={appointmentSectionData}
          primaryColor={primaryColor}
          secondaryColor={secondaryColor}
          neutralColor={neutralColor}
        />
      )}

      {plansSectionData && (
        <ConsultingoPlans
          data={plansSectionData}
          primaryColor={primaryColor}
          secondaryColor={secondaryColor}
          neutralColor={neutralColor}
        />
      )}

      {eventsSectionData && (
        <ConsultingoEvents
          data={eventsSectionData}
          primaryColor={primaryColor}
          secondaryColor={secondaryColor}
          neutralColor={neutralColor}
        />
      )}

      {testimonialSectionData && (
        <ConsultingoTestimonial
          data={testimonialSectionData}
          primaryColor={primaryColor}
          secondaryColor={secondaryColor}
          neutralColor={neutralColor}
        />
      )}
    </>
  );
};

export default ConsultingoRoot;
