import React from "react";
import ConsultingoHero from "./_components/ConsultingoHero";
import ConsultingoTrustedBy from "./_components/ConsultingoTrustedBy";
import ConsultingoFeatures from "./_components/ConsultingoFeatures";
import ConsultingoSustainability from "./_components/ConsultingoSustainability";
import ConsultingoServices from "./_components/ConsultingoServices";
import ConsultingoAppointments from "./_components/ConsultingoAppointments";
import ConsultingoPlans from "./_components/ConsultingoPlans";
import ConsultingoEvents from "./_components/ConsultingoEvents";
import ConsultingoTestimonial from "./_components/ConsultingoTestimonial";

const ConsultingoRoot = () => {
  return (
    <>
      <ConsultingoHero />
      <ConsultingoTrustedBy/>
      <ConsultingoFeatures/>
      <ConsultingoSustainability/>
      <ConsultingoServices/>
      <ConsultingoAppointments/>
      <ConsultingoPlans/>
      <ConsultingoEvents/>
      <ConsultingoTestimonial/>
    </>
  );
};

export default ConsultingoRoot;
