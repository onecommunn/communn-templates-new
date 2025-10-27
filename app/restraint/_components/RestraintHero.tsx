import { Button } from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import React from "react";

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

const RestraintHero = () => {
  return (
    <section
      className="relative flex items-center justify-center min-h-screen bg-cover bg-left md:bg-center bg-no-repeat font-sora"
      style={{
        backgroundImage: `url(${"/assets/restraint-hero-bg-image.png"})`,
      }}
    >
      <div
        className="absolute inset-0 bg-black/40"
        style={{
          background: `linear-gradient(
      270deg,
      ${hexToRgba("#1E1E1E00", 0)} 0%,
      ${hexToRgba("#1E1E1E00", 0.9)} 82.7%
    )`,
        }}
      />
      <div className="relative z-10 container mx-auto px-6 md:px-20 text-white">
        <div className="grid grid-cols-1 md:grid-cols-[1.5fr_1fr]">
          <div>
            <p className="uppercase text-sm mb-4">WELCOME RESTRAINT</p>
            <h2 className="md:text-6xl/[72px] text-4xl font-semibold font-marcellus uppercase">
              TRANSFORM YOUR LIFE THROUGH YOGA AND MEDITATION
            </h2>
            <hr className="my-10 border border-white/20" />
            <p className="text-[16px]">
              Discover the path to holistic well-being through yoga meditation
              practices are designed to enhance your physical strength, mental
              clarity.
            </p>
            {/* CTA buttons */}
            <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-10 mt-10">
              <Link href={"/"}>
                <button
                  className={`${"group cursor-pointer relative overflow-hidden px-[20px] py-[17px] rounded-[10px] text-[16px] border transition-all duration-300 ease-out bg-[#3D493A] text-white border-[#3D493A] hover:bg-transparent hover:text-[white] hover:border-white hover:-translate-y-0.5 active:translate-y-0"}`}
                >
                  <span className="relative z-10 inline-flex items-center gap-2">
                    Join Us Today
                    <ArrowUpRight
                      className="h-6 w-6 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-0.5"
                      strokeWidth={2}
                    />
                  </span>
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RestraintHero;
