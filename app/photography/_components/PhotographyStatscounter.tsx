"use client";
import React from "react";
import { motion } from "framer-motion";
import { Camera, Image, Users } from "lucide-react";

const stats = [
  { icon: Camera, value: "1200+", label: "Photo Sessions" },
  { icon: Users, value: "300+", label: "Happy Clients" },
  { icon: Image, value: "50K+", label: "Photos Delivered" },
];

const PhotographyStatscounter = () => {
  return (
    <section className="py-20 px-4 bg-[#262626] relative overflow-hidden text-[#EFECE7]">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
        className="absolute -top-32 -right-32 w-64 h-64 border border-[#e0a346]/10 rounded-full"
      />
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
        className="absolute -bottom-20 -left-20 w-40 h-40 border border-[#e0a346]/5 rounded-full"
      />
      <div className="container mx-auto relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="text-center"
            >
              <stat.icon
                className="mx-auto mb-3 text-[#e0a346]"
                size={32}
                strokeWidth={1.5}
              />
              <p className="font-display text-3xl md:text-4xl font-bold text-[#e0a346] mb-1">
                {stat.value}
              </p>
              <p className="text-[#8c8c8c] font-raleway text-sm">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PhotographyStatscounter;
