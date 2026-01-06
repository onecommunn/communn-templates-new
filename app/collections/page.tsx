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

const CollectionsRoot = () => {
  const primaryColor = "#C09932";

  return (
    <>
      <CollectionsHero />
      <CollectionsMarquee primaryColor={primaryColor} />
      <CollectionsProducts />
      <CollectionsFeatures />
      <CollectionsGallery />
      <CollectionsFAQs />
      <CollectionsService />
      <CollectionsCTA />
      <CollectionsTestimonials />
    </>
  );
};

export default CollectionsRoot;
