import { Badge } from "@/components/ui/badge";
import React from "react";

const MadivalaInfrastructurePageRoot = () => {
  return (
    <main className="min-h-[70vh] w-full flex items-center justify-center bg-white px-4">
      <div className="max-w-xl w-full text-center">
        {/* Badge */}
        <Badge
          variant="outline"
          className="mb-4 px-4 py-1 text-sm font-medium tracking-wide rounded-full"
        >
          Infrastructure
        </Badge>

        {/* Title */}
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
          Coming Soon
        </h1>

        {/* Subtitle */}
        <p className="text-gray-600 text-sm md:text-base leading-relaxed">
          We’re building something powerful.  
          Soon you’ll be able to explore, register, and manage infrastructure
          details seamlessly.
        </p>
      </div>
    </main>
  );
};

export default MadivalaInfrastructurePageRoot;
