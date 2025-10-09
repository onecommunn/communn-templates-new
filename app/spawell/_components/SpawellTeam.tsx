"use client";

import React from "react";
import Image from "next/image";

type Member = {
  name: string;
  role: string;
  photo: string; // transparent PNGs recommended
};

const TEAM: Member[] = [
  { name: "Brooklyn Simmons", role: "Spa Director", photo: "/assets/spawell-team-image-1.png" },
  { name: "Leslie Alexander", role: "Senior Esthetician", photo: "/assets/spawell-team-image-2.png" },
  { name: "Ronald Richards", role: "Facial Expert", photo: "/assets/spawell-team-image-3.png" },
  { name: "Darlene Robertson", role: "Wellness Coach", photo: "/assets/spawell-team-image-4.png" },
];

const Card: React.FC<Member> = ({ name, role, photo }) => (
  <div
    className="group relative overflow-hidden rounded-[22px] bg-[#F6EFE9] p-5 pb-0 pt-6 shadow-sm ring-1 ring-neutral-200/60
               transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md"
  >
    <div className="px-1 text-center">
      <h3 className="text-lg font-bold text-[#5D3222]">{name}</h3>
      <p className="mt-1 text-[16px] text-[#866559]">{role}</p>
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

const SpawellTeam: React.FC = () => {
  return (
    <section className="relative overflow-hidden bg-white py-16 md:py-24 font-plus-jakarta">
      <div className="container mx-auto px-4 sm:px-6 lg:px-20">
        {/* Eyebrow */}
        <div className="mb-2 flex justify-center">
          <span className="text-sm text-[#5D3222]">• Our Team</span>
        </div>

        {/* Heading */}
        <div className="text-center">
          <h2 className="text-3xl font-semibold tracking-[-0.02em] text-[#4b2a1d] md:text-5xl">
            Our team, your partners in
          </h2>
          <p className="mt-1 text-2xl font-lora italic text-[#4b2a1d]/90 md:text-[34px]">
            holistic wellness
          </p>
        </div>

        {/* Grid */}
        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {TEAM.map((m) => (
            <Card key={m.name} {...m} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default SpawellTeam;
