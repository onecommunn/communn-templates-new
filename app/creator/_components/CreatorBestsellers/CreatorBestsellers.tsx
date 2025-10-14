import React from "react";
import CatalogGrid from "./CatalogGrid";
import CreatorSectionHeader from "@/components/CustomComponents/Creator/CreatorSectionHeader";
import { OurBestsellersSection } from "@/models/templates/creator/creator-home.model";

type props = {
  data: OurBestsellersSection;
  primaryColor: string;
  secondaryColor: string;
};

const CreatorBestsellers: React.FC<props> = ({
  data,
  secondaryColor,
  primaryColor,
}) => {
  return (
    <section
      className="py-10 font-inter"
      style={{ backgroundColor: primaryColor }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-26">
        <CreatorSectionHeader
          title={data?.content?.heading || "Our Bestsellers"}
          textColor={secondaryColor}
          description={`${data?.content?.subHeading || ""}`}
        />
        <CatalogGrid
          primaryColor={primaryColor}
          secondaryColor={secondaryColor}
        />
      </div>
    </section>
  );
};

export default CreatorBestsellers;
