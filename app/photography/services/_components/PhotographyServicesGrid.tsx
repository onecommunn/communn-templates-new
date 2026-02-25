"use client";
import React from "react";
import { motion } from "framer-motion";
import { ServiceSection } from "@/models/templates/photography/photography-services-model";

const PhotographyServicesGrid = ({ data }: { data: ServiceSection }) => {
  const content = data?.content;
  return (
    <section className="py-20 md:px-20 px-4 bg-[#121212] text-[#EFECE7]">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {content?.services.map((service, i) => (
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
                src={service.image}
                alt={service.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                loading="lazy"
              />
            </div>

            <h3 className="font-display text-xl font-semibold mb-2 text-[#EFECE7] group-hover:text-[#E0A24D] transition-colors duration-300">
              {service.title}
            </h3>

            <p className="text-[#8c8c8c] font-raleway text-sm leading-relaxed">
              {service.description}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default PhotographyServicesGrid;
