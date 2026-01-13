import React from 'react';
import { Eye, Target } from 'lucide-react';
import { TbTargetArrow } from "react-icons/tb";

const DefaultAbout = () => {
  return (
    <section id="home" className="max-w-6xl mx-auto px-6 py-8 md:py-16 font-montserrat scroll-mt-[40px] md:scroll-mt-[90px]">
      {/* Community Description Section */}
      <div className="mb-8 md:mb-16">
        <h2 className="text-2xl font-bold mb-4 text-black">Community Description</h2>
        <p className="text-gray-600 leading-relaxed text-sm">
          Lorem ipsum dolor sit amet consectetur. Sed lectus suscipit enim at amet iaculis sed dui volutpat. 
          Lorem ipsum dolor sit amet consectetur. Sed lectus suscipit enim at amet.. Lorem ipsum dolor sit amet 
          consectetur. Sed lectus suscipit enim at amet.Lorem ipsum dolor sit amet consectetur. Sed lectus 
          suscipit enim at amet iaculis sed dui volutpat. Lorem ipsum dolor sit amet consectetur. Sed lectus 
          suscipit enim at amet.
        </p>
      </div>

      {/* Vision & Mission Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-14 md:gap-12 lg:px-12">
        {/* Our Vision Card */}
        <div className="relative bg-white rounded-3xl p-8 pt-6 md:pt-12 shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-gray-50 flex flex-col items-center text-center">
          <span className="text-xs font-semibold text-black tracking-widest uppercase mb-1">OUR</span>
          <h3 className="text-2xl md:text-3xl font-bold mb-6 text-black">Vision</h3>
          <p className="text-black text-sm leading-relaxed mb-8">
            Transform your home into a global hub for homemakers to share recipes, home decor ideas, 
            parenting tips, and more, cultivating a family-like, nurturing community.
          </p>
          {/* Floating Bottom Icon */}
          <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-20 h-20 bg-white rounded-full shadow-lg flex items-center justify-center border border-[#00000033]">
            <Eye className="w-10 h-10 text-black stroke-[1.5]" />
          </div>
        </div>

        {/* Our Mission Card */}
        <div className="relative bg-white rounded-3xl p-8 pt-6 md:pt-12 shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-gray-50 flex flex-col items-center text-center">
          <span className="text-xs font-semibold text-black tracking-widest uppercase mb-1">OUR</span>
          <h3 className="text-2xl md:text-3xl font-bold mb-6 text-black">Mission</h3>
          <p className="text-black text-sm leading-relaxed mb-8">
            Transform your home into a global hub for homemakers to share recipes, home decor ideas, 
            parenting tips, and more, cultivating a family-like, nurturing community.
          </p>
          {/* Floating Bottom Icon */}
          <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-20 h-20 bg-white rounded-full shadow-lg flex items-center justify-center border border-[#00000033]">
            <TbTargetArrow className="w-10 h-10 text-black stroke-[1.5]" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default DefaultAbout;