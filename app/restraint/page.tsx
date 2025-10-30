"use client";
import React from "react";
import RestraintHero from "./_components/RestraintHero";
import RestraintAboutus from "./_components/RestraintAboutus";
import RestraintWhatWeDo from "./_components/RestraintWhatWeDo";
import RestraintEvents from "./_components/RestraintEvents";
import RestraintServices from "./_components/RestraintServices";
import RestraintHowItWork from "./_components/RestraintHowItWork";
import RestraintPlans from "./_components/RestraintPlans";
import RestraintMarquee from "./_components/RestraintMarquee";
import RestraintTestimonials from "./_components/RestraintTestimonials";
import RestraintFAQ from "./_components/RestraintFAQ";
import RestraintContact from "./_components/RestraintContact";
import { useCMS } from "./CMSProvider.client";
import {
  AboutSection,
  ContactSection,
  EventsSection,
  FaqSection,
  GallerySection,
  HeroSection,
  HomeSection,
  HowItWorkSection,
  PlansSection,
  RestarintHomePage,
  ServiceSection,
  TestimoniesSection,
  WhatWeDoSection,
} from "@/models/templates/restraint/restraint-home-model";
import { dummyData } from "./DummyData";

const RestraintRoot = () => {
  const { home } = useCMS();
  const isLoading = home === undefined;
  const source: RestarintHomePage | undefined = !isLoading
    ? (home as RestarintHomePage | undefined) ?? dummyData
    : undefined;

  const primaryColor = source?.color?.primary || "#3D493A";
  const secondaryColor = source?.color?.secondary || "#AEA17E";

  const heroSectionData = source?.sections?.find(
    (s: HomeSection): s is HeroSection =>
      s.sectionName === "heroSection" && s.isActive
  );

  const aboutSectionData = source?.sections?.find(
    (s: HomeSection): s is AboutSection =>
      s.sectionName == "aboutSection" && s.isActive
  );

  const eventSectionData = source?.sections?.find(
    (s: HomeSection): s is EventsSection =>
      s.sectionName == "eventsSection" && s.isActive
  );

  const whatWeDoSectionData = source?.sections?.find(
    (s: HomeSection): s is WhatWeDoSection =>
      s.sectionName == "whatWeDoSection" && s.isActive
  );

  const serviceSectionData = source?.sections?.find(
    (s: HomeSection): s is ServiceSection =>
      s.sectionName == "serviceSection" && s.isActive
  );

  const howItWorkSection = source?.sections?.find(
    (s: HomeSection): s is HowItWorkSection =>
      s.sectionName == "howItWorkSection" && s.isActive
  );

  const plansSectionData = source?.sections?.find(
    (s: HomeSection): s is PlansSection =>
      s.sectionName == "plansSection" && s.isActive
  );

  const gallerySectionData = source?.sections?.find(
    (s: HomeSection): s is GallerySection =>
      s.sectionName == "gallerySection" && s.isActive
  );

  const testimoniesSectionData = source?.sections?.find(
    (s: HomeSection): s is TestimoniesSection =>
      s.sectionName == "testimoniesSection" && s.isActive
  );

  const faqSectionData = source?.sections?.find(
    (s: HomeSection): s is FaqSection =>
      s.sectionName == "faqSection" && s.isActive
  );

  const contactSectionData = source?.sections?.find(
    (s: HomeSection): s is ContactSection =>
      s.sectionName == "contactSection" && s.isActive
  );

  return (
    <>
      {heroSectionData && (
        <RestraintHero
          primaryColor={primaryColor}
          secondaryColor={secondaryColor}
          data={heroSectionData}
        />
      )}

      {aboutSectionData && (
        <RestraintAboutus
          primaryColor={primaryColor}
          secondaryColor={secondaryColor}
          data={aboutSectionData}
        />
      )}

      {eventSectionData && (
        <RestraintEvents
          primaryColor={primaryColor}
          secondaryColor={secondaryColor}
          data={eventSectionData}
        />
      )}

      {whatWeDoSectionData && (
        <RestraintWhatWeDo
          primaryColor={primaryColor}
          secondaryColor={secondaryColor}
          data={whatWeDoSectionData}
        />
      )}

      {serviceSectionData && (
        <RestraintServices
          primaryColor={primaryColor}
          secondaryColor={secondaryColor}
          data={serviceSectionData}
        />
      )}

      {howItWorkSection && (
        <RestraintHowItWork
          primaryColor={primaryColor}
          secondaryColor={secondaryColor}
          data={howItWorkSection}
        />
      )}

      {plansSectionData && (
        <RestraintPlans
          primaryColor={primaryColor}
          secondaryColor={secondaryColor}
          content={plansSectionData}
        />
      )}

      {gallerySectionData && <RestraintMarquee data={gallerySectionData} />}

      {testimoniesSectionData && (
        <RestraintTestimonials
          primaryColor={primaryColor}
          secondaryColor={secondaryColor}
          data={testimoniesSectionData}
        />
      )}

      {faqSectionData && (
        <RestraintFAQ
          primaryColor={primaryColor}
          secondaryColor={secondaryColor}
          data={faqSectionData}
        />
      )}

      {contactSectionData && (
        <RestraintContact
          primaryColor={primaryColor}
          secondaryColor={secondaryColor}
          data={contactSectionData}
        />
      )}
    </>
  );
};

export default RestraintRoot;
