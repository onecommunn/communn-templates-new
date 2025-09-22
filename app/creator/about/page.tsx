import React from "react";
import CreatorAboutusHero from "./_components/CreatorAboutusHero";
import CreatorTimeline from "./_components/CreatorTimeline/CreatorTimeline";
import CreatorOurTeam from "./_components/CreatorOurTeam";
import CreatorLayout from "../layout";

const CreatorAbout = () => {
  return (
    <CreatorLayout>
      <CreatorAboutusHero />
      <CreatorTimeline />
      <CreatorOurTeam />
    </CreatorLayout>
  );
};

export default CreatorAbout;
