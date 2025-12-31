import React from 'react';
import { CheckCircle2 } from 'lucide-react';

const ConsultingoAboutusValues = () => {
  return (
    <section className="bg-[#FDF6EC] py-10 md:py-16 px-6 md:px-20 font-lexend">
      <div className="mx-auto">
        {/* Section Heading */}
        <h2 className="text-center text-[#3C2A1E] text-[34px]/[40px] md:text-[54px]/[64px] font-fraunces mb-10">
          Values that define us
        </h2>

        {/* Main Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          
          {/* Our Goal Card - Terracotta */}
          <div className="md:col-span-4 bg-[#B14E3F] text-white p-6 rounded-[30px] flex flex-col justify-between">
            <div>
              <h3 className="text-3xl font-fraunces mb-6">Our goal</h3>
              <p className="text-sm leading-relaxed mb-10 opacity-90">
                Our goal is to be a transformative force in the world of technology, 
                empowering businesses to leverage their full potential for growth and success.
              </p>
            </div>
            <ul className="space-y-4 text-sm">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-white rounded-full"></span>
                Enhance client performance
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-white rounded-full"></span>
                Foster long-term partnerships
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-white rounded-full"></span>
                Innovate and lead
              </li>
            </ul>
          </div>

          {/* Our Vision Card - Large White */}
          <div className="md:col-span-8 bg-white p-6 rounded-[30px] shadow-sm">
            <h3 className="text-[#3C2A1E] text-3xl font-fraunces mb-4">Our vision</h3>
            <p className="text-[#8B7E74] text-sm leading-relaxed mb-8 max-w-2xl">
              Our vision is to reimagine the future of business by fostering innovation, 
              driving sustainable growth, and empowering organizations to thrive in an ever-changing world.
            </p>
            
            <div className="flex flex-col md:flex-row gap-8 items-center">
              <img 
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=800&auto=format&fit=crop" 
                alt="Team collaborating" 
                className="w-full md:w-1/2 h-48 object-cover rounded-3xl"
              />
              <ul className="space-y-3 w-full md:w-1/2">
                {[
                  "A world of possibilities",
                  "Empowering businesses",
                  "Creative potential",
                  "Setting new industry standards",
                  "Delivering results that matter"
                ].map((item, idx) => (
                  <li key={idx} className="flex items-center gap-3 text-[#3C2A1E] text-sm font-medium">
                    <CheckCircle2 size={18} className="text-[#B14E3F]" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Excellence Card - White */}
          <div className="md:col-span-4 bg-white p-6 rounded-[30px] shadow-sm">
            <h3 className="text-[#3C2A1E] text-3xl font-fraunces mb-6">Excellence</h3>
            <p className="text-[#8B7E74] text-sm leading-relaxed">
              Committed to delivering the highest quality services and solutions, 
              ensuring superior performance and outstanding results for our clients.
            </p>
          </div>

          {/* Empowerment Card - Light Beige/Brown tint */}
          <div className="md:col-span-4 bg-[#EFE9E1] p-6 rounded-[30px]">
            <h3 className="text-[#3C2A1E] text-3xl font-fraunces mb-6">Empowerment</h3>
            <p className="text-[#3C2A1E] text-sm leading-relaxed opacity-80">
              Dedicated to enabling our clients and team members to reach their full 
              potential through knowledge sharing, support, and collaborative efforts.
            </p>
          </div>

          {/* Innovation Card - Dark Brown */}
          <div className="md:col-span-4 bg-[#3C2A1E] text-white p-6 rounded-[30px]">
            <h3 className="text-3xl font-fraunces mb-6">Innovation</h3>
            <p className="text-sm leading-relaxed opacity-90">
              Constantly seeking creative and forward-thinking approaches to solve 
              complex challenges and drive sustainable growth for our clients.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
};

export default ConsultingoAboutusValues;