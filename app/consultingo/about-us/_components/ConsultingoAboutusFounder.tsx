import { FounderSection } from "@/models/templates/consultingo/consultingo-aboutUs-model";
import React from "react";

const ConsultingoAboutusFounder = ({
  data,
  primaryColor,
  secondaryColor,
  neutralColor,
}: {
  data: FounderSection;
  primaryColor: string;
  secondaryColor: string;
  neutralColor: string;
}) => {
  const content = data?.content
  return (
    <section
      className="bg-[var(--neu)] py-10 md:py-16 px-6 md:px-24 font-lexend"
      style={
        {
          "--pri": primaryColor,
          "--sec": secondaryColor,
          "--neu": neutralColor,
        } as React.CSSProperties
      }
    >
      <div className="mx-auto flex flex-col md:flex-row items-center gap-10 md:max-w-7xl">
        {/* Left Content Column */}
        <div className="flex-1 order-2 md:order-1 w-full">
          <h2 className="text-[var(--sec)] text-[34px]/[40px] md:text-[54px]/[64px] font-fraunces mb-4">
            {content?.heading}
          </h2>

          <h3 className="text-[var(--pri)] text-2xl md:text-3xl font-fraunces mb-2">
            {content?.founderName}
          </h3>

          <div className="space-y-6 text-[var(--sec)]/70 text-sm md:text-base leading-relaxed ">
            <p>
              {content?.description}
            </p>
          </div>
        </div>

        {/* Right Image Column */}
        <div className="flex-1 order-1 md:order-2 flex justify-center md:justify-end">
          <div className="relative">
            {/* The Asymmetrical Oval Frame */}
            <div
              className="w-full h-full overflow-hidden bg-gray-200 max-h-[490px] max-w-full md:max-w-[410px] md:max-h-[550px]"
              style={{
                borderRadius: "45% 55% 45% 55% / 35% 35% 65% 65%",
                boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.1)",
              }}
            >
              <img
                src={content?.media ?? "https://upload-community-files-new.s3.ap-south-1.amazonaws.com/uploads/38cd91882db3abc591bbc3a1903984f920d5abc6.jpg"}
                alt={content?.founderName}
                className="w-full h-full object-cover scale-110"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ConsultingoAboutusFounder;
