import React from "react";

interface props {
  primaryColor: string;
  secondaryColor: string;
}

const CreatorHeaderSkeleton: React.FC<props> = ({
  primaryColor,
  secondaryColor,
}) => {
  return (
    <header
      className="sticky top-0 z-50 bg-white"
      style={{ backgroundColor: primaryColor }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-20">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="h-8 w-40 rounded bg-gray-200 animate-pulse" />

          {/* Nav (desktop) */}
          <div className="hidden md:flex items-center gap-6">
            <div className="h-4 w-16 rounded bg-gray-200 animate-pulse" />
            <div className="h-4 w-20 rounded bg-gray-200 animate-pulse" />
            <div className="h-4 w-14 rounded bg-gray-200 animate-pulse" />
            <div className="h-4 w-24 rounded bg-gray-200 animate-pulse" />
          </div>

          {/* CTA */}
          <div className="hidden md:block">
            <div className="h-9 w-24 rounded bg-gray-200 animate-pulse" />
          </div>

          {/* Mobile icon */}
          <div className="md:hidden h-6 w-6 rounded bg-gray-200 animate-pulse" />
        </div>
      </div>
    </header>
  );
};

export default CreatorHeaderSkeleton;
