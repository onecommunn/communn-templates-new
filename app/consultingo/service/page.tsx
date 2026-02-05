import React from "react";
import ConsultingoServiceHero from "./_components/ConsultingoServiceHero";
import ConsultingoServiceContent from "./_components/ConsultingoServiceContent";
import ConsultingoServiceTestimonial from "./_components/ConsultingoServiceTestimonial";
import { useCMS } from "../CMSProvider.client";
import { ConsultingoHomePage } from "@/models/templates/consultingo/consultingo-home-model";
import { homedummyData } from "../home-dummy-data";

const ConsultingoServiceRoot = () => {
  const { home } = useCMS();
  const isLoading = home === undefined;
  const source: ConsultingoHomePage | undefined = !isLoading
    ? ((home as ConsultingoHomePage | undefined) ?? homedummyData)
    : undefined;

  const primaryColor = source?.color?.primary || "#BC4C37";
  const secondaryColor = source?.color?.secondary || "#4F2910";
  const neutralColor = source?.color?.neutral || "#fcf6e8";
  return (
    <>
      <ConsultingoServiceHero
        primaryColor={primaryColor}
        secondaryColor={secondaryColor}
        neutralColor={neutralColor}
      />
      <ConsultingoServiceContent
        primaryColor={primaryColor}
        secondaryColor={secondaryColor}
        neutralColor={neutralColor}
      />
      <ConsultingoServiceTestimonial
        primaryColor={primaryColor}
        secondaryColor={secondaryColor}
        neutralColor={neutralColor}
      />
    </>
  );
};

export default ConsultingoServiceRoot;
