"use client";

import React from "react";
import Image from "next/image";
import AnimatedContent from "@/components/CustomComponents/AnimatedContent";
import { AboutTwoSection } from "@/models/templates/spawell/spawell-home-model";
import type { LucideProps } from "lucide-react";
import * as Lucide from "lucide-react";

const isUrl = (v: string) => /^https?:\/\//i.test(v) || v.startsWith("/");

type LucideIconType = React.ComponentType<LucideProps>;
function getLucideIcon(name: string): LucideIconType | null {
  // Cast through unknown to satisfy TS (avoids the 2352 error)
  const lib = Lucide as unknown as Record<string, LucideIconType>;
  return lib[name] ?? null;
}

const SpawellCourses = ({
  primaryColor,
  secondaryColor,
  neutralColor,
  data,
}: {
  primaryColor: string;
  secondaryColor: string;
  neutralColor: string;
  data: AboutTwoSection;
}) => {
  const source = data?.content;
  return (
    <section
      className="relative py-16 md:py-24 font-plus-jakarta"
      style={
        {
          "--pri": primaryColor,
          "--sec": secondaryColor,
          "--neu": neutralColor,
        } as React.CSSProperties
      }
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-20">
        <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-[2fr_1fr] md:gap-16">
          {/* Left: Copy */}
          <div>
            {/* Eyebrow */}
            <AnimatedContent distance={20} duration={0.45} ease="power2.out">
              <div className="mb-2 inline-flex items-center gap-2 text-sm text-[var(--pri)]">
                <span className="h-1.5 w-1.5 rounded-full bg-[var(--pri)]/80" />
                More About us
              </div>
            </AnimatedContent>

            {/* Heading */}
            <AnimatedContent distance={40} duration={0.65} ease="power3.out">
              <h2 className="text-3xl font-semibold leading-tight tracking-[-0.02em] text-[var(--pri)] md:text-5xl">
                {source?.heading}{" "}
                <span className="font-lora italic font-normal">
                  {source?.subHeading}
                </span>
              </h2>
            </AnimatedContent>

            {/* Blurb */}
            <AnimatedContent
              distance={30}
              duration={0.55}
              ease="power2.out"
              delay={0.05}
            >
              <p className="mt-4 text-[16px] leading-7 text-[var(--pri)]">
                {source?.description}
              </p>
            </AnimatedContent>

            {/* Courses list (stagger items) */}
            <AnimatedContent
              distance={60}
              duration={0.75}
              ease="power3.out"
              stagger={0.12}
            >
              <div className="mt-6 divide-y divide-neutral-200 rounded-2xl border-neutral-200 bg-white">
                {source?.services?.map((item, idx) => {
                  const LucideIcon = !isUrl(item.media)
                    ? getLucideIcon(item.media)
                    : null;
                  return (
                    <div
                      key={idx}
                      className="grid grid-cols-[auto,1fr] gap-4 py-6"
                    >
                      <div className="flex items-center gap-4">
                        <div className="mt-0.5 flex items-center justify-center rounded-full bg-[var(--pri)]/10 p-4">
                          {LucideIcon ? (
                            <LucideIcon
                              strokeWidth={1}
                              className="h-12 w-12 text-[var(--pri)]"
                            />
                          ) : (
                            <Image
                              src={item.media || ""}
                              alt={item.serviceName || "feature icon"}
                              width={48}
                              height={48}
                              className="object-contain"
                              priority={false}
                              unoptimized
                            />
                          )}
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-[var(--pri)]">
                            {item.serviceName}
                          </h3>
                          <p className="mt-1 text-[16px] leading-6 text-[var(--pri)]">
                            {item.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </AnimatedContent>
          </div>

          {/* Right: Image (slide in from right) */}
          <AnimatedContent
            direction="horizontal"
            reverse
            distance={80}
            duration={0.8}
            ease="power3.out"
          >
            <div className="relative">
              <div className="relative aspect-[73/90] overflow-hidden rounded-3xl shadow-xl">
                <Image
                  src={"/assets/spawell-course-image-1.jpg"}
                  alt="Therapist providing a relaxing massage"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 540px"
                  priority
                />
              </div>
            </div>
          </AnimatedContent>
        </div>
      </div>
    </section>
  );
};

export default SpawellCourses;
