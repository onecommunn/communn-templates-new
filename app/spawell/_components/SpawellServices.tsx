"use client";

import React from "react";
import Image from "next/image";
import * as Lucide from "lucide-react";
import type { LucideProps } from "lucide-react";
import AnimatedContent from "@/components/CustomComponents/AnimatedContent";
import { ServiceSection } from "@/models/templates/spawell/spawell-home-model";

/** ----- helpers ----- */
const isUrl = (v?: string) => !!v && (/^(https?:)?\/\//i.test(v) || v.startsWith("/"));
type LucideIconType = React.ComponentType<LucideProps>;
function getLucideIcon(name?: string): LucideIconType | null {
  if (!name) return null;
  const lib = Lucide as unknown as Record<string, LucideIconType>;
  return lib[name] ?? null;
}

/** ----- local types (for rendering) ----- */
type Point = {
  title: string;
  desc: string;
  icon?: string; // Lucide name or image URL
  direction: "Left" | "Right";
};

const Bullet = ({
  title,
  desc,
  icon,
  direction,
}: Point) => {
  const LucideIcon = icon && !isUrl(icon) ? getLucideIcon(icon) : null;

  return (
    <div className="grid grid-cols-[2.25rem,1fr] gap-3">
      <div
        className={`flex items-center gap-4 ${
          direction === "Left" ? "flex-row-reverse" : "flex-row"
        }`}
      >
        <div className="flex p-3 flex-shrink-0 items-center justify-center rounded-full bg-white/10">
          {LucideIcon ? (
            <LucideIcon className="h-10 w-10 text-[var(--sec)]/90" strokeWidth={1} />
          ) : icon ? (
            <Image
              src={icon}
              alt={`${title} icon`}
              width={40}
              height={40}
              className="h-10 w-10 object-contain"
            />
          ) : (
            <div className="h-10 w-10" />
          )}
        </div>
        <div className={`${direction === "Left" ? "text-right" : "text-left"}`}>
          <h4 className="text-[15px] font-semibold text-[var(--sec)]">{title}</h4>
          <p className="mt-1 text-sm leading-6 text-[var(--sec)]/70">{desc}</p>
        </div>
      </div>
    </div>
  );
};

const SpawellServices = ({
  primaryColor,
  secondaryColor,
  neutralColor,
  data,
}: {
  primaryColor: string;
  secondaryColor: string;
  neutralColor: string;
  data: ServiceSection;
}) => {
  const source = data?.content;

  // Map incoming services -> alternating left/right points
  const services = source?.services ?? [];
  const points: Point[] = services.map((s, idx) => ({
    title: s.serviceName,
    desc: s.description,
    icon: s.media, // can be a Lucide name (e.g., "Leaf") or an image URL
    direction: idx % 2 === 0 ? "Left" : "Right",
  }));

  // Split by direction for layout columns
  const LEFT_POINTS = points.filter((p) => p.direction === "Left");
  const RIGHT_POINTS = points.filter((p) => p.direction === "Right");

  const centerImage = source?.media?.[0] || "/assets/spawell-services-image-1.jpg"; // fallback

  return (
    <section
      id="services"
      className="relative overflow-hidden bg-[var(--pri)] text-[var(--sec)] py-16 md:py-24 font-plus-jakarta"
      style={
        {
          "--pri": primaryColor,
          "--sec": secondaryColor,
          "--neu": neutralColor,
        } as React.CSSProperties
      }
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-20">
        {/* Eyebrow */}
        <AnimatedContent
          distance={50}
          direction="vertical"
          duration={1}
          initialOpacity={0}
          animateOpacity
          delay={0.2}
          threshold={0.1}
        >
          <div className="mb-2 flex justify-center">
            <span className="text-sm text-[var(--sec)]/80">• Our Services</span>
          </div>
        </AnimatedContent>

        {/* Heading */}
        <AnimatedContent
          distance={80}
          direction="vertical"
          duration={1.2}
          initialOpacity={0}
          animateOpacity
          delay={0.3}
          threshold={0.1}
        >
          <div className="text-center">
            <h2 className="text-3xl font-semibold tracking-[-0.02em] text-[var(--sec)] md:text-5xl">
              {source?.heading}
            </h2>
            <p className="mt-1 text-2xl font-lora italic text-[var(--sec)]/90 md:text-[34px]">
              {source?.subHeading}
            </p>
          </div>
        </AnimatedContent>

        {/* Content */}
        <div className="mt-12 grid grid-cols-1 items-center gap-10 md:grid-cols-3 md:gap-0">
          {/* Left bullets (mapped) */}
          <div className="space-y-7">
            {LEFT_POINTS.map((p) => (
              <AnimatedContent
                key={p.title}
                distance={50}
                direction="horizontal"
                duration={1}
                initialOpacity={0}
                animateOpacity
                delay={0.1}
                threshold={0.1}
              >
                <Bullet {...p} />
              </AnimatedContent>
            ))}
          </div>

          {/* Center circular image (from data.content.media) */}
          <div className="order-first mx-auto md:order-none">
            <div className="relative w-[353px] h-[522px] md:w-[353px] md:h-[522px] rounded-full overflow-hidden ring-1 ring-white/20 shadow-2xl">
              <Image
                src={centerImage}
                alt="Spa services"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 18rem, 20rem"
                priority
              />
            </div>
          </div>

          {/* Right bullets (mapped) */}
          <div className="space-y-7">
            {RIGHT_POINTS.map((p) => (
              <AnimatedContent
                key={p.title}
                distance={50}
                direction="horizontal"
                reverse
                duration={1}
                initialOpacity={0}
                animateOpacity
                delay={0.1}
                threshold={0.1}
              >
                <Bullet {...p} />
              </AnimatedContent>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SpawellServices;
