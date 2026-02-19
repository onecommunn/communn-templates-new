"use client"
import React from "react";
import { motion } from "framer-motion";
import { MapPin, Phone } from "lucide-react";

const PhotographyBio = () => {
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
              src={"https://upload-community-files-new.s3.ap-south-1.amazonaws.com/uploads/vijay-portrait.png"}
              alt="Vijaykumar - Founder & Director, Vijay Photography"
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
            The Photographer
          </p>

          <h2 className="font-display text-4xl font-bold mb-2 text-[#EFECE7]">
            Vijaykumar
          </h2>

          <p className="text-[#8c8c8c] font-raleway text-sm mb-6">
            Founder & Director, Vijay Photography
          </p>

          <p className="text-[#8c8c8c] font-raleway leading-relaxed mb-4">
            I'm a visual storyteller who perceives the world through light,
            shadow, and emotion. For me, photography goes far beyond capturing
            images — it's about preserving feelings, energy, and the connections
            between people. I find joy in transforming everyday moments into
            timeless works of art.
          </p>

          <p className="text-[#8c8c8c] font-raleway leading-relaxed mb-4">
            With a deep specialisation in wedding photography, we deliver our
            finest services across India from our studio in Chitradurga,
            Karnataka. Every celebration we cover is an opportunity to tell a
            unique love story through our lens.
          </p>

          <div className="space-y-3 mt-6">
            <div className="flex items-center gap-3 text-[#8c8c8c] font-raleway text-sm">
              <MapPin size={16} className="text-[#E0A24D]" />
              Chitradurga, Karnataka, India
            </div>

            <a
              href="tel:+917022779616"
              className="flex items-center gap-3 text-[#8c8c8c] hover:text-[#E0A24D] transition-colors font-raleway text-sm"
            >
              <Phone size={16} className="text-[#E0A24D]" />
              7022779616
            </a>

            <a
              href="tel:+919606177802"
              className="flex items-center gap-3 text-[#8c8c8c] hover:text-[#E0A24D] transition-colors font-raleway text-sm"
            >
              <Phone size={16} className="text-[#E0A24D]" />
              9606177802
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default PhotographyBio;
