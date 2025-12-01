import { Button } from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import React from "react";

const SpawellCTA = ({
  primaryColor,
  secondaryColor,
}: {
  primaryColor: string;
  secondaryColor: string;
}) => {
  return (
    <section
      className="relative w-full py-14 px-6 md:px-20 overflow-hidden font-plus-jakarta"
      style={
        {
          "--pri": primaryColor,
          "--sec": secondaryColor,
        } as React.CSSProperties
      }
    >
      <div className="mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-6 bg-[var(--pri)] p-10 rounded-3xl">
        {/* Left Text Section */}
        <div>
          <h2 className="text-white text-2xl md:text-5xl font-semibold   font-lora">
            Get Started Today
          </h2>
          <p className="text-gray-300 mt-3 text-lg">
            Join thousands who’ve already taken the first step. Begin your journey now.
          </p>
        </div>
        {/* Right Input + Button */}
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
    </section>
  );
};

export default SpawellCTA;
