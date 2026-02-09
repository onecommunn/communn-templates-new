// ✅ YoganaPlans.tsx (UPDATED to use the hook)
"use client";
import React, { FC, useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "@/contexts/Auth.context";
import { usePlans } from "@/hooks/usePlan";
import { TrainingPlan } from "@/models/plan.model";
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
import { capitalizeWords } from "@/utils/StringFunctions";
import LoginPopUp from "@/app/default/_components/LoginPopUp";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

import PaymentSuccess from "@/utils/PaymentSuccess";
import PaymentFailure from "@/utils/PaymentFailure";

import { usePlanSubscribeFlow } from "@/hooks/usePlanSubscribeFlow"; // ✅ path as you saved

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
                ? "w-6 shadow-[0_0_0_4px_rgba(194,167,78,0.15)]"
                : "bg-gray-300 hover:bg-gray-400 cursor-pointer",
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

  const authContext = useContext(AuthContext);
  const isAuthenticated = authContext?.isAuthenticated;

  const { communityId, communityData } = useCommunity();

  const userId =
    (authContext as any)?.user?._id ??
    (authContext as any)?.user?.id ??
    undefined;

  const isLoggedIn = !!(isAuthenticated && userId);

  // Autoplay
  const autoplay = useRef(
    Autoplay({
      delay: 3000,
      stopOnInteraction: true,
      stopOnMouseEnter: true,
    })
  );

  const [apiLoading, setApiLoading] = useState<EmblaCarouselType | undefined>(
    undefined
  );
  const [apiMain, setApiMain] = useState<EmblaCarouselType | undefined>(
    undefined
  );

  const fetchPlans = async () => {
    if (!communityId) return;
    setIsLoading(true);
    try {
      const response: any = isAuthenticated
        ? await getCommunityPlansListAuth(communityId)
        : await getPlansList(communityId);

      if (Array.isArray(response)) setPlans(response as TrainingPlan[]);
      else if (response && typeof response === "object" && "myPlans" in response)
        setPlans((response as any).myPlans as TrainingPlan[]);
      else setPlans([]);
    } catch (error) {
      console.error("Failed to fetch plans:", error);
      setPlans([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPlans();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [communityId, isAuthenticated]);

  // ✅ Hook
  const flow = usePlanSubscribeFlow({
    communityId: communityId as any,
    communityData,
    isLoggedIn,
    userId,
    plans,
    refetchPlans: fetchPlans,
  });

  const Header = () => (
    <div className="relative z-10 text-center md:mb-16 mb-6">
      <p
        style={{ color: primaryColor }}
        className="font-alex-brush text-2xl md:text-4xl"
      >
        {data?.content?.heading}
      </p>
      <h2
        style={{ color: secondaryColor }}
        className="text-[#000] font-cormorant text-[28px] md:text-[60px] font-semibold"
      >
        {data?.content?.subHeading}
      </h2>
    </div>
  );

  if (isLoading) {
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
                  <Skeleton
                    className="h-[420px] w-full bg-gray-300 rounded-[30px]"
                    style={{ backgroundColor: primaryColor }}
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
      id="plans"
      className="relative py-10 font-cormorant bg-[#C2A74E1A] overflow-hidden"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-20">
        <Header />

        {plans.length === 0 ? (
          <p className="text-center text-gray-600">No plans available.</p>
        ) : (
          <>
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
                    <div className="h-full">
                      <YoganaPlanCard
                        coupons={(plan as any)?.coupons ?? []}
                        index={index + 1}
                        title={plan.name}
                        description={plan.description || (plan as any)?.summary}
                        subscribers={(plan as any)?.subscribers ?? []}
                        fetchPlans={fetchPlans}
                        isSubscribedCommunity={!!flow.isSubscribedCommunity}
                        planId={String(plan._id)}
                        communityId={String(communityId)}
                        primaryColor={primaryColor}
                        secondaryColor={secondaryColor}
                        neutralColor={neutralColor}
                        price={String(
                          (plan as any)?.pricing ??
                            (plan as any)?.totalPlanValue ??
                            ""
                        )}
                        period={
                          plan.interval && plan.duration
                            ? `${plan.interval} ${capitalizeWords(plan.duration)}`
                            : ""
                        }
                        coverImage={
                          (plan as any)?.image?.value ||
                          "/assets/creatorCoursesPlaceHolderImage.jpg"
                        }
                        isPrivate={flow.isPrivate}
                        isRequested={!!isRequested}
                        initialPayment={(plan as any)?.initialPayment ?? 0}
                        onJoinedCommunity={() => flow.setJoinedCommunityLocal(true)}
                        // ✅ flow
                        isLoggedIn={isLoggedIn}
                        onStartFlow={() => flow.startSubscribeFlow(String(plan._id))}
                        isProcessing={flow.processingPlanId === String(plan._id)}
                        // ✅ meta for button text
                        planMeta={flow.getPlanMeta(String(plan._id))}
                      />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>

              <CarouselPrevious
                aria-label="Previous plans"
                className="hidden sm:flex size-10 cursor-pointer"
                style={{ color: primaryColor, backgroundColor: "#fff" }}
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
                style={{ color: primaryColor, backgroundColor: "#fff" }}
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
          </>
        )}
      </div>

      {/* ✅ Login Popup */}
      <LoginPopUp
        isOpen={flow.isLoginOpen}
        onClose={() => flow.setIsLoginOpen(false)}
        redirectTo={"/#plans"}
        colors={{
          primaryColor,
          secondaryColor,
          textcolor: secondaryColor,
        }}
      />

      {/* ✅ Private Request Dialog (optional global one; card already has request UI.
          If you want ONLY hook dialog, remove request UI from card and use this.)
      */}
      <Dialog open={flow.joinDialogOpen} onOpenChange={flow.setJoinDialogOpen}>
        <DialogContent>
          <DialogTitle style={{ color: primaryColor }}>Request Access</DialogTitle>
          <DialogDescription style={{ color: neutralColor }}>
            This is a private community. Send a request to the admin to get access
            to plans.
          </DialogDescription>
          <div className="mt-4 flex justify-end gap-3">
            <Button variant="outline" onClick={() => flow.setJoinDialogOpen(false)}>
              Cancel
            </Button>
            <Button
              style={{ backgroundColor: primaryColor, color: "#fff" }}
              onClick={async () => {
                const ok = await flow.handleRequestPrivate();
                if (!ok) return;
                flow.setJoinDialogOpen(false);
              }}
            >
              Send Request
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* ✅ Non-seq Confirm dialog after login */}
      <Dialog open={flow.planDialogOpen} onOpenChange={flow.setPlanDialogOpen}>
        <DialogContent className="max-w-xl">
          <DialogTitle style={{ color: primaryColor }}>Choose a Plan</DialogTitle>
          <DialogDescription style={{ color: neutralColor }}>
            You’re ready to subscribe. Please confirm your plan below.
          </DialogDescription>

          {flow.selectedPlanId && (() => {
            const meta = flow.getPlanMeta(flow.selectedPlanId);
            if (!meta?.plan) return null;

            const p = meta.plan;
            const already = meta.isSubscribed;
            const amount =
              (p as any)?.pricing ?? (p as any)?.totalPlanValue ?? 0;
            const initFee = Number((p as any)?.initialPayment ?? 0);

            return (
              <div className="mt-4 rounded-xl border p-4">
                <div className="text-lg font-semibold" style={{ color: primaryColor }}>
                  {capitalizeWords(p.name)}
                </div>
                <div className="mt-1 text-sm text-slate-500">
                  ₹{amount} •{" "}
                  {p.interval && p.duration
                    ? `${p.interval} ${capitalizeWords(p.duration)}`
                    : ""}
                </div>

                {initFee > 0 && !already && (
                  <div className="mt-1 text-xs text-slate-500">
                    + One Time Fee: ₹{initFee}
                  </div>
                )}

                <div className="mt-4 flex justify-end gap-3">
                  {/* <Button variant="outline" onClick={() => flow.setPlanDialogOpen(false)}>
                    Cancel
                  </Button> */}

                  <Button
                    style={{ backgroundColor: primaryColor, color: "#fff" }}
                    disabled={flow.processingPlanId === flow.selectedPlanId}
                    onClick={async () => {
                      const pid = flow.selectedPlanId!;
                      flow.setPlanDialogOpen(false);
                      await flow.startNonSequencePayment(pid);
                    }}
                  >
                    {already ? "Pay to Renew" : "Subscribe"}
                  </Button>
                </div>
              </div>
            );
          })()}
        </DialogContent>
      </Dialog>

      {/* ✅ Payment dialogs */}
      <PaymentSuccess
        txnid={flow.transaction?.txnid || ""}
        open={flow.successOpen}
        amount={flow.transaction?.amount || ""}
        timer={flow.timer}
        onClose={flow.handleSuccessClose}
      />
      <PaymentFailure
        open={flow.failureOpen}
        onClose={flow.handleFailureClose}
        amount={flow.transaction?.amount || ""}
        txnid={flow.transaction?.txnid || ""}
        timer={flow.timer}
      />
    </section>
  );
};

export default YoganaPlans;
