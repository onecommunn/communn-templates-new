"use client";
import { motion } from "framer-motion";
import { Check, MessageCircle } from "lucide-react";

interface WeddingPackages {
  name: string;
  price: string;
  popular: boolean;
  features: string[];
}

export const PackageCard = ({
  pkg,
  i,
  message,
  whatsappNumber,
}: {
  pkg: WeddingPackages;
  i: number;
  message: string;
  whatsappNumber: string;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6, delay: i * 0.1 }}
    className={`relative border p-8 flex flex-col bg-[#1A1A1A] ${
      pkg.popular ? "border-[#E0A24D]" : "border-[#2A2A2A]"
    }`}
  >
    {pkg.popular && (
      <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#E0A24D] text-[#121212] px-4 py-1 font-raleway text-xs uppercase tracking-widest">
        Most Popular
      </div>
    )}

    <h3 className="font-display text-2xl font-bold text-center mb-2 text-[#EFECE7]">
      {pkg.name}
    </h3>

    <p className="font-display text-4xl font-bold text-[#E0A24D] text-center mb-6">
      {pkg.price}
    </p>

    <ul className="flex-1 space-y-3 mb-8">
      {pkg.features.map((feature) => (
        <li
          key={feature}
          className="flex items-start gap-3 text-[#8c8c8c] font-raleway text-sm"
        >
          <Check size={16} className="text-[#E0A24D] flex-shrink-0 mt-0.5" />
          {feature}
        </li>
      ))}
    </ul>

    <a
      href={`https://wa.me/${whatsappNumber}?text=${message}`}
      target="_blank"
      rel="noopener noreferrer"
      className="w-full"
    >
      <button className="w-full flex items-center justify-center bg-[hsl(142,70%,40%)] hover:bg-[hsl(142,70%,35%)] text-white font-raleway gap-2 py-3 transition-all duration-300">
        <MessageCircle size={18} />
        Chat on WhatsApp
      </button>
    </a>
  </motion.div>
);
