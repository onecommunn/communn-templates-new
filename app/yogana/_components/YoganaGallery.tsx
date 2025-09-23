import { Marquee } from "@/components/CustomComponents/marquee";
import Image from "next/image";
import React from "react";

const images = [
  {
    url: "/assets/yogana-gallery-image-1.jpg",
    name: "yogana-gallery-image-1",
  },
  {
    url: "/assets/yogana-gallery-image-2.jpg",
    name: "yogana-gallery-image-2",
  },
  {
    url: "/assets/yogana-gallery-image-3.jpg",
    name: "yogana-gallery-image-3",
  },
  {
    url: "/assets/yogana-gallery-image-4.jpg",
    name: "yogana-gallery-image-4",
  },
  {
    url: "/assets/yogana-gallery-image-5.jpg",
    name: "yogana-gallery-image-5",
  },
  {
    url: "/assets/yogana-gallery-image-6.jpg",
    name: "yogana-gallery-image-6",
  },
];
const YoganaGallery = () => {
  return (
    <section className="relative py-20 font-cormorant bg-[#C2A74E1A] overflow-hidden">
      <div
        className="absolute inset-0 -z-10 pointer-events-none select-none"
        aria-hidden="true"
      >
        <Image
          src="/assets/yogana-gallery-bg-image-1.png"
          alt=""
          role="presentation"
          width={254}
          height={360}
          priority={false}
          sizes="(max-width:1024px) 40vw, 33vw"
          className="absolute left-0 top-1/2 -translate-y-1/2 max-w-none"
          draggable={false}
        />
        <Image
          src="/assets/yogana-gallery-bg-image-2.png"
          alt=""
          role="presentation"
          width={242}
          height={360}
          priority={false}
          sizes="(max-width:1024px) 40vw, 33vw"
          className="absolute right-0 top-1/2 -translate-y-1/2 max-w-none"
          draggable={false}
        />
      </div>

      {/* heading */}
      <div className="flex items-center justify-center gap-6 md:px-10">
        <div className="h-px w-full bg-neutral-200/80" />
        <p className="font-medium text-3xl text-[#1C1A1D] min-w-fit">
          Studio Moments
        </p>
        <div className="h-px w-full bg-neutral-200/80" />
      </div>
      <div className="mt-6">
        <Marquee>
          {images.map((item, idx) => (
            <div key={idx} className="overflow-hidden rounded-xl">
              <Image
                src={item.url}
                alt={item.name}
                width={195}
                height={195}
              />
            </div>
          ))}
        </Marquee>
      </div>
    </section>
  );
};

export default YoganaGallery;
