import FuzzyText from "@/components/CustomComponents/FuzzyText";
import React from "react";

const DefaultRoot = () => {
  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center font-sans text-gray-800">
      <FuzzyText
        baseIntensity={0.2}
        hoverIntensity={3}
        enableHover={true}
      >
        404
        Not Found
      </FuzzyText>
    </div>
  );
};

export default DefaultRoot;
