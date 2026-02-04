import { HeroSection } from "@/models/templates/consultingo/consultingo-home-model";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { LuCalendarDays } from "react-icons/lu";

const ConsultingoHero = ({
  data,
  primaryColor,
  secondaryColor,
  neutralColor,
}: {
  data: HeroSection;
  primaryColor: string;
  secondaryColor: string;
  neutralColor: string;
}) => {
  const content = data?.content;

  const percentage = content?.floatingCards?.successCard?.percentage ?? 0;
  const radius = 20;
  const circumference = 2 * Math.PI * radius;
  const visualGap = circumference * 0.02;
  const strokeOffset = circumference * (1 - percentage / 100) + visualGap;

  return (
    <section
      className="relative font-lexend bg-[var(--neu)] overflow-hidden py-16"
      style={
        {
          "--pri": primaryColor,
          "--sec": secondaryColor,
          "--neu": neutralColor,
        } as React.CSSProperties
      }
    >
      <div className="relative container mx-auto px-6 md:px-20 text-[var(--sec)] flex flex-col items-center">
        {/* Main Heading */}
        <h1 className="text-4xl md:text-[84px] leading-tight text-center font-fraunces text-[var(--pri)] mb-6 md:mb-12">
          {content?.heading}
        </h1>

        {/* Image Container with Floating Cards */}
        <div className="relative w-full aspect-[16/8] mb-6 md:mb-12">
          <div className="relative w-full h-full rounded-full overflow-hidden border-8 border-transparent">
            <Image
              src={
                content?.heroImage ??
                "https://upload-community-files-new.s3.ap-south-1.amazonaws.com/uploads/1affd5e7a9471916ccd329b91ab0cd52c75152fd.jpg"
              }
              alt="Hero Image"
              fill
              className="object-cover"
              priority
              unoptimized
            />
          </div>

          {/* Left Floating Card: Consultant Session */}
          <div className="hidden md:flex  absolute top-[10%] -left-4 md:left-4 bg-white rounded-2xl p-4 shadow-lg gap-4 items-start max-w-[335px]">
            <div className="bg-[var(--pri)] text-white rounded-lg p-2 text-center min-w-[50px]">
              <p className="text-sm font-bold">
                {content?.floatingCards?.sessionCard?.date}
              </p>
              <p className="text-[10px] uppercase">
                {content?.floatingCards?.sessionCard?.month}
              </p>
            </div>
            <div>
              <h3 className="text-sm font-bold text-[var(--sec)]">
                {content?.floatingCards?.sessionCard?.title}
              </h3>
              <p className="text-[10px] text-[var(--pri)] mb-2">
                {content?.floatingCards?.sessionCard?.subtitle}
              </p>
              <div className="flex items-center gap-2">
                <span className="bg-[#fcf6e8] text-[var(--pri)] text-[8px] px-2 py-0.5 rounded font-bold">
                  {content?.floatingCards?.sessionCard?.tag}
                </span>
                <p className="text-[10px] text-gray-500">
                  {content?.floatingCards?.sessionCard?.detail}
                </p>
              </div>
            </div>
          </div>

          {/* Right Floating Card: Success Ratio */}
          <div className="hidden md:flex absolute bottom-[15%] -right-4 md:right-10 bg-white rounded-2xl p-4 shadow-lg items-center gap-4 min-w-[180px]">
            <div className="relative w-12 h-12 flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90">
                {/* background circle */}
                <circle
                  cx="24"
                  cy="24"
                  r={radius}
                  stroke="#f3ede0"
                  strokeWidth="4"
                  fill="transparent"
                />

                {/* progress circle */}
                <circle
                  cx="24"
                  cy="24"
                  r={radius}
                  stroke={primaryColor}
                  strokeWidth="4"
                  fill="transparent"
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeOffset}
                  strokeLinecap="round"
                  className="transition-all duration-700 ease-out"
                />
              </svg>

              {/* center dot */}
              <div className="absolute w-1.5 h-1.5 bg-[var(--pri)] rounded-full"></div>
            </div>

            <div>
              <p className="text-2xl font-bold text-[var(--sec)]">{percentage}%</p>
              <p className="text-xs text-gray-500">
                {content?.floatingCards?.successCard?.label}
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Content: Description and Buttons */}
        <div className="max-w-2xl text-center">
          <p className="text-lg md:text-xl text-[var(--sec)] leading-relaxed mb-10">
            {content?.description}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href={content?.actions?.[0]?.link}
              className="bg-[var(--pri)]/90 text-white px-8 py-3 rounded-full flex items-center gap-2 hover:bg-[var(--pri)] transition-colors"
            >
              <LuCalendarDays className="text-xl" />
              <span className="font-medium">
                {content?.actions?.[0]?.label}
              </span>
            </Link>
            <Link
              href={content?.actions?.[1]?.link ?? "/"}
              className="bg-white border border-[var(--pri)] text-[var(--pri)] px-10 py-3 rounded-full hover:bg-[var(--neu)] transition-colors font-medium"
            >
              {content?.actions?.[1]?.label}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ConsultingoHero;
