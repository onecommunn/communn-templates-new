"use client";
import React from "react";
import PhotographyHero from "./_components/PhotographyHero";
import PhotographyMovingcollagesection from "./_components/PhotographyMovingcollagesection";
import PhotographyYouTubeShowreel from "./_components/PhotographyYouTubeShowreel";
import PhotographyStatscounter from "./_components/PhotographyStatscounter";
import PhotographyServicespreview from "./_components/PhotographyServicespreview";
import PhotographyFeaturedwork from "./_components/PhotographyFeaturedwork";
import PhotographyTestimonials from "./_components/PhotographyTestimonials";
import PhotographyCTA from "./_components/PhotographyCTA";
import { useCMS } from "./CMSProvider.client";
import {
  HomeSection,
  PhotographyHomePage,
  HeroSection,
  MovingcollageSection,
  YouTubeShowreelSection,
  StatscounterSection,
  ServicespreviewSection,
  FeaturedworkSection,
  TestimonialsSection,
  CTASection,
} from "@/models/templates/photography/photography-home-model";
import { homedummyData } from "./home-dummy-data";

const PhotographyRoot = () => {
  const { home } = useCMS();
  const isLoading = home === undefined;
  const source: PhotographyHomePage | undefined = !isLoading
    ? (home as PhotographyHomePage | undefined ?? homedummyData)
    : undefined;

  const heroSectionData = source?.sections?.find(
    (s: HomeSection): s is HeroSection =>
      s.sectionName === "heroSection" && s.isActive,
  );

  const movingcollagesectionData = source?.sections?.find(
    (s: HomeSection): s is MovingcollageSection =>
      s.sectionName === "movingcollagesection" && s.isActive,
  );

  const youTubeShowreelSection = source?.sections?.find(
    (s: HomeSection): s is YouTubeShowreelSection =>
      s.sectionName === "youTubeShowreelSection" && s.isActive,
  );

  const statscounterSection = source?.sections?.find(
    (s: HomeSection): s is StatscounterSection =>
      s.sectionName === "statscounterSection" && s.isActive,
  );

  const servicespreviewSection = source?.sections?.find(
    (s: HomeSection): s is ServicespreviewSection =>
      s.sectionName === "servicespreviewSection" && s.isActive,
  );

  const featuredworkSection = source?.sections?.find(
    (s: HomeSection): s is FeaturedworkSection =>
      s.sectionName === "featuredworkSection" && s.isActive,
  );

  const testimonialsSection = source?.sections?.find(
    (s: HomeSection): s is TestimonialsSection =>
      s.sectionName === "testimonialsSection" && s.isActive,
  );

  const ctaSection = source?.sections?.find(
    (s: HomeSection): s is CTASection =>
      s.sectionName === "ctaSection" && s.isActive,
  );
  return (
    <>
      {heroSectionData && <PhotographyHero data={heroSectionData} />}
      {movingcollagesectionData && (
        <PhotographyMovingcollagesection data={movingcollagesectionData} />
      )}
      {youTubeShowreelSection && (
        <PhotographyYouTubeShowreel data={youTubeShowreelSection} />
      )}
      {statscounterSection && (
        <PhotographyStatscounter data={statscounterSection} />
      )}
      {servicespreviewSection && (
        <PhotographyServicespreview data={servicespreviewSection} />
      )}

      {featuredworkSection && (
        <PhotographyFeaturedwork data={featuredworkSection} />
      )}
      {testimonialsSection && (
        <PhotographyTestimonials data={testimonialsSection} />
      )}

      {ctaSection && <PhotographyCTA data={ctaSection} />}
    </>
  );
};

export default PhotographyRoot;
