"use client";
import React, { useContext, useEffect, useState } from "react";
import CreatorAboutusHero from "./_components/CreatorAboutusHero";
import CreatorTimeline from "./_components/CreatorTimeline/CreatorTimeline";
import CreatorOurTeam from "./_components/CreatorOurTeam";
import CreatorLayout from "../layout";
import { AuthContext } from "@/contexts/Auth.context";
import {
  AboutSection,
  CreatorAboutPage,
  JourneyTimelineSection,
  OurTeamSection,
  TwoColumnSection,
} from "@/models/templates/creator/creator-about.model";
import { fetchCreatorAbout } from "@/services/creatorService";
import CreatorAboutusSkeleton from "../_components/Skeletons/CreatorAboutusSkeleton";
import CreatorTimelineSkeleton from "./_components/Skeletons/CreatorTimelineSkeleton";
import CreatorOurTeamSkeleton from "./_components/Skeletons/CreatorOurTeamSkeleton";

const CreatorAbout = () => {
  const { communityId } = useContext(AuthContext);
  const [data, setData] = useState<CreatorAboutPage | undefined>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const run = async () => {
      if (!communityId) return;
      try {
        setIsLoading(true);
        const response = await fetchCreatorAbout(communityId);
        setData(response.data as CreatorAboutPage);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    run();
  }, [communityId]);

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

  return (
    <CreatorLayout>
      {creatorAboutusHero ? (
        <CreatorAboutusHero data={creatorAboutusHero} />
      ) : isLoading ? (
        <CreatorAboutusSkeleton />
      ) : (
        <></>
      )}

      {creatorTimeline ? (
        <CreatorTimeline data={creatorTimeline} />
      ) : isLoading ? (
        <CreatorTimelineSkeleton />
      ) : (
        <></>
      )}
      {creatorOurTeam ? (
        <CreatorOurTeam data={creatorOurTeam} />
      ) : isLoading ? (
        <CreatorOurTeamSkeleton />
      ) : (
        <></>
      )}
    </CreatorLayout>
  );
};

export default CreatorAbout;
