"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { TeamSection } from "@/models/templates/restraint/restraint-home-model";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import React from "react";

interface TeamMember {
  name: string;
  role: string;
  description: string;
  imageUrl: string;
}

const RestraintOurTeam = ({
  primaryColor,
  secondaryColor,
  data,
}: {
  primaryColor: string;
  secondaryColor: string;
  data: TeamSection;
}) => {
  const content = data?.content;
  const team: TeamMember[] = content?.team || [];

  return (
    <section
      className="relative py-24 px-6 md:px-12 lg:px-24 bg-gradient-to-b from-white to-[var(--sec)]/5"
      style={
        {
          "--pri": primaryColor,
          "--sec": secondaryColor,
        } as React.CSSProperties
      }
    >
      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="mb-14 text-center md:text-left">
          <span className="text-[var(--pri)] font-semibold tracking-[0.2em] uppercase text-xs mb-4 block">
            {content?.title}
          </span>
          <h2 className="text-3xl md:text-5xl font-marcellus text-gray-900 leading-tight max-w-2xl">
            {content?.heading}
          </h2>
        </div>

        {/* Carousel */}
        <Carousel
          opts={{ align: "start", loop: false, dragFree: true }}
          className="relative"
          plugins={[
            Autoplay({
              delay: 3500,
              stopOnInteraction: true,
              stopOnMouseEnter: true,
            }),
          ]}
        >
          <CarouselContent className="-ml-6">
            {team.map((member, index) => (
              <CarouselItem
                key={index}
                className="pl-6 md:basis-1/2 lg:basis-1/3 xl:basis-1/4"
              >
                <div className="group bg-white rounded-3xl p-5 border border-gray-300 hover:border-[var(--sec)] transition-all duration-500 h-full flex flex-col">
                  {/* Image */}
                  <div className="relative aspect-[4/5] overflow-hidden rounded-2xl mb-6">
                    <Image
                      src={member.imageUrl}
                      alt={member.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  </div>

                  {/* Content */}
                  <div className="flex flex-col flex-grow text-center md:text-left">
                    <h3 className="text-xl font-marcellus text-gray-900">
                      {member.name}
                    </h3>

                    <p className="text-[var(--sec)] font-medium text-sm mt-1 mb-3 tracking-wide">
                      {member.role}
                    </p>

                    <p className="text-gray-600 text-sm leading-relaxed flex-grow">
                      {member.description}
                    </p>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>

          {/* Navigation Buttons */}
          <CarouselPrevious className="hidden md:flex  border border-gray-200 bg-white text-gray-700 hover:bg-gray-100 shadow-md" />
          <CarouselNext className="hidden md:flex  border border-gray-200 bg-white text-gray-700 hover:bg-gray-100 shadow-md" />
        </Carousel>
      </div>
    </section>
  );
};

export default RestraintOurTeam;
