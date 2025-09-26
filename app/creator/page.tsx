"use client";

import React, { useContext, useEffect, useState } from "react";
import CreatorHero from "./_components/CreatorHero";
import CreatorBestsellers from "./_components/CreatorBestsellers/CreatorBestsellers";
import CreatorAboutus from "./_components/CreatorAboutus";
import CreatorCollaboration from "./_components/CreatorCollaboration";
import CreatorTestimonies from "./_components/CreatorTestimonies";
import { AuthContext } from "@/contexts/Auth.context";

// Import your types
import type {
  CollaborationSection,
  CreatorHomePage,
  CTASection,
  HeroSection,
  HomeSection,
  OurBestsellersSection,
  TestimoniesSection,
  TwoColumnSection,
} from "@/models/templates/creator/creator-home.model";

import { fetchCreatorHome } from "@/services/creatorService";
import HeroSkeleton from "./_components/Skeletons/CreatorHeroSkeleton";
import CreatorAboutusSkeleton from "./_components/Skeletons/CreatorAboutusSkeleton";
import CreatorTestimoniesSkeleton from "./_components/Skeletons/CreatorTestimoniesSkeleton";
import CreatorCTA from "./_components/CreatorCTA";
import CreatorCTASkeleton from "./_components/Skeletons/CreatorCTASkeleton";
import { useCMS } from "./CMSProvider.client";

const CreatorRoot: React.FC = () => {
  const { home } = useCMS();
  const data = home as CreatorHomePage | undefined;
  const isLoading = !data;

  const heroSection = data?.sections.find(
    (s: HomeSection): s is HeroSection => s.sectionName === "Hero Section"
  );
  const creatorAboutus = data?.sections.find(
    (s: HomeSection): s is TwoColumnSection =>
      s.sectionName === "Two Column Section"
  );
  const creatorBestsellers = data?.sections.find(
    (s: HomeSection): s is OurBestsellersSection =>
      s.sectionName === "Our Bestsellers"
  );
  const creatorCollaboration = data?.sections.find(
    (s: HomeSection): s is CollaborationSection =>
      s.sectionName === "Collaboration"
  );
  const creatorTestimonies = data?.sections.find(
    (s: HomeSection): s is TestimoniesSection =>
      s.sectionName === "Testimonies Section"
  );
  const creatorCTA = data?.sections.find(
    (s: HomeSection): s is CTASection => s.sectionName === "CTA Section"
  );

  return (
    <>
      {heroSection ? (
        <CreatorHero data={heroSection} />
      ) : isLoading ? (
        <HeroSkeleton />
      ) : (
        <></>
      )}
      {creatorAboutus ? (
        <CreatorAboutus data={creatorAboutus} />
      ) : isLoading ? (
        <CreatorAboutusSkeleton />
      ) : (
        <></>
      )}
      {creatorBestsellers ? (
        <CreatorBestsellers data={creatorBestsellers} />
      ) : (
        <></>
      )}

      {creatorCollaboration ? (
        <CreatorCollaboration data={creatorCollaboration} />
      ) : (
        <></>
      )}
      {creatorTestimonies ? (
        <CreatorTestimonies data={creatorTestimonies} />
      ) : isLoading ? (
        <CreatorTestimoniesSkeleton count={9} />
      ) : (
        <></>
      )}

      {creatorCTA ? (
        <CreatorCTA data={creatorCTA} />
      ) : isLoading ? (
        <CreatorCTASkeleton />
      ) : (
        <></>
      )}
    </>
  );
};

export default CreatorRoot;
