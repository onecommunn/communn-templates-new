"use client";

import { Badge } from "@/components/ui/badge";
import React from "react";

const MadivalaEventsPageRoot = () => {
  return (
    <main className="min-h-[70vh] w-full flex items-center justify-center bg-white px-4">
      <div className="max-w-xl w-full text-center">
        <Badge
          variant="outline"
          className="mb-4 px-4 py-1 text-sm font-medium tracking-wide rounded-full"
        >
          Events
        </Badge>

        {/* Title */}
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
          Coming Soon 🚀
        </h1>

        {/* Subtitle */}
        <p className="text-gray-600 text-sm md:text-base mb-8 leading-relaxed">
          We’re working on something exciting. Soon you’ll be able to explore,
          register, and manage events seamlessly.
        </p>
      </div>
    </main>
  );
};

export default MadivalaEventsPageRoot;
