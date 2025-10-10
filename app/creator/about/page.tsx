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

const dummyData: CreatorAboutPage = {
  templateId: "creator",
  pageName: "about",
  color: {
    primary: "#fff",
    secondary: "#000",
  },
  sections: [
    {
      sectionName: "twoColumnSection",
      content: {
        heading: "About Us",
        subHeading:
          "Ready to start your transformation journey? Have questions about my programs? I'd love to hear from you and help you take the next step.",
        title: "Consistent growth, boundless potential",
        description:
          "We met in college back in 2016, and ever since, life has been one big adventure! From chasing the Northern Lights in Iceland to plunging into Antarctica's icy waters and learning scuba diving in Egypt, we've been living a dream and documenting it all along the way. But our journey doesn't end there.",
        story:
          "We believe in empowering others with knowledge to help them live their best, most fulfilling life.",
        mediaPlacement: "left",
        media: [
          "/assets/colImage1.png",
          "/assets/colImage2.png",
          "/assets/colImage3.png",
          "/assets/colImage4.png",
        ],
        bulletes: [
          "Through our blogs, Guides  and Workshops we hope to share practical tips and inspirations for your own adventures.",
          "Whether you are seasoned wanderer or just starting to dream we invite you to join our ever evolving adventure we call Life!",
        ],
        mission:
          "We believe in empowering others with knowledge to help them live their best, most fulfilling life.",
        vision:
          "We believe in empowering others with knowledge to help them live their best, most fulfilling life.",
      },
      order: 0,
      isActive: true,
    },
    {
      sectionName: "journeyTimelineSection",
      heading: "Our Journey Timeline",
      subHeading:
        "Join our vibrant community! Explore uplifting stories and experiences from learners as they embark on their educational journeys.",
      order: 1,
      isActive: true,
      timeline: [
        {
          title: "Started My Journey - 2015",
          description: "Began my first coaching certificate",
        },
        {
          title: "Started My Journey - 2016",
          description: "Began my first coaching certificate",
        },
        {
          title: "Started My Journey - 2017",
          description: "Began my first coaching certificate",
        },
        {
          title: "Started My Journey - 2018",
          description: "Began my first coaching certificate",
        },
      ],
    },
    {
      sectionName: "ourTeamSection",
      heading: "Our Team",
      subHeading:
        "Join our vibrant community! Explore uplifting stories and experiences from learners as they embark on their educational journeys.",
      order: 2,
      isActive: true,
      members: [
        {
          name: "Jonathan Jones",
          designation: "Founder & CEO",
          avatar: "/assets/teamImage1.png",
          description: "Began my first coaching certificate ",
        },
        {
          name: "Jean Lang",
          designation: "Manager",
          avatar: "/assets/teamImage2.png",
          description: "Began my first coaching certificate ",
        },
        {
          name: "Katrina Towne",
          designation: "Instructor",
          avatar: "/assets/teamImage3.png",
          description: "Began my first coaching certificate",
        },
        {
          name: "Nicolas Rohan",
          designation: "Assistant Instructor",
          avatar: "/assets/teamImage4.png",
          description: "Began my first coaching certificate ",
        },
      ],
    },
    {
      sectionName: "ctaSection",
      content: {
        title: "Stay Inspiredss",
        description:
          "Get weekly insights, tips, and exclusive content delivered to your inbox. Join over 10,000 people on their growth journey.",
        buttons: [
          {
            label: "Explore All Activities",
            url: "https://prachiandharsh/courses",
          },
        ],
      },

      order: 3,
      isActive: true,
    },
  ],
  status: "published",
  __v: 2,
};

const CreatorAbout = () => {
  const { about } = useCMS();
  const isLoading = about === undefined;
  const data: CreatorAboutPage | undefined = !isLoading
    ? (about as CreatorAboutPage | undefined) ?? dummyData
    : undefined;
  const creatorAboutusHero = data?.sections.find(
    (s: AboutSection): s is TwoColumnSection =>
      s.sectionName === "twoColumnSection"
  );

  const creatorTimeline = data?.sections.find(
    (s: AboutSection): s is JourneyTimelineSection =>
      s.sectionName === "journeyTimelineSection"
  );

  const creatorOurTeam = data?.sections.find(
    (s: AboutSection): s is OurTeamSection => s.sectionName === "ourTeamSection"
  );

  const creatorCTA = data?.sections.find(
    (s: AboutSection): s is CTASection => s.sectionName === "ctaSection"
  );

  const primaryColor = data?.color?.primary || "#fff";
  const secondaryColor = data?.color?.secondary || "#000";
  return (
    <>
      {creatorAboutusHero ? (
        <CreatorAboutusHero
          data={creatorAboutusHero}
          primaryColor={primaryColor}
          secondaryColor={secondaryColor}
        />
      ) : isLoading ? (
        <CreatorAboutusSkeleton />
      ) : (
        <></>
      )}

      {creatorTimeline ? (
        <CreatorTimeline
          data={creatorTimeline}
          primaryColor={primaryColor}
          secondaryColor={secondaryColor}
        />
      ) : isLoading ? (
        <CreatorTimelineSkeleton />
      ) : (
        <></>
      )}
      {creatorOurTeam ? (
        <CreatorOurTeam
          data={creatorOurTeam}
          primaryColor={primaryColor}
          secondaryColor={secondaryColor}
        />
      ) : isLoading ? (
        <CreatorOurTeamSkeleton />
      ) : (
        <></>
      )}
      {creatorCTA ? (
        <CreatorCTA
          data={creatorCTA}
          primaryColor={primaryColor}
          secondaryColor={secondaryColor}
        />
      ) : isLoading ? (
        <CreatorCTASkeleton />
      ) : (
        <></>
      )}
    </>
  );
};

export default CreatorAbout;
