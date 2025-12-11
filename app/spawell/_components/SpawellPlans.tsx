"use client";

import React, { useContext, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, LockKeyhole } from "lucide-react";
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
import { capitalizeWords } from "@/utils/StringFunctions";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { PlansSection } from "@/models/templates/spawell/spawell-home-model";
import { useRequests } from "@/hooks/useRequests";

type PlanCardProps = {
  title: string;
  description?: string;
  subscribers: { _id: string }[];
  fetchPlans?: () => void;
  isSubscribedCommunity?: boolean;
  planId: string;
  communityId: string;
  primaryColor: string;
  secondaryColor: string;
  neutralColor: string;
  price?: string | number;
  period?: string;
  coverImage: string;
  isPrivate: boolean;
  isRequested: boolean;
  initialPayment: string | number;
  onJoinedCommunity?: () => void;
};

type Props = {
  primaryColor: string;
  secondaryColor: string;
  neutralColor: string;
  data: PlansSection;
};

const Card: React.FC<PlanCardProps> = ({
  title,
  subscribers,
  fetchPlans,
  isSubscribedCommunity,
  planId,
  communityId,
  primaryColor,
  secondaryColor,
  price,
  period,
  coverImage,
  isPrivate,
  isRequested,
  initialPayment,
  onJoinedCommunity,
}) => {
  const { joinToPublicCommunity } = usePlans();
  const { SendCommunityRequest } = useRequests();
  const [mounted, setMounted] = useState(false);

  const authContext = useContext(AuthContext);
  const userId =
    (authContext as any)?.user?._id ??
    (authContext as any)?.user?.id ??
    undefined;
  const isLoggedIn = !!userId;

  const isSubscribed =
    isLoggedIn && subscribers?.some((sub) => sub?._id === userId);

  useEffect(() => setMounted(true), []);
  if (authContext?.loading || !mounted) return null;

  const handleClickJoin = async (id?: string) => {
    if (!id) {
      toast.error("Community not found.");
      return;
    }
    try {
      await joinToPublicCommunity(id);

      onJoinedCommunity?.();

      fetchPlans?.();
      toast.success("Successfully joined the community");
    } catch (error) {
      console.error("Error joining community:", error);
      toast.error("Could not join the community. Please try again.");
    }
  };

  const handleClickSendRequest = async (community: string, message: string) => {
    try {
      const formData = new FormData();
      formData.append("community", community);
      // Keeping the existing capitalized key since your backend expects it this way
      formData.append("Message", message || "Request to join the community.");
      const response = await SendCommunityRequest(formData);
      if (response && response.status === 201) {
        fetchPlans?.();
        // toast.success("Request sent to the admin.");
      } else {
        // toast.info("Your request has been recorded.");
      }
    } catch (error) {
      console.error("Error while sending community request:", error);
      toast.error("Could not send the request. Please try again.");
    }
  };

  return (
    <div
      className="group block rounded-3xl bg-white p-3 transition-shadow border md:shadow-lg my-6 pb-4"
      aria-label={title}
      style={
        {
          "--pri": primaryColor,
          "--sec": secondaryColor,
        } as React.CSSProperties
      }
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
            priority
            unoptimized
          />
        </div>
      </div>

      {/* Title + price */}
      <div className="mt-4">
        <h3
          className="text-lg font-semibold leading-6"
          style={{ color: primaryColor }}
        >
          {title}
        </h3>
        {price !== undefined && price !== null && String(price).length > 0 && (
          <p className="mt-1 text-sm" style={{ color: primaryColor }}>
            <span
              className="text-lg font-semibold"
              style={{ color: primaryColor }}
            >
              ₹{price}
            </span>
            {period ? `/ ${period}` : null}
          </p>
        )}
        <div className="text-xs" style={{ color: primaryColor }}>
          {Number(initialPayment) > 0 &&
            ` + One Time Fee :  ₹ ${initialPayment}`}
        </div>
      </div>

      {/* CTA */}
      {!isLoggedIn ? (
        <Link href="/login">
          <div
            className="mt-4 inline-flex items-center gap-2 text-[16px] font-bold"
            style={{ color: primaryColor, cursor: "pointer" }}
          >
            {isPrivate && (
              <span>
                <LockKeyhole size={20} strokeWidth={1.5} />
              </span>
            )}
            Login to Subscribe
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </div>
        </Link>
      ) : !isSubscribedCommunity ? (
        !isPrivate ? (
          <Dialog>
            <DialogTrigger asChild>
              <div
                className="mt-4 inline-flex items-center gap-2 text-[16px] font-bold"
                style={{ color: primaryColor, cursor: "pointer" }}
              >
                Join Community
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </div>
            </DialogTrigger>
            <DialogContent>
              <DialogTitle style={{ color: primaryColor }}>
                Join Community
              </DialogTitle>
              <DialogDescription style={{ color: primaryColor }}>
                You're not a member of this community yet. Would you like to
                join now?
              </DialogDescription>
              <div className="mt-4 flex justify-end">
                <DialogClose asChild>
                  <Button
                    onClick={() => handleClickJoin(communityId)}
                    disabled={isSubscribed}
                    style={{
                      backgroundColor: primaryColor,
                      color: secondaryColor,
                    }}
                  >
                    Confirm Join
                  </Button>
                </DialogClose>
              </div>
            </DialogContent>
          </Dialog>
        ) : isRequested ? (
          <div className="mt-4 inline-flex flex-col text-[var(--pri)] gap-2 text-[16px] font-bold">
            <h5>Already Requested</h5>
            <p className="font-normal text-sm">
              * Your request will be sent to the admin. You can proceed with
              payment once approved.
            </p>
          </div>
        ) : (
          <Dialog>
            <DialogTrigger asChild>
              <div
                className="mt-4 inline-flex items-center gap-2 text-[16px] font-bold"
                style={{ color: primaryColor, cursor: "pointer" }}
              >
                <LockKeyhole size={20} strokeWidth={1.5} />
                Send Join Request
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </div>
            </DialogTrigger>
            <DialogContent>
              <DialogTitle style={{ color: primaryColor }}>
                Send Join Request
              </DialogTitle>
              <DialogDescription style={{ color: primaryColor }}>
                This is a private community. Your request will be sent to the
                admin. You can proceed with payment once approved.
              </DialogDescription>
              <div className="mt-4 flex justify-end">
                <Button
                  onClick={() =>
                    handleClickSendRequest(
                      communityId,
                      "Request to join the community."
                    )
                  }
                  disabled={isSubscribed}
                  style={{
                    backgroundColor: primaryColor,
                    color: secondaryColor,
                  }}
                  className="cursor-pointer"
                >
                  Send Request
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        )
      ) : (
        <Link
          href={`/subscriptions/?planid=${planId}&communityid=${communityId}`}
        >
          <div
            className="mt-4 inline-flex items-center gap-2 text-[16px] font-bold"
            style={{ color: primaryColor, cursor: "pointer" }}
          >
            {isSubscribed ? "Already Subscribed" : "Subscribe Now"}
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </div>
        </Link>
      )}
    </div>
  );
};

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
            type="button"
            aria-label={`Go to slide ${i + 1}`}
            onClick={() => api.scrollTo(i)}
            className="h-2.5 w-2.5 rounded-full transition-all"
            style={{
              width: isActive ? 24 : 10,
              backgroundColor: isActive ? primaryColor : "#D1D5DB", // gray-300 fallback
              boxShadow: isActive ? "0 0 0 4px rgba(194,167,78,0.15)" : "none",
              cursor: isActive ? "default" : "pointer",
            }}
          />
        );
      })}
    </div>
  );
}

