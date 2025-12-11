"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { capitalizeWords } from "@/utils/StringFunctions";
import { AuthContext } from "@/contexts/Auth.context";
import { useCommunity } from "@/hooks/useCommunity";
import { usePlans } from "@/hooks/usePlan";
import { useRequests } from "@/hooks/useRequests";
import { TrainingPlan } from "@/models/plan.model";
import { PlansSection } from "@/models/templates/fitkit/fitkit-home-model";
import { ArrowRight, CircleCheck, LockKeyhole } from "lucide-react";
import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";
import { toast } from "sonner";

type Feature = { text: string; available?: boolean };

const FitkitPlans = ({
  data,
  secondaryColor,
  primaryColor,
}: {
  data: PlansSection;
  secondaryColor: string;
  primaryColor: string;
}) => {
  const content = data?.content;
  const { getPlansList, getCommunityPlansListAuth } = usePlans();
  const [plans, setPlans] = useState<TrainingPlan[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const auth = useContext(AuthContext);
  const { communityId, communityData } = useCommunity();
  const isAuthenticated = !!auth?.isAuthenticated;

  // ✅ local flag to flip UI immediately after join
  const [joinedCommunityLocal, setJoinedCommunityLocal] = useState(false);

  // ✅ robust user id (_id or id)
  const userId =
    (auth as any)?.user?._id ?? (auth as any)?.user?.id ?? undefined;

  // ✅ single source of truth for “is member of community”
  const isSubscribedCommunity =
    joinedCommunityLocal ||
    communityData?.community?.members?.some(
      (m: any) => (m?.user?._id ?? m?.user?.id) === userId
    );

  useEffect(() => {
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
        else setPlans([]);
      } catch (e) {
        console.error("Failed to fetch plans:", e);
        setPlans([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPlans();
  }, [communityId, isAuthenticated]);

  const normalized = plans.map((p, idx) => {
    const period = `${p.interval} ${capitalizeWords(p.duration)}`;
    const subs = p.subscribers?.length ?? 0;

    const features: Feature[] = [
      { text: `Duration: ${period}` },
      { text: `Subscribers: ${subs}` },
      {
        text: `Next Due: ${p.nextDueDate ? p.nextDueDate : "No Dues"}`,
      },
      {
        text: `Status: ${
          !p.nextDueDate
            ? "Not Subscribed"
            : new Date(p.nextDueDate) >= new Date()
            ? "Active"
            : "Expired"
        }`,
      },
    ];

    return {
      id: p._id,
      title: p.name,
      price: p.pricing || p.totalPlanValue || 0,
      period,
      features,
      featured: plans.length === 3 ? idx === 1 : false,
      subscribers: p.subscribers ?? [],
      image: p?.image?.value,
      initialPayment: p?.initialPayment || 0,
    };
  });

  return (
    <section
      className="font-archivo relative w-full overflow-hidden"
      id="plans"
      style={
        {
          "--pri": primaryColor,
          "--sec": secondaryColor,
        } as React.CSSProperties
      }
    >
      <div className="mx-auto container px-6 md:px-20 py-10 md:py-20">
        {/* Title Row */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between w-full">
          <div>
            <div className="mb-3 flex items-center gap-3">
              <span className="h-[2px] w-16 bg-[var(--sec)] hidden md:flex" />
              <span className="font-semibold text-xl text-[var(--sec)] font-kanit uppercase">
                Pricing Plan
              </span>
            </div>
            <h4 className="font-kanit font-semibold text-3xl md:text-5xl capitalize">
              {content?.heading}
            </h4>
          </div>
        </div>

        {/* Plans */}
        <div className="relative mt-10 flex flex-col gap-6 w-full">
          {isLoading ? (
            <div className="space-y-6">
              {[0, 1, 2].map((k) => (
                <div
                  key={k}
                  className="h-36 animate-pulse rounded-2xl border border-[#E6E8EE] bg-[var(--sec)]"
                />
              ))}
            </div>
          ) : normalized.length === 0 ? (
            <div className="rounded-xl border border-[#E6E8EE] bg-white p-10 text-center text-slate-600">
              No plans available right now.
            </div>
          ) : (
            <div className="space-y-6">
              {normalized.map((p) => (
                <Card
                  key={p.id}
                  communityId={communityId}
                  title={p.title}
                  price={p.price}
                  period={p.period}
                  features={p.features}
                  featured={p.featured}
                  isPrivate={communityData?.community?.type === "PRIVATE"}
                  // ✅ use computed flag instead of inline some()
                  isSubscribedCommunity={isSubscribedCommunity}
                  subscribers={p.subscribers}
                  coverImage={p.image || "/assets/spawell-plans-image-1.jpg"}
                  planId={p.id}
                  initialPayment={p.initialPayment}
                  // ✅ tell parent that join succeeded so UI flips
                  onJoinedCommunity={() => setJoinedCommunityLocal(true)}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

function FeatureItem({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-2 text-[var(--sec)]">
      <CircleCheck size={18} strokeWidth={1} />
      <span className="leading-snug text-[16px] text-gray-500">{text}</span>
    </div>
  );
}

/* ---------- Card ---------- */

type CardProps = {
  title: string;
  price: string | number;
  period: string;
  features: Feature[];
  featured?: boolean;
  isPrivate: boolean;
  isSubscribedCommunity?: boolean;
  subscribers: { _id?: string; id?: string }[];
  fetchPlans?: () => void;
  communityId?: string;
  coverImage: string;
  planId: string;
  color?: string;
  initialPayment?: string | number;
  // ✅ new callback: notify parent when join succeeds
  onJoinedCommunity?: () => void;
};

const Card: React.FC<CardProps> = ({
  title,
  price,
  period,
  features,
  featured,
  isPrivate,
  isSubscribedCommunity,
  subscribers,
  fetchPlans,
  communityId,
  coverImage, // currently unused but kept for future design
  color,
  initialPayment,
  planId,
  onJoinedCommunity,
}) => {
  const mid = Math.ceil(features.length / 2);
  const left = features.slice(0, mid);
  const right = features.slice(mid);

  const authContext = useContext(AuthContext);
  const userId =
    (authContext as any)?.user?._id ??
    (authContext as any)?.user?.id ??
    undefined;
  const isLoggedIn = !!userId;

  // ✅ robust subscriber check
  const isSubscribed =
    isLoggedIn &&
    subscribers?.some(
      (sub) => (sub?._id ?? sub?.id) === userId
    );

  const { joinToPublicCommunity } = usePlans();
  const { SendCommunityRequest } = useRequests();

  const handleClickJoin = async (id?: string) => {
    if (!id) {
      toast.error("Community not found.");
      return;
    }
    try {
      await joinToPublicCommunity(id);

      // ✅ flip local/parent state so UI reacts immediately
      onJoinedCommunity?.();

      // optional: also refresh plans if provided
      fetchPlans?.();

      toast.success("Successfully joined the community");
    } catch (error) {
      console.error("Error joining community:", error);
      toast.error("Could not join the community. Please try again.");
    }
  };

  const handleClickSendRequest = async (
    community?: string,
    message?: string
  ) => {
    if (!community) {
      toast.error("Community not found.");
      return;
    }
    try {
      const formData = new FormData();
      formData.append("community", community);
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
      className={`grid p-4 w-full border border-[#D8DDE1] bg-white md:gap-4 md:grid-cols-[minmax(0,1.1fr)_minmax(0,2.2fr)_minmax(0,0.9fr)] ${
        featured ? "shadow-[0_10px_30px_rgba(0,0,0,0.06)]" : ""
      }`}
    >
      {/* Left: name + price */}
      <div className="flex flex-col justify-center border-b md:border-b-0 border-[#E2E5EA] bg-[#F7F8FA] px-6 py-6 md:px-10 md:py-8">
        <h5 className="font-kanit text-lg md:text-3xl font-medium mb-4 line-clamp-1">
          {title}
        </h5>
        <div className="flex items-end gap-2">
          <span className="font-kanit text-[var(--sec)] text-[40px]/[40px] md:text-[52px]/[52px] font-semibold flex items-baseline">
            <span className="text-lg md:text-xl mr-1">₹</span>
            {price}
          </span>
          <span className="text-xs md:text-[16px] text-[#6A6A6A] mb-1 font-medium">
            / {period}
          </span>
        </div>
        <div>
          {Number(initialPayment) > 0 &&
            ` + One Time Fee :  ₹ ${initialPayment}`}
        </div>
      </div>

      {/* Middle: features */}
      <div className="border-b md:border-b-0 border-[#E2E5EA] bg-[#F7F8FA] px-6 py-6 md:px-10 md:py-8 flex items-center justify-start">
        <div className="grid gap-y-3 gap-x-8 md:grid-cols-2 text-[13px] md:text-[14px] text-[#4B5563]">
          {left.map((f, i) => (
            <FeatureItem key={`left-${i}`} text={f.text} />
          ))}
          {right.map((f, i) => (
            <FeatureItem key={`right-${i}`} text={f.text} />
          ))}
        </div>
      </div>

      {/* Right: CTA */}
      <div className="flex items-center justify-center bg-[var(--pri)] px-6 py-8 text-center">
        {!isLoggedIn ? (
          <Link
            href={"/login"}
            className="px-6 py-3 text-xs md:text-sm font-semibold tracking-[0.12em] text-white uppercase cursor-pointer"
          >
            <span className="relative z-[1] text-[15px] font-medium flex items-center gap-2">
              {isPrivate && (
                <span>
                  <LockKeyhole size={20} strokeWidth={1.5} />
                </span>
              )}
              Login to Subscribe
            </span>
          </Link>
        ) : !isSubscribedCommunity ? (
          !isPrivate ? (
            <Dialog>
              <DialogTrigger asChild>
                <div
                  className="group relative inline-flex text-white items-center gap-3 rounded-full px-5 py-3 text-whitetransition-transform duration-200 hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
                  style={{ cursor: "pointer" }}
                >
                  <span className="relative z-[1] text-[15px] font-medium flex items-center gap-2 uppercase font-kanit">
                    {isPrivate && (
                      <span>
                        <LockKeyhole size={20} strokeWidth={1.5} />
                      </span>
                    )}
                    Join Community
                  </span>
                  <span className="relative z-[1] grid h-8 w-8 place-items-center rounded-full transition-transform duration-200 group-hover:translate-x-0.5">
                    <ArrowRight size={18} />
                  </span>
                </div>
              </DialogTrigger>
              <DialogContent>
                <DialogTitle>Join Community</DialogTitle>
                <DialogDescription>
                  You're not a member of this community yet. Would you like to
                  join now?
                </DialogDescription>
                <div className="mt-4 flex justify-end gap-3">
                  <DialogClose asChild>
                    <Button variant="outline">Cancel</Button>
                  </DialogClose>
                  <DialogClose asChild>
                    <Button
                      onClick={() => handleClickJoin(communityId)}
                      disabled={isSubscribed}
                    >
                      Confirm Join
                    </Button>
                  </DialogClose>
                </div>
              </DialogContent>
            </Dialog>
          ) : (
            <Dialog>
              <DialogTrigger asChild>
                <div
                  className="px-6 py-3 text-xs md:text-sm font-semibold tracking-[0.12em] text-white uppercase cursor-pointer"
                  style={{ cursor: "pointer" }}
                >
                  <span className="relative z-[1] text-[15px] font-medium flex items-center gap-2">
                    {isPrivate && (
                      <span>
                        <LockKeyhole size={20} strokeWidth={1.5} />
                      </span>
                    )}
                    Send Join Request
                  </span>
                </div>
              </DialogTrigger>
              <DialogContent>
                <DialogTitle>Send Join Request</DialogTitle>
                <DialogDescription>
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
            href={`/subscriptions/?planid=${encodeURIComponent(
              planId
            )}&communityid=${encodeURIComponent(communityId || "")}`}
          >
            <button
              type="button"
              className="px-6 py-2 text-xs md:text-sm font-semibold tracking-[0.12em] text-white uppercase cursor-pointer"
            >
              {isSubscribed ? "Subscribed" : "Subscribe"}
            </button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default FitkitPlans;
