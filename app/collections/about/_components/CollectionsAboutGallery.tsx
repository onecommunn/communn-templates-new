import { Marquee } from "@/components/CustomComponents/marquee";
import React from "react";
import { GallerySection } from "@/models/templates/collections/collections-home-model";

const CollectionsAboutGallery = ({
  data,
}: {
  data: GallerySection;
}) => {
  const content = data?.content;

  // console.log(content, "content");
  return (
    <section className="py-10">
      <div className="relative">
        <Marquee className="[--duration:26s] [--gap:1.5rem]">
          {content?.media?.map((item, idx) => (
            <img
              key={idx}
              src={item}
              alt={`image-${idx}`}
              className="w-50 h-50 object-center object-cover"
            />
          ))}
        </Marquee>
      </div>
    </section>
  );
};

export default CollectionsAboutGallery;
