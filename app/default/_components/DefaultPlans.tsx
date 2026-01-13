"use client";
import React from "react";
import { Check, X, ChevronLeft, ChevronRight, Diamond } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

const DefaultPlans = () => {
  const plans = [
    {
      name: "Plan Name",
      price: "₹500 per month",
      isFeatured: false,
      features: [
        "Get access to all recordings",
        "Get access to all recordings",
        "Unlimited Chat & Messages",
        "Yes",
        "2%",
        "10+ Course Listings",
      ],
      unavailable: ["-"],
    },
    {
      name: "Communn Plus",
      isFeatured: true,
      features: [
        "Create upto 100 Communities",
        "Create upto 100 Communities",
        "Unlimited Chat & Messages",
        "Yes",
        "0%",
        "100+",
        "Yes",
      ],
      unavailable: [],
    },
    {
      name: "Plan Name",
      price: "₹500 per month",
      isFeatured: false,
      features: [
        "Get access to all recordings",
        "Get access to all recordings",
        "Unlimited Chat & Messages",
        "Yes",
        "2%",
        "10+ Course Listings",
      ],
      unavailable: ["-"],
    },
  ];

  const plugin = React.useRef(
    Autoplay({ delay: 5000, stopOnInteraction: false })
  );

  return (
    <section
      id="plans"
      className="max-w-6xl mx-auto px-6 py-6 md:py-12 font-montserrat relative scroll-mt-[40px] md:scroll-mt-[90px]"
    >
      <h2 className="text-2xl font-bold mb-8 text-black">
        Plans
      </h2>

      <Carousel
        plugins={[plugin.current]}
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full"
      >
        <CarouselContent>
          {plans.map((plan, idx) => (
            <CarouselItem key={idx} className="md:basis-1/2 lg:basis-1/3">
              <div
                className={`relative rounded-[2.5rem] w-full h-full p-8 pt-12 border border-gray-200 flex flex-col ${
                  plan.isFeatured ? "bg-[#FDF2F7]" : "bg-white"
                }`}
              >
                {/* Icon Header */}
                <div className="mb-6">
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                      plan.isFeatured
                        ? "bg-white text-black shadow-sm"
                        : "bg-[#A7F3D0] text-[#065F46]"
                    }`}
                  >
                    {plan.isFeatured ? (
                      <Diamond size={20} />
                    ) : (
                      <div className="w-5 h-5 rounded-full border-2 border-current" />
                    )}
                  </div>
                </div>

                <h3 className="text-2xl font-bold mb-6 text-black">
                  {plan.name}
                </h3>

                {/* Features List */}
                <div className="space-y-4 mb-10 flex-grow">
                  {plan.price && (
                    <div className="flex items-center gap-3 text-sm font-medium text-gray-700">
                      <Check size={16} className="text-black" />
                      {plan.price}
                    </div>
                  )}
                  {plan.features.map((feature, fIdx) => (
                    <div
                      key={fIdx}
                      className="flex items-center gap-3 text-sm font-medium text-gray-700"
                    >
                      <Check size={16} className="text-black" />
                      {feature}
                    </div>
                  ))}
                  {plan.unavailable.map((item, uIdx) => (
                    <div
                      key={uIdx}
                      className="flex items-center gap-3 text-sm font-medium text-gray-400"
                    >
                      <X size={16} className="text-red-500" />
                      {item}
                    </div>
                  ))}
                </div>

                {/* Subscribe Button */}
                <Button
                  variant={plan.isFeatured ? "default" : "outline"}
                  className={`w-full py-6 rounded-xl font-bold text-base transition-all ${
                    plan.isFeatured
                      ? "bg-[#2E59A7] hover:bg-[#1E4D91] text-white border-none"
                      : "bg-transparent border-[#2E59A7] text-[#2E59A7] hover:bg-blue-50"
                  }`}
                >
                  Subscribe
                </Button>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="bg-gray-100 border-none hover:bg-gray-200 size-10 cursor-pointer hidden md:flex" />
        <CarouselNext className="bg-gray-100 border-none hover:bg-gray-200 size-10 cursor-pointer hidden md:flex" />
      </Carousel>
    </section>
  );
};

export default DefaultPlans;
