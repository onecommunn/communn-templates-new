import React from "react";
import DefaultHero from "./_components/DefaultHero";
import DefaultAbout from "./_components/DefaultAbout";
import DefaultTabs from "./_components/DefaultTabs";
import DefaultGallery from "./_components/DefaultGallery";
import DefaultEvents from "./_components/DefaultEvents";
import DefaultPlans from "./_components/DefaultPlans";
import DefaultCourses from "./_components/DefaultCourses";
import DefaultOurTeam from "./_components/DefaultOurTeam";
import DefaultContactMe from "./_components/DefaultContactMe";
import DefaultFAQ from "./_components/DefaultFAQ";

const DefaultRoot = () => {
  return (
    <>
      <DefaultHero />
      <DefaultTabs/>
      <DefaultAbout />
      <DefaultGallery/>
      <DefaultEvents/>
      <DefaultPlans/>
      <DefaultCourses/>
      <DefaultOurTeam/>
      <DefaultContactMe/>
      <DefaultFAQ/>
    </>
  );
};

export default DefaultRoot;
