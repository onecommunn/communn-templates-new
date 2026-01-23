"use client";
import React from "react";
import OmIcon from "./icons/OmIcon";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import Autoplay from "embla-carousel-autoplay";
import { CollectionsSection } from "@/models/templates/collections/collections-home-model";
import { ItemsSections } from "@/models/templates/collections/collections-collection-model";


const CollectionsProducts = ({
  data,
  primaryColor,
  products,
}: {
  data: CollectionsSection;
  primaryColor: string;
  products: ItemsSections;
}) => {
  const plugin = React.useRef(
    Autoplay({ delay: 3000, stopOnInteraction: true, stopOnMouseEnter: true })
  );
  const content = data?.content;
  return (
    <section
      className="mx-auto px-6 md:px-20 py-10 md:py-16 font-kalnia bg-[#E5E5E5]/30"
      style={
        {
          "--pri": primaryColor,
        } as React.CSSProperties
      }
    >
      {/* Header */}
      <div className="flex items-center flex-col justify-center gap-4 mb-6 md:mb-12">
        <div className="text-[var(--pri)]">
          <OmIcon size={60} color={primaryColor} />
        </div>
        <h3 className="text-3xl md:text-[42px]/[50px] text-center font-kalnia">
          {content?.heading}
        </h3>
        <p className="font-figtree text-sm md:text-base md:max-w-lg text-center text-gray-600">
          {content?.description}
        </p>
      </div>

      {/* Product Carousel */}
      <div className="relative w-full">
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
          plugins={[plugin.current]}
        >
          <CarouselContent className="-ml-4">
            {products?.content?.itembox?.map((product, idx) => (
              <CarouselItem
                key={idx}
                className="pl-4 md:basis-1/3 lg:basis-1/4"
              >
                <div className="group cursor-pointer">
                  <Card className="border-none shadow-none bg-transparent overflow-hidden">
                    <CardContent className="p-0">
                      {/* Image Container */}
                      <div className="relative aspect-[3/4] overflow-hidden rounded-sm">
                        <img
                          src={product.media}
                          alt={product.title}
                          className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
                        />
                      </div>
                      {/* Product Details */}
                      <div className="mt-4 space-y-1">
                        <h4 className="text-lg font-medium text-center text-gray-900 line-clamp-1">
                          {product.title}
                        </h4>
                        {/* <p className="text-[var(--pri)] font-semibold font-figtree">
                          ₹{product.price}
                        </p> */}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>

          {/* Controls - Positioned relative to the container */}
          <div className="hidden md:block">
            <CarouselPrevious className="-left-12 border-[var(--pri)] text-[var(--pri)] hover:bg-[var(--pri)] hover:text-white cursor-pointer disabled:border-gray-300 disabled:text-gray-300 disabled:cursor-not-allowed" />
            <CarouselNext className="-right-12 border-[var(--pri)] text-[var(--pri)] hover:bg-[var(--pri)] hover:text-white cursor-pointer disabled:border-gray-300 disabled:text-gray-300 disabled:cursor-not-allowed" />
          </div>
        </Carousel>
      </div>
    </section>
  );
};

export default CollectionsProducts;
