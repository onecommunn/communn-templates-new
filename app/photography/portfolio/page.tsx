import React from "react";
import PhotographyBreadcum from "../_components/PhotographyBreadcum";
import PhototgraphyPortfolioGallery from "./_components/PhototgraphyPortfolioGallery";


const PhotographyProtfolioRoot = () => {
  return (
    <>
      <PhotographyBreadcum
        title="Our Work"
        heading="Portfolio"
        image="https://images.unsplash.com/photo-1500051638674-ff996a0ec29e?w=1920&q=80"
      />
      <PhototgraphyPortfolioGallery />
    </>
  );
};

export default PhotographyProtfolioRoot;
