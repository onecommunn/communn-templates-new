"use client";
import React from "react";
import CollectionsAboutSection from "./_components/CollectionsAboutSection";
import CollectionsService from "../_components/CollectionsService";
import CollectionsPersonaliseSection from "./_components/CollectionsPersonaliseSection";
import CollectionsTestimonialsSection from "./_components/CollectionsTestimonialsSection";
import CollectionsAboutGallery from "./_components/CollectionsAboutGallery";
import Breadcum from "../contact-us/_components/Breadcum";
import { useCMS } from "../CMSProvider.client";
import { AboutusdummyData } from "./aboutUs-dummy-data";
import {
  AboutSection,
  CollectionsAboutPage,
  HeroSection,
  PersonalizationSection,
  TwoColumnSection,
  TestimoniesSection,
} from "@/models/templates/collections/collections-about-model";
import {
  CollectionsHomePage,
  FeatureStripSection,
  HomeSection,
  GallerySection,
} from "@/models/templates/collections/collections-home-model";
import { HomedummyData } from "../home-dummy-data";

const CollectionsAboutRoot = () => {
  const { aboutUs, home } = useCMS();
  const isLoading = aboutUs === undefined;
  const source: CollectionsAboutPage | undefined = !isLoading
    ? (aboutUs as CollectionsAboutPage | undefined) ?? AboutusdummyData
    : undefined;

  // const source: CollectionsHomePage | undefined = !isLoading
  //     ? (home as CollectionsHomePage | undefined) ?? HomedummyData
  //     : undefined;

  const homeSource: CollectionsHomePage | undefined = !isLoading
    ? (home as CollectionsHomePage | undefined) ?? HomedummyData
    : undefined;

  // console.log(homeSource, "homeSource");

  const primaryColor = source?.color?.primary ?? "#C09932";

  const heroSection = source?.sections?.find(
    (s: AboutSection): s is HeroSection =>
      s.sectionName === "heroSection" && s.isActive
  );

  const twoColumnSectionData = source?.sections?.find(
    (s: AboutSection): s is TwoColumnSection =>
      s.sectionName === "twoColumnSection" && s.isActive
  );

  const personalizationSectionData = source?.sections?.find(
    (s: AboutSection): s is PersonalizationSection =>
      s.sectionName === "personalizationSection" && s.isActive
  );

  const featureStripSectionData = homeSource?.sections?.find(
    (s: HomeSection): s is FeatureStripSection =>
      s.sectionName === "featureStripSection" && s.isActive
  );

  const testimoniesSectionData = source?.sections?.find(
    (s: AboutSection): s is TestimoniesSection =>
      s.sectionName === "testimoniesSection" && s.isActive
  );

  const gallerySectionData = homeSource?.sections?.find(
    (s: HomeSection): s is GallerySection =>
      s.sectionName === "gallerySection" && s.isActive
  );

  const heroBanner =
    "https://upload-community-files-new.s3.ap-south-1.amazonaws.com/uploads/Background2323.png";

  return (
    <>
      {heroSection && (
        <Breadcum
          title={heroSection?.content?.heading}
          bannerImage={heroSection?.content?.media ?? heroBanner}
          breadcrumb={[{ label: "Home", href: "/" }, { label: "About Us" }]}
        />
      )}

      {twoColumnSectionData?.content?.columnData?.map((col, idx) => (
        <CollectionsAboutSection
          key={idx}
          title={col?.heading}
          description={col?.description}
          image={col?.media}
          pointes={col?.points}
          button={col?.buttons}
          imagePlace={idx % 2 == 0 ? "Left" : "Right"}
          primaryColor={primaryColor}
        />
      ))}
      {personalizationSectionData && (
        <CollectionsPersonaliseSection
          data={personalizationSectionData}
          primaryColor={primaryColor}
        />
      )}

      {featureStripSectionData && (
        <CollectionsService
          data={featureStripSectionData}
          primaryColor={primaryColor}
        />
      )}

      {testimoniesSectionData && (
        <CollectionsTestimonialsSection
          data={testimoniesSectionData}
          primaryColor={primaryColor}
        />
      )}

      {gallerySectionData && (
        <CollectionsAboutGallery data={gallerySectionData} />
      )}
    </>
  );
};

export default CollectionsAboutRoot;
