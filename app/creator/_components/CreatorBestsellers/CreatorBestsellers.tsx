import React from "react";
import CatalogGrid from "./CatalogGrid";
import CreatorSectionHeader from "@/components/CustomComponents/Creator/CreatorSectionHeader";

const CreatorBestsellers = () => {
  return (
    <section className="py-10 font-inter">
      <div className="container mx-auto px-4 sm:px-6 lg:px-26">
        <CreatorSectionHeader
          title="Our Bestsellers"
          description={`Hi there! We're Prachi and Harsh, adventure enthusiasts and
            storytellers (previously known as "Two Tickets To Freedom")`}
        />
        <CatalogGrid />
      </div>
    </section>
  );
};

export default CreatorBestsellers;
