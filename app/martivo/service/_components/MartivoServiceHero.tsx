import AnimatedContent from "@/components/CustomComponents/AnimatedContent";
import { underscoreToSpace } from "@/utils/StringFunctions";
import { Service } from "@/models/templates/martivo/martivo-home-model";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import React from "react";

const MartivoServiceHero = ({
  primaryColor,
  secondaryColor,
  data,
}: {
  primaryColor: string;
  secondaryColor: string;
  data: Service;
}) => {
  return (
    <section
      className="relative flex items-center justify-center min-h-[60vh] max-h-screen py-10 md:py-16 bg-cover bg-center bg-no-repeat font-lato"
      style={
        {
          backgroundImage: `url(${
            data?.media || "/assets/martivo-hero-bg-image.png"
          })`,
          ["--pri" as any]: primaryColor,
          ["--sec" as any]: secondaryColor,
        } as React.CSSProperties
      }
    >
      <div className="absolute inset-0 bg-[var(--pri)]/80" />
      <div className="relative z-10 container mx-auto px-6 md:px-20 h-full text-white">
        <div className="grid grid-cols-1 md:grid-cols-2 h-full">
          <AnimatedContent
            direction="vertical"
            distance={70}
            duration={0.85}
            stagger={0.08}
            animateOpacity
          >
            <div className="flex flex-col justify-center h-full">
              <h2 className="md:text-6xl/[72px] tracking-[-1.2px] text-5xl/[62px] font-semibold text-white capitalize">
                {underscoreToSpace(data?.serviceName)}
              </h2>
              <p className="text-[16px]/[36px]">{data?.description}</p>
              <Link href={"/#contact"} className="cursor-pointer">
                <button className="mt-6 cursor-pointer md:mt-10 group relative inline-flex items-center gap-4 rounded-full bg-[var(--sec)] px-7 py-3 text-[var(--pri)] shadow-md transition-transform duration-200 hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--pri)] focus-visible:ring-offset-2">
                  <span className="pointer-events-none absolute inset-1 rounded-full border-2 border-dashed border-[var(--pri)]" />
                  <span className="relative z-[1] text-lg font-medium">
                    Get Started
                  </span>
                  <span className="relative z-[1] grid h-9 w-9 place-items-center rounded-full bg-[var(--pri)] text-[var(--sec)] transition-transform duration-200 group-hover:translate-x-0.5">
                    <ArrowRight size={18} color={secondaryColor} />
                  </span>
                </button>
              </Link>
            </div>
          </AnimatedContent>
        </div>
      </div>
    </section>
  );
};

export default MartivoServiceHero;
