import AnimatedContent from "@/components/CustomComponents/AnimatedContent";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import React from "react";

interface RestraintServiceHeroProps {
  primaryColor: string;
  secondaryColor: string;
}

const hexToRgba = (hex: string, alpha = 1) => {
  const h = hex.replace("#", "");
  const bigint = parseInt(
    h.length === 3
      ? h
          .split("")
          .map((c) => c + c)
          .join("")
      : h,
    16
  );
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

const RestraintServiceHero = ({
  primaryColor,
  secondaryColor,
}: RestraintServiceHeroProps) => {
  return (
    <section
      className="relative flex items-center justify-center h-[60vh] bg-cover bg-right md:bg-top-left bg-no-repeat font-sora"
      style={
        {
          backgroundImage: `url(${"https://html.awaikenthemes.com/restraint/images/post-6.jpg"})`,
          ["--pri" as any]: primaryColor,
          ["--sec" as any]: secondaryColor,
        } as React.CSSProperties
      }
    >
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(
            270deg,
            ${hexToRgba(primaryColor, 0)} 0%,
            ${hexToRgba(primaryColor, 0.9)} 82.7%
          )`,
        }}
      />
      <div className="relative z-10 container mx-auto px-6 md:px-20 text-white">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr]">
          <AnimatedContent
            direction="vertical"
            distance={70}
            duration={0.85}
            stagger={0.08} // 👈 this will nicely reveal each element
            animateOpacity
          >
            <div>
              <h2 className="md:text-6xl/[72px] text-4xl font-marcellus uppercase font-normal">
                TRANSFORM YOUR LIFE THROUGH YOGA 
              </h2>
              <hr className="my-8 border border-white/20" />
              <p className="text-[16px]/[36px]">
                Discover the path to holistic well-being through yoga meditation
                practices are designed to enhance your physical strength, mental
                clarity.
              </p>
              {/* CTA buttons */}
              <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-10 mt-10">
                <Link href={"/"}>
                  <button className="group cursor-pointer relative overflow-hidden px-[20px] py-[17px] rounded-[10px] text-[16px] border transition-all duration-300 ease-out bg-[var(--sec)] text-white border-[var(--sec)] hover:bg-transparent hover:text-[white] hover:border-white hover:-translate-y-0.5 active:translate-y-0">
                    <span className="relative z-10 inline-flex items-center gap-2">
                      Get Started
                      <ArrowUpRight
                        className="h-6 w-6 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-0.5"
                        strokeWidth={2}
                      />
                    </span>
                  </button>
                </Link>
              </div>
            </div>
          </AnimatedContent>
        </div>
      </div>
    </section>
  );
};

export default RestraintServiceHero;
