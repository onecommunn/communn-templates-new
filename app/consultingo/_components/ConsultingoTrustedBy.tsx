import React from "react";
import { Marquee } from "@/components/CustomComponents/marquee";
import { TrustedBySection } from "@/models/templates/consultingo/consultingo-home-model";

const ConsultingoTrustedBy = ({
  data,
  primaryColor,
  secondaryColor,
  neutralColor,
}: {
  data: TrustedBySection;
  primaryColor: string;
  secondaryColor: string;
  neutralColor: string;
}) => {
  const content = data?.content;
  const companies = content?.media;
  return (
    <section
      className="bg-[var(--neu)] py-10 md:py-16"
      style={
        {
          "--pri": primaryColor,
          "--sec": secondaryColor,
          "--neu": neutralColor,
        } as React.CSSProperties
      }
    >
      <div className="container mx-auto">
        {/* Section Heading */}
        <h2 className="text-center font-fraunces text-[var(--pri)] text-xl md:text-2xl mb-10">
          {content?.heading}
        </h2>

        {/* Logos Grid */}
        <div className="relative flex flex-wrap justify-center items-center gap-6 overflow-hidden">
          {/* The Masking Container */}
          <div className="w-full [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
            <Marquee className="[--duration:18s] [--gap:2rem] md:[--gap:2rem]">
              {companies?.map((company, index) => (
                <div
                  key={index}
                  className="bg-[var(--pri)]/5 px-10 py-6 rounded-full flex items-center gap-3 min-w-[180px] justify-center transition-transform hover:scale-105 cursor-default"
                >
                  <img src={company} alt={`image ${index}`} />
                </div>
              ))}
            </Marquee>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ConsultingoTrustedBy;
