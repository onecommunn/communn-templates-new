"use client"

import React from "react";
import { motion } from "framer-motion";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Manu Y T",
    text: "An absolutely fantastic experience from start to finish. Vijay and his team were incredibly patient, guiding us through every shot without ever making us feel rushed. They were also very flexible with our schedule and special requests. Our pre-wedding and wedding photos turned out absolutely stunning — we couldn't have asked for anything better.",
    rating: 5,
  },
  {
    name: "Pooja & Family",
    text: "A heartfelt thank you to the entire Vijay Photography team! Their patience and energy throughout our wedding celebrations were remarkable. Every member of the team was professional, creative, and made us feel completely at ease in front of the camera. The quality of our wedding photos exceeded all expectations — truly beautiful memories we'll cherish forever.",
    rating: 5,
  },
  {
    name: "Harshitha",
    text: "Every single moment was captured with such beauty and grace — the team truly has an incredible eye for detail. Our wedding day went seamlessly thanks to their coordination, and the final photos were nothing short of breathtaking. Without a doubt, the best photography team in town.",
    rating: 5,
  },
  {
    name: "Akshay",
    text: "A special thanks to the Vijay Photography team for capturing our most cherished moments so beautifully. Their dedication, effort, and attention to detail throughout the entire event were truly commendable. Highly recommended for anyone looking for exceptional wedding photography.",
    rating: 5,
  },
];

const PhotographyTestimonials = () => {
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
            Testimonials
          </p>

          <h2 className="font-display text-4xl md:text-5xl font-bold">
            What Our Clients Say
          </h2>

          <div className="w-20 h-px bg-[#E0A24D] mx-auto mt-6" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {testimonials.map((t, i) => (
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
