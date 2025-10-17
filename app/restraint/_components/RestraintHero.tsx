import React from "react";
import { HeroSection } from "@/models/templates/restraint/restraint-home-model";

const RestraintHero = ({
  data,
  primaryColor,
  secondaryColor,
  neutralColor,
}: {
  data: HeroSection["content"];
  primaryColor: string;
  secondaryColor: string;
  neutralColor: string;
}) => (
  <div className="max-w-6xl mx-auto px-6 py-28 relative z-20">
    <div className="max-w-2xl">
      {/* Icon + Title Row */}
      {(data.media?.[1] || data.title) && (
        <div className="flex items-center gap-3 mb-4">
          {data.media?.[1] && (
            <img
              src={data.media[1]}
              alt="Restraint icon"
              className="w-8 h-8 object-contain"
              style={{ filter: "brightness(0.95) contrast(1.1)" }}
            />
          )}
          {data.title && (
            <span className="text-base tracking-wide text-white uppercase font-semibold">
              {data.title}
            </span>
          )}
        </div>
      )}

      <h1 className="text-4xl md:text-6xl font-serif leading-tight mb-6 text-white">
        {data.heading}
      </h1>
      {data.description && (
        <p className="text-white/80 mb-8">{data.description}</p>
      )}
      <div className="flex items-center gap-4">
        {data.buttons?.map((btn, idx) =>
          idx === 0 ? (
            <a
              key={btn.label}
              href={btn.url}
              className="inline-block text-white px-5 py-3 rounded"
              style={{ background: secondaryColor }}
            >
              {btn.label}
            </a>
          ) : (
            <a
              key={btn.label}
              href={btn.url}
              className="inline-flex items-center gap-2 text-white/90"
            >
              <span className="w-10 h-10 rounded-full border border-white/40 inline-flex items-center justify-center">▶</span>
              {btn.label}
            </a>
          )
        )}
      </div>
    </div>
  </div>
);

export default RestraintHero;
