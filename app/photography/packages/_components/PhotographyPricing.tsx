"use client";
import React from "react";
import { motion } from "framer-motion";

const albumPricing = [
  { sheets: "30 Sheets", price: "₹8,000" },
  { sheets: "60 Sheets", price: "₹14,000" },
  { sheets: "90 Sheets", price: "₹20,000" },
];

const framePricing = [
  { size: '12" x 18"', price: "₹1,000" },
  { size: '16" x 24"', price: "₹1,300" },
  { size: '20" x 30"', price: "₹2,800" },
  { size: '24" x 36"', price: "₹3,500" },
];

const PhotographyPricing = () => {
  return (
    <section className="py-20 px-4 bg-[#121212] text-[#EFECE7]">
      <div className="container mx-auto max-w-4xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Album Book */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="font-display text-2xl font-bold mb-6 text-center text-[#EFECE7]">
              Album Book
            </h3>

            <div className="border border-[#2A2A2A] bg-[#1A1A1A] overflow-hidden">
              {/* Header */}
              <div className="grid grid-cols-2 bg-[#E0A24D] text-[#121212] font-body text-sm font-semibold">
                <div className="p-3">Sheets</div>
                <div className="p-3 text-right">Price</div>
              </div>

              {/* Rows */}
              {albumPricing.map((item) => (
                <div
                  key={item.sheets}
                  className="grid grid-cols-2 border-t border-[#2A2A2A] font-body text-sm"
                >
                  <div className="p-3 text-[#8c8c8c]">{item.sheets}</div>
                  <div className="p-3 text-right text-[#E0A24D] font-semibold">
                    {item.price}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Photo Frames */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <h3 className="font-display text-2xl font-bold mb-6 text-center text-[#EFECE7]">
              Photo Frames
            </h3>

            <div className="border border-[#2A2A2A] bg-[#1A1A1A] overflow-hidden">
              {/* Header */}
              <div className="grid grid-cols-2 bg-[#E0A24D] text-[#121212] font-body text-sm font-semibold">
                <div className="p-3">Size</div>
                <div className="p-3 text-right">Price</div>
              </div>

              {/* Rows */}
              {framePricing.map((item) => (
                <div
                  key={item.size}
                  className="grid grid-cols-2 border-t border-[#2A2A2A] font-body text-sm"
                >
                  <div className="p-3 text-[#8c8c8c]">{item.size}</div>
                  <div className="p-3 text-right text-[#E0A24D] font-semibold">
                    {item.price}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default PhotographyPricing;
