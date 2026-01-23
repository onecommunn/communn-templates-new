"use client";

import React, { useEffect, useState, useContext, useMemo, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Check, X, Diamond, ArrowUpRight, LockKeyhole } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Autoplay from "embla-carousel-autoplay";
import { toast } from "sonner";

// Hooks & Contexts
import { usePlans } from "@/hooks/usePlan";
import { useCommunity } from "@/hooks/useCommunity";
import { useRequests } from "@/hooks/useRequests";
import { AuthContext } from "@/contexts/Auth.context";
import { TrainingPlan } from "@/models/plan.model";
import { capitalizeWords } from "@/utils/StringFunctions";
import { cn } from "@/lib/utils";
import LoginPopUp from "./LoginPopUp";

const DefaultPlans = ({
  colors,
}: {
  colors: {
    primaryColor: string;
    secondaryColor: string;
    textcolor: string;
  };
}) => {
  const plugin = useRef(Autoplay({ delay: 5000, stopOnInteraction: false }));
  const { getPlansList, getCommunityPlansListAuth, joinToPublicCommunity } =
    usePlans();
  const { SendCommunityRequest } = useRequests();
  const { communityId, communityData } = useCommunity();
  const auth = useContext(AuthContext);
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  const [plans, setPlans] = useState<TrainingPlan[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [joinedCommunityLocal, setJoinedCommunityLocal] = useState(false);

  const isLoggedIn = !!auth?.isAuthenticated;
  const userId = (auth as any)?.user?._id ?? (auth as any)?.user?.id;

  const isSubscribedCommunity = useMemo(() => {
    return (
      joinedCommunityLocal ||
      communityData?.community?.members?.some(
        (m: any) => (m?.user?._id ?? m?.user?.id) === userId,
      )
    );
  }, [joinedCommunityLocal, communityData, userId]);

  const fetchPlans = async () => {
    if (!communityId) return;
    setIsLoading(true);
    try {
      const resp = isLoggedIn
        ? await getCommunityPlansListAuth(communityId)
        : await getPlansList(communityId);

      if (Array.isArray(resp)) {
        setPlans(resp);
      } else if (resp && typeof resp === "object" && "myPlans" in resp) {
        setPlans((resp as any).myPlans);
      }
    } catch (e) {
      console.error("Failed to fetch plans:", e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPlans();
  }, [communityId, isLoggedIn]);

  const handleJoin = async () => {
    try {
      await joinToPublicCommunity(communityId!);
      setJoinedCommunityLocal(true);
      fetchPlans();
      toast.success("Successfully joined the community");
    } catch (error) {
      toast.error("Could not join the community.");
    }
  };

  const handleRequest = async () => {
    try {
      const formData = new FormData();
      formData.append("community", communityId!);
      formData.append("Message", "Request to join the community.");
      const response = await SendCommunityRequest(formData);
      if (response?.status === 201) {
        toast.success("Request sent to admin.");
      }
    } catch (error) {
      toast.error("Could not send request.");
    }
  };

  return (
    <section
      id="plans"
      className="max-w-6xl mx-auto px-3 md:px-6 py-6 font-montserrat scroll-mt-[40px] md:scroll-mt-[90px]"
      style={
        {
          "--pri": colors?.primaryColor,
          "--sec": colors?.secondaryColor,
          "--nue": colors?.textcolor,
        } as React.CSSProperties
      }
    >
      <div className="flex justify-between items-end mb-6">
        <h2 className="text-xl md:text-2xl font-bold text-black">Plans</h2>
      </div>

      <Carousel
        plugins={[plugin.current]}
        opts={{ align: "start", loop: true }}
        className="w-full"
      >
        <CarouselContent>
          {isLoading
            ? [1, 2, 3]?.map((i) => (
                <CarouselItem
                  key={i}
                  className="pl-6 md:basis-1/2 lg:basis-1/3"
                >
                  <div className="h-[500px] w-full bg-gray-100 animate-pulse rounded-[2.5rem]" />
                </CarouselItem>
              ))
            : plans?.map((plan, idx) => {
                const userSubscribedToPlan =
                  !!isLoggedIn &&
                  plan.subscribers?.some(
                    (sub: any) => (sub?._id ?? sub?.id) === userId,
                  );

                return (
                  <CarouselItem
                    key={plan._id}
                    className="md:basis-1/2 lg:basis-1/3"
                  >
                    <div
                      className={cn(
                        "relative rounded-[20px] flex flex-col h-full p-4 pt-4 border transition-all duration-300",
                        "bg-white border-gray-200",
                      )}
                    >
                      {/* Icon & Label */}
                      <div className="mb-6 flex justify-between items-start">
                        <div
                          className={cn(
                            "relative w-20 h-20 rounded-xl overflow-hidden flex items-center justify-center",
                            "bg-[#A7F3D0] text-[#065F46]",
                          )}
                        >
                          <Image
                            src={
                              plan.image?.value ??
                              "https://upload-community-files-new.s3.ap-south-1.amazonaws.com/undefined/Planss.png"
                            }
                            alt={plan.name ?? "Plan image"}
                            fill
                            className="object-cover"
                            sizes="40px"
                            unoptimized
                          />
                        </div>
                      </div>

                      <h3 className="text-lg md:text-xl font-bold text-black">
                        {capitalizeWords(plan.name)}
                      </h3>
                      <div className="flex items-center gap-3 my-2 text-sm md:text-md font-bold text-[var(--pri)] capitalize">
                        <span>
                          ₹{plan.pricing || plan.totalPlanValue} /{" "}
                          {plan.duration.toLowerCase()}
                        </span>
                      </div>
                      {plan.description && (
                        <div className="flex items-start gap-3 text-xs md:text-sm mb-4 mt-2 text-gray-600">
                          {plan.description.includes("/") ? (
                            <ul className="space-y-4">
                              {plan.description
                                .split("/")
                                .map((t) => t.trim())
                                .filter(Boolean)
                                .map((text, idx) => (
                                  <div
                                    className="flex items-center gap-3 text-xs md:text-sm text-gray-500"
                                    key={idx}
                                  >
                                    <Check size={18} className="text-black" />
                                    <span>{text}</span>
                                  </div>
                                ))}
                            </ul>
                          ) : (
                            <span className="line-clamp-3">
                              {plan.description}
                            </span>
                          )}
                        </div>
                      )}

                      {/* Features List */}
                      {/* <div className="space-y-4 mb-10 flex-grow">
                        <div className="flex items-center gap-3 text-xs md:text-sm text-gray-500">
                          <Check size={18} className="text-black" />
                          <span>
                            {`Duration: ${plan.interval} ${capitalizeWords(
                              plan.duration,
                            )}`}
                          </span>
                        </div>
                        <div className="flex items-center gap-3 text-xs md:text-sm text-gray-500">
                          <Check size={18} className="text-black" />
                          <span>
                            {`Subscribers: ${plan.subscribers?.length ?? 0}`}
                          </span>
                        </div>
                      </div> */}

                      {/* CTA Logic from Reference */}
                      <div className="mt-auto">
                        {!isLoggedIn ? (
                          <Button
                            onClick={() => setIsLoginOpen(true)}
                            className="flex items-center gap-2 w-full py-6 rounded-xl bg-[var(--pri)] hover:bg-[var(--pri)] cursor-pointer"
                          >
                            {communityData?.community?.type === "PRIVATE" && (
                              <LockKeyhole size={18} />
                            )}
                            Login to Subscribe
                          </Button>
                        ) : !isSubscribedCommunity ? (
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button className="w-full py-6 rounded-xl font-bold bg-[#ef3340] hover:bg-[#ef3340] cursor-pointer">
                                {communityData?.community?.type === "PRIVATE"
                                  ? "Request to Join"
                                  : "Join Community"}
                              </Button>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogTitle>
                                Community Membership Required
                              </DialogTitle>
                              <DialogDescription>
                                {communityData?.community?.type === "PRIVATE"
                                  ? "This is a private community. Send a request to the admin to get access to plans."
                                  : "You need to join the community before subscribing to a plan."}
                              </DialogDescription>
                              <div className="flex justify-end mt-4">
                                <DialogClose asChild>
                                  <Button
                                    onClick={
                                      communityData?.community?.type ===
                                      "PRIVATE"
                                        ? handleRequest
                                        : handleJoin
                                    }
                                  >
                                    Confirm
                                  </Button>
                                </DialogClose>
                              </div>
                            </DialogContent>
                          </Dialog>
                        ) : (
                          <Button
                            asChild={!userSubscribedToPlan}
                            variant={"outline"}
                            className={cn(
                              "w-full py-6 rounded-xl font-bold",
                              `${
                                userSubscribedToPlan
                                  ? "text-[var(--pri)] border-[var(--pri)] "
                                  : "text-white bg-[var(--pri)]"
                              }`,
                            )}
                          >
                            <Link
                              href={`/subscriptions/?planid=${plan._id}&communityid=${communityId}`}
                            >
                              {userSubscribedToPlan ? (
                                <span>Subscribed</span>
                              ) : (
                                <span>Subscribe</span>
                              )}
                            </Link>
                          </Button>
                        )}
                      </div>
                    </div>
                  </CarouselItem>
                );
              })}
        </CarouselContent>
        <CarouselPrevious className="bg-gray-100 border-none hover:bg-gray-200 size-10 cursor-pointer hidden md:flex" />
        <CarouselNext className="bg-gray-100 border-none hover:bg-gray-200 size-10 cursor-pointer hidden md:flex" />
      </Carousel>
      <LoginPopUp
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
        redirectTo={"/#plans"}
        colors={{
          primaryColor: colors?.primaryColor,
          secondaryColor: colors?.secondaryColor,
          textcolor: colors?.textcolor,
        }}
      />
    </section>
  );
};

export default DefaultPlans;
