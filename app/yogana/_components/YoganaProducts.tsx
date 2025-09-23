"use client";
import { Star } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";

type Product = {
  id: string;
  title: string;
  image: string;
  price: string;
  compareAt?: string;
  rating?: number;
  category: string;
};

const categories = ["Accessories", "Mat", "Yoga Equipment", "Yoga Clothing"];

const allProducts: Product[] = [
  {
    id: "p1",
    title: "Small Cotton",
    image: "/assets/yogana-product-image-1.jpg",
    price: "705.00",
    compareAt: "968.00",
    rating: 0,
    category: "Mat",
  },
  {
    id: "p2",
    title: "Aerodynamic Coat",
    image: "/assets/yogana-product-image-2.jpg",
    price: "505.00",
    rating: 0,
    category: "Yoga Equipment",
  },
  {
    id: "p3",
    title: "Small Cotton",
    image: "/assets/yogana-product-image-3.jpg",
    price: "705.00",
    compareAt: "968.00",
    rating: 0,
    category: "Yoga Clothing",
  },
];

function Stars({ value = 0 }: { value?: number }) {
  // empty stars like the mock
  return (
    <div className="flex items-center gap-1 text-[#C2A74E]">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} size={14} className="opacity-50" />
      ))}
    </div>
  );
}

const YoganaProducts = () => {
  const [active, setActive] = useState(categories[0]);

  const products = allProducts.filter(
    (p) => p.category === active || active === "Accessories"
  );
  return (
    <section
      id="products"
      className="relative py-20 font-cormorant bg-[#C2A74E1A] overflow-hidden"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-20">
        {/* heading */}
        <div className="relative z-10 text-center md:mb-16 mb-6">
          <p className="text-[#C2A74E] font-alex-brush text-3xl">
            Our Products
          </p>
          <h2 className="text-black font-cormorant text-[40px] md:text-[60px]/[60px] font-semibold">
            Shop Yoga Essentials
          </h2>
          <div className="flex items-center justify-center w-full mt-3">
            <p className="font-plus-jakarta text-[16px] text-[#707070] md:max-w-xl">
              A yoga shop is a place where practitioners of all levels can find
              essential equipment, accessories,
            </p>
          </div>
        </div>
        <div className="mx-auto max-w-6xl px-4">
          {/* Tabs */}
          <div className="mb-6 flex items-center flex-wrap justify-center gap-6 overflow-x-auto">
            {categories.map((c) => {
              const isActive = c === active;
              return (
                <button
                  key={c}
                  onClick={() => setActive(c)}
                  className={`relative pb-2 text-lg cursor-pointer font-plus-jakarta font-medium tracking-wide ${
                    isActive ? "text-[#C2A74E]" : "text-neutral-600"
                  }`}
                >
                  {c}
                  {isActive && (
                    <span className="absolute inset-x-0 -bottom-[1px] h-[2px] rounded bg-[#C2A74E]" />
                  )}
                </button>
              );
            })}
          </div>
          {/* Divider */}
          <div className="mb-6 h-px w-full bg-neutral-200/80" />
          {/* Grid */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {products.slice(0, 3).map((p) => (
              <article
                key={p.id}
                className="group cursor-pointer"
                aria-label={p.title}
              >
                <div className="relative aspect-[13/16] overflow-hidden rounded-2xl bg-white shadow-sm">
                  <Image
                    src={p.image}
                    alt={p.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                    sizes="(max-width:768px) 100vw, (max-width:1280px) 33vw, 33vw"
                  />
                </div>
                <div className="mt-4 text-center">
                  {p.compareAt ? (
                    <p className="text-2xl text-neutral-400">
                      <span className="mr-2 line-through opacity-70">
                        {p.compareAt}
                      </span>
                      <span className="text-[#C2A74E]">{p.price}</span>
                    </p>
                  ) : (
                    <p className="text-2xl text-[#C2A74E]">{p.price}</p>
                  )}

                  {/* Title */}
                  <h3 className="mt-1 font-medium text-2xl font-cormorant text-neutral-900">
                    {p.title}
                  </h3>

                  {/* Stars (empty like mock) */}
                  <div className="mt-1 flex justify-center">
                    <Stars value={p.rating} />
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default YoganaProducts;
