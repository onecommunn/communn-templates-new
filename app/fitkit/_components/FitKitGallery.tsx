import { Marquee } from "@/components/CustomComponents/marquee";
import Image from "next/image";
import React from "react";

const images = [
//   "/assets/fitikit-CollaborationLogo-1.svg",
//   "/assets/fitikit-CollaborationLogo-2.svg",
//   "/assets/fitikit-CollaborationLogo-3.svg",
  "/assets/fitikit-CollaborationLogo-4.svg",
  "/assets/fitikit-CollaborationLogo-5.svg",
  "/assets/fitikit-CollaborationLogo-6.svg"
];

const FitKitGallery = () => {
  return (
    <section className="font-archivo w-full overflow-hidden z-20 md:-mt-24">
      <div className="h-50 bg-red-500 w-full md:w-[80%] gallery-clip-path flex items-center">
        <Marquee className="[--duration:18s] [--gap:4rem] md:[--gap:8rem]">
          {images.map((item, idx) => (
            <Image
              src={item}
              key={`image-${idx}`}
              alt={`image-${idx}`}
              width={300}
              height={195}
              unoptimized
              className="object-cover w-full h-full"
            />
          ))}
        </Marquee>
      </div>
    </section>
  );
};

export default FitKitGallery;
