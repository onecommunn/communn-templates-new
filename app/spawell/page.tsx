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

const SpawellRoot = () => {
  return (
    <>
      <SpawellHero />
      <SpawellAboutus />
      <SpawellFeaturedAppointments />
      <SpawellCourses />
      <SpawellServices />
      <SpawellEvents />
      <SpawellWhyChooseus />
      <SpawellTeam/> 
      <SpawellTestimonials/>
      <SpawellFAQ/>
      <SpawellContact/>
    </>
  );
};

export default SpawellRoot;
