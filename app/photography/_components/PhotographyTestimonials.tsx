"use client";

import React from "react";
import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { TestimonialsSection } from "@/models/templates/photography/photography-home-model";

const PhotographyTestimonials = ({ data }: { data: TestimonialsSection }) => {
  const content = data?.content
  return (
    <section className="py-24 px-4 md:px-20 bg-[#1a1a1a] text-[#EFECE7]">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p className="text-[#E0A24D] font-raleway text-sm uppercase tracking-[0.3em] mb-3">
            {content?.badgeText}
          </p>

          <h2 className="font-display text-4xl md:text-5xl font-bold">
            {content?.heading}
          </h2>

          <div className="w-20 h-px bg-[#E0A24D] mx-auto mt-6" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {content?.testimonials?.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="bg-[#1f1f1f] border border-[#2e2e2e] p-8"
            >
              <div className="flex gap-1 mb-4">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <Star
                    key={j}
                    size={16}
                    className="fill-[#E0A24D] text-[#E0A24D]"
                  />
                ))}
              </div>

              <p className="text-[#EFECE7]/80 font-raleway text-sm leading-relaxed mb-6 italic">
                "{t.text}"
              </p>

              <p className="font-display text-lg font-semibold text-[#E0A24D]">
                {t.name}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PhotographyTestimonials;
