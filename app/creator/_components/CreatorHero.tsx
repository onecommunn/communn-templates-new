import ArcCarousel from "@/components/CustomComponents/ArcCarousel/ArcCarousel";
import { Button } from "@/components/ui/button";
import type { HeroSection } from "@/models/templates/creator/creator-home.model";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import React from "react";

type Props = {
  data: HeroSection;
  primaryColor: string;
  secondaryColor: string;
};

const fallbackMedia = [
  "/assets/slideImage1.jpg",
  "/assets/slideImage2.jpg",
  "/assets/slideImage3.jpg",
  "/assets/slideImage4.jpg",
  "/assets/slideImage5.jpg",
];

const CreatorHero: React.FC<Props> = ({
  data,
  primaryColor,
  secondaryColor,
}) => {
  const media = (data.media?.length ? data.media : fallbackMedia).slice(0, 12);
  const items = media.map((src, idx) => ({ id: idx + 1, src }));

  const primaryBtn = data.buttons?.[0];

  return (
    <section
      className="relative pt-16 lg:pt-32 pb-10 md:pb-0 overflow-hidden"
      style={{
        backgroundColor: primaryColor,
        color: secondaryColor,
      }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-20 relative mb-4 md:mb-0">
        <div className="max-w-4xl mx-auto text-center flex flex-col justify-center items-center gap-5">
          <h1 className="text-center font-semibold text-3xl md:text-[72px]/[79px] font-poppins md:tracking-[-3.6px]">
            {data.heading}
          </h1>

          {data.subHeading && (
            <p
              className="tracking-[-0.48px] text-black text-[16px] text-center md:max-w-[643px]"
              style={{
                color: secondaryColor,
              }}
            >
              {data.subHeading}
            </p>
          )}

          {primaryBtn && (
            <Link href={primaryBtn.url || "/"} aria-label={primaryBtn.label}>
              <Button
                className="cursor-pointer rounded-[12px] text-sm px-5 w-fit inline-flex items-center gap-2"
                style={{
                  backgroundColor: secondaryColor,
                  color: primaryColor,
                }}
              >
                {primaryBtn.label}
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          )}
        </div>
      </div>

      <ArcCarousel items={items} primaryColor={primaryColor}/>
    </section>
  );
};

export default CreatorHero;
