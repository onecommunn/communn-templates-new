"use client";
import React from "react";
import CreatorAboutusHero from "./_components/CreatorAboutusHero";
import CreatorTimeline from "./_components/CreatorTimeline/CreatorTimeline";
import CreatorOurTeam from "./_components/CreatorOurTeam";
import {
  AboutSection,
  CreatorAboutPage,
  CTASection,
  JourneyTimelineSection,
  OurTeamSection,
  TwoColumnSection,
} from "@/models/templates/creator/creator-about.model";
import CreatorAboutusSkeleton from "../_components/Skeletons/CreatorAboutusSkeleton";
import CreatorTimelineSkeleton from "./_components/Skeletons/CreatorTimelineSkeleton";
import CreatorOurTeamSkeleton from "./_components/Skeletons/CreatorOurTeamSkeleton";
import CreatorCTA from "../_components/CreatorCTA";
import CreatorCTASkeleton from "../_components/Skeletons/CreatorCTASkeleton";
import { useCMS } from "../CMSProvider.client";

const CreatorAbout = () => {
  const { about,loading } = useCMS();
  const data = about as CreatorAboutPage | undefined;
  const creatorAboutusHero = data?.sections.find(
    (s: AboutSection): s is TwoColumnSection =>
      s.sectionName === "Two Column Section"
  );

  const creatorTimeline = data?.sections.find(
    (s: AboutSection): s is JourneyTimelineSection =>
      s.sectionName === "Journey Timeline"
  );

  const creatorOurTeam = data?.sections.find(
    (s: AboutSection): s is OurTeamSection => s.sectionName === "Our Team"
  );

  const creatorCTA = data?.sections.find(
    (s: AboutSection): s is CTASection => s.sectionName === "CTA Section"
  );
  return (
    <>
      {creatorAboutusHero ? (
        <CreatorAboutusHero data={creatorAboutusHero} />
      ) : loading ? (
        <CreatorAboutusSkeleton />
      ) : (
        <></>
      )}

      {creatorTimeline ? (
        <CreatorTimeline data={creatorTimeline} />
      ) : loading ? (
        <CreatorTimelineSkeleton />
      ) : (
        <></>
      )}
      {creatorOurTeam ? (
        <CreatorOurTeam data={creatorOurTeam} />
      ) : loading ? (
        <CreatorOurTeamSkeleton />
      ) : (
        <></>
      )}
      {creatorCTA ? (
        <CreatorCTA data={creatorCTA} />
      ) : loading ? (
        <CreatorCTASkeleton />
      ) : (
        <></>
      )}
    </>
  );
};

export default CreatorAbout;
