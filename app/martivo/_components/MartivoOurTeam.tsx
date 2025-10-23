"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Autoplay from "embla-carousel-autoplay";
import type { EmblaOptionsType } from "embla-carousel";
import {
  Carousel,
  type CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { WavyStroke } from "./Icons/WavyStroke";

const data = [
  {
    image: "/assets/Martivo-team-image-1.jpg",
    name: "Sara Lee",
    role: "SR. MARTIAL ARTS",
  },
  {
    image: "/assets/Martivo-team-image-2.jpg",
    name: "Savanna Hahn",
    role: "STRENGTH TRAINERS",
  },
  {
    image: "/assets/Martivo-team-image-3.jpg",
    name: "Mike Johnson",
    role: "SELF DEFENSE EXPERT",
  },
  {
    image: "/assets/Martivo-team-image-4.jpg",
    name: "Leilani Smitham",
    role: "PUNCHING EXPERTS",
  },
];

const OPTIONS: EmblaOptionsType = { loop: true, align: "start" };

const MartivoOurTeam = () => {
  const [api, setApi] = useState<CarouselApi>();
  const [snapCount, setSnapCount] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    if (!api) return;

    const onSelect = () => setSelectedIndex(api.selectedScrollSnap());
    setSnapCount(api.scrollSnapList().length);
    onSelect();

    api.on("reInit", () => {
      setSnapCount(api.scrollSnapList().length);
      onSelect();
    });
    api.on("select", onSelect);
  }, [api]);

  return (
    <section className="relative py-16 md:py-24 font-plus-jakarta">
      <div className="container mx-auto px-4 sm:px-6 lg:px-20">
        {/* Header */}
        <div className="mx-auto mb-10 max-w-2xl text-center md:mb-14">
          <p className="mb-2 text-[13px] font-semibold tracking-[0.22em] text-[#F67C00] uppercase">
            Our Team
          </p>
          <h2 className="text-2xl font-semibold text-slate-900 md:text-4xl">
            Learn from expert martial <br className="hidden md:block" />
            arts masters
          </h2>
          <div className="mx-auto mt-3 flex items-center justify-center">
            <WavyStroke color="#F67C00" size={120} />
          </div>
        </div>

        {/* Carousel */}
        <div className="relative">
          <Carousel
            setApi={setApi}
            opts={OPTIONS}
            plugins={[Autoplay({ delay: 3500, stopOnInteraction: false })]}
            className="w-full"
          >
            <CarouselContent>
              {data.map((each, idx) => (
                <CarouselItem
                  key={idx}
                 className="basis-full md:basis-1/4"
                >
                  <article
                    className="
                      h-full rounded-2xl border border-[#E6E8EE] bg-white p-6 text-center
                      shadow-[0_1px_0_rgba(16,24,40,0.04)]
                      transition-shadow duration-200 hover:shadow-[0_6px_20px_rgba(16,24,40,0.06)]
                    "
                  >
                    {/* Photo */}
                    <div className="mx-auto mb-4 max-w-[300px] md:w-[200px]">
                      <div className="relative rounded-xl p-2">
                        <div className="overflow-hidden rounded-full">
                          <Image
                            src={each.image}
                            alt={`${each.name} photo`}
                            width={320}
                            height={320}
                            className="aspect-square w-full rounded-full object-cover"
                            unoptimized
                          />
                        </div>
                      </div>
                    </div>

                    {/* Name + Role */}
                    <h3 className="text-[15px] font-semibold text-slate-900">
                      {each.name}
                    </h3>
                    <p className="mt-1 text-[12px] font-semibold uppercase tracking-wide text-[#F67C00]">
                      {each.role}
                    </p>
                  </article>
                </CarouselItem>
              ))}
            </CarouselContent>

            {/* Arrows (desktop) */}
            <CarouselPrevious className="cursor-pointer hidden md:flex -top-12 right-12 left-auto translate-y-0 border border-slate-200 bg-white text-slate-700 hover:bg-slate-50" />
            <CarouselNext className="cursor-pointer hidden md:flex -top-12 right-0 translate-y-0 border border-slate-200 bg-white text-slate-700 hover:bg-slate-50" />
          </Carousel>

          {/* Dots */}
          <div className="mt-5 flex items-center justify-center gap-2">
            {Array.from({ length: snapCount }).map((_, i) => {
              const active = i === selectedIndex;
              return (
                <button
                  key={i}
                  aria-label={`Go to slide ${i + 1}`}
                  onClick={() => api?.scrollTo(i)}
                  className={[
                    "h-2.5 w-2.5 rounded-full transition-all",
                    active ? "bg-[#F67C00]" : "bg-slate-200 hover:bg-slate-300",
                  ].join(" ")}
                />
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default MartivoOurTeam;
