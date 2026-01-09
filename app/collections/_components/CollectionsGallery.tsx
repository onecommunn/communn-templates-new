"use client";
import { GallerySection } from "@/models/templates/collections/collections-home-model";
import React from "react";

const CollectionsGallery = ({
  data,
}: {
  data: GallerySection;
}) => {
  const images = data?.content?.media;

  return (
    <section className="mx-auto px-4 md:px-10 py-16">
      <div className="grid grid-cols-2 md:grid-cols-10 gap-1 md:gap-2">
        {/* Column 1: Far Left (Smallest) */}
        <div className="md:col-span-1 flex flex-col gap-1 md:gap-2 h-full">
          <img
            src={images[1]}
            className="h-full w-full object-cover rounded-sm"
            alt="gallery"
          />
          <img
            src={images[2]}
            className="h-full w-full object-cover rounded-sm"
            alt="gallery"
          />
        </div>

        {/* Column 2: Inner Left (Medium) */}
        <div className="md:col-span-1 flex flex-col gap-1 md:gap-2 h-full">
          <img
            src={images[3]}
            className="h-[60%] w-full object-cover rounded-sm"
            alt="gallery"
          />
          <img
            src={images[4]}
            className="h-[40%] w-full object-cover rounded-sm"
            alt="gallery"
          />
        </div>

        {/* Column 3: THE CENTER (Large Feature) */}
        <div className="col-span-2 md:col-span-6 h-full overflow-hidden rounded-md group relative">
          <img
            src={images[0]}
            className="w-full h-full object-cover max-h-[500px]"
            alt="End of Season Sale"
          />
        </div>

        {/* Column 4: Inner Right (Medium) */}
        <div className="md:col-span-1 flex flex-col gap-1 md:gap-2 h-full">
          <img
            src={images[5]}
            className="h-[60%] w-full object-cover rounded-sm"
            alt="gallery"
          />
          <img
            src={images[6]}
            className="h-[40%] w-full object-cover rounded-sm"
            alt="gallery"
          />
        </div>

        {/* Column 5: Far Right (Smallest) */}
        <div className="md:col-span-1 flex flex-col gap-1 md:gap-2 h-full">
          <img
            src={images[7]}
            className="h-full w-full object-cover rounded-sm"
            alt="gallery"
          />
          <img
            src={images[8]}
            className="h-full w-full object-cover rounded-sm"
            alt="gallery"
          />
        </div>
      </div>
    </section>
  );
};

export default CollectionsGallery;
