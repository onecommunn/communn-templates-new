"use client";
import React from "react";
import { motion } from "framer-motion";
import { MovingcollageSection } from "@/models/templates/photography/photography-home-model";

// const collageImages = [
//   "https://upload-community-files-new.s3.ap-south-1.amazonaws.com/uploads/wedding-3.jpg",
//   "https://upload-community-files-new.s3.ap-south-1.amazonaws.com/uploads/prewedding-2.jpg",
//   "https://upload-community-files-new.s3.ap-south-1.amazonaws.com/uploads/haldi-3.jpg",
//   "https://upload-community-files-new.s3.ap-south-1.amazonaws.com/uploads/wedding-7.jpg",
//   "https://upload-community-files-new.s3.ap-south-1.amazonaws.com/uploads/other-1.jpg",
//   "https://upload-community-files-new.s3.ap-south-1.amazonaws.com/uploads/prewedding-3.jpg",
//   "https://upload-community-files-new.s3.ap-south-1.amazonaws.com/uploads/wedding-8.jpg",
//   "https://upload-community-files-new.s3.ap-south-1.amazonaws.com/uploads/haldi-5.jpg",
//   "https://upload-community-files-new.s3.ap-south-1.amazonaws.com/uploads/prewedding-5.jpg",
//   "https://upload-community-files-new.s3.ap-south-1.amazonaws.com/uploads/prewedding-9.jpg",
//   "https://upload-community-files-new.s3.ap-south-1.amazonaws.com/uploads/other-3.jpg",
//   "https://upload-community-files-new.s3.ap-south-1.amazonaws.com/uploads/wedding-10.jpg",
// ];

const MarqueeRow = ({
  images,
  direction = "left",
  speed = 30,
}: {
  images: string[];
  direction?: "left" | "right";
  speed?: number;
}) => {
  const doubled = [...images, ...images];
  return (
    <div className="overflow-hidden">
      <motion.div
        className="flex gap-3"
        animate={{ x: direction === "left" ? ["0%", "-50%"] : ["-50%", "0%"] }}
        transition={{ duration: speed, repeat: Infinity, ease: "linear" }}
      >
        {doubled.map((src, i) => (
          <div
            key={i}
            className="flex-shrink-0 w-64 h-44 md:w-80 md:h-56 overflow-hidden rounded-sm"
          >
            <img
              src={src}
              alt=""
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
        ))}
      </motion.div>
    </div>
  );
};

const PhotographyMovingcollagesection = ({
  data,
}: {
  data: MovingcollageSection;
}) => {
  const content = data?.content;
  const images = content?.images || [];
  const mid = Math.ceil(images.length / 2);
  return (
    <section className="py-20 overflow-hidden bg-[#121212] text-[#EFECE7]">
      <div className="container mx-auto text-center mb-12 px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <p className="text-[#e0a346] font-raleway text-sm uppercase tracking-[0.3em] mb-3">
            {content?.badgeText}
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-bold">
            {content?.heading}
          </h2>
          <div className="w-20 h-px bg-[#e0a346] mx-auto mt-6" />
        </motion.div>
      </div>
      <div className="space-y-3">
        <MarqueeRow images={images.slice(0, mid)} direction="left" speed={35} />

        <MarqueeRow images={images.slice(mid)} direction="right" speed={40} />
      </div>
    </section>
  );
};

export default PhotographyMovingcollagesection;
