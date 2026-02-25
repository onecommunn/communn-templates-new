"use client";
import React from "react";
import PhotographyBreadcum from "../_components/PhotographyBreadcum";
import PhototgraphyPortfolioGallery from "./_components/PhototgraphyPortfolioGallery";
import { useCMS } from "../CMSProvider.client";
import {
  PhotographyProtfolioPage,
  PortfolioSection,
  HeroSection,
  GallerySection,
} from "@/models/templates/photography/Photography-portfolio-model";
import { portfolioDummyData } from "./portfolio-dummy-data";

const PhotographyProtfolioRoot = () => {
  const { portfolio } = useCMS();
  const isLoading = portfolio === undefined;
  const source: PhotographyProtfolioPage | undefined = !isLoading
    ? ((portfolio as PhotographyProtfolioPage | undefined) ??
      portfolioDummyData)
    : undefined;

  const heroSectionData: HeroSection | undefined = source?.sections?.find(
    (s: PortfolioSection): s is HeroSection =>
      s.sectionName === "heroSection" && s.isActive,
  );

  const gallerySection: GallerySection | undefined = source?.sections?.find(
    (s: PortfolioSection): s is GallerySection =>
      s.sectionName === "gallerySection" && s.isActive,
  );

  return (
    <>
      {heroSectionData && (
        <PhotographyBreadcum
          title={heroSectionData?.content?.title}
          heading={heroSectionData?.content?.heading}
          image={heroSectionData?.content?.image}
        />
      )}

      {gallerySection && <PhototgraphyPortfolioGallery data={gallerySection} />}
    </>
  );
};

export default PhotographyProtfolioRoot;
