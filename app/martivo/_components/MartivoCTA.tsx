import { ArrowRight } from "lucide-react";
import Link from "next/link";
import React from "react";

const MartivoCTA = ({
  primaryColor,
  secondaryColor,
}: {
  primaryColor: string;
  secondaryColor: string;
}) => {
  return (
    <section
      className="relative w-full py-14 px-6 md:px-20 overflow-hidden font-lato"
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
          <h2 className="text-white text-2xl md:text-5xl font-bold">
            Your Fitness Journey Starts Here
          </h2>
          <p className="text-gray-300 mt-3 text-lg">
            Sign up & get free training tips + early access to challenges.
          </p>
        </div>
        {/* Right Input + Button */}
        <Link href={"/"} className="cursor-pointer">
          <button className="cursor-pointer group relative inline-flex items-center gap-4 rounded-full bg-[var(--sec)] px-7 py-3 text-[var(--pri)] shadow-md transition-transform duration-200 hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--pri)] focus-visible:ring-offset-2">
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
    </section>
  );
};

export default MartivoCTA;
