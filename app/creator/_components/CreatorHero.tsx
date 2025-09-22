import ArcCarousel from "@/components/CustomComponents/ArcCarousel/ArcCarousel";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const CreatorHero = () => {
  const items = [
    {
      id: 1,
      src: "/assets/slideImage1.jpg",
    },
    {
      id: 2,
      src: "/assets/slideImage2.jpg",
    },
    {
      id: 3,
      src: "/assets/slideImage3.jpg",
    },
    {
      id: 4,
      src: "/assets/slideImage4.jpg",
    },
    {
      id: 5,
      src: "/assets/slideImage5.jpg",
    },
    {
      id: 6,
      src: "/assets/slideImage3.jpg",
    },
  ];
  return (
    <section className="relative pt-16 lg:pt-32 pb-10 md:pb-0 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-20 relative mb-4 md:mb-0">
        <div className="max-w-4xl mx-auto text-center flex flex-col justify-center items-center gap-5">
          <h1 className="text-center font-semibold text-3xl md:text-[72px]/[79px] font-poppins md:tracking-[-3.6px]">
            Gain the skills to unlock your true potential
          </h1>
          <p className="tracking-[-0.48px] text-black text-[16px] text-center md:max-w-[643px]">
            Unlock a world of opportunities and take control of your future by
            mastering new skills that empower you to achieve your goals.
          </p>
          <Button className="rounded-[12px] text-sm pr-[20px] pl-[20px] w-fit">
            Join Our Community{" "}
            <span>
              <ArrowRight />
            </span>
          </Button>
        </div>
      </div>
      <ArcCarousel items={items} />
    </section>
  );
};

export default CreatorHero;
