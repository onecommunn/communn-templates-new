"use client";

import React from "react";
import Link from "next/link";
import { ArrowUpRight, Flower2, Gem, Grid3X3, Snowflake } from "lucide-react";
import AnimatedContent from "@/components/CustomComponents/AnimatedContent";

type Item = {
  title: string;
  href: string;
  Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
};

const items: Item[] = [
  { title: "Signature Full–Body Massage", href: "/appointments/full-body-massage", Icon: Flower2 },
  { title: "Rejuvenating Facial Therapy", href: "/appointments/facial-therapy", Icon: Gem },
  { title: "Aromatherapy Healing Session", href: "/appointments/aromatherapy", Icon: Grid3X3 },
  { title: "Herbal Body Scrub & Wrap", href: "/appointments/herbal-wrap", Icon: Snowflake },
];

const SpawellFeaturedAppointments = ({
  primaryColor,
  secondaryColor,
  neutralColor,
}: {
  primaryColor: string;
  secondaryColor: string;
  neutralColor: string;
}) => {
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
              Let our featured treatments elevate
            </h2>
            <p className="mt-1 text-2xl font-lora italic text-[var(--pri)]/90 md:text-[34px]">
              your wellness journey
            </p>
          </div>
        </AnimatedContent>

        {/* Cards (staggered children) */}
        <AnimatedContent distance={60} duration={0.8} ease="power3.out" stagger={0.12}>
          <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {items.map(({ title, href, Icon }) => (
              <Link
                key={title}
                href={href || "/"}
                className="group relative block rounded-3xl bg-white p-6 shadow-sm ring-1 ring-neutral-200 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
                aria-label={title}
              >
                <div className="flex justify-between items-center mb-8">
                  <div className="flex h-12 w-12 items-center justify-center text-[var(--pri)]">
                    <Icon className="h-14 w-14" strokeWidth={1} />
                  </div>
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-[var(--pri)]/10 text-[var(--pri)] transition-colors group-hover:bg-[var(--pri)] group-hover:text-[var(--sec)]">
                    <ArrowUpRight className="h-8 w-8" />
                  </span>
                </div>

                <h3 className="mt-2 text-xl font-bold leading-6 text-[var(--pri)]">
                  {title}
                </h3>
              </Link>
            ))}
          </div>
        </AnimatedContent>

        {/* Footer note (slide from bottom slightly) */}
        <AnimatedContent distance={30} duration={0.6} ease="power2.out" delay={0.05}>
          <p className="mx-auto mt-14 max-w-3xl text-center text-sm text-[var(--pri)]">
            Elevate your brand with creative design solutions.{" "}
            <Link
              href="/contact"
              className="underline underline-offset-4 text-[var(--pri)] decoration-[var(--pri)]/40 hover:font-medium"
            >
              Let’s bring your vision to life today!
            </Link>
          </p>
        </AnimatedContent>
      </div>
    </section>
  );
};

export default SpawellFeaturedAppointments;
