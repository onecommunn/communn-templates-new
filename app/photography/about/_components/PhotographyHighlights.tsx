"use client";
import { LucideProps } from "lucide-react";
import * as Lucide from "lucide-react";
import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { HighlightsSection } from "@/models/templates/photography/photography-about-model";

type LucideIconType = React.ComponentType<LucideProps>;

const isUrl = (value: string) =>
  /^https?:\/\//i.test(value) || value?.startsWith("/");

function getLucideIcon(name: string): LucideIconType | null {
  const lib = Lucide as unknown as Record<string, LucideIconType>;
  return lib[name] ?? null;
}

const PhotographyHighlights = ({ data }: { data: HighlightsSection }) => {
  const content = data?.content;

  return (
    <section className="py-20 px-4 md:px-20 bg-[#1A1A1A] text-[#EFECE7]">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {content?.highlights?.map((item, i) => {
            const isImageIcon = isUrl(item.icon);
            const Icon = !isImageIcon ? getLucideIcon(item.icon) : null;

            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                className="text-center p-8"
              >
                {/* ICON */}
                <div className="flex justify-center mb-4">
                  {Icon ? (
                    <Icon
                      className="text-[#E0A24D]"
                      size={40}
                      strokeWidth={1.5}
                    />
                  ) : isImageIcon ? (
                    <Image
                      src={item.icon}
                      alt={item.title}
                      width={40}
                      height={40}
                      className="object-contain"
                      unoptimized
                    />
                  ) : null}
                </div>

                {/* TITLE */}
                <h3 className="font-display text-xl font-semibold mb-3 text-[#EFECE7]">
                  {item.title}
                </h3>

                {/* DESCRIPTION */}
                <p className="text-[#8c8c8c] font-raleway text-sm leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default PhotographyHighlights;