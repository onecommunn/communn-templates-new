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
  // console.log("DefaultRoot community data:", source);

  const creatorMember = source.members.find(
    (member) => member.user?._id === source.createdBy
  );

  const adminName = creatorMember?.user?.firstName

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
      />
      <DefaultTabs />
      <DefaultAbout
        description={source?.description}
        vision={source?.vision}
        mission={source?.mission}
      />
      <DefaultGallery gallery={source?.gallery} />
      <DefaultEvents />
      <DefaultPlans />
      <DefaultCourses courses={source?.course} />
      <DefaultOurTeam teams={source?.teams} />
      <DefaultContactMe
        message={source?.directorMessage}
        address={source?.city ?? "-"}
        socialLinks={source?.socialLinks}
        email={source?.email ?? "-"}
        phoneNumber={source?.phoneNumber}
        fullAddress={source?.fullAddress}
        zipCode={source?.zipCode || ""}
      />
      <DefaultFAQ faqs={source?.faq} />
    </>
  );
};

export default DefaultRoot;
