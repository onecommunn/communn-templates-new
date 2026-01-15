"use client";

import React, { useState } from "react";
import Image from "next/image";
import { X } from "lucide-react";

type DefaultGalleryProps = {
  gallery: string[];
};

const DefaultGallery = ({ gallery }: DefaultGalleryProps) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <section
      id="gallery"
      className="max-w-6xl mx-auto px-3 md:px-6 py-6 font-montserrat"
    >
      {/* Section Header */}
      <h2 className="text-xl md:text-2xl font-bold mb-6 text-black">Gallery</h2>

      {/* Responsive Image Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        {gallery?.map((src, index) => (
          <div
            key={index}
            onClick={() => setSelectedImage(src)}
            className="relative aspect-square overflow-hidden rounded-[2rem] shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer hover:scale-[1.02] active:scale-95"
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

      {/* Lightbox Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in duration-300"
          onClick={() => setSelectedImage(null)}
        >
          <button
            className="absolute top-6 right-6 text-white hover:text-gray-300 transition-colors z-[110] cursor-pointer"
            onClick={() => setSelectedImage(null)}
          >
            <X size={40} />
          </button>

          <div
            className="relative w-full max-w-5xl aspect-auto max-h-[90vh] overflow-hidden rounded-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={selectedImage}
              alt="Full view"
              className="w-full h-full object-contain mx-auto"
            />
          </div>
        </div>
      )}
    </section>
  );
};

export default DefaultGallery;