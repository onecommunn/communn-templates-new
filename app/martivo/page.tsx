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
  const primaryColor = "#29400a";
  const secondaryColor = "#7bd900";
  return (
    <>
      <MartivoHero primaryColor={primaryColor} secondaryColor={secondaryColor}/>
      <MartivoAbout primaryColor={primaryColor} secondaryColor={secondaryColor}/>
      <MartivoServicesCarousel primaryColor={primaryColor} secondaryColor={secondaryColor}/>
      <MartivoServices primaryColor={primaryColor} secondaryColor={secondaryColor}/>
      <MartivoPlans primaryColor={primaryColor} secondaryColor={secondaryColor}/>
      <MartivoEvents primaryColor={primaryColor} secondaryColor={secondaryColor}/>
      <MartivoOurTeam  primaryColor={primaryColor} secondaryColor={secondaryColor}/>
      <MartivoTestimonials primaryColor={primaryColor} secondaryColor={secondaryColor}/>
      <MartivoGallery />
      <MartivoContact primaryColor={primaryColor} secondaryColor={secondaryColor}/>
    </>
  );
};

export default MartivoRoot;