const SpawellPlans: React.FC<Props> = ({
  primaryColor,
  secondaryColor,
  neutralColor,
  data,
}) => {
  const [apiLoading, setApiLoading] = useState<EmblaCarouselType | undefined>(
    undefined
  );
  const [apiMain, setApiMain] = useState<EmblaCarouselType | undefined>(
    undefined
  );
  const source = data?.content;
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { getPlansList, getCommunityPlansListAuth } = usePlans();
  const [plans, setPlans] = useState<TrainingPlan[]>([]);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const authContext = useContext(AuthContext);
  const isAuthenticated = authContext?.isAuthenticated;
  const { communityId, communityData } = useCommunity();
  const [joinedCommunityLocal, setJoinedCommunityLocal] = useState(false);

  const userId =
    (authContext as any)?.user?._id ??
    (authContext as any)?.user?.id ??
    undefined;

  const isSubscribedCommunity =
    joinedCommunityLocal ||
    communityData?.community?.members?.some(
      (m: any) => (m?.user?._id ?? m?.user?.id) === userId
    );

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
      const lastIndex = api.scrollSnapList().length - 1; // FIX: off-by-one
      if (api.selectedScrollSnap() === lastIndex) {
        api.scrollTo(0, true); // jump instantly to avoid visual rewind
        autoplay.current?.reset?.();
      }
    };

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
      let response: any;
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
        "myPlans" in response
      ) {
        setPlans(response.myPlans as TrainingPlan[]);
        setIsSubscribed(!!response.isSubscribedCommunity);
      } else {
        setPlans([]);
      }
    } catch (error) {
      console.error("Failed to fetch plans:", error);
      setPlans([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPlans();
  }, [communityId, isAuthenticated]);

  if (isLoading) {
    return (
      <section
        id="plans"
        className="relative py-20 font-cormorant overflow-hidden"
        style={{ color: primaryColor, backgroundColor: "#C2A74E1A" }}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-20">
          <div className="text-center mb-4">
            <h2
              className="text-3xl font-semibold tracking-[-0.02em] md:text-5xl"
              style={{ color: primaryColor }}
            >
              {source?.heading}
            </h2>
            <p
              className="mt-1 text-2xl font-lora italic md:text-[34px]"
              style={{ color: primaryColor }}
            >
              {source?.subHeading}
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
                  <Skeleton
                    className="h-[420px] w-full rounded-[30px]"
                    style={{ backgroundColor: "#E5E7EB" }}
                  />
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

  const isRequested = Boolean(
    communityData?.community?.requests?.some(
      (req: any) => (req?.createdBy?._id ?? req?.createdBy?.id) === userId
    )
  );

  return (
    <section
      className="relative overflow-hidden bg-white py-16 md:py-24 font-plus-jakarta"
      id="plans"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-20">
        {/* Eyebrow */}
        <div className="mb-2 flex justify-center">
          <span className="text-sm" style={{ color: primaryColor }}>
            • Plans
          </span>
        </div>

        {/* Heading */}
        <div className="text-center mb-4">
          <h2
            className="text-3xl font-semibold tracking-[-0.02em] md:text-5xl"
            style={{ color: primaryColor }}
          >
            {source?.heading}
          </h2>
          <p
            className="mt-1 text-2xl font-lora italic md:text-[34px]"
            style={{ color: primaryColor }}
          >
            {source?.subHeading}
          </p>
        </div>
        {!plans?.length || plans?.length < 0 ? (
          <div className="flex flex-col items-center justify-center py-10 text-center">
            <h3 className="text-xl font-semibold text-gray-400">
              No Plans Available
            </h3>
          </div>
        ) : (
          <>
            {/* Cards */}
            <Carousel
              opts={{ align: "start", loop: false }}
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
                    <Card
                      title={plan.name}
                      description={plan.description || plan.summary}
                      subscribers={plan?.subscribers ?? []}
                      fetchPlans={fetchPlans}
                      isSubscribedCommunity={isSubscribedCommunity}
                      planId={plan._id}
                      communityId={communityId}
                      primaryColor={primaryColor}
                      secondaryColor={secondaryColor}
                      neutralColor={neutralColor}
                      price={plan.pricing ?? plan.totalPlanValue}
                      period={
                        plan.interval && plan.duration
                          ? `${plan.interval} ${capitalizeWords(plan.duration)}`
                          : undefined
                      }
                      coverImage={
                        plan?.image?.value ||
                        "/assets/spawell-plans-image-1.jpg"
                      }
                      isPrivate={communityData?.community?.type === "PRIVATE"}
                      isRequested={!!isRequested}
                      initialPayment={plan?.initialPayment}
                      onJoinedCommunity={() => setJoinedCommunityLocal(true)}
                    />
                  </CarouselItem>
                ))}
              </CarouselContent>

              <CarouselPrevious
                aria-label="Previous plans"
                className="hidden sm:flex size-10 cursor-pointer"
                style={{ color: primaryColor, backgroundColor: "#fff" }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.backgroundColor = primaryColor;
                  el.style.color = "#fff";
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.backgroundColor = "#fff";
                  el.style.color = primaryColor;
                }}
              />
              <CarouselNext
                aria-label="Next plans"
                className="hidden sm:flex size-10 cursor-pointer"
                style={{ color: primaryColor, backgroundColor: "#fff" }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.backgroundColor = primaryColor;
                  el.style.color = "#fff";
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.backgroundColor = "#fff";
                  el.style.color = primaryColor;
                }}
              />
            </Carousel>

            <Dots api={apiMain} primaryColor={primaryColor} />
          </>
        )}
      </div>
    </section>
  );
};

export default SpawellPlans;
