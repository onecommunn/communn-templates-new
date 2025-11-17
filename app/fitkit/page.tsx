import React from "react";
import FitKitHero from "./_components/FitKitHero";
import FitKitCalculate from "./_components/FitKitCalculate";
import FitKitAboutUs from "./_components/FitKitAboutUs";
import FitKitServices from "./_components/FitKitServices";
import FitKitEvents from "./_components/FitKitEvents";
import FitKitWhyChooseUs from "./_components/FitKitWhyChooseUs";
import FitkitTrainer from "./_components/FitkitTrainer";
import FitKitGallery from "./_components/FitKitGallery";
import FitkitPlans from "./_components/FitkitPlans";
import FitKitTestimonials from "./_components/FitKitTestimonials";
import FitKitContact from "./_components/FitKitContact";

const FitkitRoot = () => {
  return (
    <>
      <FitKitHero />
      <FitKitCalculate/>
      <FitKitAboutUs/>
      <FitKitServices/>
      <FitKitEvents/>
      <FitKitWhyChooseUs/>
      <FitkitTrainer/>
      <FitKitGallery/>
      <FitkitPlans/>
      <FitKitTestimonials/>
      <FitKitContact/>
    </>
  );
};

export default FitkitRoot;
