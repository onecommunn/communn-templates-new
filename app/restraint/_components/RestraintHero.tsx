"use client";

import AnimatedContent from "@/components/CustomComponents/AnimatedContent";
import { Button } from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import React from "react";

const hexToRgba = (hex: string, alpha = 1) => {
  const h = hex.replace("#", "");
  const bigint = parseInt(
    h.length === 3
      ? h
          .split("")
          .map((c) => c + c)
          .join("")
      : h,
    16
  );
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

const RestraintHero = ({
  primaryColor,
  secondaryColor,
}: {
  primaryColor: string;
  secondaryColor: string;
}) => {
  return (
    <section
      className="relative flex items-center justify-center min-h-screen bg-cover bg-right md:bg-center bg-no-repeat font-sora"
      style={
        {
          backgroundImage: `url(${"/assets/restraint-hero-bg-image.png"})`,
          ["--pri" as any]: primaryColor,
          ["--sec" as any]: secondaryColor,
        } as React.CSSProperties
      }
    >
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(
            270deg,
            ${hexToRgba(primaryColor, 0)} 0%,
            ${hexToRgba(primaryColor, 0.9)} 82.7%
          )`,
        }}
      />

      <div className="relative z-10 container mx-auto px-6 md:px-20 text-white">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr]">
          {/* 👇 Animated block */}
          <AnimatedContent
            direction="vertical"
            distance={70}
            duration={0.85}
            stagger={0.08} // 👈 this will nicely reveal each element
            animateOpacity
          >
            <div>
              <p className="uppercase text-sm mb-4 font-normal tracking-[4.2px]">
                WELCOME RESTRAINT
              </p>
              <h2 className="md:text-6xl/[72px] text-4xl font-marcellus uppercase font-normal">
                TRANSFORM YOUR LIFE THROUGH YOGA AND MEDITATION
              </h2>
              <hr className="my-8 border border-white/20" />
              <p className="text-[16px]/[36px]">
                Discover the path to holistic well-being through yoga meditation
                practices are designed to enhance your physical strength, mental
                clarity.
              </p>
              {/* CTA buttons */}
              <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-10 mt-10">
                <Link href={"/"}>
                  <button className="group cursor-pointer relative overflow-hidden px-[20px] py-[17px] rounded-[10px] text-[16px] border transition-all duration-300 ease-out bg-[var(--sec)] text-white border-[var(--sec)] hover:bg-transparent hover:text-[white] hover:border-white hover:-translate-y-0.5 active:translate-y-0">
                    <span className="relative z-10 inline-flex items-center gap-2">
                      Join Us Today
                      <ArrowUpRight
                        className="h-6 w-6 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-0.5"
                        strokeWidth={2}
                      />
                    </span>
                  </button>
                </Link>
              </div>
            </div>
          </AnimatedContent>
        </div>
      </div>
    </section>
  );
};

export default RestraintHero;
