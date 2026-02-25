"use client";
import React from "react";
import { motion } from "framer-motion";
import { MapPin, Phone } from "lucide-react";
import { BioSection } from "@/models/templates/photography/photography-about-model";

const PhotographyBio = ({ data }: { data: BioSection }) => {
  const content = data?.content;
  return (
    <section className="py-20 px-4 md:px-20 bg-[#121212] text-[#EFECE7]">
      <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="aspect-[3/4] overflow-hidden">
            <img
              src={
                content?.image ??
                "https://upload-community-files-new.s3.ap-south-1.amazonaws.com/uploads/vijay-portrait.png"
              }
              alt={content?.badgeText}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <p className="text-[#E0A24D] font-raleway text-sm uppercase tracking-[0.3em] mb-3">
            {content?.badgeText}
          </p>

          <h2 className="font-display text-4xl font-bold mb-2 text-[#EFECE7]">
            {content?.name}
          </h2>

          <p className="text-[#8c8c8c] font-raleway text-sm mb-6">
            {content?.designation}
          </p>

          <p className="text-[#8c8c8c] font-raleway leading-relaxed mb-4">
            {content?.description}
          </p>

          <div className="space-y-3 mt-6">
            {content?.contacts?.map((item, idx) => (
              <div key={idx}>
                {item?.type === "location" ? (
                  <div className="flex items-center gap-3 text-[#8c8c8c] font-raleway text-sm">
                    <MapPin size={16} className="text-[#E0A24D]" />
                    {item?.value}
                  </div>
                ) : (
                  <a
                    href={`tel:${item?.value}`}
                    className="flex items-center gap-3 text-[#8c8c8c] hover:text-[#E0A24D] transition-colors font-raleway text-sm"
                  >
                    <Phone size={16} className="text-[#E0A24D]" />
                    {item.value}
                  </a>
                )}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default PhotographyBio;
