"use client";
import React from "react";
import PhotographyBreadcum from "../_components/PhotographyBreadcum";
import PhotographyServicesGrid from "./_components/PhotographyServicesGrid";
import {
  PhotographyServicePage,
  ServicesSection,
  HeroSection,
  ServiceSection,
} from "@/models/templates/photography/photography-services-model";
import { useCMS } from "../CMSProvider.client";
import { servicesDummyData } from "./services-dummy-data";

const PhotographyServicesRoot = () => {
  const { services } = useCMS();
  const isLoading = services === undefined;
  const source: PhotographyServicePage | undefined = !isLoading
    ? ((services as PhotographyServicePage | undefined) ?? servicesDummyData)
    : undefined;

  const heroSectionData: HeroSection | undefined = source?.sections?.find(
    (s: ServicesSection): s is HeroSection =>
      s.sectionName === "heroSection" && s.isActive,
  );

  const serviceSection: ServiceSection | undefined = source?.sections?.find(
    (s: ServicesSection): s is ServiceSection =>
      s.sectionName === "serviceSection" && s.isActive,
  );
  return (
    <>
      {heroSectionData && (
        <PhotographyBreadcum
          image={
            heroSectionData?.content?.image ??
            "https://upload-community-files-new.s3.ap-south-1.amazonaws.com/uploads/wedding-6.jpg"
          }
          title={heroSectionData?.content?.title}
          heading={heroSectionData?.content?.heading}
        />
      )}

      {serviceSection && <PhotographyServicesGrid data={serviceSection} />}
    </>
  );
};

export default PhotographyServicesRoot;
