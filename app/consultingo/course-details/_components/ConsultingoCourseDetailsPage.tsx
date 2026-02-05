"use client";

import React, { useState, useEffect } from "react";
import { ArrowUpRight, ChevronDown, ChevronUp } from "lucide-react";

// --- Types ---
interface CurriculumItem {
  week: string;
  title: string;
  modules: string[];
}

const curriculumData: CurriculumItem[] = [
  {
    week: "Week 1",
    title: "Introduction",
    modules: [
      "Module 01 - Intro to consulting",
      "Module 01 - Intro to consulting",
      "Module 01 - Intro to consulting",
      "Module 01 - Intro to consulting",
    ],
  },
  {
    week: "Week 2",
    title: "Frameworks",
    modules: ["Case Study Frameworks", "Market Entry Basics"],
  },
  {
    week: "Week 3",
    title: "Synthesis",
    modules: ["Data Interpretation", "Executive Summaries"],
  },
  {
    week: "Week 4",
    title: "Communication",
    modules: ["Presentation Skills", "Client Management"],
  },
];

const ConsultingoCourseDetailsPage = ({
  primaryColor,
  secondaryColor,
  neutralColor,
}: {
  primaryColor: string;
  secondaryColor: string;
  neutralColor: string;
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  // Simulate loading effect
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading)
    return (
      <LoadingSkeleton
        primaryColor={primaryColor}
        secondaryColor={secondaryColor}
        neutralColor={neutralColor}
      />
    );

  return (
    <section
      className="bg-[var(--neu)] min-h-screen py-16 px-6 md:px-20 font-lexend"
      style={
        {
          "--pri": primaryColor,
          "--sec": secondaryColor,
          "--neu": neutralColor,
        } as React.CSSProperties
      }
    >
      <div className="max-w-7xl mx-auto">
        {/* --- Hero Section --- */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-24">
          <div className="space-y-6">
            <h1 className="text-5xl md:text-6xl text-[var(--pri)] font-fraunces leading-tight font-medium">
              Explore consulting career opportunities with Consultingo
            </h1>
            <p className="text-[var(--sec)] font-lexend text-sm md:text-base leading-relaxed opacity-80 max-w-xl">
              Embark on a journey of professional growth and fulfillment as you
              explore a myriad of exciting consulting career opportunities
              within our team. Embark on a journey of professional growth and
              fulfillment as you explore a myriad of exciting consulting career
              opportunities within our team.
            </p>
            <button className="flex font-lexend hover:scale-105 items-center gap-2 bg-[var(--pri)] text-white px-6 py-3 rounded-full hover:bg-[var(--pri)]/90 transition-all text-sm">
              Buy Now <ArrowUpRight size={18} strokeWidth={1.5} />
            </button>
          </div>

          <div className="relative flex justify-center lg:justify-end">
            {/* Oval Image Container */}
            <div className="w-[300px] h-[450px] md:w-[400px] md:h-[550px] rounded-[200px] overflow-hidden shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&auto=format&fit=crop"
                alt="Consulting Team"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* --- Course Curriculum Section --- */}
        <div className="max-w-full">
          <h2 className="text-4xl text-[var(--sec)] font-semibold mb-6 font-fraunces">
            Course Curriculum
          </h2>

          <div className="space-y-4">
            {curriculumData.map((item, idx) => (
              <div
                key={idx}
                className={`transition-all duration-300 rounded-xl overflow-hidden ${openIndex === idx ? "bg-[var(--neu)]" : "bg-transparent"}`}
              >
                <button
                  onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                  className="w-full cursor-pointer hover:bg-[var(--neu)] flex justify-between items-center px-6 py-4 text-left border-b border-[var(--sec)]/10"
                >
                  <span
                    className={`text-xl font-medium ${openIndex === idx ? "text-[var(--pri)]" : "text-[var(--sec)]"}`}
                  >
                    {item.week} - {item.title}
                  </span>
                  {openIndex === idx ? (
                    <ChevronUp size={20} />
                  ) : (
                    <ChevronDown size={20} />
                  )}
                </button>

                {openIndex === idx && (
                  <div className="p-6 pt-4 animate-in fade-in slide-in-from-top-2">
                    <ul className="space-y-3">
                      {item.modules.map((mod, i) => (
                        <li
                          key={i}
                          className="text-[var(--sec)]/70 text-base flex items-center gap-2"
                        >
                          <span className="w-1.5 h-1.5 bg-[var(--pri)] rounded-full" />
                          {mod}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// --- Skeleton Component ---
const LoadingSkeleton = ({
  primaryColor,
  secondaryColor,
  neutralColor,
}: {
  primaryColor: string;
  secondaryColor: string;
  neutralColor: string;
}) => (
  <div
    className="bg-[var(--neu)] min-h-screen py-16 px-6 md:px-20 animate-pulse"
    style={
      {
        "--pri": primaryColor,
        "--sec": secondaryColor,
        "--neu": neutralColor,
      } as React.CSSProperties
    }
  >
    <div className="max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-24">
        <div className="space-y-6">
          <div className="h-16 bg-gray-200 rounded-md w-3/4" />
          <div className="h-4 bg-gray-200 rounded-md w-full" />
          <div className="h-4 bg-gray-200 rounded-md w-5/6" />
          <div className="h-12 bg-gray-200 rounded-full w-32" />
        </div>
        <div className="flex justify-end">
          <div className="w-[350px] h-[500px] bg-gray-200 rounded-[200px]" />
        </div>
      </div>
      <div className="max-w-4xl space-y-4">
        <div className="h-10 bg-gray-200 rounded-md w-48 mb-10" />
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-16 bg-gray-200 rounded-xl w-full" />
        ))}
      </div>
    </div>
  </div>
);

export default ConsultingoCourseDetailsPage;
