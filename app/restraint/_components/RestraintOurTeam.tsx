"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { TeamSection } from "@/models/templates/restraint/restraint-home-model";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import React, { useState } from "react";

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

  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);

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
        {/* Header */}
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
                      unoptimized
                    />
                  </div>

                  {/* Content */}
                  <div className="flex flex-col flex-grow text-center">
                    <h3 className="text-xl font-marcellus text-gray-900">
                      {member.name}
                    </h3>

                    <p className="text-[var(--sec)] font-medium text-sm mt-1 mb-3 tracking-wide">
                      {member.role}
                    </p>

                    {/* Description (clamped to 3 lines) */}
                    <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
                      {member.description}
                    </p>

                    {/* Read More */}
                    {member.description.length > 120 && (
                      <button
                        onClick={() => setSelectedMember(member)}
                        className="mt-2 text-sm font-medium text-[var(--pri)] hover:underline cursor-pointer"
                      >
                        Read More
                      </button>
                    )}
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>

          <CarouselPrevious className="hidden md:flex border border-gray-200 bg-white text-gray-700 hover:bg-gray-100 shadow-md" />
          <CarouselNext className="hidden md:flex border border-gray-200 bg-white text-gray-700 hover:bg-gray-100 shadow-md" />
        </Carousel>
      </div>

      {/* Dialog */}
      <Dialog
        open={!!selectedMember}
        onOpenChange={() => setSelectedMember(null)}
      >
        <DialogContent className="max-w-lg">
          {selectedMember && (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl font-marcellus">
                  {selectedMember.name}
                </DialogTitle>
                <p className="text-sm text-[var(--sec)] font-medium">
                  {selectedMember.role}
                </p>
              </DialogHeader>

              <div className="mt-4">
                <p className="text-gray-700 leading-relaxed">
                  {selectedMember.description}
                </p>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default RestraintOurTeam;
