"use client";
import FitKitNextButtonIcon from "@/components/icons/FitKitNextButtonIcon";
import FitKitPreviousButtonIcon from "@/components/icons/FitKitPreviousButtonIcon";
import { HeroSection } from "@/models/templates/fitkit/fitkit-home-model";
import { MoveLeft, MoveRight } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const AUTOPLAY_INTERVAL = 6000;

const FitKitHero = ({
  data,
  secondaryColor,
  primaryColor,
}: {
  data: HeroSection;
  secondaryColor: string;
  primaryColor: string;
}) => {
  const content = data?.content;
  const slides = content?.carouse;
  const [index, setIndex] = useState(0);
  const active = slides[index];

  if (!slides.length) return null;

  const go = (dir: -1 | 1) => {
    setIndex((i) => {
      const next = i + dir;
      if (next < 0) return slides.length - 1;
      if (next > slides.length - 1) return 0;
      return next;
    });
  };

  useEffect(() => {
    if (slides.length <= 1) return;

    const id = setInterval(() => {
      setIndex((i) => {
        const next = i + 1;
        if (next > slides.length - 1) return 0;
        return next;
      });
    }, AUTOPLAY_INTERVAL);

    return () => clearInterval(id);
  }, [slides.length]);

  return (
    <section
      className="relative w-full md:h-[85vh] overflow-hidden text-white hero-clip"
      style={
        {
          "--pri": primaryColor,
          "--sec": secondaryColor,
        } as React.CSSProperties
      }
    >
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          key={"fitkit-hero-bg-image02.png"}
          src={active?.bgMedia?.[0] || "/assets/fitkit-hero-bg-image02.png"}
          alt=""
          className="h-full w-full object-cover brightness-50"
        />
        {/* dark overlay */}
        <div className="absolute inset-0 bg-[var(--pri)]/70" />
        {/* subtle vignette */}
        {/* <div className="absolute inset-0 bg-[radial-gradient(120%_90%_at_70%_40%,transparent_0,rgba(0,0,0,.65)_70%)]" /> */}
      </div>
      <div className="relative container px-6 md:px-20 mx-auto py-20 md:py-0 z-10 font-kanit h-full">
        <div className="grid items-center gap-6 md:grid-cols-[1.05fr_.95fr] h-full">
          <div className="text-white md:ml-2">
            {/* tag line */}
            <div className="mb-6 flex items-center gap-3">
              <span className="h-[2px] w-16 bg-[var(--sec)] hidden md:flex" />
              <span className="font-semibold text-xl text-[var(--sec)] uppercase">
                {active?.tagline}
              </span>
            </div>
            <h1 className="leading-[0.95] text-[42px] font-bold uppercase md:text-[70px]">
              <span className="block">{active?.line1}</span>
              <span className="block text-white">{active?.line2}</span>
            </h1>
            <p className="mt-6 max-w-3xl text-[15px] leading-7 text-white/85 md:text-[16px] font-archivo">
              {active?.description}
            </p>
            <div className="mt-10 flex flex-col items-start gap-6 sm:flex-row sm:items-center">
              <Link href={active?.buttons?.[0]?.url || "/"}>
                <button className="bg-[var(--sec)] px-8 py-4 text-sm font-bold font-archivo tracking-wide text-white shadow-[0_10px_30px_rgba(220,38,38,0.35)] transition hover:bg-red-500">
                  {active?.buttons?.[0]?.label}
                </button>
              </Link>

              <div className="flex items-center gap-3 text-white">
                <span className="text-5xl font-medium text-[var(--sec)]">
                  {active.statValue}
                </span>
                <span className="text-[15px] md:text-2xl font-medium">
                  {active.statLabel}
                </span>
              </div>
            </div>
          </div>
          {/* RIGHT – HERO IMAGE */}
          <div className="md:flex justify-end hidden">
            <img
              src={active?.media?.[0] || "/assets/fitkit-hero-image-1.png"}
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
      <div className="absolute inset-0 z-50 pointer-events-none">
        <img
          key={"fitkit-hero-bg-image.png"}
          src={"/assets/fitkit-hero-bg-image.png"}
          alt="fitkit-hero-bg-image"
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
          <MoveLeft
            style={{ width: "56px", height: "56px" }}
            strokeWidth={1}
            className="absolute -right-3"
          />
        </button>
        <button
          aria-label="Next"
          onClick={() => go(1)}
          className="pointer-events-auto cursor-pointer absolute right-4 top-1/2 border -translate-y-1/2 grid size-14 place-items-center rounded-full"
        >
          <MoveRight
            style={{ width: "56px", height: "56px" }}
            strokeWidth={1}
            className="absolute -left-3"
          />
        </button>
      </div>
    </section>
  );
};

export default FitKitHero;
