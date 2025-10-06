import React from "react";
import {
  ScrollVelocityContainer,
  ScrollVelocityRow,
} from "@/components/CustomComponents/scroll-based-velocity";
import { Collaboration } from "@/models/templates/yogana/yogana-home-model";

type Props = {
  data: Collaboration;
  baseVelocity?: number; // optional override
  direction?: 1 | -1; // optional override
  primaryColor: string;
  secondaryColor: string;
  neutralColor: string;
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

const YoganaCollaboration: React.FC<Props> = ({
  data,
  baseVelocity = 6,
  direction = 1,
  primaryColor,
  secondaryColor,
  neutralColor
}) => {
  const heading = data?.heading ?? "";
  const logos = (data.media?.length ? data.media : FALLBACK_LOGOS).map(
    normalizeUrl
  );

  return (
    <section
      className="py-10 font-cormorant bg-[#C2A74E1A]"
      // style={{
      //   backgroundColor: `${primaryColor}1A`,
      // }}
    >
      <div className="mx-auto w-full">
        <div className="text-center mx-auto px-4 sm:px-6 lg:px-20">
          <p
            style={{ color: primaryColor }}
            className={`text-[#C2A74E] font-alex-brush text-3xl`}
          >
            Our Clients
          </p>
          <h2
            style={{ color: secondaryColor }}
            className={`text-black font-cormorant text-[40px] md:text-[60px]/[60px] font-semibold`}
          >
            {heading}
          </h2>

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

export default YoganaCollaboration;
