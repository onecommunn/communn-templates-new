"use client";
import AnimatedContent from "@/components/CustomComponents/AnimatedContent";
import { Button } from "@/components/ui/button";
import { HeroSection } from "@/models/templates/spawell/spawell-home-model";
import { ArrowUpRight, BadgeCheck, UserCog } from "lucide-react";
import Link from "next/link";
import React from "react";
import * as Lucide from "lucide-react";
import Image from "next/image";
import type { LucideProps } from "lucide-react";

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

const isUrl = (v: string) => /^https?:\/\//i.test(v) || v.startsWith("/");

type LucideIconType = React.ComponentType<LucideProps>;
function getLucideIcon(name: string): LucideIconType | null {
  // Cast through unknown to satisfy TS (avoids the 2352 error)
  const lib = Lucide as unknown as Record<string, LucideIconType>;
  return lib[name] ?? null;
}

const SpawellHero = ({
  primaryColor,
  secondaryColor,
  neutralColor,
  data,
}: {
  primaryColor: string;
  secondaryColor: string;
  neutralColor: string;
  data: HeroSection;
}) => {
  const source = data?.content;
  return (
    <section
      className="relative flex items-center justify-center min-h-screen bg-cover bg-left md:bg-center bg-no-repeat font-plus-jakarta"
      style={{
        backgroundImage: `url(${
          source?.media?.[0] || "/assets/spawell-hero-image.png"
        })`,
      }}
    >
      <div
        className="absolute inset-0 bg-black/40"
        style={{
          background: `linear-gradient(
      270deg,
      ${hexToRgba(primaryColor, 0)} 24.17%,
      ${hexToRgba(primaryColor, 0.9)} 80.55%
    )`,
        }}
      />
      <div
        className="relative z-10 container mx-auto px-6 md:px-20 text-white"
        // expose brand colors as CSS vars for Tailwind arbitrary values
        style={
          {
            "--pri": primaryColor,
            "--sec": secondaryColor,
            "--neu": neutralColor,
          } as React.CSSProperties
        }
      >
        <div
          className="grid grid-cols-1 md:grid-cols-[1.5fr_1fr]"
          style={{ color: secondaryColor }}
        >
          <AnimatedContent
            distance={150}
            direction="vertical"
            reverse={false}
            duration={1.2}
            initialOpacity={0.2}
            animateOpacity
            scale={1}
            threshold={0.2}
            delay={0.3}
          >
            <div>
              <h2 className="md:text-6xl/[72px] tracking-[-1.2px] text-4xl font-semibold">
                {source?.heading}{" "}
                <span className="font-lora font-normal italic">
                  {source?.subHeading}
                </span>
              </h2>

              <p className="text-lg mt-6">{source?.description}</p>

              {/* CTA buttons */}
              <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-10 mt-10">
                {/* Primary */}
                {source?.buttons &&
                  source?.buttons?.map((btn, idx) => (
                    <Link href={"/"} key={idx}>
                      <Button
                        className={`${
                          idx % 2 === 0
                            ? "group cursor-pointer relative overflow-hidden px-[30px] py-[18px] text-[16px] font-bold border transition-all duration-300 ease-out bg-[var(--sec)] text-[var(--pri)] border-[var(--sec)] hover:bg-[var(--pri)] hover:text-[var(--sec)] hover:border-[var(--sec)] hover:-translate-y-0.5 active:translate-y-0"
                            : "group cursor-pointer relative overflow-hidden px-[30px] py-[18px] text-[16px] font-bold bg-transparent text-[var(--sec)] border border-[var(--sec)] transition-all duration-300 ease-out hover:bg-[var(--sec)] hover:text-[var(--pri)] hover:-translate-y-0.5 active:translate-y-0"
                        }`}
                      >
                        {/* shine sweep */}
                        <span className="pointer-events-none absolute inset-y-0 -left-1/2 w-[140%] -skew-x-12 bg-white/30 opacity-0 blur-[1px] transition-all duration-700 ease-out group-hover:translate-x-[140%] group-hover:opacity-100" />
                        <span className="relative z-10 inline-flex items-center gap-2">
                          {btn?.label}
                          <ArrowUpRight
                            className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-0.5"
                            strokeWidth={2.5}
                          />
                        </span>
                      </Button>
                    </Link>
                  ))}
              </div>

              {/* badges */}
              <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-10 mt-10">
                {source?.features?.map((item, idx) => {
                  const LucideIcon = !isUrl(item.icon)
                    ? getLucideIcon(item.icon)
                    : null;

                  return (
                    <div className="flex items-center gap-3" key={idx}>
                      <div className="rounded-full p-4 flex items-center justify-center text-[var(--sec)] bg-white/20 backdrop-blur-md">
                        {LucideIcon ? (
                          <LucideIcon strokeWidth={1} size={30} />
                        ) : (
                          <Image
                            src={item.icon || ""}
                            alt={item.title || "feature icon"}
                            width={30}
                            height={30}
                            className="object-contain"
                            unoptimized
                          />
                        )}
                      </div>
                      <p className="text-[16px]">{item.title}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </AnimatedContent>
        </div>
      </div>
    </section>
  );
};

export default SpawellHero;
