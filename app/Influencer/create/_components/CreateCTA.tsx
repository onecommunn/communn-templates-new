import Link from 'next/link';
import React from 'react';

const CreateCTA = () => {
  return (
    <section className="py-5 px-6 bg-[#fff] font-montserrat">
      <div className="max-w-4xl mx-auto">
        {/* Main CTA Card */}
        <div className="bg-white rounded-[24px] py-10 px-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-[#E7EBF1] text-center">

          <h2 className="text-[16px] md:text-xl font-bold text-[#111111] mb-4">
            Ready to create your map?
          </h2>

          <p className="text-[#969696] text-xs md:text-sm mb-4 max-w-lg mx-auto leading-relaxed">
            Join thousands of creators sharing their favorite places with the world
          </p>

          <Link
            href={"https://communn.io/admin"}
            target="_blank" className="bg-[#2653A3] text-sm hover:bg-[#1e44a3] text-white px-8 py-3.5 rounded-xl font-semibold transition-all">
            Start creating for free
          </Link>

        </div>
      </div>
    </section>
  );
};

export default CreateCTA;