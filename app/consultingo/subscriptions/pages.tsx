"use client"
import React from "react";
import ConsultingoSubscriptionsPage from "./_components/ConsultingoSubscriptionsPage";
import { useCMS } from "../CMSProvider.client";
import { ConsultingoHomePage } from "@/models/templates/consultingo/consultingo-home-model";
import { homedummyData } from "../home-dummy-data";

const ConsultingoSubscriptionsRoot = () => {
  const { home } = useCMS();
  const isLoading = home === undefined;
  const source: ConsultingoHomePage | undefined = !isLoading
    ? ((home as ConsultingoHomePage | undefined) ?? homedummyData)
    : undefined;

  const primaryColor = source?.color?.primary || "#BC4C37";
  const secondaryColor = source?.color?.secondary || "#4F2910";
  const neutralColor = source?.color?.neutral || "#fcf6e8";
  return (
    <ConsultingoSubscriptionsPage
      primaryColor={primaryColor}
      secondaryColor={secondaryColor}
      neutralColor={neutralColor}
    />
  );
};

export default ConsultingoSubscriptionsRoot;
