"use client";
import React from "react";
import { motion } from "framer-motion";
const PhotographyYouTubeShowreel = () => {
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
            Showreel
          </p>

          <h2 className="font-display text-4xl md:text-5xl font-bold text-[#EFECE7]">
            Watch Our Work
          </h2>

          <div className="w-20 h-px bg-[#E0A24D] mx-auto mt-6" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              src: "https://www.youtube.com/embed/O3pi2sh-P9I",
              title: "Vijay Photography Showreel",
            },
            {
              src: "https://www.youtube.com/embed/h91fzO8U5cg",
              title: "Vijay Photography Highlights 1",
            },
            {
              src: "https://www.youtube.com/embed/ALQifuEXI_A",
              title: "Vijay Photography Highlights 2",
            },
          ].map((video, i) => (
            <motion.div
              key={video.src}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="relative w-full aspect-video overflow-hidden border border-[#2E2E2E]"
            >
              <iframe
                src={video.src}
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
