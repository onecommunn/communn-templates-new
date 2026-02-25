"use client";
import React from "react";
import { motion } from "framer-motion";
import { PricingSection } from "@/models/templates/photography/photography-package-model";

const PhotographyPricing = ({ data }: { data: PricingSection }) => {
  const content = data?.content;
  return (
    <section className="py-20 px-4 bg-[#121212] text-[#EFECE7]">
      <div className="container mx-auto max-w-4xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {content?.tables?.map((item, idx) => (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              key={idx}
            >
              <h3 className="font-display text-2xl font-bold mb-6 text-center text-[#EFECE7]">
                {item?.title}
              </h3>

              <div className="border border-[#2A2A2A] bg-[#1A1A1A] overflow-hidden">
                {/* Header */}
                <div className="grid grid-cols-2 bg-[#E0A24D] text-[#121212] font-body text-sm font-semibold">
                  <div className="p-3">{item?.columnOneLabel}</div>
                  <div className="p-3 text-right">{item?.columnTwoLabel}</div>
                </div>

                {/* Rows */}
                {item?.items?.map((i,idx) => (
                  <div
                    key={idx}
                    className="grid grid-cols-2 border-t border-[#2A2A2A] font-body text-sm"
                  >
                    <div className="p-3 text-[#8c8c8c]">{i?.label}</div>
                    <div className="p-3 text-right text-[#E0A24D] font-semibold">
                      {i?.price}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PhotographyPricing;
