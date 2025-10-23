import React from "react";
import MartivoHeader from "./_components/MartivoHeader";
import MartivoHero from "./_components/MartivoHero";
import MartivoAbout from "./_components/MartivoAbout";
import MartivoServicesCarousel from "./_components/MartivoServicesCarousel";
import MartivoPlans from "./_components/MartivoPlans";
import MartivoEvents from "./_components/MartivoEvents";
import MartivoOurTeam from "./_components/MartivoOurTeam";
import MartivoTestimonials from "./_components/MartivoTestimonials";
import MartivoGallery from "./_components/MartivoGallery";
import MartivoFooter from "./_components/MartivoFooter";
import MartivoServices from "./_components/MartivoServices";
import MartivoContact from "./_components/MartivoContact";

const MartivoRoot = () => {
  return (
    <>
      <MartivoHeader />
      <MartivoHero />
      <MartivoAbout/>
      <MartivoServicesCarousel/>
      <MartivoServices/>
      <MartivoPlans/>
      <MartivoEvents/>
      <MartivoOurTeam/>
      <MartivoTestimonials/>
      <MartivoGallery/>
      <MartivoContact/>
      <MartivoFooter/>
    </>
  );
};

export default MartivoRoot;
