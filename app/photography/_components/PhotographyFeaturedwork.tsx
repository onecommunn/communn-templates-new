"use client";
import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { FeaturedworkSection } from "@/models/templates/photography/photography-home-model";

const PhotographyFeaturedwork = ({ data }: { data: FeaturedworkSection }) => {
  const content = data?.content;
  return (
    <section className="relative py-32 px-4 md:px-20 overflow-hidden bg-[#121212] text-[#EFECE7]">
      <motion.div
        animate={{ scale: [1, 1.05, 1], y: [0, -10, 0] }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        className={`absolute inset-0 bg-[url(${content?.bgImage})] bg-cover bg-center`}
      />
      <div className="absolute inset-0 bg-[#121212]/75" />
      <div className="relative z-10 container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-[#FF8C1A] font-raleway text-sm uppercase tracking-[0.3em] mb-3">
              {content?.badgeText}
            </p>
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-6">
              {content?.heading?.main}{" "}
              <span className="text-[#FF8C1A] italic">
                {content?.heading?.highlight}
              </span>
            </h2>
            <p className="text-[#8c8c8c] font-raleway leading-relaxed mb-4">
              {content?.description}
            </p>
            {content?.button && (
              <Link
                href={content?.button?.link ?? "/"}
                className="inline-block border border-[#FF8C1A] text-[#FF8C1A] px-8 py-3 font-raleway text-sm uppercase tracking-widest hover:bg-[#FF8C1A] hover:text-[#0D0D0D] transition-colors"
              >
                {content?.button?.label}
              </Link>
            )}
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="grid grid-cols-2 gap-3"
          >
            {content?.images?.map((src, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.05 }}
                className={`overflow-hidden ${i % 2 === 1 ? "mt-8" : ""}`}
              >
                <img
                  src={src}
                  alt=""
                  className="w-full aspect-[3/4] object-cover"
                  loading="lazy"
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default PhotographyFeaturedwork;
