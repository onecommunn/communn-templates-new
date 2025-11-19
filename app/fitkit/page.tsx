"use client";
import React from "react";
import FitKitHero from "./_components/FitKitHero";
import FitKitCalculate from "./_components/FitKitCalculate";
import FitKitAboutUs from "./_components/FitKitAboutUs";
import FitKitServices from "./_components/FitKitServices";
import FitKitEvents from "./_components/FitKitEvents";
import FitKitWhyChooseUs from "./_components/FitKitWhyChooseUs";
import FitkitTrainer from "./_components/FitkitTrainer";
import FitKitGallery from "./_components/FitKitGallery";
import FitkitPlans from "./_components/FitkitPlans";
import FitKitTestimonials from "./_components/FitKitTestimonials";
import FitKitContact from "./_components/FitKitContact";
import { useCMS } from "./CMSProvider.client";
import {
  AboutSection,
  ContactSection,
  EventsSection,
  FitkitHomePage,
  GallerySection,
  HeroSection,
  HomeSection,
  OurTeamSection,
  PlansSection,
  ServiceSection,
  TestimoniesSection,
  Whychooseus,
} from "@/models/templates/fitkit/fitkit-home-model";
import { dummyData } from "./dummyData";

const FitkitRoot = () => {
  const { home } = useCMS();
  const isLoading = home === undefined;
  const source: FitkitHomePage | undefined = !isLoading
    ? (home as FitkitHomePage | undefined) ?? dummyData
    : undefined;

  const primaryColor = source?.color?.primary || "#141414";
  const secondaryColor = source?.color?.secondary || "#F41E1E";

  const heroSectionData = source?.sections?.find(
    (s: HomeSection): s is HeroSection =>
      s.sectionName === "heroSection" && s.isActive
  );

  const aboutSectionData = source?.sections?.find(
    (s: HomeSection): s is AboutSection =>
      s.sectionName == "aboutSection" && s.isActive
  );

  const serviceSectionData = source?.sections?.find(
    (s: HomeSection): s is ServiceSection =>
      s.sectionName == "serviceSection" && s.isActive
  );

  const eventSectionData = source?.sections?.find(
    (s: HomeSection): s is EventsSection =>
      s.sectionName == "eventSection" && s.isActive
  );

  const plansSectionData = source?.sections?.find(
    (s: HomeSection): s is PlansSection =>
      s.sectionName == "plansSection" && s.isActive
  );

  const whychooseusSectionData = source?.sections?.find(
    (s: HomeSection): s is Whychooseus =>
      s.sectionName == "whychooseus" && s.isActive
  );

  const ourTeamSectionData = source?.sections?.find(
    (s: HomeSection): s is OurTeamSection =>
      s.sectionName == "ourTeamSection" && s.isActive
  );

  const gallerySectionData = source?.sections?.find(
    (s: HomeSection): s is GallerySection =>
      s.sectionName == "gallerySection" && s.isActive
  );

  const testimoniesSection = source?.sections?.find(
    (s: HomeSection): s is TestimoniesSection =>
      s.sectionName == "testimoniesSection" && s.isActive
  );

  const contactSectionData = source?.sections?.find(
    (s: HomeSection): s is ContactSection =>
      s.sectionName == "contactSection" && s.isActive
  );

  return (
    <>
      {heroSectionData && (
        <FitKitHero
          data={heroSectionData}
          primaryColor={primaryColor}
          secondaryColor={secondaryColor}
        />
      )}
      <FitKitCalculate
        primaryColor={primaryColor}
        secondaryColor={secondaryColor}
      />
      {aboutSectionData && (
        <FitKitAboutUs
          data={aboutSectionData}
          primaryColor={primaryColor}
          secondaryColor={secondaryColor}
        />
      )}
      {serviceSectionData && (
        <FitKitServices
          data={serviceSectionData}
          primaryColor={primaryColor}
          secondaryColor={secondaryColor}
        />
      )}
      {eventSectionData && (
        <FitKitEvents
          data={eventSectionData}
          primaryColor={primaryColor}
          secondaryColor={secondaryColor}
        />
      )}
      {whychooseusSectionData && (
        <FitKitWhyChooseUs
          data={whychooseusSectionData}
          primaryColor={primaryColor}
          secondaryColor={secondaryColor}
        />
      )}
      {ourTeamSectionData && (
        <FitkitTrainer
          data={ourTeamSectionData}
          primaryColor={primaryColor}
          secondaryColor={secondaryColor}
        />
      )}
      {gallerySectionData && (
        <FitKitGallery
          data={gallerySectionData}
          primaryColor={primaryColor}
          secondaryColor={secondaryColor}
        />
      )}

      {plansSectionData && (
        <FitkitPlans
          data={plansSectionData}
          primaryColor={primaryColor}
          secondaryColor={secondaryColor}
        />
      )}
      {testimoniesSection && (
        <FitKitTestimonials
          data={testimoniesSection}
          primaryColor={primaryColor}
          secondaryColor={secondaryColor}
        />
      )}
      {contactSectionData && <FitKitContact data={contactSectionData}  primaryColor={primaryColor}
          secondaryColor={secondaryColor}/>}
    </>
  );
};

export default FitkitRoot;
