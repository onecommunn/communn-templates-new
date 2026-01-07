"use client";
import React from "react";
import CollectionsHero from "./_components/CollectionsHero";
import CollectionsMarquee from "./_components/CollectionsMarquee";
import CollectionsProducts from "./_components/CollectionsProducts";
import CollectionsFeatures from "./_components/CollectionsFeatures";
import CollectionsGallery from "./_components/CollectionsGallery";
import CollectionsFAQs from "./_components/CollectionsFAQs";
import CollectionsCTA from "./_components/CollectionsCTA";
import CollectionsTestimonials from "./_components/CollectionsTestimonials";
import CollectionsService from "./_components/CollectionsService";
import { useCMS } from "./CMSProvider.client";
import {
  CollectionsHomePage,
  CollectionsSection,
  FaqSection,
  FeaturesSection,
  FeatureStripSection,
  GallerySection,
  HeroSection,
  HomeSection,
  ScrollSection,
  CTAsection,
  TestimoniesSection,
} from "@/models/templates/collections/collections-home-model";
import { HomedummyData } from "./home-dummy-data";

const CollectionsRoot = () => {
  const { home } = useCMS();
  const isLoading = home === undefined;
  const source: CollectionsHomePage | undefined = !isLoading
    ? (home as CollectionsHomePage | undefined) ?? HomedummyData
    : undefined;

  const primaryColor = source?.color?.primary ?? "#C09932";

  const heroSectionData = source?.sections?.find(
    (s: HomeSection): s is HeroSection =>
      s.sectionName === "heroSection" && s.isActive
  );

  const scrollSectionData = source?.sections?.find(
    (s: HomeSection): s is ScrollSection =>
      s.sectionName === "scrollSection" && s.isActive
  );

  const collectionsSectionData = source?.sections?.find(
    (s: HomeSection): s is CollectionsSection =>
      s.sectionName === "collectionsSection" && s.isActive
  );

  const featuresSectionData = source?.sections?.find(
    (s: HomeSection): s is FeaturesSection =>
      s.sectionName === "featuresSection" && s.isActive
  );

  const gallerySectionData = source?.sections?.find(
    (s: HomeSection): s is GallerySection =>
      s.sectionName === "gallerySection" && s.isActive
  );

  const faqSectionData = source?.sections?.find(
    (s: HomeSection): s is FaqSection =>
      s.sectionName === "faqSection" && s.isActive
  );

  const featureStripSectionData = source?.sections?.find(
    (s: HomeSection): s is FeatureStripSection =>
      s.sectionName === "featureStripSection" && s.isActive
  );

  const ctaSectionData = source?.sections?.find(
    (s: HomeSection): s is CTAsection =>
      s.sectionName === "ctaSection" && s.isActive
  );

  const testimoniesSectionData = source?.sections?.find(
    (s: HomeSection): s is TestimoniesSection =>
      s.sectionName === "testimoniesSection" && s.isActive
  );

  return (
    <>
      {heroSectionData && (
        <CollectionsHero data={heroSectionData} primaryColor={primaryColor} />
      )}
      {scrollSectionData && (
        <CollectionsMarquee
          primaryColor={primaryColor}
          data={scrollSectionData}
        />
      )}

      {collectionsSectionData && (
        <CollectionsProducts
          data={collectionsSectionData}
          primaryColor={primaryColor}
        />
      )}

      {featuresSectionData && (
        <CollectionsFeatures
          data={featuresSectionData}
          primaryColor={primaryColor}
        />
      )}

      {gallerySectionData && <CollectionsGallery data={gallerySectionData} />}

      {faqSectionData && <CollectionsFAQs data={faqSectionData} />}

      {featureStripSectionData && (
        <CollectionsService
          data={featureStripSectionData}
          primaryColor={primaryColor}
        />
      )}
      {ctaSectionData && (
        <CollectionsCTA data={ctaSectionData} primaryColor={primaryColor} />
      )}

      {testimoniesSectionData && (
        <CollectionsTestimonials
          data={testimoniesSectionData}
          primaryColor={primaryColor}
        />
      )}
    </>
  );
};

export default CollectionsRoot;
