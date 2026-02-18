import React from "react";
import PhotographyBio from "./_components/PhotographyBio";
import PhotographyHighlights from "./_components/PhotographyHighlights";
import PhotographyBreadcum from "../_components/PhotographyBreadcum";

const PhotographyPageRoot = () => {
  return (
    <>
      <PhotographyBreadcum
        image="https://upload-community-files-new.s3.ap-south-1.amazonaws.com/uploads/wedding-2.jpg"
        title="About Us"
        heading=" Our Story"
      />
      <PhotographyBio />
      <PhotographyHighlights />
    </>
  );
};

export default PhotographyPageRoot;
