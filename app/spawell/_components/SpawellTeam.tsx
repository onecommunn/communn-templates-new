"use client";

import React from "react";
import Image from "next/image";

type Member = {
  name: string;
  role: string;
  photo: string; // transparent PNGs recommended
  color?: string;
  bgColor?:string
};

const TEAM: Member[] = [
  {
    name: "Brooklyn Simmons",
    role: "Spa Director",
    photo: "/assets/spawell-team-image-1.png",
  },
  {
    name: "Leslie Alexander",
    role: "Senior Esthetician",
    photo: "/assets/spawell-team-image-2.png",
  },
  {
    name: "Ronald Richards",
    role: "Facial Expert",
    photo: "/assets/spawell-team-image-3.png",
  },
  {
    name: "Darlene Robertson",
    role: "Wellness Coach",
    photo: "/assets/spawell-team-image-4.png",
  },
];

const Card: React.FC<Member> = ({ name, role, photo, color,bgColor }) => (
  <div
    className="group relative overflow-hidden rounded-[22px] bg-[var(--neu)] p-5 pb-0 pt-6 shadow-sm ring-1 ring-[var(--neu)]/60
               transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md"
    style={
      {
        "--pri": color,
        "--neu":bgColor
      } as React.CSSProperties
    }
  >
    <div className="px-1 text-center">
      <h3 className="text-lg font-bold text-[var(--pri)]">{name}</h3>
      <p className="mt-1 text-[16px] text-[var(--pri)]">{role}</p>
    </div>

    {/* Photo anchored to bottom */}
    <div className="relative mt-4 h-56 md:h-100">
      <Image
        src={photo}
        alt={name}
        fill
        className="object-contain object-bottom transition-transform duration-300 group-hover:scale-[1.03]"
        sizes="(max-width: 640px) 80vw, (max-width: 1024px) 45vw, 22vw"
        priority={false}
      />
    </div>
  </div>
);

const SpawellTeam = ({
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
        <div className="mb-2 flex justify-center">
          <span className="text-[16px] text-[var(--pri)] font-lora">
            • Our Team
          </span>
        </div>

        {/* Heading */}
        <div className="text-center">
          <h2 className="text-3xl font-semibold tracking-[-0.02em] text-[var(--pri)] md:text-5xl">
            Our team, your partners in
          </h2>
          <p className="mt-1 text-2xl font-lora italic text-[var(--pri)]/90 md:text-[34px]">
            holistic wellness
          </p>
        </div>

        {/* Grid */}
        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {TEAM.map((m) => (
            <Card key={m.name} {...m} color={primaryColor} bgColor={neutralColor}/>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SpawellTeam;
