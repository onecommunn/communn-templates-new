"use client";

import React from "react";
import CreatorHero from "./_components/CreatorHero";
import CreatorBestsellers from "./_components/CreatorBestsellers/CreatorBestsellers";
import CreatorAboutus from "./_components/CreatorAboutus";
import CreatorCollaboration from "./_components/CreatorCollaboration";
import CreatorTestimonies from "./_components/CreatorTestimonies";

import type {
  CollaborationSection,
  CreatorHomePage,
  CTASection,
  HeroSection,
  HomeSection,
  OurBestsellersSection,
  TestimoniesSection,
  TwoColumnSection,
} from "@/models/templates/creator/creator-home.model";

import HeroSkeleton from "./_components/Skeletons/CreatorHeroSkeleton";
import CreatorAboutusSkeleton from "./_components/Skeletons/CreatorAboutusSkeleton";
import CreatorTestimoniesSkeleton from "./_components/Skeletons/CreatorTestimoniesSkeleton";
import CreatorCTA from "./_components/CreatorCTA";
import CreatorCTASkeleton from "./_components/Skeletons/CreatorCTASkeleton";
import { useCMS } from "./CMSProvider.client";

// --- your existing dummyData (must conform to CreatorHomePage) ---
const dummyData: CreatorHomePage = {
  templateId: "creator",
  pageName: "home",
  color: {
    primary: "#fff",
    secondary: "#000",
  },
  sections: [
    {
      sectionName: "heroSection",
      content: {
        heading: "Gain the skills to unlock your true potentials",
        subHeading:
          "Unlock a world of opportunities and take control of your future by mastering new skills that empower you to achieve your goals.",
        media: [
          "https://upload-community-files-new.s3.ap-south-1.amazonaws.com/uploads/slideImage1.jpg",
          "https://upload-community-files-new.s3.ap-south-1.amazonaws.com/uploads/slideImage2.jpg",
          "https://upload-community-files-new.s3.ap-south-1.amazonaws.com/uploads/slideImage3.jpg",
          "https://upload-community-files-new.s3.ap-south-1.amazonaws.com/uploads/slideImage4.jpg",
          "https://upload-community-files-new.s3.ap-south-1.amazonaws.com/uploads/slideImage2.jpg",
          "https://upload-community-files-new.s3.ap-south-1.amazonaws.com/uploads/slideImage2.jpg",
        ],
        buttons: [{ label: "Join Our Community", url: "https://communn.io" }],
      },
      order: 0,
      isActive: true,
    },
    {
      sectionName: "twoColumnSection",
      content: {
        heading: "Know About us",
        subHeading:
          "Our names are Prachi & Harsh and we’re multi-passionate content creators making videos about slow travel, love & relationships.",
        title: "Consistent growth, boundless potential",
        description:
          "We met in college back in 2016, and ever since, life has been one big adventure! From chasing the Northern Lights in Iceland to plunging into Antarctica's icy waters and learning scuba diving in Egypt, we've been living a dream and documenting it all along the way. But our journey doesn't end there.",
        mediaPlacement: "left",
        media: [
          "https://upload-community-files-new.s3.ap-south-1.amazonaws.com/uploads/colImage1.png",
          "https://upload-community-files-new.s3.ap-south-1.amazonaws.com/uploads/colImage2.png",
          "https://upload-community-files-new.s3.ap-south-1.amazonaws.com/uploads/colImage3.png",
          "https://upload-community-files-new.s3.ap-south-1.amazonaws.com/uploads/colImage4.png",
        ],
        bulletes: [
          "Through our blogs, Guides  and Workshops we hope to share practical tips and inspirations for your own adventures.",
          "Whether you are seasoned wanderer or just starting to dream we invite you to join our ever evolving adventure we call Life!",
        ],
        buttons: [{ label: "Know More", url: "/about" }],
      },

      order: 1,
      isActive: true,
    },
    {
      content: {
        heading: "Our Bestsellers",
        subHeading: "Hi there! We're Prachi and Harsh, adventure enthusias new",
      },
      sectionName: "ourBestSellers",

      order: 2,
      isActive: true,
    },
    {
      sectionName: "collaboration",
      content: {
        heading: "Our Clients",
        description:
          "Get in touch with the 250+ companies who Collaboration us",
        media: [
          "https://upload-community-files-new.s3.ap-south-1.amazonaws.com/uploads/assets_228d3b2c4554432dbdd1f0f27ee6ba7c_062e0f3cd667449793b24103817a0704.jpg",
          "https://upload-community-files-new.s3.ap-south-1.amazonaws.com/uploads/assets_228d3b2c4554432dbdd1f0f27ee6ba7c_062e0f3cd667449793b24103817a0704.png",
        ],
      },
      order: 3,
      isActive: true,
    },
    {
      sectionName: "testimoniesSection",
      content: {
        heading: "Success Stories",
        subHeading:
          "Real transformations from real people who've taken action on their growth journey.",
        testimonies: [
          {
            name: "Cora Stiedemann",
            designation: "Customer Integration ",
            rating: 5,
            avatar:
              "https://upload-community-files-new.s3.ap-south-1.amazonaws.com/uploads/slideImage2.jpg",
            message:
              "The courses on Learly are incredible. I learned digital marketing from scratch and landed a job in just three months. ",
          },
          {
            name: "Leland Kshlerin III",
            designation: "Chief Marketing Consultant",
            rating: 5,
            avatar:
              "https://upload-community-files-new.s3.ap-south-1.amazonaws.com/uploads/slideImage2.jpg",
            message:
              "Edupro’s UX/UI bootcamp gave me the tools and knowledge to feel confident diving into the world of UX.",
          },
          {
            name: "Dr. Erik Collins",
            designation: "Legacy Markets Agent",
            rating: 5,
            avatar:
              "https://upload-community-files-new.s3.ap-south-1.amazonaws.com/uploads/slideImage2.jpg",
            message:
              "The courses on Learly are incredible. I learned digital marketing from scratch and landed a job in just three months. The instructors are amazing, and the platform is so easy to use. Truly life-changing!",
          },
          {
            name: "Dr. Erik Collins",
            designation: "Legacy Markets Agent",
            rating: 5,
            avatar:
              "https://upload-community-files-new.s3.ap-south-1.amazonaws.com/uploads/slideImage2.jpg",
            message:
              "The courses on Learly are incredible. I learned digital marketing from scratch and landed a job in just three months. The instructors are amazing, and the platform is so easy to use. Truly life-changing!",
          },
          {
            name: "Dr. Erik Collins",
            designation: "Legacy Markets Agent",
            rating: 5,
            avatar:
              "https://upload-community-files-new.s3.ap-south-1.amazonaws.com/uploads/slideImage2.jpg",
            message:
              "The courses on Learly are incredible. I learned digital marketing from scratch and landed a job in just three months. The instructors are amazing, and the platform is so easy to use. Truly life-changing!",
          },
          {
            name: "Cora Stiedemann",
            designation: "Customer Integration ",
            rating: 5,
            avatar:
              "https://upload-community-files-new.s3.ap-south-1.amazonaws.com/uploads/slideImage2.jpg",
            message:
              "The courses on Learly are incredible. I learned digital marketing from scratch and landed a job in just three months. ",
          },
        ],
      },

      order: 4,
      isActive: true,
    },
    {
      sectionName: "ctaSection",
      content: {
        title: "Stay Inspired",
        description:
          "Get weekly insights, tips, and exclusive content delivered to your inbox. Join over 10,000 people on their growth journey.",
        buttons: [
          {
            label: "Explore All Activities",
            url: "https://prachiandharsh/courses",
          },
        ],
      },
      order: 5,
      isActive: true,
    },
  ],
  status: "published",
  __v: 2,
};

