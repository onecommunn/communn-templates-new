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

const products = [
  {
    id: 1,
    title: "Banarasi Silk Wedding Saree",
    price: "4000",
    image:
      "https://upload-community-files-new.s3.ap-south-1.amazonaws.com/uploads/b32f303be02e4ae712e911ed15536d84a3325369.jpg", // Replace with your image paths
  },
  {
    id: 2,
    title: "Fashion Georgette Saree",
    price: "6000",
    image:
      "https://upload-community-files-new.s3.ap-south-1.amazonaws.com/uploads/ac20c5a29535b4242ec0cdcbc2d211542665e37c.jpg",
  },
  {
    id: 3,
    title: "Designer Lahenga Choli",
    price: "4800",
    image:
      "https://upload-community-files-new.s3.ap-south-1.amazonaws.com/uploads/28683a34ce4fec00a49cec22115dbb7f426257d7.jpg",
  },
  {
    id: 4,
    title: "Bengali Bridal Saree",
    price: "8000",
    image:
      "https://upload-community-files-new.s3.ap-south-1.amazonaws.com/uploads/650f35bcb3082d5821188c7ea7ad65bbbbb6caaf.jpg",
  },
  {
    id: 5,
    title: "A Line Long Sleeve Gown",
    price: "4000",
    image:
      "https://upload-community-files-new.s3.ap-south-1.amazonaws.com/uploads/330b6b3b09b00a2723d6dfc435eb9f2eeb0f0370.jpg",
  },
  {
    id: 6,
    title: "A Line Sleeveless Wedding Dress",
    price: "600",
    image:
      "https://upload-community-files-new.s3.ap-south-1.amazonaws.com/uploads/7ed8c4ddc9ff11584127fbc7d3687648301cfef9.jpg",
  },
  {
    id: 7,
    title: "Banarasi Silk Wedding Saree",
    price: "4800",
    image:
      "https://upload-community-files-new.s3.ap-south-1.amazonaws.com/uploads/58a0acf7987d0c5fea87ef30f5aafb16729065e7.jpg",
  },
  {
    id: 8,
    title: "Bengali Bridal Saree",
    price: "8000",
    image:
      "https://upload-community-files-new.s3.ap-south-1.amazonaws.com/uploads/a125603cb16bf58d39bc761d5a4361da4f00ad2b.jpg",
  },
  {
    id: 9,
    title: "Bridal Wedding Saree",
    price: "12000",
    image:
      "https://upload-community-files-new.s3.ap-south-1.amazonaws.com/uploads/71b586be092c99929a4d1095d0bce841d99cffaa.jpg",
  },
];

const CollectionsProducts = () => {
  const plugin = React.useRef(
    Autoplay({ delay: 3000, stopOnInteraction: false })
  );
  return (
    <section className="mx-auto px-6 md:px-20 py-10 md:py-16 font-kalnia bg-[#E5E5E5]/30">
      {/* Header */}
      <div className="flex items-center flex-col justify-center gap-4 mb-6 md:mb-12">
        <div className="text-[#C09932]">
          <OmIcon size={60} />
        </div>
        <h3 className="text-3xl md:text-[42px]/[50px] text-center font-kalnia">
          Enhance Your Look
        </h3>
        <p className="font-figtree text-sm md:text-base md:max-w-lg text-center text-gray-600">
          Sed viverra tellus in hac habitasse. Nulla posuere sollicitudin
          aliquam ultrices orci. libero volutpat sed cras ornare.
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
            {products.map((product) => (
              <CarouselItem
                key={product.id}
                className="pl-4 md:basis-1/3 lg:basis-1/4"
              >
                <div className="group cursor-pointer">
                  <Card className="border-none shadow-none bg-transparent overflow-hidden">
                    <CardContent className="p-0">
                      {/* Image Container */}
                      <div className="relative aspect-[3/4] overflow-hidden rounded-sm">
                        <img
                          src={product.image}
                          alt={product.title}
                          className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
                        />
                      </div>
                      {/* Product Details */}
                      <div className="mt-4 space-y-1">
                        <h4 className="text-lg font-medium text-gray-900 line-clamp-1">
                          {product.title}
                        </h4>
                        <p className="text-[#C09932] font-semibold font-figtree">
                          ₹{product.price}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>

          {/* Controls - Positioned relative to the container */}
          <div className="hidden md:block">
            <CarouselPrevious className="-left-12 border-[#C09932] text-[#C09932] hover:bg-[#C09932] hover:text-white cursor-pointer disabled:border-gray-300 disabled:text-gray-300 disabled:bg-gray-300" />
            <CarouselNext className="-right-12 border-[#C09932] text-[#C09932] hover:bg-[#C09932] hover:text-white cursor-pointer disabled:border-gray-300 disabled:text-gray-300 disabled:bg-gray-300" />
          </div>
        </Carousel>
      </div>
    </section>
  );
};

export default CollectionsProducts;
