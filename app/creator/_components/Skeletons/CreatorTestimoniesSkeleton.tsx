// app/creator/_components/CreatorTestimonies.skeleton.tsx
import React from "react";

type Props = {
  /** How many placeholder cards to render */
  count?: number;
};

const StarRow = () => (
  <div className="flex gap-1">
    {[...Array(5)].map((_, i) => (
      <div key={i} className="h-5 w-5 rounded bg-gray-200" />
    ))}
  </div>
);

const CardSkeleton: React.FC = () => (
  <div className="mb-4 break-inside-avoid animate-pulse">
    <div className="rounded-xl border border-gray-200 bg-white">
      {/* Header: stars */}
      <div className="p-4">
        <StarRow />
      </div>

      {/* Content: review text */}
      <div className="px-4 pb-2 space-y-2">
        <div className="h-4 w-[92%] rounded bg-gray-200" />
        <div className="h-4 w-[85%] rounded bg-gray-200" />
        <div className="h-4 w-[70%] rounded bg-gray-200" />
        <div className="h-4 w-[55%] rounded bg-gray-200" />
      </div>

      {/* Footer: avatar + name/role */}
      <div className="p-4 flex items-center gap-3">
        <div className="h-10 w-10 rounded-full bg-gray-200" />
        <div className="flex-1 space-y-2">
          <div className="h-4 w-40 rounded bg-gray-200" />
          <div className="h-3 w-28 rounded bg-gray-200" />
        </div>
      </div>
    </div>
  </div>
);

const CreatorTestimoniesSkeleton: React.FC<Props> = ({ count = 9 }) => {
  return (
    <section className="py-10 font-inter">
      <div className="container mx-auto px-4 sm:px-6 lg:px-20">
        {/* Section header skeleton */}
        <div className="max-w-3xl mx-auto text-center mb-8 md:mb-12 animate-pulse">
          <div className="h-8 md:h-10 w-3/4 mx-auto rounded-lg bg-gray-200" />
          <div className="mt-3 h-4 w-11/12 mx-auto rounded bg-gray-200" />
          <div className="mt-2 h-4 w-9/12 mx-auto rounded bg-gray-200" />
        </div>

        {/* Masonry columns */}
        <div className="columns-1 md:columns-2 xl:columns-3 gap-4">
          {Array.from({ length: count }).map((_, i) => (
            <CardSkeleton key={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CreatorTestimoniesSkeleton;
