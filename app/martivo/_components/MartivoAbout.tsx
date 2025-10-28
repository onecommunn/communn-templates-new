import React from "react";
import { StarIcon } from "./Icons/StarIcon";
import { SparkIcon } from "./Icons/SparkIcon";
import { WavyStroke } from "./Icons/WavyStroke";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { AboutSection } from "@/models/templates/martivo/martivo-home-model";

const MartivoAbout = ({
  primaryColor,
  secondaryColor,
  data,
}: {
  primaryColor: string;
  secondaryColor: string;
  data: AboutSection;
}) => {
  const content = data?.content;
  return (
    <section
      id="about-us"
      className="relative overflow-hidden py-20 md:pb-28 font-lato"
      style={
        {
          "--pri": primaryColor,
          "--sec": secondaryColor,
        } as React.CSSProperties
      }
    >
      {/* subtle right radial wash to echo the design */}
      <span
        className="pointer-events-none absolute -right-32 top-0 aspect-[1/1] w-[520px] rounded-full"
        style={{
          background: `radial-gradient(closest-side, ${secondaryColor}1A, transparent 70%)`,
        }}
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-20">
        <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-2 md:gap-20">
          {/* LEFT — image duo */}
          <div className="relative">
            <div className="flex items-center justify-center gap-6 md:gap-8">
              {/* Image A */}

              <figure className="relative rounded-[36px] border border-[#EDEFF3] bg-white p-2 shadow-[0_4px_30px_rgba(16,24,40,0.06)]">
                {/* top-left spark */}
                <span className="absolute -left-3 -top-3 z-[1]">
                  <StarIcon color={secondaryColor} size={56} />
                </span>
                <Image
                  src={
                    content?.media?.[0] || "/assets/martivo-courses-image-1.png"
                  }
                  alt="Martial artist pose"
                  className="h-[360px] w-full rounded-[28px] object-cover md:h-[500px] md:w-full"
                  width={620}
                  height={510}
                  unoptimized
                />
                {/* bottom-center spark */}
                <span className="absolute  -right-3 -bottom-2">
                  <SparkIcon color={secondaryColor} size={56} />
                </span>
              </figure>
            </div>
          </div>

          {/* RIGHT — copy + CTA */}
          <div className="relative">
            {/* orange wash behind text, very subtle */}
            <span
              className="pointer-events-none absolute left-20 -top-8 -z-10 hidden aspect-[1/1] w-[300px] rounded-full md:block"
              style={{
                background: `radial-gradient(closest-side, ${secondaryColor}1A, transparent 30%)`,
              }}
            />

            <p className="mb-2 text-sm font-semibold uppercase tracking-[0.18em] text-[var(--pri)]">
              {content?.heading}
            </p>

            <h2 className="mb-4 max-w-[35ch] text-2xl font-semibold text-slate-900 md:text-4xl">
              {content?.subHeading}
            </h2>

            {/* tiny accent line + wavy stroke */}
            <div className="mb-6 flex items-center gap-3">
              <WavyStroke color={primaryColor} size={120} />
            </div>

            <div className="space-y-4 text-sm leading-7 text-slate-600 md:text-base md:leading-8">
              <p>{content?.description}</p>
            </div>

            {/* CTA */}
            <Link href={content?.buttons?.[0].url || "/"} className="cursor-pointer">
              <button className="mt-6 md:mt-10 cursor-pointer group relative inline-flex items-center gap-4 rounded-full bg-[var(--pri)] px-7 py-3 text-white shadow-md transition-transform duration-200 hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F67C00] focus-visible:ring-offset-2">
                <span className="pointer-events-none absolute inset-1 rounded-full border-2 border-dashed border-white" />
                <span className="relative z-[1] text-[16px] font-medium">
                  {content?.buttons?.[0].label}
                </span>
                <span className="relative z-[1] grid h-9 w-9 place-items-center rounded-full bg-[var(--pri)] text-[var(--sec)] transition-transform duration-200 group-hover:translate-x-0.5">
                  <ArrowRight size={18} />
                </span>
              </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MartivoAbout;
