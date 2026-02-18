import React from "react";
import PhotographyBreadcum from "../_components/PhotographyBreadcum";
import PhotographyPreWeddingPackages from "./_components/PhotographyPreWeddingPackages";
import PhotographyWeddingPackage from "./_components/PhotographyWeddingPackage";
import PhotographyPricing from "./_components/PhotographyPricing";
import PhotographyPackageTC from "./_components/PhotographyPackageTC";

const PhotographyPackageRoot = () => {
  return (
    <>
      <PhotographyBreadcum
        image="https://images.unsplash.com/photo-1493863641943-9b68992a8d07?w=1920&q=80"
        title="Pricing"
        heading="Our Packages"
      />
      <PhotographyPreWeddingPackages />
      <PhotographyWeddingPackage/>
      <PhotographyPricing/>
      <PhotographyPackageTC/>
    </>
  );
};

export default PhotographyPackageRoot;
