import AnimatedContent from "@/components/CustomComponents/AnimatedContent";
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

const SpawellServiceHero = ({
  primaryColor,
  secondaryColor,
  neutralColor,
}: {
  primaryColor: string;
  secondaryColor: string;
  neutralColor: string;
}) => {
  return (
    <section
      className="relative flex items-center justify-center min-h-[60vh] py-10  md:py-16 bg-cover bg-center bg-no-repeat font-plus-jakarta"
      style={{
        backgroundImage: `url(${"/assets/spawell-hero-image.png"})`,
      }}
    >
      <div
        className="absolute inset-0 bg-black/40"
        style={{
          background: `linear-gradient(
      270deg,
      ${hexToRgba(primaryColor, 0)} 24.17%,
      ${hexToRgba(primaryColor, 0.9)} 80.55%
    )`,
        }}
      />
      <div
        className="relative z-10 container mx-auto px-6 md:px-20 text-white"
        style={
          {
            "--pri": primaryColor,
            "--sec": secondaryColor,
            "--neu": neutralColor,
          } as React.CSSProperties
        }
      >
        <div
          className="grid grid-cols-1 md:grid-cols-[1.5fr_1fr]"
          style={{ color: secondaryColor }}
        >
          <AnimatedContent
            distance={150}
            direction="vertical"
            reverse={false}
            duration={1.2}
            initialOpacity={0.2}
            animateOpacity
            scale={1}
            threshold={0.2}
            delay={0.3}
          >
            <div>
              <h2 className="md:text-6xl/[72px] tracking-[-1.2px] text-4xl font-semibold">
                Relax, recharge, and reconnect with inner
              </h2>
              <p className="text-lg mt-6">
                Step into a haven of calm where every treatment is designed to
                tension, renew your energy, and restore a deep sense of inner
                peace.
              </p>
              <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-10 mt-10">
                <Link href={"/"}>
                  <Button
                    className={`${"group cursor-pointer relative overflow-hidden px-[30px] py-[18px] text-[16px] font-bold border transition-all duration-300 ease-out bg-[var(--sec)] text-[var(--pri)] border-[var(--sec)] hover:bg-[var(--pri)] hover:text-[var(--sec)] hover:border-[var(--sec)] hover:-translate-y-0.5 active:translate-y-0"}`}
                  >
                    {/* shine sweep */}
                    <span className="pointer-events-none absolute inset-y-0 -left-1/2 w-[140%] -skew-x-12 bg-white/30 opacity-0 blur-[1px] transition-all duration-700 ease-out group-hover:translate-x-[140%] group-hover:opacity-100" />
                    <span className="relative z-10 inline-flex items-center gap-2">
                      Get Started
                      <ArrowUpRight
                        className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-0.5"
                        strokeWidth={2.5}
                      />
                    </span>
                  </Button>
                </Link>
              </div>
            </div>
          </AnimatedContent>
        </div>
      </div>
    </section>
  );
};

export default SpawellServiceHero;
