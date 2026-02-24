"use client";
import React from "react";
import { motion } from "framer-motion";
import { YouTubeShowreelSection } from "@/models/templates/photography/photography-home-model";
const PhotographyYouTubeShowreel = ({
  data,
}: {
  data: YouTubeShowreelSection;
}) => {
  const content = data?.content;
  return (
    <section className="py-20 px-4 bg-[#121212] text-[#EFECE7]">
      <div className="container mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <p className="text-[#E0A24D] font-raleway text-sm uppercase tracking-[0.3em] mb-3">
            {content?.badgeText}
          </p>

          <h2 className="font-display text-4xl md:text-5xl font-bold text-[#EFECE7]">
            {content?.heading}
          </h2>

          <div className="w-20 h-px bg-[#E0A24D] mx-auto mt-6" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {content?.videos?.map((video, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="relative w-full aspect-video overflow-hidden border border-[#2E2E2E]"
            >
              <iframe
                src={video.embedUrl}
                title={video.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 w-full h-full"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PhotographyYouTubeShowreel;
