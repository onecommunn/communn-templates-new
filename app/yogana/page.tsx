"use client";
import React from "react";
import YoganaHero from "./_components/YoganaHero";
import YoganaServices from "./_components/YoganaServices";
import YoganaAbout from "./_components/YoganaAbout";
import YoganaPlans from "./_components/YoganaPlans/YoganaPlans";
import YoganaEvents from "./_components/YoganaEvents";
import YoganaTestimonial from "./_components/YoganaTestimonial";
import YoganaGallery from "./_components/YoganaGallery";
import YoganaContact from "./_components/YoganaContact";
import YoganaCollaboration from "./_components/YoganaCollaboration";
import { useCMS } from "./CMSProvider.client";
import {
  Aboutus,
  Collaboration,
  ContactDetails,
  Events,
  Gallery,
  HeroSection,
  HomeSection,
  Plans,
  ServiceSection,
  TestimoniesSection,
  YoganaHomePage,
} from "@/models/templates/yogana/yogana-home-model";

const YoganaRoot = () => {
  const { home } = useCMS();
  const source = home as YoganaHomePage | undefined;

  const heroSection = source?.sections.find(
    (s: HomeSection): s is HeroSection => s.sectionName === "heroSection"
  );

  const aboutUsSection = source?.sections.find(
    (s: HomeSection): s is Aboutus => s.sectionName === "aboutSection"
  );

  const plansSection = source?.sections.find(
    (s: HomeSection): s is Plans => s.sectionName === "plansSection"
  );

  const eventsSection = source?.sections.find(
    (s: HomeSection): s is Events => s.sectionName === "eventsSection"
  );

  const collaborationSection = source?.sections.find(
    (s: HomeSection): s is Collaboration => s.sectionName === "clientsSection"
  );

  const testimonialSection = source?.sections.find(
    (s: HomeSection): s is TestimoniesSection =>
      s.sectionName === "testimoniesSection"
  );

  const gallerySection = source?.sections.find(
    (s: HomeSection): s is Gallery => s.sectionName === "gallerySection"
  );

  const contactSection = source?.sections.find(
    (s: HomeSection): s is ContactDetails => s.sectionName === "contactSection"
  );

  const servicesSection = source?.sections.find(
    (s: HomeSection): s is ServiceSection => s.sectionName === "serviceSection"
  );

  const primaryColor = source?.color?.primary || "#dd0f0f";
  const secondaryColor = source?.color?.secondary || "#fff200";
  const neutralColor = source?.color?.neutral || "#09ff00";

  // const primaryColor = "#dd0f0f";
  // const secondaryColor = "#fff200";
  // const neutralColor = "#09ff00";

  return (
    <>
      {heroSection && (
        <YoganaHero
          data={heroSection}
          primaryColor={primaryColor}
          secondaryColor={secondaryColor}
          neutralColor={neutralColor}
        />
      )}
      {aboutUsSection && (
        <YoganaAbout
          data={aboutUsSection}
          primaryColor={primaryColor}
          secondaryColor={secondaryColor}
          neutralColor={neutralColor}
        />
      )}
      {servicesSection && (
        <YoganaServices
          data={servicesSection}
          primaryColor={primaryColor}
          secondaryColor={secondaryColor}
          neutralColor={neutralColor}
        />
      )}
      {plansSection && (
        <YoganaPlans
          data={plansSection}
          primaryColor={primaryColor}
          secondaryColor={secondaryColor}
          neutralColor={neutralColor}
        />
      )}
      {eventsSection && (
        <YoganaEvents
          data={eventsSection}
          primaryColor={primaryColor}
          secondaryColor={secondaryColor}
          neutralColor={neutralColor}
        />
      )}

      {collaborationSection && (
        <YoganaCollaboration data={collaborationSection} />
      )}
      {/* <YoganaCourses /> */}
      {/* <YoganaProducts /> */}
      {testimonialSection && (
        <YoganaTestimonial
          data={testimonialSection}
          primaryColor={primaryColor}
          secondaryColor={secondaryColor}
          neutralColor={neutralColor}
        />
      )}
      {gallerySection && <YoganaGallery data={gallerySection} />}
      {/* <YoganaBlogs /> */}
      {contactSection && <YoganaContact data={contactSection} />}
    </>
  );
};

export default YoganaRoot;
