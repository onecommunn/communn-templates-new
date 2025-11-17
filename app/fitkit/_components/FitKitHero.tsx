"use client";
import FitKitNextButtonIcon from "@/components/icons/FitKitNextButtonIcon";
import FitKitPreviousButtonIcon from "@/components/icons/FitKitPreviousButtonIcon";
import {
  ArrowLeft,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  MoveLeft,
  MoveRight,
} from "lucide-react";
import React, { useState } from "react";

type Slide = {
  bg: string; // background gym image
  athlete: string; // foreground cutout athlete image (PNG with transparency looks best)
  tagline?: string; // small red ribbon text
  line1: string; // YOUR FITNESS
  line2: string; // YOUR VICTORY
  description: string;
  ctaText?: string;
  statValue?: string; // e.g. "2k+"
  statLabel?: string; // e.g. "Satisfied Customer"
};

interface GymHeroProps {
  slides?: Slide[];
  className?: string;
}

const slides: Slide[] = [
  {
    bg: "/assets/fitkit-hero-bg-image02.png",
    athlete: "/assets/fitkit-hero-image-1.png",
    tagline: "KEEP YOUR BODY FITNESS WITH WORKOUTS",
    line1: "YOUR FITNESS",
    line2: "YOUR VICTORY",
    description:
      "Gym workouts are structured exercise sessions conducted in a fitness facility equipped with various exercise machines, free weights, and amenities.",
    ctaText: "VIEW CLASS SCHEDULE",
    statValue: "2k+",
    statLabel: "Satisfied Customer",
  },
   {
    bg: "/assets/fitkit-hero-bg-image02.png",
    athlete: "/assets/fitkit-hero-image-1.png",
    tagline: "KEEP YOUR BODY FITNESS WITH WORKOUTS",
    line1: "YOUR VICTORY",
    line2: "YOUR FITNESS",
    description:
      "Gym workouts are structured exercise sessions conducted in a fitness facility equipped with various exercise machines, free weights, and amenities.",
    ctaText: "VIEW CLASS SCHEDULE",
    statValue: "2k+",
    statLabel: "Satisfied Customer",
  },
];

const FitKitHero = () => {
  const [index, setIndex] = useState(0);
  const active = slides[index];

  const go = (dir: -1 | 1) => {
    setIndex((i) => {
      const next = i + dir;
      if (next < 0) return slides.length - 1;
      if (next > slides.length - 1) return 0;
      return next;
    });
  };
  return (
    <section className="relative w-full md:h-[85vh] overflow-hidden text-white hero-clip">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          key={"fitkit-hero-bg-image02.png"}
          src={active?.bg ||"/assets/fitkit-hero-bg-image02.png"}
          alt=""
          className="h-full w-full object-cover brightness-50"
        />
        {/* dark overlay */}
        <div className="absolute inset-0 bg-black/70" />
        {/* subtle vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(120%_90%_at_70%_40%,transparent_0,rgba(0,0,0,.65)_70%)]" />
      </div>
      <div className="relative container px-6 md:px-20 mx-auto py-20 md:py-0 z-10 font-kanit h-full">
        <div className="grid items-center gap-6 md:grid-cols-[1.05fr_.95fr] h-full">
          <div className="text-white md:ml-2">
            {/* tag line */}
            <div className="mb-6 flex items-center gap-3">
              <span className="h-[2px] w-16 bg-[#F41E1E] hidden md:flex" />
              <span className="font-semibold text-xl text-[#F41E1E] uppercase">
                {active.tagline}
              </span>
            </div>
            <h1 className="leading-[0.95] text-[42px] font-bold uppercase md:text-[70px]">
              <span className="block">{active.line1}</span>
              <span className="block text-white">{active.line2}</span>
            </h1>
            <p className="mt-6 max-w-3xl text-[15px] leading-7 text-white/85 md:text-[16px] font-archivo">
              {active.description}
            </p>
            <div className="mt-10 flex flex-col items-start gap-6 sm:flex-row sm:items-center">
              <button className="bg-red-600 px-8 py-4 text-sm font-bold font-archivo tracking-wide text-white shadow-[0_10px_30px_rgba(220,38,38,0.35)] transition hover:bg-red-500">
                {active.ctaText}
              </button>
              <div className="flex items-center gap-3 text-white">
                <span className="text-5xl font-medium text-red-500">{active.statValue}</span>
                <span className="text-[15px] md:text-2xl font-medium">
                  {active.statLabel}
                </span>
              </div>
            </div>
          </div>
          {/* RIGHT – HERO IMAGE */}
          <div className="md:flex justify-end hidden">
            <img
              src={"/assets/fitkit-hero-image-1.png"}
              alt="Fitness athlete"
              className=""
            />
          </div>
          <div className="flex md:hidden items-center justify-center gap-6">
            <button aria-label="mob-Previous" onClick={() => go(-1)}>
              <FitKitPreviousButtonIcon
                style={{ width: "66px", height: "66px" }}
              />
            </button>
            <button aria-label="mob-Next" onClick={() => go(1)}>
              <FitKitNextButtonIcon style={{ width: "66px", height: "66px" }} />
            </button>
          </div>
        </div>
      </div>
      <div className="absolute inset-0 z-50">
        <img
          key={active.athlete || "fitkit-hero-bg-image02.png"}
          src={"/assets/fitkit-hero-bg-image.png"}
          alt=""
          className="h-full w-full object-cover brightness-90"
        />
      </div>

      {/* Arrows */}
      <div className="pointer-events-none absolute hidden md:flex inset-0 z-[60]">
        <button
          aria-label="Previous"
          onClick={() => go(-1)}
          className="pointer-events-auto cursor-pointer absolute left-4 top-1/2 border -translate-y-1/2 grid size-14 place-items-center rounded-full"
        >
          <MoveLeft style={{ width: "56px", height: "56px" }} strokeWidth={1} className="absolute -right-3"/>
        </button>
        <button
          aria-label="Next"
          onClick={() => go(1)}
          className="pointer-events-auto cursor-pointer absolute right-4 top-1/2 border -translate-y-1/2 grid size-14 place-items-center rounded-full"
        >
          <MoveRight style={{ width: "56px", height: "56px" }} strokeWidth={1} className="absolute -left-3"/>
        </button>
      </div>
    </section>
  );
};

export default FitKitHero;
