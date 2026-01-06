"use client";

import { Marquee } from "@/components/CustomComponents/marquee";
import React from "react";

function Word({ children }: { children: React.ReactNode }) {
  return (
    <span className="px-6 font-marcellus text-3xl md:text-4xl text-white bg-transparent">
      {children}
    </span>
  );
}

const points = [
  "Silk Saree",
  "Wedding Saree",
  "Embroidered Saree",
  "Casual Wear",
  "Engagement Saree",
];

const CollectionsMarquee = ({ primaryColor }: { primaryColor: string }) => {
  return (
    <section
      className="relative overflow-hidden py-8 md:py-12 space-y-10 text-white"
      style={{ backgroundColor: primaryColor }}
    >
      <div
        className="pointer-events-none absolute inset-0 h-full"
        style={{
          backgroundImage: `url("/assets/collections-header-bg-image.png")`,
          backgroundRepeat: "repeat",
          backgroundSize: "auto",
          backgroundPosition: "center",
          opacity: 0.5,
          transform: "translateZ(0)",
          WebkitTransform: "translateZ(0)",
        }}
        aria-hidden="true"
      />

      <div
        className="pointer-events-none absolute inset-0 h-full"
        style={{
          backgroundColor: primaryColor,
          opacity: 0.8,
          transform: "translateZ(0)",
          WebkitTransform: "translateZ(0)",
        }}
        aria-hidden="true"
      />

      {/* Content must be above overlays */}
      <div className="relative mx-auto space-y-10">
        {/* Row 1 → right */}
        <Marquee className="[--duration:26s] [--gap:3.5rem]" reverse>
          {points.map((item, idx) => (
            <Word key={idx}>{item}</Word>
          ))}
        </Marquee>

        {/* Row 2 → left */}
        <Marquee className="[--duration:26s] [--gap:3.5rem]">
          {points.map((item, idx) => (
            <Word key={idx}>{item}</Word>
          ))}
        </Marquee>
      </div>
    </section>
  );
};

export default CollectionsMarquee;