const CreatorRoot: React.FC = () => {
  const { home } = useCMS();

  // Loading means CMS hasn't provided anything yet.
  const isLoading = home === undefined;

  // Once loading finishes:
  // - if CMS gave us a page, use it
  // - if not, fall back to dummyData
  const source: CreatorHomePage | undefined = !isLoading
    ? (home as CreatorHomePage | undefined) ?? dummyData
    : undefined;

  const heroSection = source?.sections.find(
    (s: HomeSection): s is HeroSection => s.sectionName === "heroSection"
  );
  const creatorAboutus = source?.sections.find(
    (s: HomeSection): s is TwoColumnSection =>
      s.sectionName === "twoColumnSection"
  );
  const creatorBestsellers = source?.sections.find(
    (s: HomeSection): s is OurBestsellersSection =>
      s.sectionName === "ourBestSellers"
  );
  const creatorCollaboration = source?.sections.find(
    (s: HomeSection): s is CollaborationSection =>
      s.sectionName === "collaboration"
  );
  const creatorTestimonies = source?.sections.find(
    (s: HomeSection): s is TestimoniesSection =>
      s.sectionName === "testimoniesSection"
  );
  const creatorCTA = source?.sections.find(
    (s: HomeSection): s is CTASection => s.sectionName === "ctaSection"
  );

  const primaryColor = source?.color?.primary || "#fff";
  const secondaryColor = source?.color?.secondary || "#000";

  return (
    <>
      {heroSection ? (
        <CreatorHero
          data={heroSection}
          primaryColor={primaryColor}
          secondaryColor={secondaryColor}
        />
      ) : isLoading ? (
        <HeroSkeleton />
      ) : null}

      {creatorAboutus ? (
        <CreatorAboutus
          data={creatorAboutus}
          primaryColor={primaryColor}
          secondaryColor={secondaryColor}
        />
      ) : isLoading ? (
        <CreatorAboutusSkeleton />
      ) : null}

      {creatorBestsellers ? (
        <CreatorBestsellers
          data={creatorBestsellers}
          primaryColor={primaryColor}
          secondaryColor={secondaryColor}
        />
      ) : null}

      {creatorCollaboration ? (
        <CreatorCollaboration
          data={creatorCollaboration}
          primaryColor={primaryColor}
          secondaryColor={secondaryColor}
        />
      ) : null}

      {creatorTestimonies ? (
        <CreatorTestimonies
          data={creatorTestimonies}
          primaryColor={primaryColor}
          secondaryColor={secondaryColor}
        />
      ) : isLoading ? (
        <CreatorTestimoniesSkeleton count={9} />
      ) : null}

      {creatorCTA ? (
        <CreatorCTA
          data={creatorCTA}
          primaryColor={primaryColor}
          secondaryColor={secondaryColor}
        />
      ) : isLoading ? (
        <CreatorCTASkeleton />
      ) : null}
    </>
  );
};

export default CreatorRoot;
