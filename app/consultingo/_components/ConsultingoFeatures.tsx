import React from "react";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FeaturesSection } from "@/models/templates/consultingo/consultingo-home-model";
import Link from "next/link";

const ConsultingoFeatures = ({
  data,
  primaryColor,
  secondaryColor,
  neutralColor,
}: {
  data: FeaturesSection;
  primaryColor: string;
  secondaryColor: string;
  neutralColor: string;
}) => {
  const content = data?.content;
  const trackRecord = content?.features?.trackRecord;
  const clients = content?.features?.clients;
  const successHighlight = content?.features?.successHighlight;
  const customSolutions = content?.features?.customSolutions;
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
      <div className="container mx-auto">
        {/* Header Section */}
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="text-[16px] md:text-3xl font-fraunces text-[var(--sec)] leading-snug font-semibold">
            {content?.heading}
          </h2>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Top Left: Proven Track Record */}
          <div className="md:col-span-4 bg-white rounded-[40px] p-8 flex flex-col justify-between min-h-[350px]">
            <div className="bg-[var(--neu)] rounded-3xl p-6 h-40 flex items-end justify-around gap-2">
              <div className="bg-[var(--pri)] w-2 h-[60%] rounded-full"></div>
              <div className="bg-[var(--sec)] w-2 h-[40%] rounded-full"></div>
              <div className="bg-[var(--pri)] w-2 h-[80%] rounded-full"></div>
              <div className="bg-[var(--sec)] w-2 h-[50%] rounded-full"></div>
              <div className="bg-v w-2 h-[70%] rounded-full"></div>
            </div>
            <div className="mt-6">
              <h3 className="text-[20px] md:text-2xl font-bold text-[var(--sec)] mb-2">
                {trackRecord?.title}
              </h3>
              <p className="text-[var(--sec)]/70 text-sm mb-4">
                {trackRecord?.description}
              </p>
              <Link
                href={trackRecord?.link?.url ?? "/"}
                className="text-[var(--pri)] font-semibold underline underline-offset-4 decoration-1"
              >
                {trackRecord?.link?.label}
              </Link>
            </div>
          </div>

          {/* Top Middle: Awesome Clients */}
          <div className="md:col-span-4 bg-white rounded-[40px] p-8 flex flex-col justify-between">
            <div>
              <h2 className="text-[40px] md:text-6xl font-fraunces text-[var(--pri)] mb-2 font-semibold">
                {clients?.count}
              </h2>
              <h3 className="text-[20px] md:text-2xl font-bold text-[var(--sec)] mb-3">
                {clients?.title}
              </h3>
              <p className="text-[var(--sec)]/70 text-sm leading-relaxed">
                {clients?.description}
              </p>
            </div>

            <div className="flex items-center gap-2 mt-8">
              <div className="*:data-[slot=avatar]:ring-background flex -space-x-6 *:data-[slot=avatar]:ring-2">
                {clients?.avatars.map((i, idx) => (
                  <Avatar className="size-16" key={idx}>
                    <AvatarImage src={i} alt={`image ${idx}`} />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Highlighting Success (Vertical Card) */}
          <div className="md:col-span-4 md:row-span-2 relative rounded-[40px] overflow-hidden group">
            <Image
              src={successHighlight?.backgroundImage ?? "https://upload-community-files-new.s3.ap-south-1.amazonaws.com/uploads/66ba7db16f215782d10496851acc046db19a4f89.jpg"}
              alt="Client Success"
              fill
              unoptimized
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-white via-white/40 to-transparent flex flex-col justify-end p-8">
              <h2 className="text-3xl md:text-[54px] font-fraunces text-[var(--pri)] text-center mb-1 font-semibold">
                {successHighlight?.title}
              </h2>
              <p className="text-[var(--sec)]/70 text-sm text-center mb-6">
                {successHighlight?.description}
              </p>
              <Link href={ successHighlight?.cta?.url ?? "/"} className="bg-[var(--sec)] text-center text-white py-3 rounded-full font-medium hover:bg-[var(--pri)] transition-colors">
                {successHighlight?.cta?.label}
              </Link>
            </div>
          </div>

          {/* Bottom Left: Customized Solutions */}
          <div className="md:col-span-8 bg-white rounded-[40px] p-8 flex flex-col md:flex-row gap-8 items-center">
            <div className="flex-1 order-2 md:order-1">
              <p className="text-[var(--sec)]/70 text-sm mb-6">
               {customSolutions?.description}
              </p>
              <div className="bg-[var(--neu)] rounded-3xl p-6 h-40 flex items-end justify-around gap-2 max-w-sm">
                <div className="bg-[var(--pri)]/30 w-2 h-[40%] rounded-full"></div>
                <div className="bg-[var(--sec)] w-2 h-[20%] rounded-full"></div>
                <div className="bg-[var(--pri)] w-2 h-[60%] rounded-full"></div>
                <div className="bg-[var(--sec)] w-2 h-[30%] rounded-full"></div>
                <div className="bg-[var(--pri)] w-2 h-[50%] rounded-full"></div>
              </div>
              <h3 className="text-[20px] md:text-2xl font-bold text-[var(--sec)] mt-6">
                {customSolutions?.title}
              </h3>
            </div>

            <div className="flex-1 w-full h-full min-h-[250px] relative rounded-[30px] overflow-hidden order-1 md:order-2">
              <Image
                src={customSolutions?.image ?? "https://upload-community-files-new.s3.ap-south-1.amazonaws.com/uploads/d9ae6afefd176c1975ff8849afc32b0c25d318de.jpg"}
                alt="Working"
                fill
                className="object-cover"
                unoptimized
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ConsultingoFeatures;
