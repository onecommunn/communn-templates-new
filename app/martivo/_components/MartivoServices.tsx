import React from "react";
import { WavyStroke } from "./Icons/WavyStroke";
import { ServiceSection } from "@/models/templates/martivo/martivo-home-model";

const COURSES = [
  {
    id: 1,
    title: "Dojo Training",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam venenatis imperdiet tortor sodales vulputate.",
    img: "/assets/martivo-courses-image-1.png",
  },
  {
    id: 2,
    title: "Kata & Techniques",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam venenatis imperdiet tortor sodales vulputate.",
    img: "/assets/martivo-courses-image-2.png",
  },
  {
    id: 3,
    title: "Bushido Spirit",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam venenatis imperdiet tortor sodales vulputate.",
    img: "/assets/martivo-courses-image-3.png",
  },
  {
    id: 4,
    title: "Kumite Sessions",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam venenatis imperdiet tortor sodales vulputate.",
    img: "/assets/martivo-courses-image-4.png",
  },
];

const MartivoServices = ({
  primaryColor,
  secondaryColor,
  data,
}: {
  primaryColor: string;
  secondaryColor: string;
  data: ServiceSection;
}) => {
  const content = data?.content
  return (
    <section
      className="relative py-16 md:py-24 font-lato bg-[var(--sec)]/10"
      style={
        {
          "--pri": primaryColor,
          "--sec": secondaryColor,
        } as React.CSSProperties
      }
      id="services"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-20">
        {/* Header */}
        <div className="mx-auto mb-10 md:max-w-lg text-center md:mb-14">
          <p className="mb-2 text-[16px] font-semibold text-[var(--sec)] uppercase">
            OUR SERVICES
          </p>
          <h2 className="text-2xl font-semibold text-slate-900 md:text-4xl">
            {content?.heading}
          </h2>

          {/* wavy accent */}
          <div className="mx-auto mt-3 flex items-center justify-center gap-3">
            <WavyStroke color={secondaryColor} size={120} />
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:gap-8">
          {content?.itemBox?.map((c, idx) => {
            const reverseOnDesktop = Math.floor(idx / 2) % 2 === 1;
            return (
              <article
                key={idx}
                className={[
                  "relative flex items-center md:items-start gap-5 rounded-2xl justify-around p-3",
                  "flex-col md:flex-row",
                  reverseOnDesktop ? "md:flex-row-reverse" : "",
                ].join(" ")}
              >
                {/* Image with soft frame */}
                <div className="relative shrink-0 rounded-xl border border-[#dddddd] border-dashed p-1">
                  <img
                    src={c.media}
                    alt={c.title}
                    className="h-full w-full rounded-lg object-cover md:h-48 md:w-48"
                  />

                  {/* orange number chip */}
                  <div className="absolute -left-2 -top-2 grid h-7 w-7 place-items-center rounded-full bg-[var(--sec)] text-[11px] font-semibold text-white shadow-md ring-4 ring-white">
                    {String(idx+1).padStart(2, "0")}
                  </div>
                </div>

                {/* Copy */}
                <div className="pt-1">
                  <h3 className="mb-1 text-lg font-semibold text-slate-900">
                    {c.title}
                  </h3>
                  <p className="mb-3 max-w-[48ch] text-sm leading-6 text-slate-600">
                    {c.description}
                  </p>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default MartivoServices;
