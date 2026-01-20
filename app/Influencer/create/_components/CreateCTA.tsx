import React from 'react';

const CreateCTA = () => {
  return (
    <section className="py-20 px-6 bg-[#fff] font-montserrat">
      <div className="max-w-4xl mx-auto">
        {/* Main CTA Card */}
        <div className="bg-white rounded-[24px] py-16 px-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-[#E7EBF1] text-center">
          
          <h2 className="text-[20px] md:text-2xl font-bold text-[#111111] mb-4">
            Ready to create your map?
          </h2>
          
          <p className="text-[#969696] text-xs md:text-sm mb-4 max-w-lg mx-auto leading-relaxed">
            Join thousands of creators sharing their favorite places with the world
          </p>

          <button className="bg-[#2653A3] hover:bg-[#1e44a3] text-white px-[20px] py-[10px] rounded-[8px] font-semibold transition-all shadow-lg shadow-blue-100 transform hover:-translate-y-0.5 active:scale-95">
            Start creating for free
          </button>
          
        </div>
      </div>
    </section>
  );
};

export default CreateCTA;