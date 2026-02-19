"use client"
import { Camera, MapPin, Phone } from "lucide-react";
import React from "react";
import { motion } from "framer-motion";

const PhotographyHighlights = () => {
  return (
    <section className="py-20 px-4 md:px-20 bg-[#1A1A1A] text-[#EFECE7]">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: Camera,
              title: "Wedding Specialists",
              desc: "Comprehensive wedding coverage including candid, traditional, cinematic, and aerial drone photography to capture every moment.",
            },
            {
              icon: MapPin,
              title: "Pan-India Coverage",
              desc: "Headquartered in Chitradurga, Karnataka — proudly serving clients with premium photography services across the country.",
            },
            {
              icon: Phone,
              title: "Always Accessible",
              desc: "Get in touch anytime on 7022779616 or 9606177802 to discuss your upcoming celebration.",
            },
          ].map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="text-center p-8"
            >
              <item.icon
                className="mx-auto mb-4 text-[#E0A24D]"
                size={40}
                strokeWidth={1.5}
              />

              <h3 className="font-display text-xl font-semibold mb-3 text-[#EFECE7]">
                {item.title}
              </h3>

              <p className="text-[#8c8c8c] font-raleway text-sm leading-relaxed">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PhotographyHighlights;
