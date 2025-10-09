import { Button } from "@/components/ui/button";
import { ArrowUpRight, BadgeCheck, UserCog } from "lucide-react";
import Link from "next/link";
import React from "react";

const SpawellHero = () => {
  return (
    <section
      className="relative flex items-center justify-center min-h-screen bg-cover bg-left md:bg-center bg-no-repeat font-plus-jakarta"
      style={{
        backgroundImage: "url('/assets/spawell-hero-image.png')",
      }}
    >
      <div
        className="absolute inset-0 bg-black/40"
        style={{
          background:
            "linear-gradient(270deg, rgba(93, 50, 34, 0) 24.17%, rgba(93, 50, 34, 0.9) 80.55%)",
        }}
      />{" "}
      {/* optional dark overlay */}
      <div className="relative z-10 container mx-auto px-6 md:px-20 text-white">
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div>
            <h2 className="md:text-6xl/[72px] tracking-[-1.2px] text-4xl font-semibold">
              Relax, recharge, and reconnect with inner{" "}
              <span className="font-lora font-normal italic">peace today</span>
            </h2>
            <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-10 mt-20">
              <Link href={"/"}>
                <Button className="bg-white text-[#5D3222] font-bold  px-[30px] py-[18px] text-[16px] cursor-pointer hover:bg-transparent border border-white hover:text-white">
                  Book An Appointment
                  <span>
                    <ArrowUpRight
                      className="w-10 h-10 min-w-5 min-h-5 font-bold"
                      strokeWidth={2.5}
                    />
                  </span>
                </Button>
              </Link>
              <Link href={"/"}>
                <Button className="bg-transparent text-white font-bold px-[30px] py-[18px] text-[16px] cursor-pointer hover:bg-white border border-white hover:text-[#5D3222]">
                  Our Services
                  <span>
                    <ArrowUpRight
                      className="w-10 h-10 min-w-5 min-h-5 font-bold"
                      strokeWidth={2.5}
                    />
                  </span>
                </Button>
              </Link>
            </div>
            <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-10 mt-10">
              <div className="flex items-center gap-3">
                <div className="rounded-full p-4 flex items-center justify-center text-white bg-white/20 backdrop-blur-md">
                  <UserCog strokeWidth={1} size={30} />
                </div>
                <p className="text-[16px]">Personalized Wellness Programs</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="rounded-full p-4 flex items-center justify-center text-white bg-white/20 backdrop-blur-md">
                  <BadgeCheck strokeWidth={1} size={30} />
                </div>
                <p className="text-[16px]">
                  Experienced and Certified Wellness Practitioners
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SpawellHero;
