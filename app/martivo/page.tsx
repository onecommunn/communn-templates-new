import React from "react";
import MartivoHero from "./_components/MartivoHero";
import MartivoAbout from "./_components/MartivoAbout";
import MartivoServicesCarousel from "./_components/MartivoServicesCarousel";
import MartivoPlans from "./_components/MartivoPlans";
import MartivoEvents from "./_components/MartivoEvents";
import MartivoOurTeam from "./_components/MartivoOurTeam";
import MartivoTestimonials from "./_components/MartivoTestimonials";
import MartivoGallery from "./_components/MartivoGallery";
import MartivoServices from "./_components/MartivoServices";
import MartivoContact from "./_components/MartivoContact";

const MartivoRoot = () => {
  const primaryColor = "#0A2640";
  const secondaryColor = "#FF7300";
  const neutralColor = "#F9F6F1";
  return (
    <>
      <MartivoHero />
      <MartivoAbout />
      <MartivoServicesCarousel />
      <MartivoServices />
      <MartivoPlans />
      <MartivoEvents />
      <MartivoOurTeam />
      <MartivoTestimonials />
      <MartivoGallery />
      <MartivoContact />
    </>
  );
};

export default MartivoRoot;
