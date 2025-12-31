import React from "react";

const ConsultingoAboutUsHero = () => {
  const stats = [
    { value: "50+", label: "Released projects" },
    { value: "23", label: "Awesome clients" },
    { value: "6", label: "Consultants team" },
  ];

  return (
    <section className="bg-[#FDF6EC] py-10 px-6 md:py-16 md:px-20">
      <div className="mx-auto">
        {/* Header Section */}
        <div className="text-center mx-auto mb-6 md:mb-10">
          <h1 className="text-[#B14E3F] text-[28px]/[33px] md:text-[60px]/[72px] font-fraunces font-medium leading-tight mb-2">
            Innovative consulting for a transformed business landscape
          </h1>
          <p className="text-[#8B7E74] text-sm md:text-base leading-relaxed mx-auto md:max-w-[80%]">
            Transform your business with Consultingo's specialized consulting
            solutions crafted to propel your journey to success. Our deep
            industry knowledge and strategic approach ensure we guide
            organizations through complexities, enabling them to achieve
            impactful growth and enduring outcomes.
          </p>
        </div>

        {/* Content Section: Stats & Image */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Stats Card */}
          <div className="lg:col-span-4 bg-white rounded-[32px] max-h-[470px] p-6 space-y-6 md:space-y-0 md:p-12 shadow-sm flex flex-col justify-center">
            {stats.map((stat, index) => (
              <div key={index} className="w-full">
                <div>
                  <h3 className="text-[#B14E3F] text-4xl font-fraunces font-bold mb-2">
                    {stat.value}
                  </h3>
                  <p className="text-[#4A2C19] font-fraunces font-semibold text-lg">
                    {stat.label}
                  </p>
                </div>
                {index !== stats.length - 1 && (
                  <div className="h-[1px] my-6 hidden md:block w-full bg-gray-100" />
                )}
              </div>
            ))}
          </div>

          {/* Feature Image */}
          <div className="lg:col-span-8 relative">
            <div className="aspect-video max-h-[470px] w-full rounded-[32px] overflow-hidden shadow-lg">
              <img
                src="https://upload-community-files-new.s3.ap-south-1.amazonaws.com/uploads/c2dcb3f357885afeee0d88dbb044ae158df01429.png"
                alt="Consultant working late"
                className="w-full h-full object-cover brightness-75 contrast-125"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ConsultingoAboutUsHero;
