"use client";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import React, { useEffect, useState } from "react";
import type { EmblaCarouselType, EmblaOptionsType } from "embla-carousel";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";

const list = [
  {
    image: "/assets/fitkit-team-image-1.png",
    name: "Henry Joseph",
    role: "Gym Trainer",
  },
  {
    image: "/assets/fitkit-team-image-2.png",
    name: "Esa Elizabed",
    role: "Fitness Trainer",
  },
  {
    image: "/assets/fitkit-team-image-3.png",
    name: "Henry Carlose",
    role: "Gym Trainer",
  },
  {
    image: "/assets/fitkit-team-image-4.png",
    name: "Jhon Williams",
    role: "Fitness Trainer",
  },
];

const OPTIONS: EmblaOptionsType = { loop: true, align: "start" };

const FitkitTrainer = () => {
  const [api, setApi] = useState<CarouselApi>();

  return (
    <section className="font-archivo w-full md:h-screen overflow-hidden relative bg-center bg-cover">
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <img
          key={"fitkit-hero-bg-image02.png"}
          src={"/assets/fitkit-trainer-bg-image.png"}
          alt=""
          className="h-full w-full object-cover"
        />
        {/* dark overlay */}
        <div className="absolute inset-0 bg-[#F8F8F8]/90" />
        {/* subtle vignette */}
        {/* <div className="absolute inset-0 bg-[radial-gradient(120%_90%_at_70%_40%,transparent_0,rgba(0,0,0,.65)_70%)]" /> */}
      </div>
      <div className="relative container px-6 md:px-20 mx-auto py-10 md:py-20 z-10 h-full">
        {/* Titles */}
        <div className="flex flex-col items-center w-full">
          <div className="mb-6 flex items-center gap-3">
            <span className="h-[2px] w-16 bg-[#F41E1E] hidden md:flex" />
            <span className="font-semibold text-xl text-[#F41E1E] font-kanit uppercase">
              Our Trainer
            </span>
            <span className="h-[2px] w-16 bg-[#F41E1E] hidden md:flex" />
          </div>

          <h4 className="font-kanit font-semibold text-3xl md:text-5xl capitalize  text-center">
            Meet Our Skilled Trainer
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
              {list.map((item, idx) => (
                <CarouselItem key={idx} className="basis-full md:basis-1/4">
                  <article className="flex flex-col items-center gap-4">
                    {/* Photo */}
                    <div className="mx-auto mb-4 md:w-[300px]">
                      <div className="relative rounded-full p-2 border border-gray-300 ">
                        <div className="overflow-hidden rounded-full bg-[#141414]">
                          <Image
                            src={item.image}
                            alt={`${item.name} photo`}
                            width={320}
                            height={320}
                            unoptimized
                            className="aspect-square w-full rounded-full object-cover"
                          />
                        </div>
                      </div>
                    </div>
                    <h3 className="font-kanit text-3xl font-medium">
                      {item.name}
                    </h3>

                    <p className="text-center text-[#F41E1E] text-[16px] px-10">
                      {item.role}
                    </p>
                  </article>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden cursor-pointer border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 md:flex" />
            <CarouselNext className="hidden cursor-pointer border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 md:flex" />
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
      className={`mt-6 z-10 relative flex items-center justify-center gap-2 ${className}`}
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

export default FitkitTrainer;
