"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, LockKeyhole } from "lucide-react";
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

const ACCENT = "#B6A57B";
const MUTED = "#747B70";
const DARK = "#2F3A31";

/* -------------------- Display & helpers -------------------- */
type DisplayPlan = {
  id?: string;
  name: string;
  price: number | string;
  image?: string;
  features: string[];
  periodLabel: string;
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
export default function RestraintPlans() {
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
      };
    });
  }, [plans]);

  // Pick dataset: fetched or seed
  const data: DisplayPlan[] = normalizedFromApi;

  return (
    <section className="bg-[#B6A57B15] font-sora py-10" id="plans">
      <div className="mx-auto container px-6 md:px-20">
        {/* Section header */}
        <div className="mb-6">
          <p className="text-sm mb-2 font-normal uppercase tracking-[4.2px] text-[#3D493A]">
            OUR PLANS
          </p>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-[1.2fr_1fr]">
            <h2 className="font-marcellus text-4xl leading-tight text-[#232A22] md:text-5xl">
              Flexible pricing for yoga{" "}
              <span style={{ color: ACCENT }}>and meditation</span>
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
          <div className="space-y-6">
            {[0, 1, 2].map((k) => (
              <div
                key={k}
                className="h-36 animate-pulse rounded-2xl border border-[#E6E8EE] bg-white"
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
                const color = isFeatured ? "#C5B38A" : "#2F3A31";
                const isSubscribed = false;

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
                      isSubscribedCommunity={communityData?.community?.members?.some(
                        (m: any) => m?.user?._id === auth?.user?.id
                      )}
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

            <CarouselPrevious className="hidden cursor-pointer md:flex border border-slate-200 bg-white text-slate-700 hover:bg-slate-50" />
            <CarouselNext className="hidden cursor-pointer md:flex border border-slate-200 bg-white text-slate-700 hover:bg-slate-50" />
          </Carousel>
        )}
      </div>
      <div className="w-full flex items-center justify-center mt-2">
        <Link href={"/plans"}>
          <button
            className={`${"mt-2 group cursor-pointer relative overflow-hidden px-[20px] py-[10px] rounded-[10px] text-[16px] border transition-all duration-300 ease-out bg-[#3D493A] text-white border-[#3D493A] hover:bg-transparent hover:text-[#3D493A] hover:border-[#3D493A] hover:-translate-y-0.5 active:translate-y-0"}`}
          >
            <span className="relative z-10 inline-flex items-center gap-2">
              View All
              <ArrowUpRight
                className="h-6 w-6 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-0.5"
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
          ? "border-transparent bg-[var(--card-dark)] text-white"
          : "border-black/10 bg-white",
      ].join(" ")}
      style={
        isFeatured
          ? ({ ["--card-dark" as any]: DARK } as React.CSSProperties)
          : undefined
      }
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
      <h3 className="font-marcellus text-xl my-1 text-center px-4">
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
                  ? "bg-[#C5B38A] text-[#2D332C] hover:brightness-95"
                  : "bg-[#2F3A31] text-white hover:opacity-95",
              ].join(" ")}
            >
              <span className="relative z-[1] text-[15px] font-medium flex items-center gap-2">
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
                    ? "bg-[#C5B38A] text-[#2D332C] hover:brightness-95"
                    : "bg-[#2F3A31] text-white hover:opacity-95",
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
                        : "bg-[#2F3A31] text-white hover:opacity-95",
                    ].join(" ")}
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
                    <span className="relative z-[1] text-[15px] font-medium flex items-center gap-2">
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
              text="Choose Plan"
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

/* -------------------- Local ChooseButton (remove if you already have one) -------------------- */
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
      className="inline-flex w-full items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-medium transition text-white"
      style={{ backgroundColor: color }}
    >
      {text} <ArrowUpRight className="h-4 w-4" />
    </Link>
  );
}
