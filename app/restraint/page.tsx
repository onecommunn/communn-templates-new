import React from "react";
import RestraintHeader from "./_components/RestraintHeader";
import RestraintHero from "./_components/RestraintHero";
import RestraintAboutus from "./_components/RestraintAboutus";
import RestraintWhatWeDo from "./_components/RestraintWhatWeDo";
import RestraintEvents from "./_components/RestraintEvents";
import RestraintServices from "./_components/RestraintServices";
import RestraintHowItWork from "./_components/RestraintHowItWork";
import RestraintPlans from "./_components/RestraintPlans";
import RestraintMarquee from "./_components/RestraintMarquee";
import RestraintTestimonials from "./_components/RestraintTestimonials";
import RestraintFAQ from "./_components/RestraintFAQ";

const RestraintRoot = () => {
  return (
    <>
      <RestraintHero />
      <RestraintAboutus />
      <RestraintEvents />
      <RestraintWhatWeDo />
      <RestraintServices/>
      <RestraintHowItWork/>
      <RestraintPlans/>
      <RestraintMarquee/>
      <RestraintTestimonials/>
      <RestraintFAQ/>
    </>
  );
};

export default RestraintRoot;
