"use client";
import React from "react";
import { motion } from "framer-motion";
import { PackageTCsection } from "@/models/templates/photography/photography-package-model";

const PhotographyPackageTC = ({ data }: { data: PackageTCsection }) => {
  const content = data?.content;
  return (
    <section className="py-20 px-4 bg-[#121212] text-[#EFECE7]">
      <div className="container mx-auto max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h3 className="font-display text-2xl font-bold mb-6 text-center text-[#EFECE7]">
            {content?.heading}
          </h3>

          <ul className="space-y-3">
            {content?.terms?.map((term, i) => (
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
