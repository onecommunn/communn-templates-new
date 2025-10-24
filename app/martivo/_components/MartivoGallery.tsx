import { Marquee } from "@/components/CustomComponents/marquee";
import { GallerySection } from "@/models/templates/martivo/martivo-home-model";
import Image from "next/image";
import React from "react";

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

const MartivoGallery = ({ data }: { data: GallerySection }) => {
  const content = data?.content;
  return (
    <section>
      <hr className="mx-10 mb-2" />
      <Marquee>
        {content?.media?.map((item, idx) => (
          <div key={idx} className="overflow-hidden rounded-xl">
            <Image
              src={item}
              alt={`image-${idx}`}
              width={195}
              height={195}
              unoptimized
            />
          </div>
        ))}
      </Marquee>
    </section>
  );
};

export default MartivoGallery;
