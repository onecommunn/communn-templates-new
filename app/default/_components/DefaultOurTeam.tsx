"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
import Autoplay from "embla-carousel-autoplay";
import { UserRound } from "lucide-react";

type DefaultOurTeamProps = {
  teams: any[];
};

const DefaultOurTeam = ({ teams }: DefaultOurTeamProps) => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);



  useEffect(() => {
    if (!api) return;
    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap());
    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  const plugin = React.useRef(
    Autoplay({ delay: 3000, stopOnInteraction: true, stopOnMouseEnter: true })
  );
  return (
    <section
      id="team"
      className="max-w-6xl mx-auto px-3 md:px-6 py-6 font-montserrat scroll-mt-[40px] md:scroll-mt-[90px]"
    >
      <h2 className="text-xl md:text-2xl font-bold mb-6 text-black">Our Team</h2>

      <Carousel
        plugins={[plugin.current]}
        setApi={setApi}
        opts={{ align: "start" }}
        className="w-full"
      >
        <CarouselContent className="-ml-6">
          {teams?.map((member) => (
            <CarouselItem
              key={member._id}
              className="pl-6 md:basis-1/2 lg:basis-1/3 pt-16"
            >
              <div className="relative bg-white rounded-[20px] p-8 pt-20 border border-gray-200 flex flex-col items-center text-center h-full">
                {/* Fixed Overlapping Profile Image */}
                <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-32 h-32 rounded-full shadow-lg overflow-hidden z-20">
                  {member?.image ? (
                    <Image
                      src={member.image}
                      alt={member.name ?? "Member avatar"}
                      fill
                      className="object-cover"
                      sizes="128px"
                    />
                  ) : (
                    <div className="flex items-center justify-center w-full h-full bg-gray-100">
                      <UserRound className="w-12 h-12 text-gray-400" />
                    </div>
                  )}
                </div>

                {/* Team Info Styling */}
                <h3 className="text-lg md:text-xl font-bold text-[#2E59A7] mb-2">
                  {member?.name}
                </h3>

                <div className="flex flex-col items-center gap-3 text-gray-400 font-medium mb-6">
                  <span>{member?.designation}</span>
                  <span className="text-[#2E59A7]">{member?.experience} Years of Experience</span>
                </div>

                <p className="text-gray-500 text-xs md:text-sm leading-relaxed line-clamp-5">
                  {member?.description}
                </p>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* Corrected Dynamic Pagination */}
        <div className="flex justify-center items-center gap-2 mt-12">
          {Array.from({ length: count })?.map((_, index) => (
            <button
              key={index}
              onClick={() => api?.scrollTo(index)}
              className={cn(
                "transition-all duration-300 rounded-full",
                current === index
                  ? "w-8 h-2 bg-[#2E59A7]" // Active: Blue elongated pill
                  : "w-2 h-2 bg-gray-200" // Inactive: Small gray circle
              )}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </Carousel>
    </section>
  );
};

export default DefaultOurTeam;
