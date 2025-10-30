"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, LockKeyhole } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

import * as React from "react";
import Autoplay from "embla-carousel-autoplay";

// hooks/models/ctx
import { usePlans } from "@/hooks/usePlan";
import { TrainingPlan } from "@/models/plan.model";
import { AuthContext } from "@/contexts/Auth.context";
import { useCommunity } from "@/hooks/useCommunity";
import { capitalizeWords } from "@/components/utils/StringFunctions";
import { toast } from "sonner";
import { useRequests } from "@/hooks/useRequests";

const MUTED = "#747B70";

/* -------------------- Display & helpers -------------------- */
type DisplayPlan = {
  id?: string;
  name: string;
  price: number | string;
  image?: string;
  features: string[];
  periodLabel: string;
  subscribers?: Array<{ _id?: string; id?: string }>;
};

function formatPeriodLabel(interval?: number, duration?: string) {
  if (!interval || !duration) return "Per Month";
  const unit = duration.toLowerCase(); // week | month | year
  const cap = unit.charAt(0).toUpperCase() + unit.slice(1);
  if (interval === 1) return `Per ${cap}`;
  const plural = unit.endsWith("s") ? unit : unit + "s";
  return `For ${interval} ${cap === unit ? plural : cap + "s"}`;
}

/* -------------------- Component -------------------- */
export default function RestraintPlans({
  primaryColor,
  secondaryColor,
}: {
  primaryColor: string;
  secondaryColor: string;
}) {
  const [api, setApi] = React.useState<CarouselApi | null>(null);

  const { getPlansList, getCommunityPlansListAuth } = usePlans();
  const [plans, setPlans] = React.useState<TrainingPlan[]>([]);
  const [isLoading, setIsLoading] = React.useState<boolean>(true);

  const auth = React.useContext(AuthContext);
  const isLoggedIn = !!auth?.isAuthenticated;

  const { communityId, communityData } = useCommunity();

  React.useEffect(() => {
    const fetchPlans = async () => {
      if (!communityId) return;
      setIsLoading(true);
      try {
        const resp = isLoggedIn
          ? await getCommunityPlansListAuth(communityId)
          : await getPlansList(communityId);

        if (Array.isArray(resp)) {
          setPlans(resp as TrainingPlan[]);
        } else if (resp && typeof resp === "object" && "myPlans" in resp) {
          setPlans((resp as any).myPlans as TrainingPlan[]);
        } else {
          setPlans([]);
        }
      } catch (e) {
        console.error("Failed to fetch plans:", e);
        setPlans([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPlans();
  }, [communityId, isLoggedIn]);

  // Normalize API plans
  const normalizedFromApi: DisplayPlan[] = React.useMemo(() => {
    return plans.map((p) => {
      const period = `${p.interval} ${capitalizeWords(p.duration)}`;
      return {
        id: p._id,
        name: p.name,
        price: p.pricing || p.totalPlanValue || 0,
        image: p?.image?.value,
        features: [
          `Duration: ${period}`,
          `Subscribers: ${p.subscribers?.length ?? 0}`,
          `Next Due: ${p.nextDueDate ? p.nextDueDate : "No Dues"}`,
          `Status: ${
            !p.nextDueDate
              ? "Not Subscribed"
              : new Date(p.nextDueDate) >= new Date()
              ? "Active"
              : "Expired"
          }`,
        ],
        periodLabel: formatPeriodLabel(p.interval as any, p.duration as any),
        // carry raw subscribers for per-user detection
        subscribers: (p.subscribers as any[]) || [],
      };
    });
  }, [plans]);

  // Pick dataset: fetched
  const data: DisplayPlan[] = normalizedFromApi;

  // current user id (support both _id and id just in case)
  const userId: string | undefined =
    (auth as any)?.user?._id ?? (auth as any)?.user?.id ?? undefined;

  return (
    <section
      className="bg-[var(--sec)]/15 font-sora py-10"
      id="plans"
      style={
        {
          "--pri": primaryColor,
          "--sec": secondaryColor,
        } as React.CSSProperties
      }
    >
      <div className="mx-auto container px-6 md:px-20">
        {/* Section header */}
        <div className="mb-6">
          <p className="mb-2 text-sm font-normal uppercase tracking-[4.2px] text-black">
            OUR PLANS
          </p>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-[1.2fr_1fr]">
            <h2 className="font-marcellus text-4xl leading-tight text-black md:text-5xl">
              Flexible pricing for yoga{" "}
              <span style={{ color: secondaryColor }}>and meditation</span>
            </h2>
            <p className="max-w-xl text-[16px] leading-7 text-[#9C9C9C]">
              Choose from our flexible pricing plans designed to suit your
              needs. Whether you’re a beginner or advanced practitioner, we
              offer affordable.
            </p>
          </div>
        </div>

        {/* Loading skeleton */}
        {isLoading && data.length === 0 ? (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {[0, 1, 2].map((k) => (
              <div
                key={k}
                className="h-100 animate-pulse rounded-2xl border border-[#B6A57B] bg-[#B6A57B]"
              />
            ))}
          </div>
        ) : (
          <Carousel
            setApi={setApi}
            opts={{ align: "start", loop: false, dragFree: true }}
            className="relative"
            plugins={[Autoplay({ delay: 3500, stopOnInteraction: false })]}
          >
            <CarouselContent className="-ml-4">
              {data.map((plan, idx) => {
                const isFeatured = (idx + 1) % 2 === 0;
                const planId =
                  (plans[idx]?._id as string | undefined) ||
                  `${plan.name}-${idx}`;
                const coverImage =
                  plan.image || "/assets/restraint-plans-image-1.jpg";
                const color = isFeatured ? secondaryColor : primaryColor;

                const isSubscribed =
                  !!isLoggedIn &&
                  !!plan.subscribers?.some(
                    (sub: { _id?: string; id?: string }) =>
                      (sub?._id ?? sub?.id) === userId
                  );

                const isSubscribedCommunity = communityData?.community?.members?.some(
                  (m: any) => m?.user?._id === (auth as any)?.user?.id
                );

                return (
                  <CarouselItem
                    key={planId}
                    className="pl-4 md:basis-1/2 lg:basis-1/3"
                  >
                    <PlanCard
                      plan={plan}
                      isFeatured={isFeatured}
                      periodLabel={plan.periodLabel}
                      isLoggedIn={isLoggedIn}
                      isPrivate={communityData?.community?.type === "PRIVATE"}
                      isSubscribedCommunity={isSubscribedCommunity}
                      isSubscribed={isSubscribed}
                      communityId={communityId}
                      planId={planId}
                      coverImage={coverImage}
                      color={color}
                    />
                  </CarouselItem>
                );
              })}
            </CarouselContent>

            <CarouselPrevious className="hidden cursor-pointer border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 md:flex" />
            <CarouselNext className="hidden cursor-pointer border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 md:flex" />
          </Carousel>
        )}
      </div>
      <div className="mt-2 flex w-full items-center justify-center">
        <Link href={"/plans"}>
          <button className="group relative mt-2 cursor-pointer overflow-hidden rounded-[10px] border border-[var(--pri)] bg-[var(--pri)] px-[20px] py-[10px] text-[16px] text-white transition-all duration-300 ease-out hover:-translate-y-0.5 hover:bg-transparent hover:text-[var(--pri)] active:translate-y-0">
            <span className="relative z-10 inline-flex items-center gap-2">
              View All
              <ArrowUpRight
                className="h-6 w-6 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-1"
                strokeWidth={2}
              />
            </span>
          </button>
        </Link>
      </div>
    </section>
  );
}

/* -------------------- Card -------------------- */
export function PlanCard({
  plan,
  isFeatured,
  periodLabel,
  isLoggedIn,
  isPrivate,
  isSubscribedCommunity,
  isSubscribed,
  communityId,
  planId,
  coverImage,
  color,
  fetchPlans,
}: {
  plan: DisplayPlan;
  isFeatured: boolean;
  periodLabel: string;
  isLoggedIn: boolean;
  isPrivate: boolean;
  isSubscribedCommunity?: boolean;
  isSubscribed: boolean;
  communityId?: string; // can be undefined
  planId: string;
  coverImage: string;
  color: string;
  fetchPlans?: () => void;
}) {
  const { joinToPublicCommunity } = usePlans();
  const { SendCommunityRequest } = useRequests();

  // Accept optional ids and guard to fix TS2345 + runtime safety
  const handleClickJoin = async (id?: string) => {
    if (!id) {
      toast.error("Missing community id");
      return;
    }
    try {
      await joinToPublicCommunity(id);
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
      toast.error("Missing community id");
      return;
    }
    try {
      const formData = new FormData();
      formData.append("community", community);
      formData.append("Message", message || "Request to join the community.");
      const response = await SendCommunityRequest(formData);
      if (response && response.status === 201) {
        fetchPlans?.();
        toast.success("Request sent to the admin.");
      }
    } catch (error) {
      console.error("Error while sending community request:", error);
      toast.error("Could not send the request. Please try again.");
    }
  };

  return (
    <article
      className={[
        "h-full overflow-hidden rounded-3xl border shadow-sm",
        isFeatured
          ? "border-transparent bg-[var(--pri)] text-white"
          : "border-black/10 bg-white",
      ].join(" ")}
    >
      {/* Image */}
      <div className="relative h-40 w-full overflow-hidden md:h-48">
        <Image
          src={plan.image || "/assets/restraint-plans-image-1.jpg"}
          alt={plan.name}
          fill
          className="object-cover"
          sizes="(min-width: 1024px) 33vw, 100vw"
          unoptimized
        />
      </div>

      {/* Price */}
      <div
        className={[
          "px-6 pt-8",
          isFeatured ? "text-white" : "text-[#222A21]",
        ].join(" ")}
      >
        <div className="text-center">
          <div className="font-marcellus text-4xl">
            ₹{typeof plan.price === "number" ? plan.price : plan.price}
          </div>
          <div
            className="mt-1 text-xs"
            style={{ color: isFeatured ? "rgba(255,255,255,.8)" : MUTED }}
          >
            {periodLabel}
          </div>
        </div>
      </div>
      <h3 className="my-1 px-4 text-center font-marcellus text-xl">
        {capitalizeWords(plan.name)}
      </h3>

      {/* Features */}
      <div
        className={[
          "mt-6 border-t px-6 py-6 text-sm",
          isFeatured ? "border-white/10" : "border-black/10",
        ].join(" ")}
      >
        <ul className="space-y-3">
          {plan.features.map((f, i) => (
            <li
              key={i}
              className="flex items-start gap-3"
              style={{ color: isFeatured ? "rgba(255,255,255,.9)" : "#2B3129" }}
            >
              <span
                className={[
                  "mt-[6px] inline-block h-1.5 w-1.5 rounded-full",
                  isFeatured ? "bg-white/80" : "bg-[#C9CEC6]",
                ].join(" ")}
              />
              <span className="leading-6">{f}</span>
            </li>
          ))}
        </ul>

        {/* CTA area — conditional rendering */}
        <div className="mt-6" style={{ ["--color" as any]: color }}>
          {!isLoggedIn ? (
            <Link
              href={"/login"}
              className={[
                "inline-flex w-full items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-medium transition",
                isFeatured
                  ? "bg-[var(--sec)] text-[#2D332C] hover:brightness-95"
                  : "bg-[var(--pri)] text-white hover:opacity-95",
              ].join(" ")}
            >
              <span className="relative z-[1] flex items-center gap-2 text-[15px] font-medium">
                {isPrivate && (
                  <span>
                    <LockKeyhole size={20} strokeWidth={1.5} />
                  </span>
                )}
                Login to Subscribe
              </span>
              <span
                className={[
                  isFeatured
                    ? "bg-[var(--sec)] text-[#2D332C] hover:brightness-95"
                    : "bg-[var(--pri)] text-white hover:opacity-95",
                ].join(" ")}
              >
                <ArrowUpRight className="h-6 w-6" />
              </span>
            </Link>
          ) : !isSubscribedCommunity ? (
            !isPrivate ? (
              <Dialog>
                <DialogTrigger asChild>
                  <div
                    className={[
                      "inline-flex w-full items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-medium transition",
                      isFeatured
                        ? "bg-[#C5B38A] text-[#2D332C] hover:brightness-95"
                        : "bg-[var(--pri)] text-white hover:opacity-95",
                    ].join(" ")}
                    style={{ cursor: "pointer" }}
                  >
                    <span className="relative z-[1] flex items-center gap-2 text-[15px] font-medium">
                      {isPrivate && (
                        <span>
                          <LockKeyhole size={20} strokeWidth={1.5} />
                        </span>
                      )}
                      Join Community
                    </span>
                    <span
                      className={[
                        isFeatured
                          ? "bg-[var(--sec)] text-[#2D332C] hover:brightness-95"
                          : "bg-[var(--pri)] text-white hover:opacity-95",
                      ].join(" ")}
                    >
                      <ArrowUpRight className="h-6 w-6" />
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
                    <Button
                      onClick={() => handleClickJoin(communityId)}
                      disabled={isSubscribed}
                    >
                      Confirm Join
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            ) : (
              <Dialog>
                <DialogTrigger asChild>
                  <div
                    className={[
                      "inline-flex w-full items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-medium transition",
                      isFeatured
                        ? "bg-[#C5B38A] text-[#2D332C] hover:brightness-95"
                        : "bg-[#2F3A31] text-white hover:opacity-95",
                    ].join(" ")}
                    style={{ cursor: "pointer" }}
                  >
                    <span className="relative z-[1] flex items-center gap-2 text-[15px] font-medium">
                      {isPrivate && (
                        <span>
                          <LockKeyhole size={20} strokeWidth={1.5} />
                        </span>
                      )}
                      Send Join Request
                    </span>
                    <span
                      className={[
                        isFeatured
                          ? "bg-[#C5B38A] text-[#2D332C] hover:brightness-95"
                          : "bg-[#2F3A31] text-white hover:opacity-95",
                      ].join(" ")}
                    >
                      <ArrowUpRight className="h-6 w-6" />
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
              href={`/subscriptions/?planid=${encodeURIComponent(
                planId
              )}&communityid=${encodeURIComponent(
                communityId || ""
              )}&image=${encodeURIComponent(coverImage)}`}
              color={color}
            />
          )}
        </div>
      </div>
    </article>
  );
}

/* -------------------- Local ChooseButton -------------------- */
function ChooseButton({
  text,
  href,
  color,
}: {
  text: string;
  href: string;
  color: string;
}) {
  return (
    <Link
      href={href}
      className="inline-flex w-full items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-medium text-white transition"
      style={{ backgroundColor: color }}
    >
      {text} <ArrowUpRight className="h-4 w-4" />
    </Link>
  );
}
