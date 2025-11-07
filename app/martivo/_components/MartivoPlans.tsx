"use client";
import React, { useContext, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, LockKeyhole } from "lucide-react";
import { WavyStroke } from "./Icons/WavyStroke";
import { usePlans } from "@/hooks/usePlan";
import { TrainingPlan } from "@/models/plan.model";
import { AuthContext } from "@/contexts/Auth.context";
import { useCommunity } from "@/hooks/useCommunity";
import { capitalizeWords } from "@/components/utils/StringFunctions";
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
import { useRequests } from "@/hooks/useRequests";
import { PlansSection } from "@/models/templates/martivo/martivo-home-model";

/* ---------- tiny helpers ---------- */

type Feature = { text: string; available?: boolean };

const Check: React.FC<{ muted?: boolean; color: string }> = ({
  muted,
  color,
}) => (
  <span
    className={[
      "mt-1 grid h-4 w-4 place-items-center rounded-full",
      muted ? "bg-[var(--sec)]/30" : "bg-[var(--color)]",
    ].join(" ")}
    aria-hidden
    style={
      {
        "--color": color,
      } as React.CSSProperties
    }
  >
    <svg viewBox="0 0 16 16" width="10" height="10" fill="none">
      <path
        d="M4 8l2.2 2.2L12 4.5"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity={muted ? 0.7 : 1}
      />
    </svg>
  </span>
);

const FeatureItem = ({
  text,
  available = true,
  color,
}: {
  text: string;
  available?: boolean;
  color: string;
}) => (
  <li className="flex items-start gap-2">
    <Check muted={!available} color={color} />
    <span
      className={[
        "text-[15px] leading-6",
        available ? "text-slate-700" : "text-slate-300 line-through",
      ].join(" ")}
    >
      {text}
    </span>
  </li>
);

/* Orange CTA with dashed inset */
const ChooseButton: React.FC<{
  href?: string;
  text: string;
  color: string;
  isSubscribed: boolean;
}> = ({ href = "/", text, color, isSubscribed }) => (
  <Link
    href={href || "/"}
    className={`group relative inline-flex items-center gap-3 rounded-full ${
      isSubscribed ? "bg-[var(--pri)]" : "bg-[var(--color)]"
    } px-5 py-3 text-white shadow-md transition-transform duration-200 hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color)] focus-visible:ring-offset-2`}
    style={
      {
        "--color": color,
      } as React.CSSProperties
    }
  >
    <span className="pointer-events-none absolute inset-1 rounded-full border-2 border-dashed border-white" />
    <span className="relative z-[1] text-[15px] font-medium">{text}</span>
    <span className="relative z-[1] grid h-8 w-8 place-items-center rounded-full bg-white text-[var(--color)] transition-transform duration-200 group-hover:translate-x-0.5">
      <ArrowRight size={18} />
    </span>
  </Link>
);

/* ---------- Card ---------- */

