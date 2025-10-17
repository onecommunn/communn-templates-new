import React from "react";
import { AboutSection } from "@/models/templates/restraint/restraint-home-model";

const RestraintAboutUs = ({
  data,
  primaryColor,
  secondaryColor,
  neutralColor,
}: {
  data: AboutSection["content"];
  primaryColor: string;
  secondaryColor: string;
  neutralColor: string;
}) => {
  return (
    <section className="relative w-full min-h-[500px] bg-[#FAFBF7] py-16 flex flex-col md:flex-row items-center">
      {/* Left: Only Yoga pose image (responsive, centered) */}
      <div className="relative w-full md:w-2/5 flex items-center justify-center min-h-[400px]">
        {data.media?.[0] && (
          <img
            src={data.media[0]}
            alt={data.heading}
            className="w-[320px] h-auto object-contain"
          />
        )}
      </div>

      {/* Right: Content section */}
      <div className="w-full md:w-3/5 pl-0 md:pl-16 pr-8 flex flex-col justify-center relative z-20">
        {/* Icon and about label */}
        <div className="flex items-center gap-2 mb-3">
          {data.media?.[1] && (
            <img
              src={data.media[1]}
              alt="icon"
              className="w-5 h-5"
            />
          )}
          <span
            className="uppercase text-sm tracking-widest font-medium"
            style={{ color: neutralColor }}
          >
            {data.title}
          </span>
        </div>
        {/* Heading and subheading */}
        <h2
          className="text-[2.5rem] md:text-[3rem] font-serif font-bold mb-2"
          style={{ color: primaryColor }}
        >
          {data.heading}
          {data.subheading && (
            <span className="block text-[2rem] font-light mt-2" style={{ color: neutralColor }}>
              {data.subheading}
            </span>
          )}
        </h2>
        {/* Description */}
        {data.description && (
          <p className="text-[1.05rem] mb-6 leading-relaxed font-light" style={{ color: neutralColor }}>
            {data.description}
          </p>
        )}
        {/* List items */}
        <div className="space-y-6 mb-7">
          {data.listItems?.map((item, idx) => (
            <div key={idx} className="flex gap-4 items-start">
              {item.media && (
                <img
                  src={item.media}
                  alt={item.title}
                  className="w-9 h-9 mt-1"
                />
              )}
              <div>
                <div className="font-semibold text-[1.15rem]" style={{ color: primaryColor }}>
                  {item.title}
                </div>
                <div className="text-[1rem] font-light" style={{ color: neutralColor }}>
                  {item.description}
                </div>
              </div>
            </div>
          ))}
        </div>
        {/* CTA Button */}
        {data.buttons?.[0] && (
          <a
            href={data.buttons[0].url}
            className="inline-flex items-center px-6 py-3 rounded-md font-semibold shadow"
            style={{
              background: secondaryColor,
              color: "#fff",
              fontWeight: 500,
            }}
          >
            {data.buttons[0].label}
            <span className="ml-2">↗</span>
          </a>
        )}
      </div>
    </section>
  );
};

export default RestraintAboutUs;
