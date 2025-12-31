import React from "react";

const sections = [
  {
    title: "Initial consultation",
    des: `During our initial consultation, we take the time to understand your business objectives and challenges.
We assess your current strategies and provide tailored recommendations to align your goals with
actionable steps for growth and success.`,
  },
  {
    title: "Assessment",
    des: `We analyze your business operations to identify strengths, weaknesses, and improvement opportunities,
guiding strategic recommendations aligned with your growth goals.`,
  },
  {
    title: "Strategy development",
    des: `Expert strategy development tailored to align with your business goals and drive forward-thinking
initiatives for sustained success.`,
  },
  {
    title: "Implementation",
    des: `Efficient implementation of strategic plans designed to optimize processes, enhance productivity, and
achieve measurable outcomes. Our approach ensures seamless integration of innovative solutions
tailored to meet your business objectives, driving tangible results and long-term success.`,
  },
  {
    title: "Monitoring and reporting",
    des: `We provide ongoing monitoring and detailed reporting to track performance metrics, ensuring strategic
alignment with business objectives and supporting informed decision-making for sustained growth.`,
  },
];

const ConsultingoServiceContent = () => {
  return (
    <section className="relative font-lexend bg-[#fcf6e8] overflow-hidden py-16">
      <div className="relative container mx-auto px-6 text-[#4F2910] flex flex-col items-center md:max-w-[70%]">
        <div className="flex flex-col gap-2">
          <h3 className="font-semibold font-fraunces text-[40px]/[52px]">
            An in-depth look at our consulting solutions
          </h3>
          <p className="text-base text-[#8B715B]">
            Explore our consulting solutions tailored to address your unique
            business challenges and drive growth. We specialize in strategic
            planning, operational efficiency, market analysis, and
            sustainability initiatives. Leverage our expertise to optimize
            performance and achieve long-term success.
            <br />
            Our consultants deliver data-driven insights and customized
            strategies to enhance competitiveness, streamline processes, enter
            new markets, and implement sustainable practices.
          </p>
          <div className="aspect-video md:max-h-[450px] my-6 rounded-[20px] overflow-hidden">
            <img
              src="https://upload-community-files-new.s3.ap-south-1.amazonaws.com/uploads/0b73cf6935b7661393ba40dee83e635a4b6f0bb8.png"
              alt="image 2"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex flex-col gap-8">
            {
              sections?.map((s,idx) => (
                <div>
                  <h4 className="text-[#4F2910] font-semibold text-[34px]/[44px] font-fraunces">{`${idx+1}. ${s.title}`}</h4>
                  <p className="text-[#8B715B] text-base mt-1">{s.des}</p>
                </div>
              ))
            }
          </div>
        </div>
      </div>
    </section>
  );
};

export default ConsultingoServiceContent;
