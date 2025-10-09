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

const SpawellAboutus: React.FC = () => {
  return (
    <section
      id="about-us"
      className="relative overflow-hidden py-20 md:pb-28 font-plus-jakarta"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-20">
        {/* TOP: Media + Content */}
        <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-2 md:gap-16">
          {/* Left: Overlapping photos */}
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
              <div className="absolute right-12 top-10 hidden md:flex h-32 w-32 items-center justify-center rounded-full bg-[#5D3222] text-white shadow-lg">
                <ArrowUpRight className="absolute w-10 h-10" />

                <SpinningText radius={4.5}>
                  contact us • contact us • contact us •
                </SpinningText>
              </div>
            </Link>
          </div>

          {/* Right: Text content */}
          <div className="relative">
            {/* Eyebrow */}
            <span className="inline-flex items-center gap-2 text-sm text-[#5D3222] font-lora">
              <span className="h-1.5 w-1.5 rounded-full bg-[#5D3222]/80 " />
              About us
            </span>

            <h2 className="mt-3 text-4xl font-semibold leading-tight tracking-[-0.02em] text-[#4b2a1d] md:text-5xl">
              Where passion meet purpose{" "}
              <span className="font-lora italic font-normal">
                in every treatment
              </span>
            </h2>

            <p className="mt-4 max-w-xl text-[15px] leading-7 text-neutral-600">
              Every service we offer is guided by a deep passion for healing and
              a clear purpose to help you feel your best, inside and out.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-[auto_1fr]">
              {/* left */}
              <div>
                {/* Bullets */}
                <ul className="mt-6 space-y-3 text-[15px] text-neutral-800">
                  {[
                    "Passionate and Certified Wellness Experts",
                    "Personalized programs tailored to your needs",
                    "Holistic rituals designed for mind & body",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <BadgeCheck className="mt-0.5 h-5 w-5 text-[#5D3222]" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <Link href="/about">
                  <Button className="bg-[#5D3222] cursor-pointer font-bold hover:bg-[#4b261b] text-white px-6 py-5 mt-7">
                    About More
                    <span>
                      <ArrowUpRight
                        className="min-w-4 min-h-4 font-bold"
                        strokeWidth={2.5}
                      />
                    </span>
                  </Button>
                </Link>
              </div>
              {/* CTA + Team card */}
              <div className="flex flex-wrap items-center mt-4 md:mt-0 w-full md:justify-end gap-6">
                <div className="flex flex-col items-center w-full md:w-fit  gap-4 rounded-xl bg-[#F9F6F1] p-8">
                  <div className="flex h-12 w-12 items-center justify-center">
                    <UsersRound
                      strokeWidth={1}
                      className="h-12 w-12 text-[#5D3222]"
                    />
                  </div>
                  <div>
                    <div className="text-5xl font-semibold text-[#4b2a1d] text-center font-lora">
                      29 <span className="text-5xl">+</span>
                    </div>
                    <p className="text-[16px] text-neutral-500">Team Members</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="mt-16 border-t border-neutral-200" />

        {/* BOTTOM: Stats */}
        <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* Years of expertise */}
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center">
              <Award strokeWidth={1} className="h-16 w-16 text-[#5D3222]" />
            </div>
            <div>
              <div className="text-4xl text-[#4b2a1d] font-lora">
                10 <span className="text-4xl">+</span>
              </div>
              <p className="text-[16px] text-[#866559]">
                Years of Wellness Expertise
              </p>
            </div>
          </div>

          {/* Happy clients */}
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center">
              <Gem strokeWidth={1} className="h-16 w-16 text-[#5D3222]" />
            </div>
            <div>
              <div className="text-4xl text-[#4b2a1d] font-lora">5k+</div>
              <p className="text-[16px] text-[#866559]">
                Happy and Relaxed Clients
              </p>
            </div>
          </div>

          {/* Treatments */}
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center">
              <Grid3X3 strokeWidth={1} className="h-16 w-16 text-[#5D3222]" />
            </div>
            <div>
              <div className="text-4xl text-[#4b2a1d] font-lora">
                30 <span className="text-4xl">+</span>
              </div>
              <p className="text-[16px] text-[#866559]">
                Signature Healing Treatments
              </p>
            </div>
          </div>

          {/* Satisfaction */}
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center">
              <BadgePercent
                strokeWidth={1}
                className="h-16 w-16 text-[#5D3222]"
              />
            </div>
            <div>
              <div className="text-4xl text-[#4b2a1d] font-lora">95%</div>
              <p className="text-[16px] text-[#866559]">
                Client Satisfaction Rate
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SpawellAboutus;
