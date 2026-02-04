import React from "react";
import Image from "next/image";
import { MoveUpRight } from "lucide-react";
import { AppointmentSection } from "@/models/templates/consultingo/consultingo-home-model";

const ConsultingoAppointments = ({
  data,
  primaryColor,
  secondaryColor,
  neutralColor,
}: {
  data: AppointmentSection;
  primaryColor: string;
  secondaryColor: string;
  neutralColor: string;
}) => {
  const appointments = [
    {
      title: "Transforming operations efficiency",
      duration: "30 mins",
      price: "₹4000",
      description:
        "Insightful guidance on crafting and implementing successful business strategies, revealing proven tactics and approaches for achieving organizational goals with precision and impact.",
      image:
        "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&q=80&w=400",
    },
    {
      title: "Digital driving transformation",
      duration: "30 mins",
      price: "₹4000",
      description:
        "Learn how Trend achieved digital innovation and expanded market reach with our strategic guidance and technological solutions.",
      image:
        "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=400",
    },
    {
      title: "Enhancing sustainability practices",
      duration: "30 mins",
      price: "₹4000",
      description:
        "Explore our collaboration with GODL Solutions in developing and implementing sustainable practices that reduce their environmental footprint and enhance brand reputation.",
      image:
        "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=400",
    },
  ];

  const content = data?.content;
  return (
    <section
      className="bg-[var(--neu)] py-10 md:py-20 px-6 md:px-20 font-lexend"
      style={
        {
          "--pri": primaryColor,
          "--sec": secondaryColor,
          "--neu": neutralColor,
        } as React.CSSProperties
      }
    >
      <div className="container mx-auto">
        {/* Section Heading */}
        <h2 className="text-4xl md:text-5xl font-fraunces text-[var(--sec)] text-center mb-16">
          {content?.heading}
        </h2>

        {/* Appointments List */}
        <div className="flex flex-col gap-12">
          {appointments.map((item, index) => (
            <div
              key={index}
              className="flex flex-col md:flex-row items-center gap-2 md:gap-16"
            >
              {/* Circular Image */}
              <div className="relative w-full h-full md:w-80 md:h-80 flex-shrink-0 overflow-hidden rounded-[30px] md:rounded-full">
                <div className="w-full h-full aspect-square rounded-full overflow-hidden border-8 border-transparent shadow-inner">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover"
                    unoptimized
                  />
                </div>
              </div>

              {/* Info Card */}
              <div className="bg-white rounded-[32px] p-8 md:p-12 flex-1 shadow-sm hover:shadow-md transition-shadow w-full">
                <p className="text-[var(--sec)] text-xs mb-4 uppercase tracking-wider">
                  Duration : {item.duration}
                </p>

                <h3 className="text-3xl md:text-4xl font-fraunces text-[var(--pri)] mb-6 leading-tight">
                  {item.title}
                </h3>

                <p className="text-[var(--sec)] text-sm md:text-base leading-relaxed mb-8">
                  {item.description}
                </p>

                <div className="flex flex-col gap-6">
                  <p className="text-[var(--sec)] font-semibold">
                    Price : {item.price}
                  </p>

                  <button className="w-fit bg-[var(--pri)] cursor-pointer text-white px-8 py-3 rounded-full flex items-center gap-2 group hover:bg-[var(--pri)] transition-all">
                    <span className="font-medium">View details</span>
                    <div className="bg-white/20 rounded-full p-1 group-hover:rotate-45 transition-transform">
                      <MoveUpRight size={16} />
                    </div>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ConsultingoAppointments;
