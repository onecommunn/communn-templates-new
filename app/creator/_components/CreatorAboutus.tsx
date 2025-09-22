import CreatorSectionHeader from "@/components/CustomComponents/Creator/CreatorSectionHeader";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCheck } from "lucide-react";
import React from "react";

const CreatorAboutus = () => {
  return (
    <section className="pb-10 font-inter">
      <div className="container mx-auto px-4 sm:px-6 lg:px-20">
        <CreatorSectionHeader
          title="Know About us"
          description="Our names are Prachi & Harsh and we’re multi-passionate content
            creators making videos about slow travel, love & relationships."
        />
        {/* <div className="text-center md:mb-16 mb-6">
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-[#0C0407] font-inter">
            Know About us
          </h2>
          <p className="text-[16px] text-[#0C0407] max-w-2xl mx-auto font-inter">
            Our names are Prachi & Harsh and we’re multi-passionate content
            creators making videos about slow travel, love & relationships.
          </p>
        </div> */}
        <div className="grid md:grid-cols-2 grid-cols-1 gap-6 md:gap-10 lg:gap-28">
          {/* left  */}
          <div className="flex flex-col justify-center gap-6 order-2 md:order-1">
            <h1 className="text-[#0C0407] font-semibold min-w-fit font-poppins text-2xl md:text-4xl lg:text-5xl/[53px] md:tracking-[-1.44px] text-left">
              Consistent growth, boundless potential
            </h1>
            <p className="text-[#0C0407] align-middle text-[16px]/[24px] font-inter">
              We met in college back in 2016, and ever since, life has been one
              big adventure! From chasing the Northern Lights in Iceland to
              plunging into Antarctica's icy waters and learning scuba diving in
              Egypt, we've been living a dream and documenting it all along the
              way. But our journey doesn't end there.
            </p>
            <p className="text-[#0C0407] align-middle text-[16px]/[24px]">
              We believe in empowering others with knowledge to help them live
              their best, most fulfilling life.
            </p>
            <div className="flex flex-col gap-2">
              <div className="flex flex-row items-start gap-2">
                <CheckCheck strokeWidth={2.8} size={26} />
                <p className="font-bold text-[16px]/[20px] ">
                  Through our blogs, Guides and Workshops we hope to share
                  practical tips and inspirations for your own adventures.
                </p>
              </div>
              <div className="flex flex-row items-start gap-2">
                <CheckCheck strokeWidth={2.8} size={26} />
                <p className="font-bold text-[16px]/[20px] ">
                  Whether you are seasoned wanderer or just starting to dream we
                  invite you to join our ever evolving adventure we call Life!
                </p>
              </div>
            </div>
            <Button className="rounded-[12px] text-sm pr-[20px] pl-[20px] w-fit">
              Know More{" "}
              <span>
                <ArrowRight />
              </span>
            </Button>
          </div>
          {/* right */}
          <div className="flex flex-col justify-center order-1 md:order-2">
            <div className="grid grid-cols-2 gap-4 max-w-2xl mx-auto">
              {/* Left column */}
              <div className="flex flex-col gap-4">
                {/* Top-left (near square) */}
                <div className="rounded-2xl overflow-hidden">
                  <img
                    src="/assets/colImage1.png"
                    alt=""
                    className="w-full object-cover aspect-square" /* tweak to taste */
                  />
                </div>
                {/* Bottom-left (square) */}
                <div className="rounded-2xl overflow-hidden">
                  <img
                    src="/assets/colImage2.png"
                    alt=""
                    className="w-full object-cover aspect-square"
                  />
                </div>
              </div>

              {/* Right column */}
              <div className="flex flex-col gap-4">
                {/* Top-right (portrait) */}
                <div className="rounded-2xl overflow-hidden">
                  <img
                    src="/assets/colImage3.png"
                    alt=""
                    className="w-full object-cover aspect-[3/4]"
                  />
                </div>
                {/* Bottom-right (landscape) */}
                <div className="rounded-2xl overflow-hidden">
                  <img
                    src="/assets/colImage4.png"
                    alt=""
                    className="w-full object-cover aspect-[4/2.68]"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CreatorAboutus;
