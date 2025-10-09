"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Calendar, Layers, Sparkles } from "lucide-react";
import AnimatedContent from "@/components/CustomComponents/AnimatedContent";

type Point = {
  title: string;
  desc: string;
  Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  color?: string;
};

const POINTS: Point[] = [
  {
    title: "Personalized Spa Treatments",
    desc: "Every guest is unique, and so are our services.",
    Icon: Calendar,
  },
  {
    title: "Therapeutic Massage Therapy",
    desc: "Our massages go beyond relaxation. Whether it’s deep tissue, Swedish, or custom blends.",
    Icon: Layers,
  },
  {
    title: "Skin Rejuvenation & Facial Care",
    desc: "We use nutrient-rich, all-natural products to hydrate, brighten, and rejuvenate your skin.",
    Icon: Sparkles,
  },
];

const Bullet = ({ title, desc, Icon, color }: Point) => (
  <div
    className="grid grid-cols-[3rem,1fr] items-start gap-4"
    style={
      {
        "--pri": color,
      } as React.CSSProperties
    }
  >
    <div className="flex h-12 w-12 items-center justify-center rounded-full ring-1 ring-[var(--pri)]/25">
      <Icon className="h-5 w-5 text-[var(--pri)]" />
    </div>
    <div>
      <h4 className="text-[15px] font-semibold text-[var(--pri)]">{title}</h4>
      <p className="mt-1 text-sm leading-6 text-[var(--pri)]">{desc}</p>
    </div>
  </div>
);

const SpawellWhyChooseus = ({
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
                  src={"/assets/spawell-chooseus-image-1.jpg"}
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
                Your journey to{" "}
                <span className="font-lora italic font-normal">
                  wellness begins
                </span>
              </h2>
            </AnimatedContent>

            {/* Bullets (stagger each item) */}

            <div className="mt-6 space-y-6">
              {POINTS.map((p) => (
                <AnimatedContent
                  distance={60}
                  duration={0.75}
                  ease="power3.out"
                  stagger={0.12}
                  key={p.title}
                >
                  <Bullet {...p} color={primaryColor} />
                </AnimatedContent>
              ))}
            </div>
          </div>

          {/* Right sidebar */}
          <aside className="order-2 md:order-3">
            {/* Copy + CTA */}
            <AnimatedContent distance={30} duration={0.55} ease="power2.out">
              <p className="text-[16px] leading-6 text-[var(--pri)]">
                Empowering you to achieve optimal health and wellness with
                personalized coaching, support.
              </p>
              <Link
                href="/contact"
                className="group relative mt-5 inline-flex items-center gap-2 rounded-xl bg-[var(--pri)] px-5 py-3 text-[var(--sec)] transition-all hover:-translate-y-0.5"
                aria-label="Contact Us"
              >
                <span className="relative z-10">Contact Us</span>
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
                    src={"/assets/spawell-chooseus-image-2.jpg"}
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
