"use client";
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
import { useCMS } from "./CMSProvider.client";
import { Community } from "@/services/communityService";

const DefaultRoot = () => {
  const { community } = useCMS();
  const source: Community = community;

  const creatorMember = source?.members?.find(
    (member) => member?.user?._id === source?.createdBy,
  );

  const adminName = creatorMember?.user?.firstName;

  const pramodcolors = {
    primaryColor: "#ef3340",
    secondaryColor: "#d2d6c0",
    textcolor: "#000",
  };

  const defaultColors = {
    primaryColor: "#2952A2",
    secondaryColor: "#2952A2",
    textcolor: "#fff",
  };

  const color =
    community?._id === "692c12e23571140d3e5d3ab0"
      ? pramodcolors
      : defaultColors;

  return (
    <>
      <DefaultHero
        name={source?.name}
        logo={source?.logo}
        banner={source?.banner}
        membersCount={source?.members?.length}
        type={source?.type}
        phoneNumber={source?.phoneNumber}
        numberOfPost={source?.numberOfPost}
        adminName={adminName}
        colors={color}
      />
      <DefaultTabs colors={color}/>
      <DefaultAbout
        description={source?.description}
        vision={source?.vision}
        mission={source?.mission}
        colors={color}
      />
      <DefaultGallery gallery={source?.gallery} />
      <DefaultEvents colors={color}/>
      <DefaultPlans  colors={color}/>
      <DefaultCourses courses={source?.course} />
      <DefaultOurTeam teams={source?.teams} colors={color}/>
      <DefaultContactMe
        message={source?.directorMessage}
        address={source?.city ?? "-"}
        socialLinks={source?.socialLinks}
        email={source?.email ?? "-"}
        phoneNumber={source?.phoneNumber}
        fullAddress={source?.fullAddress}
        zipCode={source?.zipCode || ""}
      />
      {source?.faq?.length > 0 && <DefaultFAQ faqs={source?.faq} colors={color}/>}
    </>
  );
};

export default DefaultRoot;
