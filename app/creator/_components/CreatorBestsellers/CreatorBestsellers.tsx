import React from "react";
import CatalogGrid from "./CatalogGrid";
import CreatorSectionHeader from "@/components/CustomComponents/Creator/CreatorSectionHeader";
import { OurBestsellersSection } from "@/models/templates/creator/creator-home.model";

type props = {
   data:OurBestsellersSection
}

const CreatorBestsellers:React.FC<props> = ({data}) => {
  return (
    <section className="py-10 font-inter">
      <div className="container mx-auto px-4 sm:px-6 lg:px-26">
        <CreatorSectionHeader
          title={data.heading || 'Our Bestsellers'}
          description={`${data?.subHeading || ""}`}
        />
        <CatalogGrid />
      </div>
    </section>
  );
};

export default CreatorBestsellers;
