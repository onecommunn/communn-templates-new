"use client";
import React from "react";
import { motion } from "framer-motion";

const PhotographyBreadcum = ({
  image,
  title,
  heading,
}: {
  image: string;
  title: string;
  heading: string;
}) => {
  return (
    <section className="relative pt-32 pb-20 px-4 overflow-hidden bg-[#121212] text-[#EFECE7]">
      <div
        className="absolute inset-0 bg-cover bg-center bg-fixed opacity-20"
        style={{
          backgroundImage: `url(${image})`,
        }}
      />

      <div className="relative z-10 container mx-auto text-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-[#E0A24D] font-raleway text-sm uppercase tracking-[0.3em] mb-3"
        >
          {title}
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="font-display text-5xl md:text-6xl font-bold text-[#EFECE7]"
        >
          {heading}
        </motion.h1>

        <div className="w-20 h-px bg-[#E0A24D] mx-auto mt-6" />
      </div>
    </section>
  );
};

export default PhotographyBreadcum;
