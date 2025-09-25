"use client";

import React, { useContext, useEffect, useState } from "react";
import CreatorHero from "./_components/CreatorHero";
import CreatorBestsellers from "./_components/CreatorBestsellers/CreatorBestsellers";
import CreatorAboutus from "./_components/CreatorAboutus";
import CreatorCollaboration from "./_components/CreatorCollaboration";
import CreatorTestimonies from "./_components/CreatorTestimonies";
import CreatorLayout from "./layout";
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

const CreatorRoot: React.FC = () => {
  const { communityId } = useContext(AuthContext);
  const [data, setData] = useState<CreatorHomePage | undefined>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const run = async () => {
      if (!communityId) return;
      try {
        setIsLoading(true);
        const response = await fetchCreatorHome(communityId);
        setData(response.data as CreatorHomePage);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    run();
  }, [communityId]);

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
    <CreatorLayout>
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
    </CreatorLayout>
  );
};

export default CreatorRoot;
