import React from 'react';
import { MapPin, BookmarkPlus, Share2 } from 'lucide-react';

const CreatorAbout = () => {
  const features = [
    {
      icon: <MapPin strokeWidth={1.5} className="w-8 h-8 text-[#2B59C3]" />,
      title: "Add places using reels",
      description: "Add cafes, restaurants, shops, or any location. Include photos, notes, and ratings."
    },
    {
      icon: <BookmarkPlus strokeWidth={1.5} className="w-8 h-8 text-[#2B59C3]" />,
      title: "Organize by Category",
      description: "Create custom categories and tags to keep your map organized and easy to navigate."
    },
    {
      icon: <Share2 strokeWidth={1.5} className="w-8 h-8 text-[#2B59C3]" />,
      title: "Share with Anyone",
      description: "Get a unique link to your map. Share it with friends or embed it on your website."
    }
  ];

  return (
    <section className="py-20 px-6 bg-[#fff] font-montserrat">
      <div className="max-w-6xl mx-auto text-center">
        {/* Header Section */}
        <h2 className="text-base md:text-lg font-bold text-[#111111] mb-3">
          Everything you need to curate your world
        </h2>
        <p className="text-[#666666] text-xs md:text-base mb-12 max-w-2xl mx-auto">
          Pin your discoveries, organize by category, and share your personalized map with anyone
        </p>

        {/* Features Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="bg-white p-10 rounded-[20px] flex flex-col items-center text-center border border-[#E7EBF1]"
            >
              <div className="mb-6">
                {feature.icon}
              </div>
              <h3 className=" text-sm font-bold text-[#111111] mb-3">
                {feature.title}
              </h3>
              <p className="text-[#888888] text-xs leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CreatorAbout;