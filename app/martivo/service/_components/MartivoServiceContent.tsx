import React from "react";
import { WavyStroke } from "../../_components/Icons/WavyStroke";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Image from "next/image";

export interface MartivoServiceContentProps {
  align: "Left" | "Right";
  image: string;
  tag?: string;
  title: string;
  description: string;
  primaryColor: string;
  secondaryColor: string;
}

const MartivoServiceContent = ({
  align,
  image,
  tag,
  title,
  description,
  primaryColor,
  secondaryColor,
}: MartivoServiceContentProps) => {
  return (
    <section
      id="about-us"
      className="relative overflow-hidden py-10 md:pb-16 font-lato"
      style={
        {
          "--pri": primaryColor,
          "--sec": secondaryColor,
        } as React.CSSProperties
      }
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-20">
        <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-2 md:gap-20">
          {/* left */}
          <div className={`relative order-1 ${align === "Left" ? "md:order-0" : "md:order-1"}`}>
            <h2 className="mb-4 max-w-[35ch] text-2xl font-semibold text-slate-900 md:text-4xl">
              {title}
            </h2>

            {/* tiny accent line + wavy stroke */}
            <div className="mb-6 flex items-center gap-3">
              <WavyStroke color={primaryColor} size={120} />
            </div>

            <div className="space-y-4 text-sm leading-7 text-slate-600 md:text-base md:leading-8">
              <p>{description}</p>
            </div>
          </div>

          <div>
            <Image
              src={image || "/assets/fitkit-about-us-image2.png"}
              alt="fitkit-about-us-image2"
              width={683}
              height={557}
              unoptimized
              className="max-h-[557px] w-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default MartivoServiceContent;
