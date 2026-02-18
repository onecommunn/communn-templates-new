"use client";
import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
const categories = ["All", "Pre-Wedding", "Wedding", "Haldi", "Other"];

const PhototgraphyPortfolioGallery = () => {
  const [active, setActive] = useState("All");
  const [lightbox, setLightbox] = useState<string | null>(null);
  const photos = [
    {
      src: "https://upload-community-files-new.s3.ap-south-1.amazonaws.com/uploads/prewedding-1.jpg",
      category: "Pre-Wedding",
    },
    {
      src: "https://upload-community-files-new.s3.ap-south-1.amazonaws.com/uploads/prewedding-2.jpg",
      category: "Pre-Wedding",
    },
    {
      src: "https://upload-community-files-new.s3.ap-south-1.amazonaws.com/uploads/prewedding-3.jpg",
      category: "Pre-Wedding",
    },
    {
      src: "https://upload-community-files-new.s3.ap-south-1.amazonaws.com/uploads/prewedding-4.jpg",
      category: "Pre-Wedding",
    },
    {
      src: "https://upload-community-files-new.s3.ap-south-1.amazonaws.com/uploads/prewedding-5.jpg",
      category: "Pre-Wedding",
    },
    {
      src: "https://upload-community-files-new.s3.ap-south-1.amazonaws.com/uploads/prewedding-6.jpg",
      category: "Pre-Wedding",
    },
    {
      src: "https://upload-community-files-new.s3.ap-south-1.amazonaws.com/uploads/prewedding-7.jpg",
      category: "Pre-Wedding",
    },
    {
      src: "https://upload-community-files-new.s3.ap-south-1.amazonaws.com/uploads/prewedding-8.jpg",
      category: "Pre-Wedding",
    },
    {
      src: "https://upload-community-files-new.s3.ap-south-1.amazonaws.com/uploads/prewedding-9.jpg",
      category: "Pre-Wedding",
    },
    {
      src: "https://upload-community-files-new.s3.ap-south-1.amazonaws.com/uploads/prewedding-10.jpg",
      category: "Pre-Wedding",
    },
    {
      src: "https://upload-community-files-new.s3.ap-south-1.amazonaws.com/uploads/prewedding-11.jpg",
      category: "Pre-Wedding",
    },
    {
      src: "https://upload-community-files-new.s3.ap-south-1.amazonaws.com/uploads/prewedding-12.jpg",
      category: "Pre-Wedding",
    },
    {
      src: "https://upload-community-files-new.s3.ap-south-1.amazonaws.com/uploads/prewedding-13.jpg",
      category: "Pre-Wedding",
    },
    {
      src: "https://upload-community-files-new.s3.ap-south-1.amazonaws.com/uploads/prewedding-14.jpg",
      category: "Pre-Wedding",
    },
    {
      src: "https://upload-community-files-new.s3.ap-south-1.amazonaws.com/uploads/prewedding-15.jpg",
      category: "Pre-Wedding",
    },
    {
      src: "https://upload-community-files-new.s3.ap-south-1.amazonaws.com/uploads/prewedding-16.jpg",
      category: "Pre-Wedding",
    },
    {
      src: "https://upload-community-files-new.s3.ap-south-1.amazonaws.com/uploads/prewedding-17.jpg",
      category: "Pre-Wedding",
    },
    {
      src: "https://upload-community-files-new.s3.ap-south-1.amazonaws.com/uploads/wedding-1.jpg",
      category: "Wedding",
    },
    {
      src: "https://upload-community-files-new.s3.ap-south-1.amazonaws.com/uploads/wedding-2.jpg",
      category: "Wedding",
    },
    {
      src: "https://upload-community-files-new.s3.ap-south-1.amazonaws.com/uploads/wedding-3.jpg",
      category: "Wedding",
    },
    {
      src: "https://upload-community-files-new.s3.ap-south-1.amazonaws.com/uploads/wedding-4.jpg",
      category: "Wedding",
    },
    {
      src: "https://upload-community-files-new.s3.ap-south-1.amazonaws.com/uploads/wedding-5.jpg",
      category: "Wedding",
    },
    {
      src: "https://upload-community-files-new.s3.ap-south-1.amazonaws.com/uploads/wedding-6.jpg",
      category: "Wedding",
    },
    {
      src: "https://upload-community-files-new.s3.ap-south-1.amazonaws.com/uploads/wedding-7.jpg",
      category: "Wedding",
    },
    {
      src: "https://upload-community-files-new.s3.ap-south-1.amazonaws.com/uploads/wedding-8.jpg",
      category: "Wedding",
    },
    {
      src: "https://upload-community-files-new.s3.ap-south-1.amazonaws.com/uploads/wedding-9.jpg",
      category: "Wedding",
    },
    {
      src: "https://upload-community-files-new.s3.ap-south-1.amazonaws.com/uploads/wedding-10.jpg",
      category: "Wedding",
    },
    {
      src: "https://upload-community-files-new.s3.ap-south-1.amazonaws.com/uploads/wedding-11.jpg",
      category: "Wedding",
    },
    {
      src: "https://upload-community-files-new.s3.ap-south-1.amazonaws.com/uploads/wedding-12.jpg",
      category: "Wedding",
    },
    {
      src: "https://upload-community-files-new.s3.ap-south-1.amazonaws.com/uploads/wedding-13.jpg",
      category: "Wedding",
    },
    {
      src: "https://upload-community-files-new.s3.ap-south-1.amazonaws.com/uploads/wedding-14.jpg",
      category: "Wedding",
    },
    {
      src: "https://upload-community-files-new.s3.ap-south-1.amazonaws.com/uploads/wedding-15.jpg",
      category: "Wedding",
    },
    {
      src: "https://upload-community-files-new.s3.ap-south-1.amazonaws.com/uploads/wedding-16.jpg",
      category: "Wedding",
    },
    {
      src: "https://upload-community-files-new.s3.ap-south-1.amazonaws.com/uploads/wedding-17.jpg",
      category: "Wedding",
    },
    {
      src: "https://upload-community-files-new.s3.ap-south-1.amazonaws.com/uploads/haldi-18.jpg",
      category: "Haldi",
    },
    {
      src: "https://upload-community-files-new.s3.ap-south-1.amazonaws.com/uploads/haldi-1.jpg",
      category: "Haldi",
    },
    {
      src: "https://upload-community-files-new.s3.ap-south-1.amazonaws.com/uploads/haldi-2.jpg",
      category: "Haldi",
    },
    {
      src: "https://upload-community-files-new.s3.ap-south-1.amazonaws.com/uploads/haldi-3.jpg",
      category: "Haldi",
    },
    {
      src: "https://upload-community-files-new.s3.ap-south-1.amazonaws.com/uploads/haldi-4.jpg",
      category: "Haldi",
    },
    {
      src: "https://upload-community-files-new.s3.ap-south-1.amazonaws.com/uploads/haldi-5.jpg",
      category: "Haldi",
    },
    {
      src: "https://upload-community-files-new.s3.ap-south-1.amazonaws.com/uploads/haldi-6.jpg",
      category: "Haldi",
    },
    {
      src: "https://upload-community-files-new.s3.ap-south-1.amazonaws.com/uploads/haldi-7.jpg",
      category: "Haldi",
    },
    {
      src: "https://upload-community-files-new.s3.ap-south-1.amazonaws.com/uploads/haldi-8.jpg",
      category: "Haldi",
    },
    {
      src: "https://upload-community-files-new.s3.ap-south-1.amazonaws.com/uploads/haldi-9.jpg",
      category: "Haldi",
    },
    {
      src: "https://upload-community-files-new.s3.ap-south-1.amazonaws.com/uploads/haldi-10.jpg",
      category: "Haldi",
    },
    {
      src: "https://upload-community-files-new.s3.ap-south-1.amazonaws.com/uploads/haldi-11.jpg",
      category: "Haldi",
    },
    {
      src: "https://upload-community-files-new.s3.ap-south-1.amazonaws.com/uploads/haldi-12.jpg",
      category: "Haldi",
    },
    {
      src: "https://upload-community-files-new.s3.ap-south-1.amazonaws.com/uploads/haldi-13.jpg",
      category: "Haldi",
    },
    {
      src: "https://upload-community-files-new.s3.ap-south-1.amazonaws.com/uploads/haldi-14.jpg",
      category: "Haldi",
    },
    {
      src: "https://upload-community-files-new.s3.ap-south-1.amazonaws.com/uploads/haldi-15.jpg",
      category: "Haldi",
    },
    {
      src: "https://upload-community-files-new.s3.ap-south-1.amazonaws.com/uploads/haldi-16.jpg",
      category: "Haldi",
    },
    {
      src: "https://upload-community-files-new.s3.ap-south-1.amazonaws.com/uploads/other-1.jpg",
      category: "Other",
    },
    {
      src: "https://upload-community-files-new.s3.ap-south-1.amazonaws.com/uploads/other-2.jpg",
      category: "Other",
    },
    {
      src: "https://upload-community-files-new.s3.ap-south-1.amazonaws.com/uploads/other-3.jpg",
      category: "Other",
    },
    {
      src: "https://upload-community-files-new.s3.ap-south-1.amazonaws.com/uploads/other-4.jpg",
      category: "Other",
    },
    {
      src: "https://upload-community-files-new.s3.ap-south-1.amazonaws.com/uploads/other-5.jpg",
      category: "Other",
    },
    {
      src: "https://upload-community-files-new.s3.ap-south-1.amazonaws.com/uploads/other-6.jpg",
      category: "Other",
    },
    {
      src: "https://upload-community-files-new.s3.ap-south-1.amazonaws.com/uploads/other-7.jpg",
      category: "Other",
    },
    {
      src: "https://upload-community-files-new.s3.ap-south-1.amazonaws.com/uploads/other-8.jpg",
      category: "Other",
    },
  ];
  const filtered =
    active === "All" ? photos : photos.filter((p) => p.category === active);

  return (
    <>
      {/* Filters */}
      <section className="py-8 px-4 bg-[#121212]">
        <div className="container mx-auto flex flex-wrap justify-center gap-4">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`font-raleway text-sm uppercase tracking-widest px-4 py-2 transition-colors duration-300 ${
                active === cat
                  ? "text-[#E0A24D] border-b-2 border-[#E0A24D]"
                  : "text-[#8c8c8c] hover:text-[#EFECE7]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Gallery */}
      <section className="pb-20 px-4 bg-[#121212]">
        <div className="container mx-auto">
          <motion.div
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            <AnimatePresence>
              {filtered.map((photo, i) => (
                <motion.div
                  key={photo.src}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                  className="aspect-[3/4] overflow-hidden cursor-pointer group relative"
                  onClick={() => setLightbox(photo.src)}
                >
                  <img
                    src={photo.src}
                    alt={photo.category}
                    className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                  />

                  {/* Optional premium hover overlay */}
                  <div className="absolute inset-0 bg-[#121212]/0 group-hover:bg-[#121212]/30 transition-all duration-500" />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-[#121212]/95 flex items-center justify-center p-4 backdrop-blur-sm"
            onClick={() => setLightbox(null)}
          >
            <button
              className="absolute top-6 right-6 text-[#8c8c8c] hover:text-[#EFECE7] transition-colors"
              onClick={() => setLightbox(null)}
            >
              <X size={32} />
            </button>

            <motion.img
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
              src={lightbox}
              alt="Gallery photo"
              className="max-w-full max-h-[85vh] object-contain shadow-2xl"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default PhototgraphyPortfolioGallery;
