"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import type { LucideProps } from "lucide-react";
import * as Lucide from "lucide-react";
import { StatscounterSection } from "@/models/templates/photography/photography-home-model";

type StatProps = {
  icon: string;
  value: string;
  label: string;
};

const isUrl = (v: string) =>
  /^https?:\/\//i.test(v) || v?.startsWith("/");

type LucideIconType = React.ComponentType<LucideProps>;

function getLucideIcon(name: string): LucideIconType | null {
  const lib = Lucide as unknown as Record<string, LucideIconType>;
  return lib[name] ?? null;
}

function Stat({ icon, value, label }: StatProps) {
  const LucideIcon = !isUrl(icon) ? getLucideIcon(icon) : null;

  return (
    <div className="text-center">
      <div className="flex justify-center mb-3 text-[#e0a346]">
        {LucideIcon ? (
          <LucideIcon strokeWidth={1.5} className="w-8 h-8" />
        ) : (
          <Image
            src={icon || "/placeholder-icon.svg"}
            alt={label || "stat icon"}
            width={32}
            height={32}
            className="object-contain"
            unoptimized
          />
        )}
      </div>

      <p className="font-display text-3xl md:text-4xl font-bold text-[#e0a346] mb-1">
        {value}
      </p>

      <p className="text-[#8c8c8c] font-raleway text-sm">
        {label}
      </p>
    </div>
  );
}

const PhotographyStatscounter = ({
  data,
}: {
  data: StatscounterSection;
}) => {
  const content = data?.content;

  return (
    <section className="py-20 px-4 bg-[#262626] relative overflow-hidden text-[#EFECE7]">
      {/* Background rotating circles */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
        className="absolute -top-32 -right-32 w-64 h-64 border border-[#e0a346]/10 rounded-full"
      />
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
        className="absolute -bottom-20 -left-20 w-40 h-40 border border-[#e0a346]/5 rounded-full"
      />

      <div className="container mx-auto relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          {content?.stats?.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
            >
              <Stat
                icon={stat?.icon}
                value={stat?.value}
                label={stat?.label}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PhotographyStatscounter;