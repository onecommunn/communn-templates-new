"use client"
import React from "react";
import { motion } from "framer-motion";

const PhotographyServicespreview = () => {
  return (
    <section className="py-24 px-4 md:px-20 bg-[#121212] text-[#EFECE7]">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p className="text-[#E0A24D] font-raleway text-sm uppercase tracking-[0.3em] mb-3">
            What We Do
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-bold">
            Our Services
          </h2>
          <div className="w-20 h-px bg-[#E0A24D] mx-auto mt-6" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: "Candid & Traditional Photography",
              img: "https://upload-community-files-new.s3.ap-south-1.amazonaws.com/uploads/wedding-3.jpg",
              desc: "Timeless portraits and authentic moments from your celebration",
            },
            {
              title: "Cinematography & Drone",
              img: "https://upload-community-files-new.s3.ap-south-1.amazonaws.com/uploads/haldi-3.jpg",
              desc: "Cinematic wedding films captured from every perspective",
            },
            {
              title: "Pre-Wedding Shoots",
              img: "https://upload-community-files-new.s3.ap-south-1.amazonaws.com/uploads/prewedding-2.jpg",
              desc: "Romantic sessions that beautifully narrate your love story",
            },
          ].map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.2 }}
              className="group relative overflow-hidden"
            >
              <div className="aspect-[3/4] overflow-hidden">
                <img
                  src={service.img}
                  alt={service.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-[#000007]/90 via-[#000007]/20 to-transparent flex flex-col justify-end p-6">
                <h3 className="font-display text-2xl font-semibold mb-2">
                  {service.title}
                </h3>
                <p className="text-[#8c8c8c] font-raleway text-sm">
                  {service.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PhotographyServicespreview;
