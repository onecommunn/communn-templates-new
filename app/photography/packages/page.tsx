"use client";
import React from "react";
import PhotographyBreadcum from "../_components/PhotographyBreadcum";
import PhotographyPreWeddingPackages from "./_components/PhotographyPreWeddingPackages";
import PhotographyWeddingPackage from "./_components/PhotographyWeddingPackage";
import PhotographyPricing from "./_components/PhotographyPricing";
import PhotographyPackageTC from "./_components/PhotographyPackageTC";
import { useCMS } from "../CMSProvider.client";
import {
  PackagesSection,
  PhotographyPackagesPage,
  HeroSection,
  PreWeddingPackagesSection,
  WeddingPackageSection,
  PricingSection,
  PackageTCsection,
} from "@/models/templates/photography/photography-package-model";
import {
  HomeSection,
  PhotographyHomePage,
  WhatsappWidgetSection,
} from "@/models/templates/photography/photography-home-model";
import { homedummyData } from "../home-dummy-data";
import { packageDummyData } from "./package-dummy-data";

const PhotographyPackageRoot = () => {
  const { packages, home } = useCMS();

  const homeisLoading = home === undefined;
  const homeSource: PhotographyHomePage | undefined = !homeisLoading
    ? ((home as PhotographyHomePage | undefined) ?? homedummyData)
    : undefined;

  const whatsappWidgetData = homeSource?.sections?.find(
    (s: HomeSection): s is WhatsappWidgetSection =>
      s.sectionName === "whatsappWidgetSection",
  );

  const isLoading = packages === undefined;
  const source: PhotographyPackagesPage | undefined = !isLoading
    ? ((packages as PhotographyPackagesPage | undefined) ?? packageDummyData)
    : undefined;

  const heroSectionData = source?.sections?.find(
    (s: PackagesSection): s is HeroSection =>
      s.sectionName === "heroSection" && s.isActive,
  );

  const preWeddingPackagesSection = source?.sections?.find(
    (s: PackagesSection): s is PreWeddingPackagesSection =>
      s.sectionName === "preWeddingPackagesSection" && s.isActive,
  );

  const weddingPackageSection = source?.sections?.find(
    (s: PackagesSection): s is WeddingPackageSection =>
      s.sectionName === "weddingPackageSection" && s.isActive,
  );

  const pricingSection: PricingSection | undefined = source?.sections?.find(
    (s: PackagesSection): s is PricingSection =>
      s.sectionName === "pricingSection" && s.isActive,
  );

  const packageTCsection: PackageTCsection | undefined = source?.sections?.find(
    (s: PackagesSection): s is PackageTCsection =>
      s.sectionName === "packageTCsection" && s.isActive,
  );

  return (
    <>
      {heroSectionData && (
        <PhotographyBreadcum
          image={
            heroSectionData?.content?.image ??
            "https://images.unsplash.com/photo-1493863641943-9b68992a8d07?w=1920&q=80"
          }
          title={heroSectionData?.content?.title ?? "Pricing"}
          heading={heroSectionData?.content?.heading ?? "Our Packages"}
        />
      )}

      {preWeddingPackagesSection && whatsappWidgetData && (
        <PhotographyPreWeddingPackages
          data={preWeddingPackagesSection}
          whatsappWidgetData={whatsappWidgetData}
        />
      )}

      {weddingPackageSection && whatsappWidgetData && (
        <PhotographyWeddingPackage
          data={weddingPackageSection}
          whatsappWidgetData={whatsappWidgetData}
        />
      )}

      {pricingSection && <PhotographyPricing data={pricingSection} />}

      {packageTCsection && <PhotographyPackageTC data={packageTCsection} />}
    </>
  );
};

export default PhotographyPackageRoot;
