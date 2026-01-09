"use client";

import React from "react";
import { FeatureStripSection } from "@/models/templates/collections/collections-home-model";
import Image from "next/image";
import type { ComponentType, SVGProps } from "react";
import * as Icons from "lucide-react";

function IconOrImage({ src, alt }: { src: string; alt: string }) {
  const isImage =
    String(src || "").includes("/") || String(src || "").includes(".");

  if (!isImage && src in Icons) {
    const Ico = Icons[src as keyof typeof Icons] as ComponentType<
      SVGProps<SVGSVGElement>
    >;
    return (
      <Ico
        className="h-14 w-14 text-[#fff]"
        aria-label={alt}
        strokeWidth={1}
      />
    );
  }
  return (
    <Image
      src={src || "/assets/restraint-about-image01.svg"}
      alt={alt}
      width={50}
      height={50}
     className="w-14 h-14"
      unoptimized
    />
  );
}

const CollectionsService = ({
  data,
  primaryColor,
}: {
  data: FeatureStripSection;
  primaryColor: string;
}) => {
  const content = data?.content;
  const services = content?.chips;
  return (
    <section
      className="relative w-full overflow-hidden"
      style={{ backgroundColor: primaryColor }}
    >
      {/* Pattern layer (Safari-safe) */}
      <div
        className="pointer-events-none absolute inset-0"
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

      {/* Tint overlay (no blend-mode → Safari friendly) */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundColor: primaryColor,
          opacity: 0.8,
          transform: "translateZ(0)",
          WebkitTransform: "translateZ(0)",
        }}
        aria-hidden="true"
      />

      {/* Content */}
      <div className="relative mx-auto max-w-[1400px] px-6 md:px-0 py-10 md:py-0">
        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5">
          {content?.chips?.map(({ text, image }, idx) => (
            <div
              key={text}
              className="relative flex flex-col items-center justify-center gap-4 py-6 md:py-12 text-center"
            >
              {/* Icon */}
              <div className="text-white">
                <IconOrImage src={image} alt={`${text} image`} />
              </div>

              {/* Title */}
              <p className="font-figtree text-white text-[16px] md:text-[20px] leading-tight">
                {text}
              </p>

              {/* Divider */}
              {idx !== services.length - 1 && (
                <div className="absolute hidden md:flex right-0 top-1/2 -translate-y-1/2 bg-[#FAEEDC]/50 w-[1px] h-20" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CollectionsService;
