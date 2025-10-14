"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Calendar, Layers, Sparkles } from "lucide-react";
import AnimatedContent from "@/components/CustomComponents/AnimatedContent";
import { WhyChooseUsSection } from "@/models/templates/spawell/spawell-home-model";
import type { LucideProps } from "lucide-react";
import * as Lucide from "lucide-react";

const isUrl = (v: string) => /^https?:\/\//i.test(v) || v.startsWith("/");

type LucideIconType = React.ComponentType<LucideProps>;
function getLucideIcon(name: string): LucideIconType | null {
  // Cast through unknown to satisfy TS (avoids the 2352 error)
  const lib = Lucide as unknown as Record<string, LucideIconType>;
  return lib[name] ?? null;
}

const SpawellWhyChooseus = ({
  primaryColor,
  secondaryColor,
  neutralColor,
  data,
}: {
  primaryColor: string;
  secondaryColor: string;
  neutralColor: string;
  data: WhyChooseUsSection;
}) => {
  const source = data?.content;
  const POINTS = source?.itembox;
  return (
    <section
      className="relative bg-[var(--neu)] py-16 md:py-24 font-plus-jakarta"
      style={
        {
          "--pri": primaryColor,
          "--sec": secondaryColor,
          "--neu": neutralColor,
        } as React.CSSProperties
      }
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-20">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-12">
          {/* Left big image (slide in from left) */}
          <AnimatedContent
            direction="horizontal"
            reverse
            distance={80}
            duration={0.8}
            ease="power3.out"
          >
            <div className="order-1">
              <div className="relative overflow-hidden rounded-[28px] shadow-xl">
                <Image
                  src={
                    source?.media?.[0] || "/assets/spawell-chooseus-image-1.jpg"
                  }
                  alt="Peaceful spa therapy environment"
                  width={403}
                  height={586}
                  className="w-full object-cover"
                  priority
                />
              </div>
            </div>
          </AnimatedContent>

          {/* Middle content */}
          <div className="order-3 md:order-2">
            {/* Eyebrow */}
            <AnimatedContent distance={20} duration={0.45} ease="power2.out">
              <div className="mb-2 font-lora italic inline-flex items-center gap-2 text-sm text-[var(--pri)]">
                <span className="h-1.5 w-1.5 rounded-full bg-[var(--pri)]/80" />
                Why Choose us
              </div>
            </AnimatedContent>

            {/* Heading */}
            <AnimatedContent distance={40} duration={0.65} ease="power3.out">
              <h2 className="text-3xl font-semibold tracking-[-0.02em] text-[var(--pri)] md:text-5xl">
                {source?.heading}{" "}
                <span className="font-lora italic font-normal">
                  {source?.subHeading}
                </span>
              </h2>
            </AnimatedContent>

            {/* Bullets (stagger each item) */}

            <div className="mt-6 space-y-6">
              {POINTS.map((p, idx) => {
                const LucideIcon = !isUrl(p.media)
                  ? getLucideIcon(p.media)
                  : null;
                return (
                  <AnimatedContent
                    key={idx}
                    distance={60}
                    duration={0.75}
                    ease="power3.out"
                    stagger={0.12}
                  >
                    <div
                      className="grid grid-cols-[3rem,1fr] items-start gap-4"
                      style={
                        {
                          "--pri": primaryColor,
                        } as React.CSSProperties
                      }
                    >
                      <div className="flex h-12 w-12 items-center justify-center rounded-full ring-1 ring-[var(--pri)]/25">
                        {LucideIcon ? (
                          <LucideIcon
                            strokeWidth={1}
                            size={30}
                            className="h-5 w-5 text-[var(--pri)]"
                          />
                        ) : (
                          <Image
                            src={p?.media || ""}
                            alt={p?.title || "feature icon"}
                            width={30}
                            height={30}
                            className="object-contain h-5 w-5 text-[var(--pri)]"
                            priority={false}
                          />
                        )}
                      </div>
                      <div>
                        <h4 className="text-[15px] font-semibold text-[var(--pri)]">
                          {p?.title}
                        </h4>
                        <p className="mt-1 text-sm leading-6 text-[var(--pri)]">
                          {p?.description}
                        </p>
                      </div>
                    </div>
                  </AnimatedContent>
                );
              })}
            </div>
          </div>

          {/* Right sidebar */}
          <aside className="order-2 md:order-3">
            {/* Copy + CTA */}
            <AnimatedContent distance={30} duration={0.55} ease="power2.out">
              <p className="text-[16px] leading-6 text-[var(--pri)]">
                {source?.description}
              </p>
              <Link
                href={source?.buttons?.[0]?.url}
                className="group relative mt-5 inline-flex items-center gap-2 rounded-xl bg-[var(--pri)] px-5 py-3 text-[var(--sec)] transition-all hover:-translate-y-0.5"
                aria-label="Contact Us"
              >
                <span className="relative z-10">
                  {source?.buttons?.[0]?.label}
                </span>
                <ArrowUpRight className="relative z-10 h-5 w-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </AnimatedContent>

            {/* Small image (slide in from right) */}
            <AnimatedContent
              direction="horizontal"
              distance={80}
              duration={0.8}
              ease="power3.out"
              delay={0.05}
            >
              <div className="mt-6">
                <div className="relative overflow-hidden rounded-[22px] shadow-xl">
                  <Image
                    src={
                      source?.media?.[1] ||
                      "/assets/spawell-chooseus-image-2.jpg"
                    }
                    alt="Relaxing massage session"
                    width={720}
                    height={480}
                    className="h-auto w-full object-cover"
                  />
                </div>
              </div>
            </AnimatedContent>
          </aside>
        </div>
      </div>
    </section>
  );
};

export default SpawellWhyChooseus;
