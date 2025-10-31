"use client";
import React, { useState } from "react";
import { capitalizeWords } from "@/components/utils/StringFunctions";
import { usePlans } from "@/hooks/usePlan";
import { TrainingPlan } from "@/models/plan.model";
import { PlanCard } from "../../_components/RestraintPlans";
import { AuthContext } from "@/contexts/Auth.context";
import { useCommunity } from "@/hooks/useCommunity";
import { PlansSection } from "@/models/templates/restraint/restraint-home-model";

type DisplayPlan = {
  id?: string;
  name: string;
  price: number | string;
  image?: string;
  features: string[];
  periodLabel: string;
  // 👇 keep subscribers from API so we can check against logged-in user
  subscribers?: Array<{ _id?: string; id?: string }>;
};

function formatPeriodLabel(interval?: number, duration?: string) {
  if (!interval || !duration) return "Per Month";
  const unit = duration.toLowerCase();
  const cap = unit.charAt(0).toUpperCase() + unit.slice(1);
  if (interval === 1) return `Per ${cap}`;
  const plural = unit.endsWith("s") ? unit : unit + "s";
  return `For ${interval} ${cap === unit ? plural : cap + "s"}`;
}

const RestraintPlansPage = ({
  primaryColor,
  secondaryColor,
  content,
}: {
  secondaryColor: string;
  primaryColor: string;
  content?: PlansSection;
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { getPlansList, getCommunityPlansListAuth } = usePlans();
  const [plans, setPlans] = React.useState<TrainingPlan[]>([]);

  const source = content?.content;

  const auth = React.useContext(AuthContext);
  const isLoggedIn = !!auth?.isAuthenticated;
  const userId: string | undefined =
    (auth as any)?.user?._id ?? (auth as any)?.user?.id ?? undefined;

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

  // 👇 THIS was the problem: subscribers were not passed through
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

        // ✅ keep the actual list
        subscribers: p.subscribers as Array<{ _id?: string; id?: string }>,
      };
    });
  }, [plans]);

  const data: DisplayPlan[] = normalizedFromApi;

  return (
    <section
      className="py-10 font-sora"
      style={
        {
          "--pri": primaryColor,
          "--sec": secondaryColor,
        } as React.CSSProperties
      }
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-20">
        {/* header */}
        <div className="text-center md:mb-16 mb-6">
          <p className="text-sm font-normal uppercase tracking-[4.2px] text-black">
            PLANS
          </p>
          <h2 className="font-marcellus text-4xl leading-tight text-black sm:text-5xl">
            {source?.heading}{" "}
            <span style={{ color: secondaryColor }}>{source?.subHeading}</span>
          </h2>
        </div>

        {/* main */}
        {isLoading ? (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {[0, 1, 2].map((k) => (
              <div
                key={k}
                className="h-100 animate-pulse rounded-2xl border border-[var(--pri)] bg-[var(--pri)]"
              />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {data.map((plan, idx) => {
              const isFeatured = (idx + 1) % 2 === 0;
              const planId =
                (plans[idx]?._id as string | undefined) ||
                `${plan.name}-${idx}`;
              const coverImage =
                plan.image || "/assets/restraint-plans-image-1.jpg";
              const color = isFeatured ? secondaryColor : primaryColor;

              // ✅ now this actually has data
              const isSubscribed =
                !!isLoggedIn &&
                !!plan.subscribers?.some(
                  (sub: { _id?: string; id?: string }) =>
                    (sub?._id ?? sub?.id) === userId
                );

              return (
                <PlanCard
                  key={idx}
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
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};

export default RestraintPlansPage;
