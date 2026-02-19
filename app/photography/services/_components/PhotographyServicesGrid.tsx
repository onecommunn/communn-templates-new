"use client"
import React from "react";
import { motion } from "framer-motion";

const services = [
  {
    title: "Candid Photography",
    img: "https://upload-community-files-new.s3.ap-south-1.amazonaws.com/uploads/wedding-1.jpg",
    desc: "Authentic, unscripted moments captured as they unfold — preserving the genuine emotions and spontaneous joy of your celebration.",
  },
  {
    title: "Traditional Photography",
    img: "https://upload-community-files-new.s3.ap-south-1.amazonaws.com/uploads/wedding-4.jpg",
    desc: "Elegantly composed portraits and group photographs that document every ritual, ceremony, and milestone with classic sophistication.",
  },
  {
    title: "Cinematography",
    img: "https://upload-community-files-new.s3.ap-south-1.amazonaws.com/uploads/wedding-6.jpg",
    desc: "Cinematic wedding films crafted with professional storytelling, seamlessly blending visuals, music, and emotion into a timeless narrative.",
  },
  {
    title: "Drone Photography",
    img: "https://upload-community-files-new.s3.ap-south-1.amazonaws.com/uploads/other-2.jpg",
    desc: "Stunning aerial perspectives that showcase the scale and beauty of your venue, décor, and celebrations from breathtaking vantage points.",
  },
  {
    title: "Pre-Wedding Shoots",
    img: "https://upload-community-files-new.s3.ap-south-1.amazonaws.com/uploads/prewedding-1.jpg",
    desc: "Romantic photo and video sessions at handpicked locations, designed to capture the essence of your love story before the big day.",
  },
  {
    title: "LED Wall Setup",
    img: "https://upload-community-files-new.s3.ap-south-1.amazonaws.com/uploads/haldi-2.jpg",
    desc: "Professional large-format LED display installations that create an immersive visual backdrop for your reception and special events.",
  },
];

const PhotographyServicesGrid = () => {
  return (
    <section className="py-20 md:px-20 px-4 bg-[#121212] text-[#EFECE7]">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((service, i) => (
          <motion.div
            key={service.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.1 }}
            className="group"
          >
            <div className="aspect-[4/3] overflow-hidden mb-4">
              <img
                src={service.img}
                alt={service.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                loading="lazy"
              />
            </div>

            <h3 className="font-display text-xl font-semibold mb-2 text-[#EFECE7] group-hover:text-[#E0A24D] transition-colors duration-300">
              {service.title}
            </h3>

            <p className="text-[#8c8c8c] font-raleway text-sm leading-relaxed">
              {service.desc}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default PhotographyServicesGrid;
