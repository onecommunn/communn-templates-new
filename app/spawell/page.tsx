import React from "react";
import SpawellHero from "./_components/SpawellHero";
import SpawellAboutus from "./_components/SpawellAboutus";
import SpawellFeaturedAppointments from "./_components/SpawellFeaturedAppointments";
import SpawellCourses from "./_components/SpawellCourses";
import SpawellServices from "./_components/SpawellServices";
import SpawellEvents from "./_components/SpawellEvents";
import SpawellWhyChooseus from "./_components/SpawellWhyChooseus";
import SpawellTeam from "./_components/SpawellTeam";
import SpawellTestimonials from "./_components/SpawellTestimonials";
import SpawellContact from "./_components/SpawellConatct";
import SpawellFAQ from "./_components/SpawellFAQ";
import SpawellPlans from "./_components/SpawellPlans";

const SpawellRoot = () => {
  const primaryColor = "#5D3222";
  const secondaryColor = "#fff";
  const neutralColor = "#F9F6F1";
  return (
    <>
      <SpawellHero
        primaryColor={primaryColor}
        secondaryColor={secondaryColor}
        neutralColor={neutralColor}
      />
      <SpawellAboutus
        primaryColor={primaryColor}
        secondaryColor={secondaryColor}
        neutralColor={neutralColor}
      />
      <SpawellFeaturedAppointments
        primaryColor={primaryColor}
        secondaryColor={secondaryColor}
        neutralColor={neutralColor}
      />
      <SpawellCourses
        primaryColor={primaryColor}
        secondaryColor={secondaryColor}
        neutralColor={neutralColor}
      />
      <SpawellServices
        primaryColor={primaryColor}
        secondaryColor={secondaryColor}
        neutralColor={neutralColor}
      />
      <SpawellPlans
        primaryColor={primaryColor}
        secondaryColor={secondaryColor}
        neutralColor={neutralColor}
      />
      <SpawellEvents
        primaryColor={primaryColor}
        secondaryColor={secondaryColor}
        neutralColor={neutralColor}
      />
      <SpawellWhyChooseus
        primaryColor={primaryColor}
        secondaryColor={secondaryColor}
        neutralColor={neutralColor}
      />
      <SpawellTeam
        primaryColor={primaryColor}
        secondaryColor={secondaryColor}
        neutralColor={neutralColor}
      />
      <SpawellTestimonials
        primaryColor={primaryColor}
        secondaryColor={secondaryColor}
        neutralColor={neutralColor}
      />
      <SpawellFAQ
        primaryColor={primaryColor}
        secondaryColor={secondaryColor}
        neutralColor={neutralColor}
      />
      <SpawellContact
        primaryColor={primaryColor}
        secondaryColor={secondaryColor}
        neutralColor={neutralColor}
      />
    </>
  );
};

export default SpawellRoot;
