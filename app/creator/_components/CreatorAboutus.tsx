import CreatorSectionHeader from "@/components/CustomComponents/Creator/CreatorSectionHeader";
import { Button } from "@/components/ui/button";
import type { TwoColumnSection } from "@/models/templates/creator/creator-home.model";
import { ArrowRight, CheckCheck } from "lucide-react";
import React from "react";

type Props = {
  data: TwoColumnSection;
  primaryColor: string;
  secondaryColor: string;
};

const fallbackMedia = [
  "/assets/colImage1.png",
  "/assets/colImage2.png",
  "/assets/colImage3.png",
  "/assets/colImage4.png",
];

const CreatorAboutus: React.FC<Props> = ({
  data,
  primaryColor,
  secondaryColor,
}) => {
  const isMediaLeft = (data.mediaPlacement ?? "left") === "left";

  // Media (ensure 4 slots with graceful fallback)
  const media = (data.media?.length ? data.media : fallbackMedia).slice(0, 4);
  const [m1, m2, m3, m4] = [
    media[0] ?? fallbackMedia[0],
    media[1] ?? fallbackMedia[1],
    media[2] ?? fallbackMedia[2],
    media[3] ?? fallbackMedia[3],
  ];

  const bullets = data.bulletes ?? []; // NOTE: key is 'bulletes' in API
  const primaryBtn = data.buttons?.[0];

  return (
    <section
      className="pb-10 font-inter overflow-hidden"
      style={{ color: secondaryColor, backgroundColor: primaryColor }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-20">
        <CreatorSectionHeader
          title={data.heading || "Know About us"}
          textColor={secondaryColor}
          description={
            data.subHeading ||
            "Our names are Prachi & Harsh and we’re multi-passionate content creators."
          }
        />

        <div
          className={`grid md:grid-cols-2 grid-cols-1 gap-6 md:gap-10 lg:gap-28`}
        >
          {/* Text column */}
          <div
            className={`flex flex-col justify-center gap-6 ${
              isMediaLeft ? "order-2 md:order-1" : "order-2"
            }`}
          >
            {data.title && (
              <h1
                style={{ color: secondaryColor }}
                className="text-[#0C0407] font-semibold min-w-fit font-poppins text-2xl md:text-4xl lg:text-5xl/[53px] md:tracking-[-1.44px] text-left"
              >
                {data.title}
              </h1>
            )}

            {data.description && (
              <p
                style={{ color: secondaryColor }}
                className="text-[#0C0407] align-middle text-[16px]/[24px]"
              >
                {data.description}
              </p>
            )}

            {/* Bullets */}
            {bullets.length > 0 && (
              <div className="flex flex-col gap-2">
                {bullets.map((line, i) => (
                  <div
                    key={i}
                    className="flex flex-row items-start gap-2 text-left overflow-wrap"
                  >
                    <CheckCheck
                      strokeWidth={2.6}
                      size={22}
                      className="h-4 w-4 min-w-4 min-h-4 flex-shrink-0"
                    />
                    <p className="font-bold text-[16px]/[20px] break-words break-all break-anywhere overflow-wrap">
                      {line}
                    </p>
                  </div>
                ))}
              </div>
            )}

            {/* CTA */}
            {primaryBtn && (
              <a href={primaryBtn.url} aria-label={primaryBtn.label}>
                <Button
                  style={{
                    backgroundColor: secondaryColor,
                    color: primaryColor,
                  }}
                  className="cursor-pointer rounded-[12px] text-sm px-5 w-fit inline-flex items-center gap-2"
                >
                  {primaryBtn.label}
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </a>
            )}
          </div>

          {/* Media column */}
          <div
            className={`flex flex-col justify-center ${
              isMediaLeft ? "order-1 md:order-2" : "order-1"
            }`}
          >
            <div className="grid grid-cols-2 gap-4 max-w-2xl mx-auto">
              {/* Left column */}
              <div className="flex flex-col gap-4">
                {/* Top-left (near square) */}
                <div className="rounded-2xl overflow-hidden">
                  <img
                    src={m1}
                    alt="About image 1"
                    className="w-full object-cover aspect-square"
                    loading="lazy"
                  />
                </div>
                {/* Bottom-left (square) */}
                <div className="rounded-2xl overflow-hidden">
                  <img
                    src={m2}
                    alt="About image 2"
                    className="w-full object-cover aspect-square"
                    loading="lazy"
                  />
                </div>
              </div>

              {/* Right column */}
              <div className="flex flex-col gap-4">
                {/* Top-right (portrait) */}
                <div className="rounded-2xl overflow-hidden">
                  <img
                    src={m3}
                    alt="About image 3"
                    className="w-full object-cover aspect-[3/4]"
                    loading="lazy"
                  />
                </div>
                {/* Bottom-right (landscape) */}
                <div className="rounded-2xl overflow-hidden">
                  <img
                    src={m4}
                    alt="About image 4"
                    className="w-full object-cover aspect-[4/2.68]"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CreatorAboutus;
