import React from "react";
import { CheckCircle2 } from "lucide-react";
import { ValuesSection } from "@/models/templates/consultingo/consultingo-aboutUs-model";

const ConsultingoAboutusValues = ({
  data,
  primaryColor,
  secondaryColor,
  neutralColor,
}: {
  data: ValuesSection;
  primaryColor: string;
  secondaryColor: string;
  neutralColor: string;
}) => {
  const content = data?.content;
  const goalCard = content?.cards?.goalCard;
  const visionCard = content?.cards?.visionCard;
  const coreValues = content?.cards?.coreValues;
  return (
    <section
      className="bg-[var(--neu)] py-10 md:py-16 px-6 md:px-20 font-lexend"
      style={
        {
          "--pri": primaryColor,
          "--sec": secondaryColor,
          "--neu": neutralColor,
        } as React.CSSProperties
      }
    >
      <div className="mx-auto">
        {/* Section Heading */}
        <h2 className="text-center text-[var(--sec)] text-[34px]/[40px] md:text-[54px]/[64px] font-fraunces mb-10">
          {content?.heading}
        </h2>

        {/* Main Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Our Goal Card - Terracotta */}
          <div className="md:col-span-4 bg-[var(--pri)] text-white p-6 rounded-[30px] flex flex-col justify-between">
            <div>
              <h3 className="text-3xl font-fraunces mb-6">{goalCard?.title}</h3>
              <p className="text-sm leading-relaxed mb-10 opacity-90">
                {goalCard?.description}
              </p>
            </div>
            <ul className="space-y-4 text-sm">
              {goalCard?.list?.map((item, idx) => (
                <li className="flex items-center gap-2" key={idx}>
                  <span className="w-1.5 h-1.5 bg-white rounded-full"></span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Our Vision Card - Large White */}
          <div className="md:col-span-8 bg-white p-6 rounded-[30px] shadow-sm">
            <h3 className="text-[var(--sec)] text-3xl font-fraunces mb-4">
              {visionCard?.title}
            </h3>
            <p className="text-[var(--sec)]/70 text-sm leading-relaxed mb-8 max-w-2xl">
              {visionCard?.description}
            </p>

            <div className="flex flex-col md:flex-row gap-8 items-center">
              <img
                src={
                  visionCard?.image ??
                  "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=800&auto=format&fit=crop"
                }
                alt="Team collaborating"
                className="w-full md:w-1/2 h-48 object-cover rounded-3xl"
              />
              <ul className="space-y-3 w-full md:w-1/2">
                {visionCard?.list.map((item, idx) => (
                  <li
                    key={idx}
                    className="flex items-center gap-3 text-[var(--sec)] text-sm font-medium"
                  >
                    <CheckCircle2 size={18} className="text-[var(--pri)]" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {coreValues?.map((item, index) => {
            const variantStyles: Record<
              string,
              {
                wrapper: string;
                title: string;
                text: string;
              }
            > = {
              white: {
                wrapper: "bg-white shadow-sm",
                title: "text-[var(--sec)]",
                text: "text-[var(--sec)]/70",
              },
              beige: {
                wrapper: "bg-[var(--sec)]/5",
                title: "text-[var(--sec)]",
                text: "text-[var(--sec)] opacity-80",
              },
              dark: {
                wrapper: "bg-[var(--sec)]",
                title: "text-white",
                text: "text-white opacity-90",
              },
            };

            const styles = variantStyles[item.variant] ?? variantStyles.white;

            return (
              <div
                key={index}
                className={`md:col-span-4 p-6 rounded-[30px] ${styles.wrapper}`}
              >
                <h3 className={`text-3xl font-fraunces mb-6 ${styles.title}`}>
                  {item.title}
                </h3>

                <p className={`text-sm leading-relaxed ${styles.text}`}>
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ConsultingoAboutusValues;
