import React from "react";
import CreatorHero from "./_components/CreatorHero";
import CreatorBestsellers from "./_components/CreatorBestsellers/CreatorBestsellers";
import CreatorAboutus from "./_components/CreatorAboutus";
import CreatorCollaboration from "./_components/CreatorCollaboration";
import CreatorTestimonies from "./_components/CreatorTestimonies";
import CreatorLayout from "./layout";

const CreatorRoot = () => {
  return (
    <CreatorLayout>
      <CreatorHero />
      <CreatorAboutus />
      <CreatorBestsellers />
      <CreatorCollaboration />
      <CreatorTestimonies /> 
    </CreatorLayout>
  );
};

export default CreatorRoot;
