"use client";

import React, { useContext, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

import type { EmblaCarouselType } from "embla-carousel";
import { Skeleton } from "@/components/ui/skeleton";
import { usePlans } from "@/hooks/usePlan";
import { AuthContext } from "@/contexts/Auth.context";
import { useCommunity } from "@/hooks/useCommunity";
import { TrainingPlan } from "@/models/plan.model";
import { capitalizeWords } from "@/components/utils/StringFunctions";

type Plan = {
  index: number;
  title: string;
  description: string;
  subscribers: { _id: string }[];
  fetchPlans?: () => void;
  isSubscribedCommunity?: boolean;
  planId: string;
  communityId: string;
  primaryColor: string;
  secondaryColor: string;
  neutralColor: string;
  price: string;
  period: string;
  coverImage: string;
};

type Props = {
  eyebrow?: string;
  heading?: string;
  subheading?: string;
  plans?: Plan[];
  primaryColor?: string;
  secondaryColor?: string;
  neutralColor?: string;
};

// const DEFAULT_PLANS: Plan[] = [
//   {
//     title: "Relaxation & Glow – Monthly",
//     price: "$79 / mo",
//     image: "/assets/spawell-plans-image-1.jpg",
//     href: "/plans/relaxation-glow",
//   },
//   {
//     title: "Skin Rejuvenation – Quarterly",
//     price: "$199 / qtr",
//     image: "/assets/spawell-plans-image-2.jpg",
//     href: "/plans/skin-rejuvenation",
//   },
//   {
//     title: "Hot Stone Therapy – Premium",
//     price: "$129 / visit",
//     image: "/assets/spawell-plans-image-3.jpg",
//     href: "/plans/hot-stone-premium",
//   },
//   {
//     title: "Relaxation & Glow – Monthly",
//     price: "$79 / mo",
//     image: "/assets/spawell-plans-image-1.jpg",
//     href: "/plans/relaxation-glow",
//   },
//   {
//     title: "Skin Rejuvenation – Quarterly",
//     price: "$199 / qtr",
//     image: "/assets/spawell-plans-image-2.jpg",
//     href: "/plans/skin-rejuvenation",
//   },
//   {
//     title: "Hot Stone Therapy – Premium",
//     price: "$129 / visit",
//     image: "/assets/spawell-plans-image-3.jpg",
//     href: "/plans/hot-stone-premium",
//   },
// ];

const Card: React.FC<Plan> = ({
  index,
  title,
  description,
  subscribers,
  fetchPlans,
  isSubscribedCommunity,
  planId,
  communityId,
  primaryColor,
  secondaryColor,
  neutralColor,
  price,
  period,
  coverImage,
}) => (
  <div
    className="group block rounded-3xl bg-white p-3 transition-shadow"
    aria-label={title}
  >
    {/* Image */}
    <div className="relative overflow-hidden rounded-2xl">
      <div className="relative aspect-[16/11]">
        <Image
          src={coverImage}
          alt={title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          sizes="(max-width:1024px) 100vw, 33vw"
          priority={false}
        />
      </div>
    </div>

    {/* Title + price */}
    <div className="mt-4">
      <h3 className="text-lg font-semibold leading-6 text-[#3c2318]">
        {title}
      </h3>
      {price && (
        <p className="mt-1 text-sm text-[#7a675f]">
          <span className="text-lg font-semibold text-[#5D3222]">₹{price}</span> / {period}
        </p>
      )}
    </div>

    {/* CTA */}
    <Link href={`/subscriptions/?planid=${planId}&communityid=${communityId}`}>
      <div className="mt-4 inline-flex items-center gap-2 text-[16px] font-bold text-[#5D3222]">
        View Plan
        <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </div>
    </Link>
  </div>
);

function Dots({
  api,
  className = "",
  primaryColor,
}: {
  api: EmblaCarouselType | undefined;
  className?: string;
  primaryColor: string;
}) {
  const [count, setCount] = useState(0);
  const [selected, setSelected] = useState(0);

  useEffect(() => {
    if (!api) return;

    const onSelect = () => setSelected(api.selectedScrollSnap());
    const onReInit = () => {
      setCount(api.scrollSnapList().length);
      setSelected(api.selectedScrollSnap());
    };

    // initialize
    setCount(api.scrollSnapList().length);
    setSelected(api.selectedScrollSnap());

    api.on("select", onSelect);
    api.on("reInit", onReInit);

    return () => {
      api.off("select", onSelect);
      api.off("reInit", onReInit);
    };
  }, [api]);

  if (!api || count <= 1) return null;

  return (
    <div className={`mt-6 flex items-center justify-center gap-2 ${className}`}>
      {Array.from({ length: count }).map((_, i) => {
        const isActive = i === selected;
        return (
          <button
            key={i}
            aria-label={`Go to slide ${i + 1}`}
            onClick={() => api.scrollTo(i)}
            style={{
              backgroundColor: isActive ? primaryColor : "",
            }}
            className={[
              "h-2.5 w-2.5 rounded-full transition-all",
              isActive
                ? `w-6 bg-[${primaryColor}] shadow-[0_0_0_4px_rgba(194,167,78,0.15)]`
                : "bg-gray-300 hover:bg-gray-400 cursor-pointer",
            ].join(" ")}
          />
        );
      })}
    </div>
  );
}

const SpawellPlans: React.FC<Props> = ({
  eyebrow = "• Latest Blog",
  heading = "Inside the ultimate luxury",
  subheading = "spa experience",
  //   plans = DEFAULT_PLANS,
  primaryColor = "#5D3222",
  secondaryColor = "",
  neutralColor = "",
}) => {
  const [apiLoading, setApiLoading] = useState<EmblaCarouselType | undefined>(
    undefined
  );
  const [apiMain, setApiMain] = useState<EmblaCarouselType | undefined>(
    undefined
  );
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { getPlansList, getCommunityPlansListAuth } = usePlans();
  const [plans, setPlans] = useState<TrainingPlan[]>([]);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const authContext = useContext(AuthContext);
  const isAuthenticated = authContext?.isAuthenticated;
  const { communityId } = useCommunity();

  // Persist the autoplay plugin instance
  const autoplay = useRef(
    Autoplay({
      delay: 2000,
      stopOnInteraction: true,
      stopOnMouseEnter: true,
    })
  );

  useEffect(() => {
    const api = apiMain;
    if (!api) return;

    const maybeRestartAtEnd = () => {
      const lastIndex = api.scrollSnapList().length;
      if (api.selectedScrollSnap() === lastIndex) {
        // Jump back to the first slide and keep autoplay ticking
        // (omit the second arg to animate; pass `true` to jump instantly)
        api.scrollTo(0);
        // Reset the autoplay timer so it continues naturally
        // (safe-optional chaining in case reset isn't present)
        autoplay.current?.reset?.();
      }
    };

    // run once and on every selection/reInit
    maybeRestartAtEnd();
    api.on("select", maybeRestartAtEnd);
    api.on("reInit", maybeRestartAtEnd);

    return () => {
      api.off("select", maybeRestartAtEnd);
      api.off("reInit", maybeRestartAtEnd);
    };
  }, [apiMain]);

  const fetchPlans = async () => {
    if (!communityId) return;
    setIsLoading(true);
    try {
      let response;
      if (isAuthenticated) {
        response = await getCommunityPlansListAuth(communityId);
      } else {
        response = await getPlansList(communityId);
      }

      if (Array.isArray(response)) {
        setPlans(response as TrainingPlan[]);
      } else if (
        response &&
        typeof response === "object" &&
        "myPlans" in response &&
        Array.isArray((response as any).myPlans)
      ) {
        setPlans((response as any).myPlans as TrainingPlan[]);
        setIsSubscribed((response as any).isSubscribedCommunity);
      } else {
        setPlans([]);
      }
    } catch (error) {
      console.error("Failed to fetch plans:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPlans();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [communityId, isAuthenticated]);

  if (isLoading) {
    // Skeleton with dots
    return (
      <section
        id="plans"
        className="relative py-20 font-cormorant bg-[#C2A74E1A] overflow-hidden"
        // style={{
        //   backgroundColor: `${primaryColor}1A`,
        // }}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-20">
          <div className="text-center mb-4">
            <h2 className="text-3xl font-semibold tracking-[-0.02em] text-[#4b2a1d] md:text-5xl">
              {heading}
            </h2>
            <p className="mt-1 text-2xl font-lora italic text-[#4b2a1d]/90 md:text-[34px]">
              {subheading}
            </p>
          </div>
          <Carousel
            opts={{ align: "start", loop: false }}
            className="w-full"
            setApi={setApiLoading}
          >
            <CarouselContent>
              {Array.from({ length: 8 }).map((_, i) => (
                <CarouselItem
                  key={i}
                  className="basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/3"
                >
                  <Skeleton className="h-[420px] w-full bg-gray-300 rounded-[30px]" />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden sm:flex" />
            <CarouselNext className="hidden sm:flex" />
          </Carousel>
          <Dots api={apiLoading} primaryColor={primaryColor} />
        </div>
      </section>
    );
  }

  return (
    <section className="relative overflow-hidden bg-white py-16 md:py-24 font-plus-jakarta">
      <div className="container mx-auto px-4 sm:px-6 lg:px-20">
        {/* Eyebrow */}
        <div className="mb-2 flex justify-center">
          <span className="text-sm text-[#5D3222]">
            {eyebrow.replace("Blog", "Plans")}
          </span>
        </div>

        {/* Heading */}
        <div className="text-center mb-4">
          <h2 className="text-3xl font-semibold tracking-[-0.02em] text-[#4b2a1d] md:text-5xl">
            {heading}
          </h2>
          <p className="mt-1 text-2xl font-lora italic text-[#4b2a1d]/90 md:text-[34px]">
            {subheading}
          </p>
        </div>

        {/* Cards */}
        <Carousel
          opts={{
            align: "start",
            loop: false, // <-- no loop: don't go back to first after last
          }}
          plugins={[autoplay.current]}
          className="w-full"
          setApi={setApiMain}
        >
          <CarouselContent>
            {plans.map((plan, index) => (
              <CarouselItem key={index} className="basis-full md:basis-1/3">
                <Card
                  index={index + 1}
                  title={plan.name}
                  description={plan.description || plan.summary}
                  subscribers={plan?.subscribers}
                  fetchPlans={fetchPlans}
                  isSubscribedCommunity={isSubscribed}
                  planId={plan._id}
                  communityId={communityId}
                  primaryColor={primaryColor}
                  secondaryColor={secondaryColor}
                  neutralColor={neutralColor}
                  price={plan.pricing || `${plan.totalPlanValue}`}
                  period={`${plan.interval} ${capitalizeWords(plan.duration)}`}
                  coverImage={
                    plan?.image?.value ||
                    "/assets/spawell-plans-image-1.jpg"
                  }
                />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious
            aria-label="Previous plans"
            className="hidden sm:flex size-10 cursor-pointer"
            style={{
              color: primaryColor,
              backgroundColor: "#fff",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.backgroundColor =
                primaryColor;
              (e.currentTarget as HTMLElement).style.color = "#fff";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.backgroundColor = "#fff";
              (e.currentTarget as HTMLElement).style.color = primaryColor;
            }}
          />

          <CarouselNext
            className="hidden sm:flex size-10 cursor-pointer"
            style={{
              color: primaryColor,
              backgroundColor: "#fff",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.backgroundColor =
                primaryColor;
              (e.currentTarget as HTMLElement).style.color = "#fff";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.backgroundColor = "#fff";
              (e.currentTarget as HTMLElement).style.color = primaryColor;
            }}
            aria-label="Next plans"
          />
        </Carousel>
        <Dots api={apiMain} primaryColor={primaryColor} />
      </div>
    </section>
  );
};

export default SpawellPlans;
