"use client";
import { AuthContext } from "@/contexts/Auth.context";
import { usePlans } from "@/hooks/usePlan";
import { TrainingPlan } from "@/models/plan.model";
import { getCommunityData } from "@/services/communityService";
import React, { useContext, useEffect, useState } from "react";
import YoganaPlanCard from "./YoganaPlanCard";
import { Skeleton } from "@/components/ui/skeleton"; // ← shadcn skeleton

const PlanSkeletonCard = () => (
  <Skeleton className="h-100 w-full bg-gray-300 rounded-[30px]" />
);

const YoganaPlans = () => {
  const { getPlansList, getCommunityPlansListAuth, joinToPublicCommunity } = usePlans();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [plans, setPlans] = useState<TrainingPlan[]>([]);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const authContext = useContext(AuthContext);
  const isAuthenticated = authContext?.isAuthenticated;
  const [communityId, setCommunityId] = useState<string>("");
  const userId = authContext?.user?.id;

  const getCommunityId = async () => {
    try {
      const communityData: any = await getCommunityData(window.location.hostname);
      setCommunityId(communityData?.community?._id || "");
      return communityData?.community._id || "";
    } catch (error) {
      console.error("Error fetching community ID:", error);
      return "";
    }
  };

  useEffect(() => {
    const fetchCommunityId = async () => {
      const id = await getCommunityId();
      setCommunityId(id);
    };
    fetchCommunityId();
  }, []);

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
      } else if (response && typeof response === "object" && "myPlans" in response && Array.isArray((response as any).myPlans)) {
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
  }, [communityId, isAuthenticated]);

  if (isLoading) {
    return (
      <section id="plans" className="relative py-20 font-cormorant bg-[#C2A74E1A] overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-20">
          <div className="relative z-10 text-center md:mb-16 mb-6">
            <p className="text-[#C2A74E] font-alex-brush text-3xl">Price</p>
            <h2 className="text-black font-cormorant text-[40px] md:text-[60px]/[60px] font-semibold">
              Choose Your Yoga Journey
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <PlanSkeletonCard key={i} />
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="plans" className="relative py-20 font-cormorant bg-[#C2A74E1A] overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-20">
        <div className="relative z-10 text-center md:mb-16 mb-6">
          <p className="text-[#C2A74E] font-alex-brush text-3xl">Price</p>
          <h2 className="text-black font-cormorant text-[40px] md:text-[60px]/[60px] font-semibold">
            Choose Your Yoga Journey
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {plans.map((plan, index) => (
            <YoganaPlanCard
              key={plan._id ?? index}
              index={index + 1}
              title={plan.name}
              description={plan.description || plan.summary}
              subscribers={plan?.subscribers}
              fetchPlans={fetchPlans}
              isSubscribedCommunity={isSubscribed}
              planId={plan._id}
              communityId={communityId}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default YoganaPlans;
