import React from "react";
import PhotographyBreadcum from "../_components/PhotographyBreadcum";
import PhotographyServicesGrid from "./_components/PhotographyServicesGrid";

const PhotographyServicesRoot = () => {
  return (
    <>
      <PhotographyBreadcum
        image="https://upload-community-files-new.s3.ap-south-1.amazonaws.com/uploads/wedding-6.jpg"
        title="What We Offer"
        heading="Our Services"
      />
      <PhotographyServicesGrid/>
    </>
  );
};

export default PhotographyServicesRoot;
