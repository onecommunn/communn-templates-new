import AnimatedContent from "@/components/CustomComponents/AnimatedContent";
import { useCommunity } from "@/hooks/useCommunity";
import Image from "next/image";
import React from "react";

export interface YoganaServiceContentProps {
  align: "Left" | "Right";
  image: string;
  tag?: string;
  title: string;
  description: string;
  primaryColor: string;
  secondaryColor: string;
  neutralColor: string;
}

const YoganaServiceContent = ({
  align,
  image,
  tag,
  title,
  description,
  primaryColor,
  neutralColor,
  secondaryColor,
}: YoganaServiceContentProps) => {
  const { communityId } = useCommunity();
  const isSandeepyogatherapy = communityId === "69439db7f689aa2886339d41";
  return (
    <section
      className="relative overflow-hidden py-10 md:py-16 font-cormorant"
      style={
        {
          "--pri": primaryColor,
          "--sec": secondaryColor,
          "--neu": neutralColor,
        } as React.CSSProperties
      }
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-20">
        <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-2 md:gap-20">
          {/* left */}
          <div
            className={`relative order-1 ${
              align === "Left" ? "md:order-0" : "md:order-1"
            }`}
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
              {tag && (
                <p className={` ${isSandeepyogatherapy ? "" : "font-alex-brush"} text-2xl md:text-4xl text-[var(--pri)]`}>
                  {tag}
                </p>
              )}
              <h2 className="mb-4 max-w-[35ch] text-2xl font-semibold text-slate-900 md:text-4xl">
                {title}
              </h2>
              <p className="font-plus-jakarta font-[500] text-lg italic text-[var(--neu)] my-4">
                {description}
              </p>
            </AnimatedContent>
          </div>
          <AnimatedContent
            direction="horizontal"
            reverse
            distance={80}
            duration={0.8}
            ease="power3.out"
          >
            <div>
              <Image
                src={image || "/assets/fitkit-about-us-image2.png"}
                alt="fitkit-about-us-image2"
                width={683}
                height={557}
                unoptimized
                className="max-h-[557px] w-full rounded-[28px]"
              />
            </div>
          </AnimatedContent>
        </div>
      </div>
    </section>
  );
};

export default YoganaServiceContent;
