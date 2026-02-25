"use client";
import React from "react";
import { PackageCard } from "./PhotographyPackageCard";
import { PreWeddingPackagesSection } from "@/models/templates/photography/photography-package-model";
import { WhatsappWidgetSection } from "@/models/templates/photography/photography-home-model";

const PhotographyPreWeddingPackages = ({
  data,
  whatsappWidgetData,
}: {
  data: PreWeddingPackagesSection;
  whatsappWidgetData: WhatsappWidgetSection;
}) => {
  const content = data?.content;
  const whatsappData = whatsappWidgetData?.content;
  return (
    <section className="py-20 px-4 bg-[#121212] text-[#EFECE7]">
      <div className="container mx-auto max-w-6xl">
        <h2 className="font-display text-3xl font-bold text-center mb-12 text-[#EFECE7]">
          {content?.heading}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
          {content?.preWeddingPackages.map((pkg, i) => (
            <PackageCard
              key={pkg.name}
              pkg={pkg}
              i={i}
              message={whatsappData?.predefinedMessage}
              whatsappNumber={whatsappData?.whatsappNumber}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default PhotographyPreWeddingPackages;
