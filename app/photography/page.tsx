import React from "react";
import PhotographyHero from "./_components/PhotographyHero";
import PhotographyMovingcollagesection from "./_components/PhotographyMovingcollagesection";
import PhotographyYouTubeShowreel from "./_components/PhotographyYouTubeShowreel";
import PhotographyStatscounter from "./_components/PhotographyStatscounter";
import PhotographyServicespreview from "./_components/PhotographyServicespreview";
import PhotographyFeaturedwork from "./_components/PhotographyFeaturedwork";
import PhotographyTestimonials from "./_components/PhotographyTestimonials";
import PhotographyCTA from "./_components/PhotographyCTA";

const PhotographyRoot = () => {
  return (
    <>
      <PhotographyHero />
      <PhotographyMovingcollagesection />
      <PhotographyYouTubeShowreel />
      <PhotographyStatscounter />
      <PhotographyServicespreview/>
      <PhotographyFeaturedwork/>
      <PhotographyTestimonials/>
      <PhotographyCTA/>
    </>
  );
};

export default PhotographyRoot;
