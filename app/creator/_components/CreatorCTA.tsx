import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import React from "react";

const CreatorCTA = () => {
  return (
    <section className="py-10 font-inter">
      <div className="container mx-auto px-4 sm:px-6 lg:px-20">
        <div className="bg-[#0C0407] text-white rounded-[20px] p-10 md:p-16 flex flex-col md:flex-row justify-center gap-6  md:justify-between items-center ">
          <div className="flex flex-col gap-2">
            <h3 className="font-poppins font-semibold md:text-5xl text-3xl text-center md:text-left">Stay Inspired</h3>
            <p className="text-[16px] max-w-2xl text-center md:text-left">Get weekly insights, tips, and exclusive content delivered to your inbox. Join over 10,000 people on their growth journey.</p>
          </div>
          <div>
            <Button variant={"secondary"}>
                 Explore All Activities{" "}
              <span>
                <ArrowRight />
              </span>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CreatorCTA;
