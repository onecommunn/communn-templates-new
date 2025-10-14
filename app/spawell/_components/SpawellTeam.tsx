"use client";

import React from "react";
import Image from "next/image";
import AnimatedContent from "@/components/CustomComponents/AnimatedContent";
import { OurTeamSection } from "@/models/templates/spawell/spawell-home-model";

type Member = {
  title: string;
  media: string;
  description: string;
  color?: string;
  bgColor?: string;
};

const Card: React.FC<Member> = ({
  title,
  media,
  description,
  color,
  bgColor,
}) => {
  return (
    <div
      className="group relative overflow-hidden rounded-[22px] bg-[var(--neu)] p-5 pb-0 pt-6 shadow-sm ring-1 ring-[var(--neu)]/60
               transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md"
      style={{ "--pri": color, "--neu": bgColor } as React.CSSProperties}
    >
      <div className="px-1 text-center">
        <h3 className="text-lg font-bold text-[var(--pri)]">{title}</h3>
        <p className="mt-1 text-[16px] text-[var(--pri)]">{description}</p>
      </div>
      <div className="relative mt-4 h-56 md:h-80">
        <Image
          src={media}
          alt={title}
          fill
          className="object-contain object-bottom transition-transform duration-300 group-hover:scale-[1.03]"
          sizes="(max-width: 640px) 80vw, (max-width: 1024px) 45vw, 22vw"
          priority={false}
        />
      </div>
    </div>
  );
};

const SpawellTeam = ({
  primaryColor,
  secondaryColor,
  neutralColor,
  data,
}: {
  primaryColor: string;
  secondaryColor: string;
  neutralColor: string;
  data: OurTeamSection;
}) => {
  const source = data?.content;
  const TEAM = source?.itemBox;  
  return (
    <section
      className="relative overflow-hidden bg-white py-16 md:py-24 font-plus-jakarta"
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
          distance={16}
          duration={0.45}
          ease="power2.out"
          delay={0.3}
        >
          <div className="mb-2 flex justify-center">
            <span className="text-[16px] text-[var(--pri)] font-lora">
              • Our Team
            </span>
          </div>
        </AnimatedContent>

        {/* Heading */}
        <AnimatedContent
          distance={36}
          duration={0.6}
          ease="power3.out"
          delay={0.3}
        >
          <div className="text-center">
            <h2 className="text-3xl font-semibold tracking-[-0.02em] text-[var(--pri)] md:text-5xl">
              {source?.heading}
            </h2>
            <p className="mt-1 text-2xl font-lora italic text-[var(--pri)]/90 md:text-[34px]">
              {source?.subHeading}
            </p>
          </div>
        </AnimatedContent>

        {/* Grid (stagger cards) */}
        <AnimatedContent
          distance={60}
          duration={0.75}
          ease="power3.out"
          stagger={0.12}
          delay={0.3}
        >
          <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {TEAM?.map((m) => (
              <Card
                key={m?.title}
                title={m?.title}
                description={m?.description}
                media={m?.media}
                color={primaryColor}
                bgColor={neutralColor}
              />
            ))}
          </div>
        </AnimatedContent>
      </div>
    </section>
  );
};

export default SpawellTeam;
