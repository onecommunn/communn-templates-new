"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  ArrowUpRight,
  BadgeCheck,
  Gem,
  Grid3X3,
  Award,
  BadgePercent,
  UsersRound,
} from "lucide-react";
import { SpinningText } from "@/components/CustomComponents/spinning-text";
import AnimatedContent from "@/components/CustomComponents/AnimatedContent";

const SpawellAboutus = ({
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
      id="about-us"
      className="relative overflow-hidden py-20 md:pb-28 font-plus-jakarta"
      style={
        {
          "--pri": primaryColor,
          "--sec": secondaryColor,
          "--neu": neutralColor,
        } as React.CSSProperties
      }
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-20">
        {/* TOP: Media + Content */}
        <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-2 md:gap-16">
          {/* Left: Overlapping photos */}
          <AnimatedContent
            distance={100}
            direction="vertical"
            duration={1.2}
            initialOpacity={0}
            animateOpacity
            delay={0.3}
            threshold={0.1}
          >
            <div className="relative">
              {/* Back card */}
              <div className="relative w-full max-w-[560px] rounded-[28px] overflow-hidden">
                <Image
                  src={"/assets/spawell-aboutus-image-1.jpg"}
                  alt="Relaxing spa massage"
                  width={1120}
                  height={700}
                  className="h-auto w-[94%] md:w-full object-cover rounded-[28px]"
                  priority
                />
              </div>

              {/* Front card */}
              <div className="absolute -bottom-6 -right-2 md:-bottom-10 md:-right-10 border-[10px] border-white w-[78%] max-w-[460px] rounded-[22px] overflow-hidden">
                <Image
                  src={"/assets/spawell-aboutus-image-2.jpg"}
                  alt="Aromatherapy and wellness"
                  width={920}
                  height={560}
                  className="h-auto w-full object-cover"
                />
              </div>

              {/* Circular badge */}
              <Link href={"/"}>
                <div className="absolute right-12 top-10 hidden md:flex h-32 w-32 items-center justify-center rounded-full bg-[var(--pri)] text-[var(--sec)] shadow-lg">
                  <ArrowUpRight className="absolute w-10 h-10" />
                  <SpinningText radius={4.5}>
                    contact us • contact us • contact us •
                  </SpinningText>
                </div>
              </Link>
            </div>
          </AnimatedContent>

          {/* Right: Text content */}
          <AnimatedContent
            distance={100}
            direction="vertical"
            duration={1.2}
            initialOpacity={0}
            animateOpacity
            delay={0.4}
            threshold={0.1}
          >
            <div className="relative">
              {/* Eyebrow */}
              <AnimatedContent distance={50} direction="vertical" delay={0.1}>
                <span className="inline-flex items-center gap-2 text-sm text-[var(--pri)] font-lora">
                  <span className="h-1.5 w-1.5 rounded-full bg-[var(--pri)]/80 " />
                  About us
                </span>
              </AnimatedContent>

              {/* Heading */}
              <AnimatedContent distance={60} direction="vertical" delay={0.2}>
                <h2 className="mt-3 text-4xl font-semibold leading-tight tracking-[-0.02em] text-[var(--pri)] md:text-5xl">
                  Where passion meet purpose{" "}
                  <span className="font-lora italic font-normal">
                    in every treatment
                  </span>
                </h2>
              </AnimatedContent>

              {/* Paragraph */}
              <AnimatedContent distance={50} direction="vertical" delay={0.3}>
                <p className="mt-4 max-w-xl text-[15px] leading-7 text-[var(--pri)]">
                  Every service we offer is guided by a deep passion for healing
                  and a clear purpose to help you feel your best, inside and
                  out.
                </p>
              </AnimatedContent>

              {/* Bullets + Button */}
              <AnimatedContent distance={50} direction="vertical" delay={0.4}>
                <div className="grid grid-cols-1 md:grid-cols-[auto_1fr] mt-6 gap-4">
                  {/* Left: Bullets + CTA */}
                  <div>
                    <ul className="mt-6 space-y-3 text-[15px] text-[var(--pri)]">
                      {[
                        "Passionate and Certified Wellness Experts",
                        "Personalized programs tailored to your needs",
                        "Holistic rituals designed for mind & body",
                      ].map((item, idx) => (
                        <AnimatedContent
                          key={item}
                          distance={30}
                          direction="horizontal"
                          delay={0.1 * idx}
                        >
                          <li className="flex items-start gap-3">
                            <BadgeCheck className="mt-0.5 h-5 w-5 text-[var(--pri)]" />
                            <span>{item}</span>
                          </li>
                        </AnimatedContent>
                      ))}
                    </ul>

                    <AnimatedContent
                      distance={40}
                      direction="vertical"
                      delay={0.5}
                    >
                      <Link href="/about">
                        <Button className="bg-[var(--pri)] cursor-pointer font-bold hover:bg-[var(--pri)]/90 text-[var(--sec)] px-6 py-5 mt-7">
                          About More
                          <span>
                            <ArrowUpRight
                              className="min-w-4 min-h-4 font-bold"
                              strokeWidth={2.5}
                            />
                          </span>
                        </Button>
                      </Link>
                    </AnimatedContent>
                  </div>

                  {/* Right: Team Card */}
                  <AnimatedContent
                    distance={50}
                    direction="vertical"
                    delay={0.6}
                  >
                    <div className="flex flex-wrap items-center mt-4 md:mt-0 w-full md:justify-end gap-6">
                      <div className="flex flex-col items-center w-full md:w-fit gap-4 rounded-xl bg-[var(--neu)] p-8">
                        <div className="flex h-12 w-12 items-center justify-center">
                          <UsersRound
                            strokeWidth={1}
                            className="h-12 w-12 text-[var(--pri)]"
                          />
                        </div>
                        <div>
                          <div className="text-5xl font-semibold text-[var(--pri)] text-center font-lora">
                            29 <span className="text-5xl">+</span>
                          </div>
                          <p className="text-[16px] text-[var(--pri)]">
                            Team Members
                          </p>
                        </div>
                      </div>
                    </div>
                  </AnimatedContent>
                </div>
              </AnimatedContent>
            </div>
          </AnimatedContent>
        </div>

        {/* Divider */}
        <AnimatedContent distance={30} direction="vertical" delay={0.7}>
          <div className="mt-16 border-t border-neutral-200" />
        </AnimatedContent>

        {/* BOTTOM: Stats */}
        <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-4">
          {[
            { icon: Award, value: "10+", label: "Years of Wellness Expertise" },
            { icon: Gem, value: "5k+", label: "Happy and Relaxed Clients" },
            {
              icon: Grid3X3,
              value: "30+",
              label: "Signature Healing Treatments",
            },
            {
              icon: BadgePercent,
              value: "95%",
              label: "Client Satisfaction Rate",
            },
          ].map(({ icon: Icon, value, label }, idx) => (
            <AnimatedContent
              key={label}
              distance={50}
              direction="vertical"
              delay={0.2 + idx * 0.2} // staggered animation
            >
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center">
                  <Icon
                    strokeWidth={1}
                    className="h-16 w-16 text-[var(--pri)]"
                  />
                </div>
                <div>
                  <div className="text-4xl text-[var(--pri)] font-lora">
                    {value}
                  </div>
                  <p className="text-[16px] text-[var(--pri)]">{label}</p>
                </div>
              </div>
            </AnimatedContent>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SpawellAboutus;
