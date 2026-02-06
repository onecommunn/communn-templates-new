import { underscoreToSpace } from "@/utils/StringFunctions";
import Image from "next/image";
import React from "react";

const ConsultingoServiceHero = ({
  primaryColor,
  secondaryColor,
  neutralColor,
  data
}: {
  primaryColor: string;
  secondaryColor: string;
  neutralColor: string;
  data: { serviceName: string; description: string; image: string };
}) => {
  return (
    <section
      className="relative font-lexend bg-[var(--neu)] overflow-hidden py-10 md:py-16"
      style={
        {
          "--pri": primaryColor,
          "--sec": secondaryColor,
          "--neu": neutralColor,
        } as React.CSSProperties
      }
    >
      <div className="relative container mx-auto px-6 md:px-20 text-[var(--sec)] flex flex-col items-center">
        {/* header */}
        <div className="text-center flex flex-col items-center">
          <h1 className="text-[34px]/[40px] capitalize md:text-[62px]/[74px] leading-tight text-center font-fraunces text-[var(--pri)]">
            {underscoreToSpace(data?.serviceName)}
          </h1>
          <p className="text-base text-[var(--sec)] leading-relaxed text-center mt-2 md:max-w-[80%]">
            {data?.description}
          </p>
        </div>
        {/* Image Container */}
        <div className="relative w-full aspect-[16/8] mt-6 md:mt-12">
          <div className="relative w-full h-full rounded-full overflow-hidden border-8 border-transparent">
            <Image
              src={data?.image ?? "https://upload-community-files-new.s3.ap-south-1.amazonaws.com/uploads/1affd5e7a9471916ccd329b91ab0cd52c75152fd.jpg"}
              alt="Hero Image"
              fill
              className="object-cover"
              priority
              unoptimized
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ConsultingoServiceHero;
