"use client";

import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import * as Lucide from "lucide-react";
import type { LucideProps } from "lucide-react";
import React from "react";
import AnimatedContent from "@/components/CustomComponents/AnimatedContent";
import { WhatWeDoSection } from "@/models/templates/restraint/restraint-home-model";

const list = [
  "Mindful Movement For Balance",
  "Guided Meditation For Clarity",
  "Personalized Wellness Programs",
  "Yoga For Every Skill Level",
];

const isUrl = (v: string) => /^https?:\/\//i?.test(v) || v?.startsWith("/");

type LucideIconType = React.ComponentType<LucideProps>;
function getLucideIcon(name: string): LucideIconType | null {
  const lib = Lucide as unknown as Record<string, LucideIconType>;
  return lib[name] ?? null;
}

const RestraintWhatWeDo = ({
  primaryColor,
  secondaryColor,
  data,
}: {
  primaryColor: string;
  secondaryColor: string;
  data: WhatWeDoSection;
}) => {
  const content = data?.content;
  return (
    <section
      className="relative py-10 font-sora"
      style={
        {
          "--pri": primaryColor,
          "--sec": secondaryColor,
        } as React.CSSProperties
      }
    >
      {/* decorative corner */}
      <div className="inset-1 pointer-events-none">
        <Image
          src={"/assets/restraint-whatWeDo-image01.svg"}
          alt="restraint-about-bg-image01"
          width={180}
          height={250}
          className="absolute -top-6 left-2 hidden md:flex"
        />
      </div>

      <div className="container mx-auto px-6 md:px-20">
        {/* TOP ROW */}
        <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-2 md:gap-14">
          {/* LEFT — image */}
          <AnimatedContent
            direction="horizontal"
            distance={120}
            duration={0.85}
            animateOpacity
          >
            <div className="relative order-1 md:order-0">
              <div className="flex items-center justify-end">
                <Image
                  src={
                    content?.media?.[0] ||
                    "/assets/restraint-whatwedo-image-1.png"
                  }
                  alt="Martial artist pose"
                  className="h-[400px] w-full rounded-[28px] md:h-[580px] md:w-[572px]"
                  width={572}
                  height={590}
                  unoptimized
                />
              </div>
            </div>
          </AnimatedContent>

          {/* RIGHT — content */}
          <AnimatedContent
            direction="horizontal"
            reverse
            distance={120}
            duration={0.9}
            animateOpacity
            threshold={0.25}
          >
            <div className="relative space-y-4 order-0 md:order-1">
              <p className="text-sm font-normal uppercase tracking-[4.2px] text-black">
                WHAT WE DO
              </p>
              <h2 className="md:text-5xl/[56px] text-4xl font-marcellus">
                {content?.heading}{" "}
                <span className="text-[var(--sec)]">{content?.subHeading}</span>
              </h2>
              <p className="text-[#9C9C9C] text-[16px] font-sora">
                {content?.description}
              </p>

              {/* bullet list with its own small stagger */}
              <AnimatedContent
                direction="vertical"
                distance={35}
                duration={0.55}
                stagger={0.08}
                animateOpacity
              >
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 list-disc ml-4 mt-4">
                  {content?.bulletes?.map((item, idx) => (
                    <li
                      key={idx}
                      className="text-[#9C9C9C] font-sora text-[16px]"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </AnimatedContent>

              <Link href={content?.buttons?.[0]?.url || "/"}>
                <button className="mt-4 group cursor-pointer relative overflow-hidden px-[20px] py-[10px] rounded-[10px] text-[16px] border transition-all duration-300 ease-out bg-[var(--pri)] text-white border-[var(--pri)] hover:bg-transparent hover:text-[var(--pri)] hover:border-[var(--pri)] hover:-translate-y-0.5 active:translate-y-0">
                  <span className="relative z-10 inline-flex items-center gap-2">
                    {content?.buttons?.[0]?.label}
                    <ArrowUpRight
                      className="h-6 w-6 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-0.5"
                      strokeWidth={2}
                    />
                  </span>
                </button>
              </Link>
            </div>
          </AnimatedContent>
        </div>

        {/* BOTTOM ROW */}
        <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] overflow-hidden rounded-3xl gap-1 mt-2 md:mt-0">
          {/* Left dark panel */}
          <AnimatedContent
            direction="vertical"
            distance={60}
            duration={0.65}
            stagger={0.12} // 👈 this will animate the 4 features one-by-one
            animateOpacity
          >
            <div className="bg-[var(--pri)]  px-8 py-10 sm:px-10 flex items-center justify-center h-full">
              <div className="grid gap-y-10 gap-x-12 sm:grid-cols-2">
                {content?.features?.map((item, idx) => (
                  <Feature
                    icon={item?.icon}
                    title={item?.title}
                    desc={item?.description}
                    key={idx}
                  />
                ))}
              </div>
            </div>
          </AnimatedContent>

          {/* Right image */}
          <AnimatedContent
            direction="horizontal"
            reverse
            distance={80}
            duration={0.55}
            delay={0.05}
            animateOpacity
          >
            <div className="relative h-[350px] md:h-[350px]">
              <Image
                src={
                  content?.media?.[1] ||
                  "/assets/restraint-whatwedo-image-2.jpg"
                }
                alt="Meditation"
                fill
                priority
                className="object-cover"
                sizes="(min-width: 768px) 33vw, 100vw"
                unoptimized
              />
            </div>
          </AnimatedContent>
        </div>
      </div>
    </section>
  );
};

export default RestraintWhatWeDo;

function Feature({
  icon,
  title,
  desc,
}: {
  icon: string;
  title: string;
  desc: string;
}) {
  const LucideIcon = !isUrl(icon) ? getLucideIcon(icon) : null;
  return (
    <div className="flex items-start gap-4 font-sora">
      <div className="mt-1 inline-flex min-h-10 max-h-10 min-w-10 max-w-10 items-center justify-center text-white/90">
        {LucideIcon ? (
          <LucideIcon strokeWidth={1} size={36} />
        ) : (
          <Image
            src={icon || "/assets/restraint-whatWeDo-image03.svg"}
            alt={title || "feature icon"}
            width={60}
            height={60}
            className="object-contain"
            unoptimized
          />
        )}
      </div>
      <div>
        <h4 className="text-xl leading-6 text-white font-marcellus">{title}</h4>
        <p className="mt-2 text-[16px] leading-6 text-[#CFCFCF]">{desc}</p>
      </div>
    </div>
  );
}
