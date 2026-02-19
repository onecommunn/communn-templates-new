"use client";
import React from "react";
import { motion } from "framer-motion";

const terms = [
  "A 90% advance payment is required at the time of booking confirmation.",
  "The remaining balance must be settled on or before the event date.",
  "Professionally edited photographs will be delivered within 10 to 15 business days.",
  "Cinematic video deliverables will be completed within 15 business days.",
  "Travel and accommodation expenses for outstation events are billed separately.",
  "Any additional hours of coverage beyond the package will be charged accordingly.",
  "All deliverables will be completed as per the agreed schedule.",
  "Payments must be made on time as per the agreed terms.",
  "Event data must be collected within 3 to 6 days after the event.",
  "The remaining balance must be cleared at the time of data collection.",
];

const PhotographyPackageTC = () => {
  return (
    <section className="py-20 px-4 bg-[#121212] text-[#EFECE7]">
      <div className="container mx-auto max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h3 className="font-display text-2xl font-bold mb-6 text-center text-[#EFECE7]">
            Terms & Conditions
          </h3>

          <ul className="space-y-3">
            {terms.map((term, i) => (
              <li
                key={i}
                className="flex items-start gap-3 text-[#8c8c8c] font-raleway text-sm leading-relaxed"
              >
                <span className="text-[#E0A24D] font-semibold mt-0.5">
                  {i + 1}.
                </span>
                {term}
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  );
};

export default PhotographyPackageTC;
