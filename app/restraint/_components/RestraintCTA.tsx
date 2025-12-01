import AnimatedContent from "@/components/CustomComponents/AnimatedContent";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import React from "react";

const RestraintCTA = ({
  primaryColor,
  secondaryColor,
}: {
  primaryColor: string;
  secondaryColor: string;
}) => {
  return (
    <section
      className="relative w-full py-14 px-6 md:px-20 overflow-hidden font-sora"
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
          <h2 className="text-white text-2xl md:text-5xl font-bold font-marcellus">
            Get Started Today
          </h2>
          <p className="text-gray-300 mt-3 text-lg">
            Join thousands who’ve already taken the first step. Begin your journey now.
          </p>
        </div>
        {/* Right Input + Button */}
        <Link href={"/"}>
          <button className="group cursor-pointer relative overflow-hidden px-[20px] py-[14px] rounded-[10px] text-[16px] border transition-all duration-300 ease-out bg-[var(--sec)] text-white border-[var(--sec)] hover:bg-transparent hover:text-[white] hover:border-white hover:-translate-y-0.5 active:translate-y-0">
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
    </section>
  );
};

export default RestraintCTA;
