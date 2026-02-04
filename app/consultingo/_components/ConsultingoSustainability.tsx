"use client";
import { SustainabilitySection } from "@/models/templates/consultingo/consultingo-home-model";
import { ChevronDown, ChevronUp } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";

interface AccordionItem {
  title: string;
  content: string;
}

const ConsultingoSustainability = ({
  data,
  primaryColor,
  secondaryColor,
  neutralColor,
}: {
  data: SustainabilitySection;
  primaryColor: string;
  secondaryColor: string;
  neutralColor: string;
}) => {
  const content = data?.content
  const [openIndex, setOpenIndex] = useState<number>(0);

  const accordionData: AccordionItem[] = content?.accordionData

  return (
    <section
      className="bg-[var(--neu)] py-20 px-6 md:px-20 font-lexend overflow-hidden"
      style={
        {
          "--pri": primaryColor,
          "--sec": secondaryColor,
          "--neu": neutralColor,
        } as React.CSSProperties
      }
    >
      <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Left Column: Text & Accordion */}
        <div className="max-w-xl">
          <h2 className="text-3xl md:text-[52px] font-fraunces text-[var(--sec)] leading-tight mb-12">
            {content?.heading}
          </h2>

          <div className="space-y-4">
            {accordionData.map((item, index) => (
              <div
                key={index}
                className={`rounded-2xl p-6 transition-all duration-300 ${
                  openIndex === index
                    ? "bg-[var(--pri)]/5  border border-[#0000001A]"
                    : "bg-transparent border-b rounded-none border-[var(--sec)]/10"
                }`}
              >
                <button
                  onClick={() => setOpenIndex(index)}
                  className="w-full flex items-center justify-between text-left group"
                >
                  <span
                    className={`text-[16px] md:text-xl font-bold transition-colors ${
                      openIndex === index
                        ? "text-[var(--pri)]"
                        : "text-[var(--sec)] group-hover:text-[var(--pri)]"
                    }`}
                  >
                    {item.title}
                  </span>
                  {openIndex === index ? (
                    <ChevronUp className="text-[var(--pri)]" size={20} />
                  ) : (
                    <ChevronDown className="text-[var(--sec)]" size={20} />
                  )}
                </button>

                {openIndex === index && (
                  <p className="mt-4 text-[var(--sec)]/70 leading-relaxed text-sm md:text-base animate-in fade-in slide-in-from-top-2 duration-300">
                    {item.content}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Overlapping Images */}
        <div className="relative flex items-center justify-center gap-10">
          {/* Main Image Container (Pill Shaped) */}
          <div className="relative w-[170px] h-[340px] md:w-[280px] md:h-[555px] rounded-full overflow-hidden">
            <Image
              src={content?.media?.[0] ?? "https://upload-community-files-new.s3.ap-south-1.amazonaws.com/uploads/19f8aef3de92d452f912a8ab8e16372ea1390101.jpg"}
              alt="Team collaboration"
              fill
              className="object-cover"
            />
          </div>
          <div className="relative w-[170px] h-[340px] md:w-[280px] md:h-[555px] rounded-full overflow-hidden">
            <Image
              src={content?.media?.[1] ?? "https://upload-community-files-new.s3.ap-south-1.amazonaws.com/uploads/5390886f0214160e877c040aab7182c66242a2a2.jpg"}
              alt="Team collaboration"
              fill
              className="object-cover"
              unoptimized
            />
          </div>

          {/* Experience Badge (White Circle) */}
          <div className="absolute md:gap-2 z-20 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[140px] h-[140px] md:w-56 md:h-56 bg-white rounded-full flex flex-col items-center justify-center text-center shadow-lg border-4 border-[var(--neu)]">
            <span className="text-2xl md:text-5xl font-fraunces text-[var(--pri)] mb-1">
              {content?.experienceBadge?.value}
            </span>
            <span className="text-xs md:text-sm font-bold text-[var(--sec)] uppercase tracking-wider leading-tight">
              {content?.experienceBadge?.label}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ConsultingoSustainability;
