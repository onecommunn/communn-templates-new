"use client";
import React from "react";
import MartivoHero from "./_components/MartivoHero";
import MartivoAbout from "./_components/MartivoAbout";
import MartivoServicesCarousel from "./_components/MartivoServicesCarousel";
import MartivoPlans from "./_components/MartivoPlans";
import MartivoEvents from "./_components/MartivoEvents";
import MartivoOurTeam from "./_components/MartivoOurTeam";
import MartivoTestimonials from "./_components/MartivoTestimonials";
import MartivoGallery from "./_components/MartivoGallery";
import MartivoServices from "./_components/MartivoServices";
import MartivoContact from "./_components/MartivoContact";
import { useCMS } from "./CMSProvider.client";
import {
  AboutSection,
  ContactSection,
  EventsSection,
  GallerySection,
  HeroSection,
  HomeSection,
  MartivoHomePage,
  OurTeamSection,
  PlansSection,
  ServiceSection,
  TestimoniesSection,
} from "@/models/templates/martivo/martivo-home-model";
import { dummyData } from "./DummyData";

const MartivoRoot = () => {
  const { home } = useCMS();
  const isLoading = home === undefined;
  const source: MartivoHomePage | undefined = !isLoading
    ? (home as MartivoHomePage | undefined) ?? dummyData
    : undefined;
  const primaryColor = source?.color?.primary || "#29400a";
  const secondaryColor = source?.color?.secondary || "#7bd900";

  const heroSectionData = source?.sections?.find(
    (s: HomeSection): s is HeroSection =>
      s.sectionName === "heroSection" && s.isActive
  );

  const aboutSectionData = source?.sections?.find(
    (s: HomeSection): s is AboutSection =>
      s.sectionName === "aboutSection" && s.isActive
  );

  const serviceSection = source?.sections?.find(
    (s: HomeSection): s is ServiceSection =>
      s.sectionName === "serviceSection" && s.isActive
  );

  const plansSection = source?.sections?.find(
    (s: HomeSection): s is PlansSection =>
      s.sectionName === "plansSection" && s.isActive
  );

  const eventsSection = source?.sections?.find(
    (s: HomeSection): s is EventsSection =>
      s.sectionName === "eventsSection" && s.isActive
  );

  const ourTeamSection = source?.sections?.find(
    (s: HomeSection): s is OurTeamSection =>
      s.sectionName === "ourTeamSection" && s.isActive
  );

  const testimoniesSection = source?.sections?.find(
    (s: HomeSection): s is TestimoniesSection =>
      s.sectionName === "testimoniesSection" && s.isActive
  );

  const gallerySection = source?.sections?.find(
    (s: HomeSection): s is GallerySection =>
      s.sectionName === "gallerySection" && s.isActive
  );

  const contactSection = source?.sections?.find(
    (s: HomeSection): s is ContactSection =>
      s.sectionName === "contactSection" && s.isActive
  );
  return (
    <>
      {heroSectionData && (
        <MartivoHero
          primaryColor={primaryColor}
          secondaryColor={secondaryColor}
          data={heroSectionData}
        />
      )}

      {aboutSectionData && (
        <MartivoAbout
          primaryColor={primaryColor}
          secondaryColor={secondaryColor}
          data={aboutSectionData}
        />
      )}

      {aboutSectionData && (
        <MartivoServicesCarousel
          primaryColor={primaryColor}
          secondaryColor={secondaryColor}
          data={aboutSectionData}
        />
      )}

      {serviceSection && (
        <MartivoServices
          primaryColor={primaryColor}
          secondaryColor={secondaryColor}
          data={serviceSection}
        />
      )}

      {plansSection && (
        <MartivoPlans
          primaryColor={primaryColor}
          secondaryColor={secondaryColor}
          data={plansSection}
        />
      )}

      {eventsSection && (
        <MartivoEvents
          primaryColor={primaryColor}
          secondaryColor={secondaryColor}
          data={eventsSection}
        />
      )}

      {ourTeamSection && (
        <MartivoOurTeam
          primaryColor={primaryColor}
          secondaryColor={secondaryColor}
          data={ourTeamSection}
        />
      )}

      {testimoniesSection && (
        <MartivoTestimonials
          primaryColor={primaryColor}
          secondaryColor={secondaryColor}
          data={testimoniesSection}
        />
      )}

      {gallerySection && <MartivoGallery data={gallerySection} secondaryColor={secondaryColor} primaryColor={primaryColor} />}

      {contactSection && (
        <MartivoContact
          primaryColor={primaryColor}
          secondaryColor={secondaryColor}
          data={contactSection}
        />
      )}
    </>
  );
};

export default MartivoRoot;
