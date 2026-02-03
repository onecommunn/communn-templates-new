"use client";
import React, { useContext, useEffect, useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import {
  Check,
  Zap,
  Gem,
  Rocket,
  MoveUpRight,
  LockKeyhole,
} from "lucide-react";
import { TrainingPlan } from "@/models/plan.model";
import { usePlans } from "@/hooks/usePlan";
import { useCommunity } from "@/hooks/useCommunity";
import { AuthContext } from "@/contexts/Auth.context";
import { capitalizeWords } from "@/utils/StringFunctions";
import Link from "next/link";
import { toast } from "sonner";
import { useRequests } from "@/hooks/useRequests";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

type Feature = { text: string; available?: boolean };

const ConsultingoPlans = () => {
  const plugin = React.useRef(
    Autoplay({ delay: 3000, stopOnInteraction: false })
  );

  const { getPlansList, getCommunityPlansListAuth, joinToPublicCommunity } =
    usePlans();
  const { communityId, communityData } = useCommunity();
  const { SendCommunityRequest } = useRequests();
  const auth = useContext(AuthContext);

  const [plans, setPlans] = useState<TrainingPlan[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [joinedCommunityLocal, setJoinedCommunityLocal] = useState(false);

  const isAuthenticated = !!auth?.isAuthenticated;
  const userId = (auth as any)?.user?._id ?? (auth as any)?.user?.id;

  const isSubscribedCommunity =
    joinedCommunityLocal ||
    communityData?.community?.members?.some(
      (m: any) => (m?.user?._id ?? m?.user?.id) === userId
    );

  const fetchPlans = async () => {
    if (!communityId) return;
    setIsLoading(true);
    try {
      const resp = isAuthenticated
        ? await getCommunityPlansListAuth(communityId)
        : await getPlansList(communityId);

      if (Array.isArray(resp)) setPlans(resp as TrainingPlan[]);
      else if (resp && typeof resp === "object" && "myPlans" in resp)
        setPlans((resp as any).myPlans as TrainingPlan[]);
    } catch (e) {
      console.error("Failed to fetch plans:", e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPlans();
  }, [communityId, isAuthenticated]);

  const handleJoinPublic = async () => {
    try {
      await joinToPublicCommunity(communityId!);
      setJoinedCommunityLocal(true);
      toast.success("Successfully joined the community!");
      fetchPlans();
    } catch (err) {
      toast.error("Failed to join community");
    }
  };

  if (isLoading)
    return (
      <section className="bg-[#fcf6e8] py-20 px-6 md:px-20 font-lexend" id="plans">
        <div className="container mx-auto">
          {/* Title Skeleton */}
          <div className="mx-auto mb-16 h-12 w-64 animate-pulse rounded-lg bg-[#4F2910]/10" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="relative h-[680px] rounded-[60px] bg-white border border-[#f3ede0] p-10 flex flex-col items-center animate-pulse"
              >
                {/* Plan Title Placeholder */}
                <div className="my-4 h-8 w-40 rounded-md bg-slate-100" />

                {/* Price Placeholder */}
                <div className="mb-10 h-16 w-32 rounded-md bg-slate-100" />

                {/* Features Grid Placeholder (2 columns) */}
                <div className="grid grid-cols-1 gap-4 w-full mb-10">
                  <div className="space-y-4">
                    <div className="h-4 w-full rounded bg-slate-50" />
                    <div className="h-4 w-3/4 rounded bg-slate-50" />
                  </div>
                  <div className="space-y-4">
                    <div className="h-4 w-full rounded bg-slate-50" />
                    <div className="h-4 w-3/4 rounded bg-slate-50" />
                  </div>
                </div>

                {/* Description Placeholder */}
                <div className="w-full space-y-2 mb-12">
                  <div className="h-3 w-full rounded bg-slate-50" />
                  <div className="h-3 w-5/6 rounded bg-slate-50" />
                </div>

                {/* Button Placeholder */}
                <div className="mt-auto h-14 w-full rounded-full bg-slate-200" />
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  return (
    <section className="bg-[#fcf6e8] py-10 md:py-20 px-6 md:px-20 font-lexend" id="plans">
      <div className="container mx-auto">
        <h2 className="text-4xl md:text-5xl font-fraunces text-[#4F2910] text-center mb-16">
          Pricing plan
        </h2>

        {plans?.length === 0 ? (
          <div className="text-center w-full flex items-center justify-center">
            <p>No Planse available.</p>
          </div>
        ) : (
          <Carousel
            plugins={[plugin.current]}
            className="w-full max-w-6xl mx-auto"
            onMouseEnter={plugin.current.stop}
            onMouseLeave={plugin.current.reset}
            opts={{
              align: "start",
            }}
          >
            <CarouselContent>
              {plans.map((plan, index) => {
                const isUserSubscribedToPlan = plan.subscribers?.some(
                  (sub) => sub?._id === userId
                );

                const period = `${
                  plan.duration == "ONE_TIME" ? "" : plan.interval
                } ${capitalizeWords(plan.duration)}`;
                const subsCount = plan.subscribers?.length ?? 0;

                const dynamicFeatures = [
                  { text: `Duration: ${period}` },
                  { text: `Subscribers: ${subsCount}` },
                  {
                    text: `Next Due: ${
                      plan.nextDueDate
                        ? new Date(plan.nextDueDate).toLocaleDateString()
                        : "No Dues"
                    }`,
                  },
                  {
                    text: `Status: ${
                      !plan.nextDueDate
                        ? "Not Subscribed"
                        : new Date(plan.nextDueDate) >= new Date()
                        ? "Active"
                        : "Expired"
                    }`,
                  },
                ];
                return (
                  <CarouselItem
                    key={index}
                    className="md:basis-1/2 lg:basis-1/3"
                  >
                    <div
                      className={`relative h-[650px] rounded-[60px] p-10 flex flex-col items-center text-center transition-all duration-300 ${
                        index % 2 !== 0
                          ? "bg-[#BC4C37] text-white"
                          : "bg-white border border-[#f3ede0]"
                      }`}
                    >
                      {/* Title & Price */}
                      <h3
                        className={`text-2xl font-fraunces capitalize my-4 ${
                          index % 2 !== 0 ? "text-white" : "text-[#BC4C37]"
                        }`}
                      >
                        {plan.name}
                      </h3>
                      <p
                        className={`text-sm mb-6 line-clamp-4 ${
                          index % 2 !== 0 ? "text-white/80" : "text-[#6b4f3a]"
                        }`}
                      >
                        {plan.description}
                      </p>

                      <div className="flex items-baseline gap-1 mb-10">
                        <span className="text-5xl font-fraunces">
                          ₹{plan.pricing}
                        </span>
                        <span className="text-sm opacity-70">/{period}</span>
                      </div>

                      {/* Features */}
                      <div className="flex-1 w-full text-left space-y-4 mb-10">
                        {dynamicFeatures.map((feature, i) => (
                          <div key={i} className="flex items-center gap-3">
                            <div
                              className={`rounded-full p-0.5 border ${
                                index % 2 !== 0
                                  ? "border-white"
                                  : "border-[#4F2910]"
                              }`}
                            >
                              <Check size={12} />
                            </div>
                            <span className="text-sm font-medium">
                              {feature.text}
                            </span>
                          </div>
                        ))}
                      </div>

                      {/* Button */}
                      {/* Action Button Logic (Consistent with Martivo auth flow) */}
                      <div className="w-full mt-auto pt-6">
                        {!isAuthenticated ? (
                          <Link
                            href="/login"
                            className={`w-full py-4 rounded-full flex items-center justify-center gap-2 font-bold ${
                              index % 2 !== 0
                                ? "bg-white text-[#BC4C37]"
                                : "bg-[#BC4C37] text-white"
                            }`}
                          >
                            Login to Subscribe
                            <MoveUpRight size={16} />
                          </Link>
                        ) : !isSubscribedCommunity ? (
                          <Dialog>
                            <DialogTrigger asChild>
                              <button
                                className={`w-full py-4 rounded-full flex items-center justify-center gap-2 font-bold ${
                                  index % 2 !== 0
                                    ? "bg-white text-[#BC4C37]"
                                    : "bg-[#BC4C37] text-white"
                                }`}
                              >
                                {communityData?.community?.type ===
                                  "PRIVATE" && <LockKeyhole size={18} />}
                                Join Community First
                                <MoveUpRight size={16} />
                              </button>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogTitle>Join Community</DialogTitle>
                              <DialogDescription>
                                {communityData?.community?.type === "PRIVATE"
                                  ? "This is a private community. Send a request to the admin to join."
                                  : "Join the community to unlock subscription plans."}
                              </DialogDescription>
                              <div className="flex justify-end gap-3 mt-4">
                                <DialogClose asChild>
                                  <Button variant="outline">Cancel</Button>
                                </DialogClose>
                                <Button onClick={handleJoinPublic}>
                                  Confirm Join
                                </Button>
                              </div>
                            </DialogContent>
                          </Dialog>
                        ) : (
                          <Link
                            href={`/subscriptions/?planid=${plan._id}&communityid=${communityId}`}
                            className={`w-full py-4 rounded-full flex items-center justify-center gap-2 group transition-all font-bold ${
                              index % 2 !== 0
                                ? "bg-white text-[#BC4C37]"
                                : "bg-[#BC4C37] text-white"
                            }`}
                          >
                            {isUserSubscribedToPlan
                              ? "Subscribed"
                              : "Subscribe Now"}
                            <div
                              className={`rounded-full p-1 group-hover:rotate-45 transition-transform ${
                                index % 2 !== 0
                                  ? "bg-[#BC4C37]/10"
                                  : "bg-white/20"
                              }`}
                            >
                              <MoveUpRight size={16} />
                            </div>
                          </Link>
                        )}
                      </div>
                    </div>
                  </CarouselItem>
                );
              })}
            </CarouselContent>
            {plans.length > 3 && (
              <>
                <CarouselPrevious className="hidden sm:flex cursor-pointer size-10" />
                <CarouselNext className="hidden sm:flex cursor-pointer size-10" />
              </>
            )}
          </Carousel>
        )}
      </div>
    </section>
  );
};

export default ConsultingoPlans;
