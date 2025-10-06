"use client";

import React, { useId, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCheck } from "lucide-react";
import CreatorSectionHeader from "@/components/CustomComponents/Creator/CreatorSectionHeader";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { TwoColumnSection } from "@/models/templates/creator/creator-about.model";

type Props = {
  data: TwoColumnSection;
  secondaryColor: string;
  primaryColor: string;
};

const FALLBACK_MEDIA = [
  "/assets/colImage1.png",
  "/assets/colImage2.png",
  "/assets/colImage3.png",
  "/assets/colImage4.png",
];

const CreatorAboutusHero: React.FC<Props> = ({
  data,
  secondaryColor,
  primaryColor,
}) => {
  const uid = useId();
  const isMediaLeft = (data.mediaPlacement ?? "left") === "left";
  const [activeTab, setActiveTab] = useState("story");

  // Media (ensure 4 items with graceful fallback)
  const media = (data.media?.length ? data.media : FALLBACK_MEDIA).slice(0, 4);
  const [m1, m2, m3, m4] = [
    media[0] ?? FALLBACK_MEDIA[0],
    media[1] ?? FALLBACK_MEDIA[1],
    media[2] ?? FALLBACK_MEDIA[2],
    media[3] ?? FALLBACK_MEDIA[3],
  ];

  const bullets = data.bulletes ?? [];

  return (
    <section
      className="py-10 font-inter"
      style={{ backgroundColor: primaryColor }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-20">
        <CreatorSectionHeader
          textColor={secondaryColor}
          title={data?.heading || "About us"}
          description={
            data?.subHeading ||
            `Ready to start your transformation journey? Have questions about my programs? I'd love to hear from you and help you take the next step.`
          }
        />

        <div className="grid md:grid-cols-2 grid-cols-1 gap-6 md:gap-10 lg:gap-28">
          {/* Text column */}
          <div
            className={`flex flex-col justify-center gap-6 ${
              isMediaLeft ? "order-2 md:order-1" : "order-2"
            }`}
          >
            {data.title && (
              <h1
                style={{ color: secondaryColor }}
                className="text-[#0C0407] font-semibold min-w-fit font-poppins text-2xl md:text-4xl lg:text-5xl/[53px] md:tracking-[-1.44px] text-left"
              >
                {data.title}
              </h1>
            )}

            {data.description && (
              <p
                style={{ color: secondaryColor }}
                className="text-[#0C0407] align-middle text-[16px]/[24px]"
              >
                {data.description}
              </p>
            )}

            {/* Bullets (optional) */}
            {bullets.length > 0 && (
              <div className="flex flex-col gap-2">
                {bullets.map((line, i) => (
                  <div
                    key={i}
                    className="flex flex-row items-start gap-2"
                    style={{ color: secondaryColor }}
                  >
                    <CheckCheck strokeWidth={2.6} size={22} />
                    <p className="font-bold text-[16px]/[20px]">{line}</p>
                  </div>
                ))}
              </div>
            )}

            {/* Tabs for story / mission / vision */}
            {(data.story || data.mission || data.vision) && (
              <Tabs
                defaultValue={
                  data.story ? "story" : data.mission ? "mission" : "vision"
                }
                className="w-full mt-2"
                value={activeTab}
                onValueChange={setActiveTab}
              >
                <TabsList style={{ backgroundColor: primaryColor }}>
                  {data.story && (
                    <TabsTrigger
                      className="data-[state=active]:bg-black data-[state=active]:text-white cursor-pointer"
                      value="story"
                      id={`${uid}-story`}
                      aria-controls={`${uid}-story`}
                      style={{
                        backgroundColor:
                          activeTab === "story" ? secondaryColor : primaryColor,
                        color:
                          activeTab === "story" ? primaryColor : secondaryColor,
                        border: `1px solid ${
                          activeTab === "story" ? primaryColor : "transparent"
                        }`,
                      }}
                    >
                      Our Story
                    </TabsTrigger>
                  )}
                  {data.mission && (
                    <TabsTrigger
                      className="data-[state=active]:bg-black data-[state=active]:text-white cursor-pointer"
                      value="mission"
                      id={`${uid}-mission`}
                      aria-controls={`${uid}-mission`}
                      style={{
                        backgroundColor:
                          activeTab === "mission"
                            ? secondaryColor
                            : primaryColor,
                        color:
                          activeTab === "mission"
                            ? primaryColor
                            : secondaryColor,
                        border: `1px solid ${
                          activeTab === "mission" ? primaryColor : "transparent"
                        }`,
                      }}
                    >
                      Mission
                    </TabsTrigger>
                  )}
                  {data.vision && (
                    <TabsTrigger
                      className="data-[state=active]:bg-black data-[state=active]:text-white cursor-pointer"
                      value="vision"
                      id={`${uid}-vision`}
                      aria-controls={`${uid}-vision`}
                      style={{
                        backgroundColor:
                          activeTab === "vision"
                            ? secondaryColor
                            : primaryColor,
                        color:
                          activeTab === "vision"
                            ? primaryColor
                            : secondaryColor,
                        border: `1px solid ${
                          activeTab === "vision" ? primaryColor : "transparent"
                        }`,
                      }}
                    >
                      Vision
                    </TabsTrigger>
                  )}
                </TabsList>

                {data.story && (
                  <TabsContent value="story" className="mt-4">
                    <p style={{color:secondaryColor}} className="text-[#0C0407] align-middle text-[16px]/[24px] whitespace-pre-line ">
                      {data.story}
                    </p>
                  </TabsContent>
                )}
                {data.mission && (
                  <TabsContent  value="mission" className="mt-4">
                    <p style={{color:secondaryColor}} className="text-[#0C0407] align-middle text-[16px]/[24px] whitespace-pre-line">
                      {data.mission}
                    </p>
                  </TabsContent>
                )}
                {data.vision && (
                  <TabsContent  value="vision" className="mt-4">
                    <p style={{color:secondaryColor}} className="text-[#0C0407] align-middle text-[16px]/[24px] whitespace-pre-line">
                      {data.vision}
                    </p>
                  </TabsContent>
                )}
              </Tabs>
            )}
          </div>

          {/* Media column */}
          <div
            className={`flex flex-col justify-center ${
              isMediaLeft ? "order-1 md:order-2" : "order-1"
            }`}
          >
            <div className="grid grid-cols-2 gap-4 max-w-2xl mx-auto">
              {/* Left column */}
              <div className="flex flex-col gap-4">
                <div className="rounded-2xl overflow-hidden">
                  <img
                    src={m1}
                    alt="About image 1"
                    className="w-full object-cover aspect-square"
                    // loading="lazy"
                  />
                </div>
                <div className="rounded-2xl overflow-hidden">
                  <img
                    src={m2}
                    alt="About image 2"
                    className="w-full object-cover aspect-square"
                    // loading="lazy"
                  />
                </div>
              </div>

              {/* Right column */}
              <div className="flex flex-col gap-4">
                <div className="rounded-2xl overflow-hidden">
                  <img
                    src={m3}
                    alt="About image 3"
                    className="w-full object-cover aspect-[3/4]"
                    // loading="lazy"
                  />
                </div>
                <div className="rounded-2xl overflow-hidden">
                  <img
                    src={m4}
                    alt="About image 4"
                    className="w-full object-cover aspect-[4/2.68]"
                    // loading="lazy"
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
