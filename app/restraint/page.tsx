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
import RestraintContact from "./_components/RestraintContact";

const RestraintRoot = () => {
  const primaryColor = "#2c3869";
  const secondaryColor = "#3e7bdd";
  return (
    <>
      <RestraintHero
        primaryColor={primaryColor}
        secondaryColor={secondaryColor}
      />
      <RestraintAboutus
        primaryColor={primaryColor}
        secondaryColor={secondaryColor}
      />
      <RestraintEvents
        primaryColor={primaryColor}
        secondaryColor={secondaryColor}
      />
      <RestraintWhatWeDo
        primaryColor={primaryColor}
        secondaryColor={secondaryColor}
      />
      <RestraintServices
        primaryColor={primaryColor}
        secondaryColor={secondaryColor}
      />
      <RestraintHowItWork
        primaryColor={primaryColor}
        secondaryColor={secondaryColor}
      />
      <RestraintPlans
        primaryColor={primaryColor}
        secondaryColor={secondaryColor}
      />
      <RestraintMarquee />
      <RestraintTestimonials
        primaryColor={primaryColor}
        secondaryColor={secondaryColor}
      />
      <RestraintFAQ
        primaryColor={primaryColor}
        secondaryColor={secondaryColor}
      />
      <RestraintContact
        primaryColor={primaryColor}
        secondaryColor={secondaryColor}
      />
    </>
  );
};

export default RestraintRoot;
