"use client";

import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import React, { useEffect, useState } from "react";
import Autoplay from "embla-carousel-autoplay";
import type { EmblaCarouselType, EmblaOptionsType } from "embla-carousel";
import Image from "next/image";
import { ServiceSection } from "@/models/templates/fitkit/fitkit-home-model";

const OPTIONS: EmblaOptionsType = { loop: true, align: "start" };

// const data = [
//   {
//     image: "/assets/fitkit-services-image1.png",
//     name: "Service Name",
//     description:
//       "Many gyms offer tools and resources to track progress, such as fitness apps, workout logs, or integrated gym software.",
//   },
//   {
//     image: "/assets/fitkit-services-image2.png",
//     name: "Fitness Practice",
//     description:
//       "Gyms are adaptable to various fitness levels and preferences, catering to beginners and advanced individuals alike.",
//   },
//   {
//     image: "/assets/fitkit-services-image3.png",
//     name: "Achievement",
//     description:
//       "Group fitness classes led by instructors offer structured workouts in a motivating group setting the development.",
//   },
// ];

const FitKitServices = ({
  data,
  secondaryColor,
  primaryColor,
}: {
  data: ServiceSection;
  secondaryColor: string;
  primaryColor: string;
}) => {
  const [api, setApi] = useState<CarouselApi>();
  const content = data?.content;
  return (
    <section
      className="font-archivo w-full overflow-hidden relative"
      id="services"
      style={
        {
          "--pri": primaryColor,
          "--sec": secondaryColor,
        } as React.CSSProperties
      }
    >
      <div className="mx-auto container px-6 md:px-20 py-10 md:py-20">
        {/* Titles */}
        <div className="flex flex-col items-center w-full">
          <div className="mb-6 flex items-center gap-3">
            <span className="h-[2px] w-16 bg-[var(--sec)] hidden md:flex" />
            <span className="font-semibold text-xl text-[var(--sec)] font-kanit uppercase">
              OUR SERVICES
            </span>
            <span className="h-[2px] w-16 bg-[var(--sec)] hidden md:flex" />
          </div>

          <h4 className="font-kanit font-semibold text-3xl md:text-5xl capitalize  text-center">
            Easy Step to Achieve Your Goals.
          </h4>
        </div>

        {/* Carousel */}
        <div className="relative mt-10">
          <Carousel
            setApi={setApi}
            opts={OPTIONS}
            plugins={[Autoplay({ delay: 3500, stopOnInteraction: false })]}
            className="w-full gap-10"
          >
            <CarouselContent>
              {content?.features?.map((item, idx) => (
                <CarouselItem key={idx} className="basis-full md:basis-1/3">
                  <article className="flex flex-col items-center gap-4">
                    {/* Photo */}
                    <div className="mx-auto mb-4 md:w-[300px]">
                      <div className="relative rounded-xl p-2">
                        <div
                          className="overflow-hidden rounded-full"
                          style={{
                            WebkitBoxShadow: "0px 12px 0px 12px #D8DDE1",
                            boxShadow: "0px 12px 0px 12px #D8DDE1",
                          }}
                        >
                          <Image
                            src={
                              item.image || "/assets/fitkit-services-image1.png"
                            }
                            alt={`${item.title} photo`}
                            width={320}
                            height={320}
                            unoptimized
                            className="aspect-square w-full rounded-full object-cover"
                          />
                        </div>
                      </div>
                    </div>

                    <h3 className="font-kanit text-3xl font-medium">
                      {item?.title}
                    </h3>

                    <p className="text-center text-[#6A6A6A] text-[16px] px-10">
                      {item?.description}
                    </p>
                  </article>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>

          <Dots api={api} primaryColor="#F41E1E" />
        </div>
      </div>
    </section>
  );
};

/* --- Dots Component --- */
function Dots({
  api,
  className = "",
  primaryColor,
}: {
  api: EmblaCarouselType | undefined;
  className?: string;
  primaryColor: string;
}) {
  const [count, setCount] = useState(0);
  const [selected, setSelected] = useState(0);

  useEffect(() => {
    if (!api) return;

    const onSelect = () => setSelected(api.selectedScrollSnap());
    const onReInit = () => {
      setCount(api.scrollSnapList().length);
      setSelected(api.selectedScrollSnap());
    };

    setCount(api.scrollSnapList().length);
    setSelected(api.selectedScrollSnap());

    api.on("select", onSelect);
    api.on("reInit", onReInit);

    return () => {
      api.off("select", onSelect);
      api.off("reInit", onReInit);
    };
  }, [api]);

  if (!api || count <= 1) return null;

  return (
    <div
      role="tablist"
      aria-label="Carousel indicators"
      className={`mt-6 flex items-center justify-center gap-2 ${className}`}
    >
      {Array.from({ length: count }).map((_, i) => {
        const isActive = i === selected;
        return (
          <button
            key={i}
            role="tab"
            aria-selected={isActive}
            aria-label={`Go to slide ${i + 1}`}
            aria-current={isActive ? "true" : undefined}
            onClick={() => api.scrollTo(i)}
            style={{ ["--pri" as any]: primaryColor }}
            className={[
              "h-2.5 w-2.5 rounded-full transition-all outline-none focus:ring-2 focus:ring-[var(--pri)]/40",
              isActive
                ? "w-6 shadow-[0_0_0_4px_rgba(0,0,0,0.15)] bg-[var(--pri)]"
                : "bg-[var(--pri)]/40 hover:bg-[var(--pri)]/60 cursor-pointer",
            ].join(" ")}
          />
        );
      })}
    </div>
  );
}

export default FitKitServices;
