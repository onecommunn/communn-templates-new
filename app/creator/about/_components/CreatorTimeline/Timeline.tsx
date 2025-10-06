"use client";
import React from "react";

type Step = {
  id: number | string;
  title: string; // e.g., "Started My Journey - 2014"
  subtitle?: string; // e.g., "Began my first coaching certificate"
};

type Props = {
  steps: Step[];
  className?: string;
  secondaryColor: string;
  primaryColor: string;
};

export default function Timeline({
  steps,
  className,
  primaryColor,
  secondaryColor,
}: Props) {
  return (
    <section className={className}>
      <div>
        <div className="relative mt-12">
          {/* dotted line behind the steps */}
          <div
            style={{
              background: `repeating-linear-gradient(90deg, ${secondaryColor} 0 2px, transparent 2px 12px)`,
            }}
            className="md:block hidden absolute -top-6 left-[calc(50%/4)] right-[calc(50%/4)] 
                  h-[2px] 
                  bg-[repeating-linear-gradient(90deg,theme(colors.gray.300)_0_2px,transparent_2px_12px)]"
          />
          {/* Vertical dotted line: from center of #1 circle to center of last */}
          <div
            style={{
              background: `repeating-linear-gradient(90deg, ${secondaryColor} 0 2px, transparent 2px 12px)`,
            }}
            className="absolute md:hidden left-[50%] top-5 bottom-18 w-[2px] 
                    bg-[repeating-linear-gradient(to_bottom,theme(colors.gray.300)_0_2px,transparent_2px_10px)]"
          />

          <div className="grid grid-cols-1 md:grid-cols-4 gap-20 md:gap-8 relative">
            {steps.map((s, idx) => (
              <div key={s.id} className="relative">
                {/* Numbered circle */}
                <div className="absolute md:-top-12 left-1/2 -translate-x-1/2">
                  <div
                    style={{
                      backgroundColor: primaryColor,
                      color: secondaryColor,
                      boxShadow: `0 0 0 1px ${secondaryColor}`,
                    }}
                    className="h-12 w-12 rounded-full bg-white shadow 
                          ring-1 ring-gray-200 flex items-center justify-center"
                  >
                    <span
                      className="text-lg font-semibold text-gray-800"
                      style={{ color: secondaryColor }}
                    >
                      {(idx + 1).toString().padStart(2, "0")}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <h4
                  className="font-semibold text-gray-900 text-center mt-20 md:mt-6"
                  style={{ color: secondaryColor }}
                >
                  {s.title}
                </h4>
                {s.subtitle && (
                  <p
                    className="mt-1 text-sm text-gray-500 text-center"
                    style={{ color: secondaryColor }}
                  >
                    {s.subtitle}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
