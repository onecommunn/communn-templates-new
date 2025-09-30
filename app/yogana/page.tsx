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
    (s: HomeSection): s is HeroSection => s.sectionName === "Hero Section"
  );

  const aboutUsSection = source?.sections.find(
    (s: HomeSection): s is Aboutus => s.sectionName === "About us"
  );

  const plansSection = source?.sections.find(
    (s: HomeSection): s is Plans => s.sectionName === "Plans"
  );

  const eventsSection = source?.sections.find(
    (s: HomeSection): s is Events => s.sectionName === "Events"
  );

  const collaborationSection = source?.sections.find(
    (s: HomeSection): s is Collaboration =>
      s.sectionName === "Collaboration logos section"
  );

  const testimonialSection = source?.sections.find(
    (s: HomeSection): s is TestimoniesSection =>
      s.sectionName === "Testimonies Section"
  );

  const gallerySection = source?.sections.find(
    (s: HomeSection): s is Gallery => s.sectionName === "Gallery"
  );

  const contactSection = source?.sections.find(
    (s: HomeSection): s is ContactDetails => s.sectionName === "Contact details"
  );

  const servicesSection = source?.sections.find(
    (s: HomeSection): s is ServiceSection => s.sectionName === "Service section"
  );

  return (
    <>
      {heroSection && <YoganaHero data={heroSection} />}
      {aboutUsSection && <YoganaAbout data={aboutUsSection} />}
      {servicesSection && <YoganaServices data={servicesSection} />}
      {plansSection && <YoganaPlans data={plansSection} />}
      {eventsSection && <YoganaEvents data={eventsSection} />}

      {collaborationSection && (
        <YoganaCollaboration data={collaborationSection} />
      )}
      {/* <YoganaCourses /> */}
      {/* <YoganaProducts /> */}
      {testimonialSection && <YoganaTestimonial data={testimonialSection} />}
      {gallerySection && <YoganaGallery data={gallerySection} />}
      {/* <YoganaBlogs /> */}
      {contactSection && <YoganaContact data={contactSection} />}
    </>
  );
};

export default YoganaRoot;
