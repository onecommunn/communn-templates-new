"use client";
import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";

const PhotographyFeaturedwork = () => {
  return (
    <section className="relative py-32 px-4 md:px-20 overflow-hidden bg-[#121212] text-[#EFECE7]">
      <motion.div
        animate={{ scale: [1, 1.05, 1], y: [0, -10, 0] }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=1920&q=80')] bg-cover bg-center"
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
              Featured
            </p>
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-6">
              Where Art Meets{" "}
              <span className="text-[#FF8C1A] italic">Emotion</span>
            </h2>
            <p className="text-[#8c8c8c] font-raleway leading-relaxed mb-4">
              We believe every photograph should evoke feeling. Our approach
              combines technical mastery with an intuitive sense for the
              decisive moment.
            </p>
            <p className="text-[#8c8c8c] font-raleway leading-relaxed mb-8">
              From the soft glow of golden hour to the raw energy of
              celebration, we craft images that transcend the ordinary.
            </p>
            <Link
              href="/about"
              className="inline-block border border-[#FF8C1A] text-[#FF8C1A] px-8 py-3 font-raleway text-sm uppercase tracking-widest hover:bg-[#FF8C1A] hover:text-[#0D0D0D] transition-colors"
            >
              Learn More
            </Link>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="grid grid-cols-2 gap-3"
          >
            {[
              "https://upload-community-files-new.s3.ap-south-1.amazonaws.com/uploads/wedding-7.jpg",
              "https://upload-community-files-new.s3.ap-south-1.amazonaws.com/uploads/prewedding-7.jpg",
              "https://upload-community-files-new.s3.ap-south-1.amazonaws.com/uploads/haldi-5.jpg",
              "https://upload-community-files-new.s3.ap-south-1.amazonaws.com/uploads/other-3.jpg",
            ].map((src, i) => (
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
