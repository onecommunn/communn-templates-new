import React from "react";
import {
  ScrollVelocityContainer,
  ScrollVelocityRow,
} from "@/components/CustomComponents/scroll-based-velocity";
import type { CollaborationSection } from "@/models/templates/creator/creator-home.model";

type Props = {
  data: CollaborationSection;
  baseVelocity?: number; // optional override
  direction?: 1 | -1; // optional override
  primaryColor: string;
  secondaryColor: string;
};

const FALLBACK_LOGOS = [
  "/assets/CollaborationLogo1.svg",
  "/assets/CollaborationLogo2.svg",
  "/assets/CollaborationLogo3.svg",
  "/assets/CollaborationLogo4.svg",
  "/assets/CollaborationLogo5.svg",
  "/assets/CollaborationLogo6.svg",
  "/assets/CollaborationLogo7.svg",
];

// Fix common copy/paste issues like "https: //example.com"
const normalizeUrl = (u: string) =>
  u
    .replace(/^https:\s*\/\//i, "https://")
    .replace(/^http:\s*\/\//i, "http://")
    .trim();

const CreatorCollaboration: React.FC<Props> = ({
  data,
  baseVelocity = 6,
  direction = 1,
  primaryColor,
  secondaryColor,
}) => {
  const heading = data?.content?.heading ?? "";
  const description =
    data?.content?.description ??
    "Get in touch with the 250+ companies who collaborate with us";

  const logos = (data?.content?.media?.length ? data?.content?.media : FALLBACK_LOGOS).map(
    normalizeUrl
  );

  return (
    <section
      className="py-10 font-inter"
      style={{ backgroundColor: primaryColor }}
    >
      <div className="mx-auto w-full">
        <div className="text-center mx-auto px-4 sm:px-6 lg:px-20">
          <h2
            className="text-3xl md:text-5xl font-bold mb-4 text-[#0C0407] font-inter"
            style={{ color: secondaryColor }}
          >
            {heading}
          </h2>
          <p
            className="text-[16px] text-[#0C0407] max-w-2xl mx-auto font-inter"
            style={{
              color: secondaryColor,
            }}
          >
            {description}
          </p>
        </div>

        <div className="relative flex w-full flex-col items-center justify-center overflow-hidden">
          <ScrollVelocityContainer className="text-4xl md:text-7xl md:leading-[5rem] font-bold tracking-[-0.02em]">
            <ScrollVelocityRow
              baseVelocity={baseVelocity}
              direction={direction}
            >
              {logos.map((src, idx) => (
                <img
                  key={`${src}-${idx}`}
                  src={src}
                  alt={`Partner logo ${idx + 1}`}
                  loading="lazy"
                  decoding="async"
                  className="mx-6 h-8 sm:h-10 md:h-12 w-auto object-contain opacity-80 hover:opacity-100 transition-opacity"
                />
              ))}
            </ScrollVelocityRow>
          </ScrollVelocityContainer>
        </div>
      </div>
    </section>
  );
};

export default CreatorCollaboration;
