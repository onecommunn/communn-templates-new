"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import React from "react";
import { CTASection } from "@/models/templates/photography/photography-home-model";

const PhotographyCTA = ({ data }: { data: CTASection }) => {
  const content = data?.content;
  return (
    <section className="relative py-32 px-4 overflow-hidden">
      <motion.div
        animate={{ scale: [1, 1.06, 1], x: [0, -8, 5, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${content?.bgImage})`,
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
            {content?.heading}
          </h2>

          <p className="text-[#8c8c8c] font-raleway text-lg mb-8 max-w-xl mx-auto">
            {content?.description}
          </p>

          {content?.button && (
            <Link
              href={content?.button?.link ?? "/"}
              className="inline-block bg-[#E0A24D] text-[#0d0d0d] px-10 py-4 font-raleway text-sm uppercase tracking-widest hover:bg-[#E0A24D]/90 transition-colors"
            >
              {content?.button?.label}
            </Link>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default PhotographyCTA;
