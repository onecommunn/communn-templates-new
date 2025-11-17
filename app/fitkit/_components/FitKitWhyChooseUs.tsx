import { DumbbellIcon } from "lucide-react";
import Image from "next/image";
import React from "react";

const points = [
  "Group Fitness and Community",
  "Benefits for Physical Health",
  "Mental Health Impact",
  "Progression and Consistency",
  "Diversity of Workouts",
  "Functional Fitness",
];

const FitKitWhyChooseUs = () => {
  return (
    <section className="font-archivo relative w-full overflow-hidden">
      <div className="mx-auto container px-6 md:px-20 py-10 md:py-20 grid md:grid-cols-2 gap-6">
        {/* Titles */}
        {/* left */}
        <div className="flex flex-col justify-center gap-6">
          <div className="flex items-center gap-3">
            <span className="h-[2px] w-16 bg-[#F41E1E] hidden md:flex" />
            <span className="font-semibold text-xl text-[#F41E1E] font-kanit">
              Why Choose Us
            </span>
          </div>
          <h4 className="font-kanit font-semibold text-3xl md:text-5xl">
            Invigorating Fitness Workout for Body and Mind
          </h4>
          <p className="text-[#6A6A6A] text-[16px]">
            Many individuals benefit from personalized workout plans designed by
            fitness professionals or personal trainers to address specific
            fitness goals, such as muscle gain, weight loss, or improved
            athletic performance. Gyms provide the flexibility to choose from a
            variety of exercises, allowing individuals to customize their
            workouts.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {points.map((pt, idx) => (
              <div className="flex items-center gap-2" key={idx}>
                <DumbbellIcon color="#F41E1E" size={28} strokeWidth={1.2} />
                <p className="font-kanit font-medium text-[16px]">{pt}</p>
              </div>
            ))}
          </div>
        </div>
        {/* right */}
        <div className="flex justify-end">
          <Image src={'/assets/fitkit-why-choose-us-image.png'} alt="fitkit-why-choose-us-image" width={527} height={490}/>
        </div>
      </div>
    </section>
  );
};

export default FitKitWhyChooseUs;
