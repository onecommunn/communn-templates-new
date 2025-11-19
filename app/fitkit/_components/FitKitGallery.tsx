import { Marquee } from "@/components/CustomComponents/marquee";
import { GallerySection } from "@/models/templates/fitkit/fitkit-home-model";
import Image from "next/image";
import React from "react";

const FitKitGallery = ({
  data,
  secondaryColor,
  primaryColor,
}: {
  data: GallerySection;
  secondaryColor: string;
  primaryColor: string;
}) => {
  const content = data?.content;
  return (
    <section
      className="font-archivo w-full overflow-hidden z-20 md:-mt-24"
      style={
        {
          "--pri": primaryColor,
          "--sec": secondaryColor,
        } as React.CSSProperties
      }
    >
      <div className="h-50 bg-[var(--sec)] w-full md:w-[80%] gallery-clip-path flex items-center">
        <Marquee className="[--duration:18s] [--gap:4rem] md:[--gap:8rem]">
          {content?.media?.map((item, idx) => (
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
