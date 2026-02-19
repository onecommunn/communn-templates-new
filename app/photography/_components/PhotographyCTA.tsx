"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import React from "react";

const PhotographyCTA = () => {
  return (
    <section className="relative py-32 px-4 overflow-hidden">
      <motion.div
        animate={{ scale: [1, 1.06, 1], x: [0, -8, 5, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(https://upload-community-files-new.s3.ap-south-1.amazonaws.com/uploads/prewedding-1.jpg)`,
        }}
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-[#121212]/80" />

      <div className="relative z-10 container mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-6 text-[#EFECE7]">
            Ready to Create Something Beautiful?
          </h2>

          <p className="text-[#8c8c8c] font-raleway text-lg mb-8 max-w-xl mx-auto">
            Let's discuss your vision and bring it to life through stunning
            photography.
          </p>

          <Link
            href="/contact"
            className="inline-block bg-[#E0A24D] text-[#0d0d0d] px-10 py-4 font-raleway text-sm uppercase tracking-widest hover:bg-[#E0A24D]/90 transition-colors"
          >
            Book a Session
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default PhotographyCTA;
