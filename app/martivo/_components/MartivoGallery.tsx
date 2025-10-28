import { Marquee } from "@/components/CustomComponents/marquee";
import { GallerySection } from "@/models/templates/martivo/martivo-home-model";
import Image from "next/image";
import React from "react";
import { WavyStroke } from "./Icons/WavyStroke";

const images = [
  {
    url: "/assets/martivo-gallery-image-1.png",
    name: "martivo-gallery-image-1",
  },
  {
    url: "/assets/martivo-gallery-image-2.png",
    name: "martivo-gallery-image-2",
  },
  {
    url: "/assets/martivo-gallery-image-3.png",
    name: "martivo-gallery-image-3",
  },
  {
    url: "/assets/martivo-gallery-image-4.png",
    name: "martivo-gallery-image-4",
  },
  {
    url: "/assets/martivo-gallery-image-5.png",
    name: "martivo-gallery-image-5",
  },
];

const MartivoGallery = ({ data, secondaryColor, primaryColor }: { data: GallerySection, secondaryColor: string, primaryColor: string }) => {
  const content = data?.content;
  return (
    <section>
      <hr className="mx-10 mb-2" />
      <div className="container mx-auto px-4 sm:px-6 lg:px-20">
        {/* Header */}
        <div className="mx-auto mb-10 max-w-2xl text-center md:mb-14 mt-10">
          <p className="mb-2 text-[13px] font-semibold tracking-[0.22em] text-[var(--pri)] uppercase">
            Visual Stories
          </p>
          <h2 className="text-2xl font-semibold text-slate-900 md:text-4xl">
            Our Collection
          </h2>
          <div className="mx-auto mt-3 flex items-center justify-center">
            <WavyStroke color={primaryColor} size={120} />
          </div>
        </div>
      </div>
      <div className="mt-6">
        <Marquee>
          {content?.media?.map((item, idx) => (
            <div
              key={idx}
              className="overflow-hidden rounded-xl w-[195px] h-[195px] flex-shrink-0 mx-2 bg-gray-100"
            >
              <Image
                src={item}
                alt={`image-${idx}`}
                width={195}
                height={195}
                unoptimized
                className="object-cover w-full h-full"
              />
            </div>
          ))}
        </Marquee>
      </div>

    </section>
  );
};

export default MartivoGallery;