type CardProps = {
  title: string;
  price: string | number;
  period: string;
  features: Feature[];
  featured?: boolean; // gives orange outline like the mock's middle card
  isPrivate: boolean;
  isSubscribedCommunity?: boolean;
  subscribers: { _id: string }[];
  fetchPlans?: () => void;
  communityId: string;
  coverImage: string;
  planId: string;
  color: string;
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
  coverImage,
  planId,
  color,
}) => {
  // split features into two columns (balanced)
  const mid = Math.ceil(features.length / 2);
  const left = features.slice(0, mid);
  const right = features.slice(mid);

  const authContext = useContext(AuthContext);
  const userId = authContext?.user?.id;
  const isLoggedIn = !!userId;

  const isSubscribed =
    isLoggedIn && subscribers?.some((sub) => sub._id === userId);
  const { joinToPublicCommunity } = usePlans();
  const { SendCommunityRequest } = useRequests();

  const handleClickJoin = async (id: string) => {
    try {
      await joinToPublicCommunity(id);
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
    <article
      className={[
        "rounded-2xl bg-white p-5 shadow-[0_1px_0_rgba(16,24,40,0.04)] md:p-7",
        featured
          ? "border border-[var(--color)] ring-1 ring-[var(--color)]"
          : "border border-[#E6E8EE]",
      ].join(" ")}
      style={
        {
          "--color": color,
        } as React.CSSProperties
      }
    >
      <div className="grid grid-cols-1 gap-6 md:grid-cols-4 md:gap-8 items-center">
        {/* Title */}
        <div className="md:col-span-1">
          <h3 className="text-base font-semibold text-slate-900 md:text-[18px] break-words">
            {title}
          </h3>
        </div>

        {/* Features */}
        <div className="md:col-span-2">
          <div className="grid grid-cols-1 md:gap-5 sm:grid-cols-2">
            <ul className="space-y-2">
              {left.map((f, i) => (
                <FeatureItem key={i} {...f} color={color} />
              ))}
            </ul>
            <ul className="space-y-2">
              {right.map((f, i) => (
                <FeatureItem key={i} {...f} color={color} />
              ))}
            </ul>
          </div>
        </div>

        {/* Price + CTA */}
        <div className="md:col-span-1 flex items-center justify-between flex-col md:items-end md:justify-center gap-4">
          <div className="text-right">
            <div className="text-xl font-semibold text-slate-900">
              ₹{price}
              <span className="ml-1 text-[16px] font-normal text-slate-500">
                / {period}
              </span>
            </div>
          </div>
          {!isLoggedIn ? (
            <Link
              href={"/login"}
              className="group relative inline-flex items-center gap-3 rounded-full bg-[var(--pri)] px-5 py-3 text-white shadow-md transition-transform duration-200 hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color)] focus-visible:ring-offset-2"
            >
              <span className="pointer-events-none absolute inset-1 rounded-full border-2 border-dashed border-white" />
              <span className="relative z-[1] text-[15px] font-medium flex items-center gap-2">
                {isPrivate && (
                  <span>
                    <LockKeyhole size={20} strokeWidth={1.5} />
                  </span>
                )}
                Login to Subscribe
              </span>
              <span className="relative z-[1] grid h-8 w-8 place-items-center rounded-full bg-white text-[var(--pri)] transition-transform duration-200 group-hover:translate-x-0.5">
                <ArrowRight size={18} />
              </span>
            </Link>
          ) : !isSubscribedCommunity ? (
            !isPrivate ? (
              <Dialog>
                <DialogTrigger asChild>
                  <div
                    className="group relative inline-flex items-center gap-3 rounded-full bg-[var(--color)] px-5 py-3 text-white shadow-md transition-transform duration-200 hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color)] focus-visible:ring-offset-2"
                    style={{ cursor: "pointer" }}
                  >
                    <span className="relative z-[1] text-[15px] font-medium flex items-center gap-2">
                      {isPrivate && (
                        <span>
                          <LockKeyhole size={20} strokeWidth={1.5} />
                        </span>
                      )}
                      Join Community
                    </span>
                    <span className="relative z-[1] grid h-8 w-8 place-items-center rounded-full bg-white text-[var(--color)] transition-transform duration-200 group-hover:translate-x-0.5">
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
                  <div className="mt-4 flex justify-end">
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
                    className="group relative inline-flex items-center gap-3 rounded-full bg-[var(--color)] px-5 py-3 text-white shadow-md transition-transform duration-200 hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color)] focus-visible:ring-offset-2"
                    style={{ cursor: "pointer" }}
                  >
                    <span className="pointer-events-none absolute inset-1 rounded-full border-2 border-dashed border-white" />
                    <span className="relative z-[1] text-[15px] font-medium flex items-center gap-2">
                      {isPrivate && (
                        <span>
                          <LockKeyhole size={20} strokeWidth={1.5} />
                        </span>
                      )}
                      Send Join Request
                    </span>
                    <span className="relative z-[1] grid h-8 w-8 place-items-center rounded-full bg-white text-[var(--color)] transition-transform duration-200 group-hover:translate-x-0.5">
                      <ArrowRight size={18} />
                    </span>
                  </div>
                </DialogTrigger>
                <DialogContent>
                  <DialogTitle>Send Join Request</DialogTitle>
                  <DialogDescription>
                    This is a private community. Your request will be sent to
                    the admin. You can proceed with payment once approved.
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
                      //   style={{
                      //     backgroundColor: primaryColor,
                      //     color: secondaryColor,
                      //   }}
                      className="cursor-pointer"
                    >
                      Send Request
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            )
          ) : (
            <ChooseButton
              text={isSubscribed ? "Subscribed" : "Subscribe"}
              href={`/subscriptions/?planid=${planId}&communityid=${communityId}`}
              color={color}
              isSubscribed={isSubscribed}
            />
          )}
        </div>
      </div>
    </article>
  );
};

/* ---------- Main ---------- */

const MartivoPlans = ({
  primaryColor,
  secondaryColor,
  data,
}: {
  primaryColor: string;
  secondaryColor: string;
  data: PlansSection;
}) => {
  const { getPlansList, getCommunityPlansListAuth } = usePlans();
  const [plans, setPlans] = useState<TrainingPlan[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const content = data?.content;
  const auth = useContext(AuthContext);
  const { communityId, communityData } = useCommunity();
  const isAuthenticated = !!auth?.isAuthenticated;

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
      // visually highlight the middle plan if there are exactly 3.
      featured: plans.length === 3 ? idx === 1 : false,
      subscribers: p.subscribers,
      image: p?.image?.value,
    };
  });

  // if (!normalized?.length || normalized?.length < 0) {
  //   return null;
  // }

  return (
    <section
      className="relative py-16 md:py-24 font-lato"
      id="plans"
      style={
        {
          "--pri": primaryColor,
          "--sec": secondaryColor,
        } as React.CSSProperties
      }
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-20">
        {/* Header */}
        <div className="mx-auto mb-10 md:max-w-lg text-center md:mb-14">
          <p className="mb-2 text-[13px] font-semibold tracking-[0.22em] text-[var(--pri)] uppercase">
            {content?.heading}
          </p>
          <h2 className="text-2xl font-semibold text-slate-900 md:text-4xl">
            {content?.subHeading}
          </h2>
          <div className="mx-auto mt-3 flex items-center justify-center">
            <WavyStroke color={primaryColor} size={120} />
          </div>
        </div>

        {/* Content */}
        {isLoading ? (
          /* skeletons */
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
                isSubscribedCommunity={communityData?.community?.members?.some(
                  (m: any) => m?.user?._id === auth?.user?.id
                )}
                subscribers={p?.subscribers ?? []}
                coverImage={p?.image || "/assets/spawell-plans-image-1.jpg"}
                planId={p.id}
                color={secondaryColor}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default MartivoPlans;
