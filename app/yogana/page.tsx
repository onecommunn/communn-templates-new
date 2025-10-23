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
import { dummyData } from "./dummyData";



const YoganaRoot = () => {
  const { home } = useCMS();
  const isLoading = home === undefined;
  const source: YoganaHomePage | undefined = !isLoading
    ? (home as YoganaHomePage | undefined) ?? dummyData
    : undefined;

  const heroSection = source?.sections.find(
    (s: HomeSection): s is HeroSection => s.sectionName === "heroSection" && s.isActive
  );

  const aboutUsSection = source?.sections.find(
    (s: HomeSection): s is Aboutus => s.sectionName === "aboutSection" && s.isActive
  );

  const plansSection = source?.sections.find(
    (s: HomeSection): s is Plans => s.sectionName === "plansSection" && s.isActive
  );

  const eventsSection = source?.sections.find(
    (s: HomeSection): s is Events => s.sectionName === "eventsSection" && s.isActive
  );

  const collaborationSection = source?.sections.find(
    (s: HomeSection): s is Collaboration => s.sectionName === "clientsSection" && s.isActive
  );

  const testimonialSection = source?.sections.find(
    (s: HomeSection): s is TestimoniesSection =>
      s.sectionName === "testimoniesSection" && s.isActive
  );

  const gallerySection = source?.sections.find(
    (s: HomeSection): s is Gallery => s.sectionName === "gallerySection" && s.isActive
  );

  const contactSection = source?.sections.find(
    (s: HomeSection): s is ContactDetails => s.sectionName === "contactSection" && s.isActive
  );

  const servicesSection = source?.sections.find(
    (s: HomeSection): s is ServiceSection => s.sectionName === "serviceSection" && s.isActive
  );

  const primaryColor = source?.color?.primary || "#C2A74E";
  const secondaryColor = source?.color?.secondary || "#000";
  const neutralColor = source?.color?.neutral || "#707070";





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
        <YoganaCollaboration
          data={collaborationSection}
          primaryColor={primaryColor}
          secondaryColor={secondaryColor}
          neutralColor={neutralColor}
        />
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
      {gallerySection && (
        <YoganaGallery data={gallerySection}
          primaryColor={primaryColor}
          secondaryColor={secondaryColor}
          neutralColor={neutralColor} />
      )}
      {/* <YoganaBlogs /> */}
      {contactSection && (
        <YoganaContact
          data={contactSection}
          primaryColor={primaryColor}
          secondaryColor={secondaryColor}
          neutralColor={neutralColor}
        />
      )}
    </>
  );
};

export default YoganaRoot;
