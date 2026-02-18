"use client";
import React, { useEffect, useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import Link from "next/link";
import { ArrowDown } from "lucide-react";

const heroImages = [
  "https://upload-community-files-new.s3.ap-south-1.amazonaws.com/uploads/hero-ceremony.jpg",
  "https://upload-community-files-new.s3.ap-south-1.amazonaws.com/uploads/hero-haldi.jpg",
  "https://upload-community-files-new.s3.ap-south-1.amazonaws.com/uploads/haldi-3.jpg",
  "https://upload-community-files-new.s3.ap-south-1.amazonaws.com/uploads/hero-portrait.jpg",
  "https://upload-community-files-new.s3.ap-south-1.amazonaws.com/uploads/wedding-10.jpg",
  "https://upload-community-files-new.s3.ap-south-1.amazonaws.com/uploads/prewedding-1.jpg",
  "https://upload-community-files-new.s3.ap-south-1.amazonaws.com/uploads/wedding-5.jpg",
  "https://upload-community-files-new.s3.ap-south-1.amazonaws.com/uploads/wedding-14.jpg",
];

const PhotographyHero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();
  const heroY = useTransform(scrollYProgress, [0, 0.3], [0, 150]);
  const heroScale = useTransform(scrollYProgress, [0, 0.3], [1, 1.15]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.25], [1, 0]);

  const [currentHeroImage, setCurrentHeroImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHeroImage((prev) => (prev + 1) % heroImages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);
  return (
    <section
      ref={heroRef}
      className="relative h-screen flex-1 overflow-hidden flex items-center justify-center bg-[#121212] text-[#EFECE7]"
    >
      <motion.div
        style={{ y: heroY, scale: heroScale }}
        className="absolute inset-0"
      >
        <AnimatePresence mode="sync">
          <motion.div
            key={currentHeroImage}
            initial={{ scale: 1.3, opacity: 0 }}
            animate={{
              scale: 1,
              opacity: 1,
              x: [40, -20, 0],
              y: [20, -10, 0],
            }}
            exit={{ opacity: 0 }}
            transition={{
              opacity: { duration: 1.2 },
              scale: { duration: 6, ease: "easeOut" },
              x: { duration: 6, ease: "easeInOut" },
              y: { duration: 6, ease: "easeInOut" },
            }}
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url(${heroImages[currentHeroImage]})`,
            }}
          />
        </AnimatePresence>
      </motion.div>
      <div className="absolute inset-0 bg-[#000007]/65" />
      {/* Animated decorative lines */}
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: "40%" }}
        transition={{ duration: 2, delay: 1 }}
        className="absolute top-1/4 left-0 h-px bg-gradient-to-r from-[#E9A55C]/50 to-transparent"
      />
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: "30%" }}
        transition={{ duration: 2, delay: 1.5 }}
        className="absolute bottom-1/3 right-0 h-px bg-gradient-to-l from-[#E9A55C]/40 to-transparent"
      />
      <motion.div
        initial={{ height: 0 }}
        animate={{ height: "20%" }}
        transition={{ duration: 1.5, delay: 1.2 }}
        className="absolute top-0 right-1/4 w-px bg-gradient-to-b from-[#E9A55C]/30 to-transparent"
      />

      <motion.div
        style={{ opacity: heroOpacity }}
        className="relative z-10 text-center px-4 max-w-4xl"
      >
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-[#E9A55C] font-raleway text-sm uppercase tracking-[0.3em] mb-6"
        >
          Vijay Photography
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-display text-5xl md:text-7xl lg:text-8xl font-bold leading-tight mb-6"
        >
          Your Legacy,
          <span className="text-[#E9A55C] italic"> Through Our Lens</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-[#EFECE7]/80 font-raleway text-lg md:text-xl max-w-2xl mx-auto mb-10"
        >
          Specialized in Wedding Photography | Chitradurga
        </motion.p>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row justify-center gap-4"
        >
          <Link
            href="/portfolio"
            className="bg-[#E9A55C] text-[#0d0d0d] px-8 py-3 font-raleway text-sm uppercase tracking-widest hover:bg-[#E9A55C]/90 transition-colors"
          >
            View Portfolio
          </Link>
          <Link
            href="/contact"
            className="border border-[#EFECE7]/30 text-[#EFECE7] px-8 py-3 font-raleway text-sm uppercase tracking-widest hover:border-[#E9A55C] hover:text-[#E9A55C] transition-colors"
          >
            Get in Touch
          </Link>
        </motion.div>
      </motion.div>

      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-[#0C1014]/50"
      >
        <ArrowDown size={24} />
      </motion.div>
    </section>
  );
};

export default PhotographyHero;
