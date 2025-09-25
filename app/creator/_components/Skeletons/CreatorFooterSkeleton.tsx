import React from "react";

const CreatorFooterSkeleton: React.FC = () => {
  return (
    <footer className="py-10 font-inter">
      <div className="container mx-auto px-4 sm:px-6 lg:px-20">
        <div className="flex flex-col md:flex-row justify-center md:justify-between gap-8">
          {/* Logo */}
          <div className="h-10 w-56 rounded bg-gray-200 animate-pulse mx-auto md:mx-0" />

          {/* Columns */}
          <div className="grid grid-cols-2 gap-10 w-full md:w-auto">
            {[0, 1].map((col) => (
              <div key={col} className="flex flex-col gap-3">
                <div className="h-3 w-16 rounded bg-gray-200 animate-pulse" />
                <div className="h-4 w-24 rounded bg-gray-200 animate-pulse" />
                <div className="h-4 w-28 rounded bg-gray-200 animate-pulse" />
                <div className="h-4 w-20 rounded bg-gray-200 animate-pulse" />
                <div className="h-4 w-24 rounded bg-gray-200 animate-pulse" />
              </div>
            ))}
          </div>
        </div>

        <hr className="my-6" />

        <div className="flex flex-col md:flex-row items-center md:items-start justify-center md:justify-between gap-4">
          {/* Socials */}
          <div className="flex gap-4">
            <div className="h-5 w-5 rounded-full bg-gray-200 animate-pulse" />
            <div className="h-5 w-5 rounded-full bg-gray-200 animate-pulse" />
            <div className="h-5 w-5 rounded-full bg-gray-200 animate-pulse" />
            <div className="h-5 w-5 rounded-full bg-gray-200 animate-pulse" />
          </div>

          {/* Copyright */}
          <div className="h-4 w-56 rounded bg-gray-200 animate-pulse" />
        </div>
      </div>
    </footer>
  );
};

export default CreatorFooterSkeleton;
