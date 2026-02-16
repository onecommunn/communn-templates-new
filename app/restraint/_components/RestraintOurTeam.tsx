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
  const team: TeamMember[] = content?.team;
  return (
    <section
      className="bg-[var(--sec)]/10 py-20 px-6 md:px-12 lg:px-24"
      style={
        {
          "--pri": primaryColor,
          "--sec": secondaryColor,
        } as React.CSSProperties
      }
    >
      <div className="mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-6 gap-6">
          <div className="w-full">
            <span className="text-[var(--pri)] font-medium tracking-widest uppercase text-sm mb-4 block">
              {content?.title}
            </span>
            <h2 className="text-3xl md:text-5xl font-marcellus text-[#1a1a1a] leading-tight">
              {content?.heading}
            </h2>
          </div>
        </div>

        {/* Team Grid */}
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
          <CarouselContent className="-ml-4">
            {team.map((member, index) => (
              <CarouselItem
                key={index}
                className="pl-4 md:basis-1/2 lg:basis-1/3"
              >
                {/* Image Container */}
                <div className="relative aspect-[4/5] overflow-hidden rounded-4xl mb-6 border-2 border-[var(--sec)]">
                  <Image
                    src={member.imageUrl}
                    alt={member.name}
                    fill
                    className="object-contain"
                  />
                </div>

                {/* Text Content */}
                <div className="text-center md:text-left">
                  <h3 className="text-2xl font-marcellus text-[#1a1a1a]">
                    {member.name}
                  </h3>
                  <p className="text-[var(--sec)] font-medium text-sm mb-1">
                    {member.role}
                  </p>
                  <p className="text-gray-600 leading-relaxed text-sm pr-2">
                    {member.description}
                  </p>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden cursor-pointer border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 md:flex" />
          <CarouselNext className="hidden cursor-pointer border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 md:flex" />
        </Carousel>
      </div>
    </section>
  );
};

export default RestraintOurTeam;
