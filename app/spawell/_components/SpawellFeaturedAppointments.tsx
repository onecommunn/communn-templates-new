"use client";

import React from "react";
import Link from "next/link";
import { ArrowUpRight, Flower2, Gem, Grid3X3, Snowflake } from "lucide-react";
import AnimatedContent from "@/components/CustomComponents/AnimatedContent";
import { FeaturedAppointmentSection } from "@/models/templates/spawell/spawell-home-model";
import type { LucideProps } from "lucide-react";
import * as Lucide from "lucide-react";
import Image from "next/image";

const isUrl = (v: string) => /^https?:\/\//i?.test(v) || v?.startsWith("/");

type LucideIconType = React.ComponentType<LucideProps>;
function getLucideIcon(name: string): LucideIconType | null {
  // Cast through unknown to satisfy TS (avoids the 2352 error)
  const lib = Lucide as unknown as Record<string, LucideIconType>;
  return lib[name] ?? null;
}

const SpawellFeaturedAppointments = ({
  primaryColor,
  secondaryColor,
  neutralColor,
  data,
}: {
  primaryColor: string;
  secondaryColor: string;
  neutralColor: string;
  data: FeaturedAppointmentSection;
}) => {
  const source = data?.content;
  return (
    <section
      className="relative overflow-hidden bg-[var(--neu)] py-20 md:pb-28 font-plus-jakarta"
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
        <AnimatedContent distance={20} duration={0.5} ease="power2.out">
          <div className="mb-2 flex justify-center">
            <span className="text-[16px] text-[var(--pri)] font-lora">
              • Featured Appointments
            </span>
          </div>
        </AnimatedContent>

        {/* Heading */}
        <AnimatedContent distance={40} duration={0.7} ease="power3.out">
          <div className="text-center">
            <h2 className="text-3xl font-semibold tracking-[-0.02em] text-[var(--pri)] md:text-5xl">
              {source?.heading}
            </h2>
            <p className="mt-1 text-2xl font-lora italic text-[var(--pri)]/90 md:text-[34px]">
              {source?.subHeading}
            </p>
          </div>
        </AnimatedContent>

        {/* Cards (staggered children) */}
        <AnimatedContent
          distance={60}
          duration={0.8}
          ease="power3.out"
          stagger={0.12}
        >
          <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {source?.itemBox?.map((item, idx) => {
              const LucideIcon = !isUrl(item?.media)
                ? getLucideIcon(item?.media)
                : null;
              return (
                <Link
                  key={idx}
                  href={"/"}
                  className="group relative block rounded-3xl bg-white p-6 shadow-sm ring-1 ring-neutral-200 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
                  aria-label={item?.description}
                >
                  <div className="flex justify-between items-center mb-8">
                    <div className="flex h-12 w-12 items-center justify-center text-[var(--pri)]">
                      {LucideIcon ? (
                        <LucideIcon className="h-14 w-14" strokeWidth={1} />
                      ) : (
                        <Image
                          src={item?.media || ""}
                          alt={item?.description || "feature icon"}
                          width={30}
                          height={30}
                          className="object-contain"
                          unoptimized
                        />
                      )}
                    </div>
                    <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-[var(--pri)]/10 text-[var(--pri)] transition-colors group-hover:bg-[var(--pri)] group-hover:text-[var(--sec)]">
                      <ArrowUpRight className="h-8 w-8" />
                    </span>
                  </div>

                  <h3 className="mt-2 text-xl font-bold leading-6 text-[var(--pri)]">
                    {item.description}
                  </h3>
                </Link>
              );
            })}
          </div>
        </AnimatedContent>

        {/* Footer note (slide from bottom slightly) */}
        <AnimatedContent
          distance={30}
          duration={0.6}
          ease="power2.out"
          delay={0.05}
        >
          <p className="mx-auto mt-14 max-w-3xl text-center text-sm text-[var(--pri)]">
            {source?.description}{" "}
            <Link
              href="/contact"
              className="underline underline-offset-4 text-[var(--pri)] decoration-[var(--pri)]/40 hover:font-medium"
            >
              {source?.linkDescription}
            </Link>
          </p>
        </AnimatedContent>
      </div>
    </section>
  );
};

export default SpawellFeaturedAppointments;
