"use client";
import React from "react";
import YoganaHero from "./_components/YoganaHero";
import YoganaServices from "./_components/YoganaServices";
import YoganaAbout from "./_components/YoganaAbout";
import YoganaPlans from "./_components/YoganaPlans/YoganaPlans";
import YoganaEvents from "./_components/YoganaEvents";
import YoganaCourses from "./_components/YoganaCourses/YoganaCourses";
import YoganaProducts from "./_components/YoganaProducts";
import YoganaTestimonial from "./_components/YoganaTestimonial";
import YoganaGallery from "./_components/YoganaGallery";
import YoganaBlogs from "./_components/YoganaBlogs";
import YoganaContact from "./_components/YoganaContact";
import YoganaCTA from "./_components/YoganaCTA";
import YoganaCollaboration from "./_components/YoganaCollaboration";
import { useCMS } from "./CMSProvider.client";
import {
  Aboutus,
  Collaboration,
  ContactDetails,
  CTASection,
  Events,
  Gallery,
  HeroSection,
  HomeSection,
  Plans,
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

  const CTAsection = source?.sections.find(
    (s: HomeSection): s is CTASection => s.sectionName === "Whatsapp join"
  );

  return (
    <>
      {heroSection && <YoganaHero data={heroSection} />}
      {aboutUsSection && <YoganaAbout data={aboutUsSection} />}
      <YoganaServices />
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
      {CTAsection && <YoganaCTA data={CTAsection} />}
    </>
  );
};

export default YoganaRoot;
