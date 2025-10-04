"use client";
import React, { FC, useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "@/contexts/Auth.context";
import { usePlans } from "@/hooks/usePlan";
import { TrainingPlan } from "@/models/plan.model";
import { getCommunityData } from "@/services/communityService";
import YoganaPlanCard from "./YoganaPlanCard";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import type { EmblaCarouselType } from "embla-carousel";
import { useCommunity } from "@/hooks/useCommunity";
import { Plans } from "@/models/templates/yogana/yogana-home-model";
import { capitalizeWords } from "@/components/utils/StringFunctions";

const PlanSkeletonCard = () => (
  <Skeleton className="h-[420px] w-full bg-gray-300 rounded-[30px]" />
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
                : "bg-gray-300 hover:bg-gray-400",
            ].join(" ")}
          />
        );
      })}
    </div>
  );
}

interface YoganaPlansProps {
  data: Plans;
  primaryColor: string;
  secondaryColor: string;
  neutralColor: string;
}

const YoganaPlans: FC<YoganaPlansProps> = ({
  data,
  primaryColor,
  secondaryColor,
  neutralColor,
}) => {
  const { getPlansList, getCommunityPlansListAuth } = usePlans();
  const [isLoading, setIsLoading] = useState<boolean>(true);
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

  // Embla API refs (one for each carousel instance)
  const [apiLoading, setApiLoading] = useState<EmblaCarouselType | undefined>(
    undefined
  );
  const [apiMain, setApiMain] = useState<EmblaCarouselType | undefined>(
    undefined
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

  const Header = () => (
    <div className="relative z-10 text-center md:mb-16 mb-6">
      <p
        style={{
          color: primaryColor,
        }}
        className={`text-[#C2A74E] font-alex-brush text-3xl`}
      >
        {data?.heading}
      </p>
      <h2
        style={{
          color: secondaryColor,
        }}
        className={`text-[#000] font-cormorant text-[40px] md:text-[60px]/[60px] font-semibold`}
      >
        {data?.subHeading}
      </h2>
    </div>
  );

  if (isLoading) {
    // Skeleton with dots
    return (
      <section
        id="plans"
        className="relative py-20 font-cormorant bg-[#C2A74E1A] overflow-hidden"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-20">
          <Header />
          <Carousel
            opts={{ align: "start", loop: false }}
            className="w-full"
            setApi={setApiLoading}
          >
            <CarouselContent>
              {Array.from({ length: 8 }).map((_, i) => (
                <CarouselItem
                  key={i}
                  className="basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4"
                >
                  <PlanSkeletonCard />
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
    <section
      id="plans"
      className="relative py-20 font-cormorant bg-[#C2A74E1A] overflow-hidden"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-20">
        <Header />

        {plans.length === 0 ? (
          <p className="text-center text-gray-600">No plans available.</p>
        ) : (
          <>
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
                  <CarouselItem
                    key={plan._id ?? index}
                    className="basis-full md:basis-1/3"
                  >
                    <div className="h-full">
                      <YoganaPlanCard
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
                        period={`${plan.interval} ${capitalizeWords(
                          plan.duration
                        )}`}
                      />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>

              <CarouselPrevious
                aria-label="Previous plans"
                className="hidden sm:flex size-10 cursor-pointer"
                style={{
                  color: primaryColor, // text color
                  backgroundColor: "transparent", // default bg
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.backgroundColor =
                    primaryColor;
                  (e.currentTarget as HTMLElement).style.color = secondaryColor;
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.backgroundColor =
                    "transparent";
                  (e.currentTarget as HTMLElement).style.color = primaryColor;
                }}
              />

              <CarouselNext
                className="hidden sm:flex size-10 cursor-pointer"
                style={{
                  color: primaryColor, // text color
                  backgroundColor: "transparent", // default bg
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.backgroundColor =
                    primaryColor;
                  (e.currentTarget as HTMLElement).style.color = secondaryColor;
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.backgroundColor =
                    "transparent";
                  (e.currentTarget as HTMLElement).style.color = primaryColor;
                }}
                aria-label="Next plans"
              />
            </Carousel>

            {/* Dot indicators (will stay on last dot at the end) */}
            <Dots api={apiMain} primaryColor={primaryColor} />
          </>
        )}
      </div>
    </section>
  );
};

export default YoganaPlans;
