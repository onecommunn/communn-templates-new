import React from "react";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const ConsultingoFeatures: React.FC = () => {
  return (
    <section className="bg-[#fcf6e8] py-10 md:py-16 px-6 md:px-20 font-lexend">
      <div className="container mx-auto">
        {/* Header Section */}
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="text-[16px] md:text-3xl font-fraunces text-[#4F2910] leading-snug font-semibold">
            We specialize in tailored solutions for business growth and
            efficiency, optimizing operations with expert guidance and
            innovative strategies for sustainable success.
          </h2>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Top Left: Proven Track Record */}
          <div className="md:col-span-4 bg-white rounded-[40px] p-8 flex flex-col justify-between min-h-[350px]">
            <div className="bg-[#f3ede0] rounded-3xl p-6 h-40 flex items-end justify-around gap-2">
              <div className="bg-[#BC4C37] w-2 h-[60%] rounded-full"></div>
              <div className="bg-[#4F2910] w-2 h-[40%] rounded-full"></div>
              <div className="bg-[#BC4C37] w-2 h-[80%] rounded-full"></div>
              <div className="bg-[#4F2910] w-2 h-[50%] rounded-full"></div>
              <div className="bg-[#BC4C37] w-2 h-[70%] rounded-full"></div>
            </div>
            <div className="mt-6">
              <h3 className="text-[20px] md:text-2xl font-bold text-[#4F2910] mb-2">
                Proven track record
              </h3>
              <p className="text-[#6b4f3a] text-sm mb-4">
                Delivering consistent, successful outcomes, showcasing in every
                project we undertake.
              </p>
              <a
                href="#"
                className="text-[#BC4C37] font-semibold underline underline-offset-4 decoration-1"
              >
                Learn more
              </a>
            </div>
          </div>

          {/* Top Middle: Awesome Clients */}
          <div className="md:col-span-4 bg-white rounded-[40px] p-8 flex flex-col justify-between">
            <div>
              <h2 className="text-[40px] md:text-6xl font-fraunces text-[#BC4C37] mb-2 font-semibold">
                56+
              </h2>
              <h3 className="text-[20px] md:text-2xl font-bold text-[#4F2910] mb-3">
                Awesome clients
              </h3>
              <p className="text-[#6b4f3a] text-sm leading-relaxed">
                Partnering with exceptional clients to achieve remarkable
                results.
              </p>
            </div>

            <div className="flex items-center gap-2 mt-8">
              <div className="*:data-[slot=avatar]:ring-background flex -space-x-6 *:data-[slot=avatar]:ring-2">
                {[
                  "https://upload-community-files-new.s3.ap-south-1.amazonaws.com/uploads/d46ef06dbc51b2ff6eaf044b1e8b174ec1d341d3.jpg",
                  "https://upload-community-files-new.s3.ap-south-1.amazonaws.com/uploads/1f8043c4934d4a5ba231ea7ed277e7dd187174c9.jpg",
                  "https://upload-community-files-new.s3.ap-south-1.amazonaws.com/uploads/ea45bef46dcd540ac37c3eca04f08b5931f1c0d1.jpg",
                  "https://upload-community-files-new.s3.ap-south-1.amazonaws.com/uploads/c0bfd0e460b271cc6fc957defa07a02bf6ee62c7.jpg",
                  "https://upload-community-files-new.s3.ap-south-1.amazonaws.com/uploads/927160e115b909516c07c870e79cfb1f394f9372.jpg",
                ].map((i, idx) => (
                  <Avatar className="size-16" key={idx}>
                    <AvatarImage
                      src={i}
                      alt={`image ${idx}`}
                    />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Highlighting Success (Vertical Card) */}
          <div className="md:col-span-4 md:row-span-2 relative rounded-[40px] overflow-hidden group">
            <Image
              src="https://upload-community-files-new.s3.ap-south-1.amazonaws.com/uploads/66ba7db16f215782d10496851acc046db19a4f89.jpg"
              alt="Client Success"
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-white via-white/40 to-transparent flex flex-col justify-end p-8">
              <h2 className="text-3xl md:text-[54px] font-fraunces text-[#BC4C37] text-center mb-1 font-semibold">
                Highlighting our client's successes
              </h2>
              <p className="text-[#6b4f3a] text-sm text-center mb-6">
                Showcasing the achievements and growth of our valued clients.
              </p>
              <button className="bg-[#3d2314] text-white py-3 rounded-full font-medium hover:bg-[#BC4C37] transition-colors">
                Explore Services
              </button>
            </div>
          </div>

          {/* Bottom Left: Customized Solutions */}
          <div className="md:col-span-8 bg-white rounded-[40px] p-8 flex flex-col md:flex-row gap-8 items-center">
            <div className="flex-1 order-2 md:order-1">
              <p className="text-[#6b4f3a] text-sm mb-6">
                Tailored solutions designed to meet your unique business needs
                and goals.
              </p>
              <div className="bg-[#f3ede0] rounded-3xl p-6 h-40 flex items-end justify-around gap-2 max-w-sm">
                <div className="bg-[#BC4C37]/30 w-2 h-[40%] rounded-full"></div>
                <div className="bg-[#4F2910] w-2 h-[20%] rounded-full"></div>
                <div className="bg-[#BC4C37] w-2 h-[60%] rounded-full"></div>
                <div className="bg-[#4F2910] w-2 h-[30%] rounded-full"></div>
                <div className="bg-[#BC4C37] w-2 h-[50%] rounded-full"></div>
              </div>
              <h3 className="text-[20px] md:text-2xl font-bold text-[#4F2910] mt-6">
                Customized solutions
              </h3>
            </div>

            <div className="flex-1 w-full h-full min-h-[250px] relative rounded-[30px] overflow-hidden order-1 md:order-2">
              <Image
                src="https://upload-community-files-new.s3.ap-south-1.amazonaws.com/uploads/d9ae6afefd176c1975ff8849afc32b0c25d318de.jpg"
                alt="Working"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ConsultingoFeatures;
