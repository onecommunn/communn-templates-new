"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCheck } from "lucide-react";
import CreatorSectionHeader from "@/components/CustomComponents/Creator/CreatorSectionHeader";
import { getCommunityData } from "@/services/communityService";
import { fetchAboutCreator } from "@/services/creatorService";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export interface AboutResponse {
  _id: string;
  templateId: string;
  communityId: string;
  pageName: string;
  sections: Section[];
  status: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface Section {
  _id: string;
  sectionName: string;
  heading: string;
  subHeading: string;
  title: string;
  description: string;
  story: string;
  order: number;
  isActive: boolean;
  media: string[];
  bulletes: string[];
  filters: string[];
  cards: Card[];
  mission: string;
  vision: string;
  buttons: Button[];
  testimonies: Testimony[];
  timeline: TimelineEvent[];
  members: Member[];
}

export interface Card {
  _id?: string;
  title?: string;
  description?: string;
  image?: string;
  link?: string;
}

export interface Button {
  _id?: string;
  label?: string;
  url?: string;
  variant?: string;
}

export interface Testimony {
  _id?: string;
  author?: string;
  message?: string;
  designation?: string;
  avatar?: string;
}

export interface TimelineEvent {
  _id?: string;
  date?: string;
  title?: string;
  description?: string;
}

export interface Member {
  _id?: string;
  name?: string;
  role?: string;
  avatar?: string;
  bio?: string;
}

const CreatorAboutusHero = () => {
  const [communityId, setCommunityId] = useState<string>("");

  const [data, setData] = useState<AboutResponse>();

  const [sectionOne, setSectionOne] = useState<Section>();

  console.log(sectionOne, "data");

  const getCommunityId = async () => {
    try {
      const communityData: any = await getCommunityData(
        window.location.hostname
      );
      setCommunityId(communityData?.community?._id || "");
      return communityData?.community._id || "";
    } catch (error) {
      console.error("Error fetching community ID:", error);
      return "";
    }
  };

  const fetchAbout = async () => {
    try {
      console.log(communityId, "tello");
      const response = await fetchAboutCreator(communityId || "");
      console.log("Fetched:", response);
      setData(response?.data);
      setSectionOne(response?.data?.sections[0]);
      return response.data;
    } catch (error) {
      console.error("Error fetching community ID:", error);
      return null;
    }
  };

  useEffect(() => {
    const fetchCommunityId = async () => {
      const id = await getCommunityId();
      setCommunityId(id);
    };
    fetchCommunityId();
  }, []);

  useEffect(() => {
    if (communityId) {
      fetchAbout();
    }
  }, [communityId]);

  return (
    <section className="py-10 font-inter">
      <div className="container mx-auto px-4 sm:px-6 lg:px-20">
        <CreatorSectionHeader
          title={sectionOne?.heading || "About us"}
          description={
            sectionOne?.subHeading ||
            `Ready to start your transformation journey? 
   Have questions about my programs? 
   I'd love to hear from you and help you take the next step.`
          }
        />
        <div className="grid md:grid-cols-2 grid-cols-1 gap-6 md:gap-10 lg:gap-28">
          {/* left  */}
          <div className="flex flex-col justify-center gap-6 order-2 md:order-1">
            <h1 className="text-[#0C0407] font-semibold min-w-fit font-poppins text-2xl md:text-4xl lg:text-5xl/[53px] md:tracking-[-1.44px] text-left">
              {sectionOne?.title}
            </h1>
            <p className="text-[#0C0407] align-middle text-[16px]/[24px] font-inter">
              {sectionOne?.description}
            </p>

            <Tabs defaultValue="story" className="w-full mt-6">
              <TabsList>
                <TabsTrigger
                  className="data-[state=active]:bg-black data-[state=active]:text-white"
                  value="story"
                >
                  Our Story
                </TabsTrigger>
                <TabsTrigger
                  className="data-[state=active]:bg-black data-[state=active]:text-white"
                  value="mission"
                >
                  Mission
                </TabsTrigger>
                <TabsTrigger
                  className="data-[state=active]:bg-black data-[state=active]:text-white"
                  value="vision"
                >
                  Vision
                </TabsTrigger>
              </TabsList>

              <TabsContent value="story" className="mt-4">
                <p className="text-[#0C0407] align-middle text-[16px]/[24px]">
                  {sectionOne?.story}
                </p>
              </TabsContent>

              <TabsContent value="mission" className="mt-4">
                <p className="text-[#0C0407] align-middle text-[16px]/[24px]">
                  {sectionOne?.mission}
                </p>
              </TabsContent>

              <TabsContent value="vision" className="mt-4">
                <p className="text-[#0C0407] align-middle text-[16px]/[24px]">
                  {sectionOne?.vision}
                </p>
              </TabsContent>
            </Tabs>

            <Button className="rounded-[12px] text-sm pr-[20px] pl-[20px] w-fit">
              Know More{" "}
              <span>
                <ArrowRight />
              </span>
            </Button>
          </div>
          {/* right */}
          <div className="flex flex-col justify-center order-1 md:order-2">
            <div className="grid grid-cols-2 gap-4 max-w-2xl mx-auto">
              {/* Left column */}
              {sectionOne?.media && sectionOne.media.length > 0 ? (
                <div className="flex flex-col gap-4">
                  {sectionOne?.media?.map((src: string, idx: number) => (
                    <div key={idx} className="rounded-2xl overflow-hidden">
                      <img
                        src={src}
                        alt={`media-${idx}`}
                        className="w-full object-cover aspect-square"
                      />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col gap-4">
                  <div className="rounded-2xl overflow-hidden">
                    <img
                      src="/assets/colImage1.png"
                      alt=""
                      className="w-full object-cover aspect-square"
                    />
                  </div>

                  <div className="rounded-2xl overflow-hidden">
                    <img
                      src="/assets/colImage2.png"
                      alt=""
                      className="w-full object-cover aspect-square"
                    />
                  </div>
                </div>
              )}

              {/* Right column */}
              <div className="flex flex-col gap-4">
                {/* Top-right (portrait) */}
                <div className="rounded-2xl overflow-hidden">
                  <img
                    src="/assets/colImage3.png"
                    alt=""
                    className="w-full object-cover aspect-[3/4]"
                  />
                </div>
                {/* Bottom-right (landscape) */}
                <div className="rounded-2xl overflow-hidden">
                  <img
                    src="/assets/colImage4.png"
                    alt=""
                    className="w-full object-cover aspect-[4/2.68]"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CreatorAboutusHero;
