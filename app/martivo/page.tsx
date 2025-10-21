import React from "react";
import MartivoHeader from "./_components/MartivoHeader";
import MartivoHero from "./_components/MartivoHero";
import MartivoAbout from "./_components/MartivoAbout";
import MartivoServicesCarousel from "./_components/MartivoServicesCarousel";
import MartivoCourses from "./_components/MartivoCourses";
import MartivoPlans from "./_components/MartivoPlans";

const MartivoRoot = () => {
  return (
    <main className="overflow-hidden">
      <MartivoHeader />
      <MartivoHero />
      <MartivoAbout/>
      <MartivoServicesCarousel/>
      <MartivoCourses/>
      <MartivoPlans/>
    </main>
  );
};

export default MartivoRoot;
