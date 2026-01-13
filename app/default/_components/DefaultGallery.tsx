import React from "react";
import Image from "next/image";

const DefaultGallery = () => {
  // Array to simulate the 8 gallery images shown in the design
  const galleryImages = Array(8).fill(
    "https://upload-community-files-new.s3.ap-south-1.amazonaws.com/uploads/385291d6dda3198514ca8a5e8cc148922e4e8edc.jpg"
  );

  return (
    <section
      id="gallery"
      className="max-w-6xl mx-auto px-6 py-12 font-montserrat"
    >
      {/* Section Header */}
      <h2 className="text-2xl font-bold mb-8 text-black">Gallery</h2>

      {/* Responsive Image Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 md:mb-10">
        {galleryImages.map((src, index) => (
          <div
            key={index}
            className="relative aspect-square overflow-hidden rounded-[2rem] shadow-sm hover:shadow-md transition-shadow duration-300"
          >
            <Image
              src={src}
              alt={`Gallery image ${index + 1}`}
              fill
              className="object-cover"
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default DefaultGallery;
