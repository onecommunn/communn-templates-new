"use client";
import React, { useContext, useEffect, useState } from "react";
import { usePlans } from "@/hooks/usePlan";
import { TrainingPlan } from "@/models/plan.model";
import { getCommunityData } from "@/services/communityService";
import { AuthContext } from "@/contexts/Auth.context";
import { toast } from "sonner";
import CreatorPlansCard from "./CreatorPlansCard";
import { Skeleton } from "@/components/ui/skeleton";
import CreatorSectionHeader from "@/components/CustomComponents/Creator/CreatorSectionHeader";
import { capitalizeWords } from "@/components/utils/StringFunctions";


const CreatorPlansSection = () => {
  const { getPlansList, getCommunityPlansListAuth, joinToPublicCommunity } =
    usePlans();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [plans, setPlans] = useState<TrainingPlan[]>([]);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const authContext = useContext(AuthContext);
  const isAuthenticated = authContext?.isAuthenticated;
  const [communityId, setCommunityId] = useState<string>("");
  const userId = authContext?.user?.id;
  const isLoggedIn = !!userId;

  const getCommunityId = async () => {
    try {
      const communityData: any = await getCommunityData(
        window.location.hostname
      );
      setCommunityId(communityData?.community?._id || "");
      return communityData?.community._id || "";
    } catch (error) {
      console.error("Error fetching community ID:", error);
      return "";
    }
  };

  const handleClickJoin = async (id: string) => {
    try {
      await joinToPublicCommunity(id);
      if (fetchPlans) {
        fetchPlans();
      }
      toast.success("Successfully joined the community");
    } catch (error) {
      console.error("Error joining community:", error);
    }
  };

  useEffect(() => {
    const fetchCommunityId = async () => {
      const id = await getCommunityId();
      setCommunityId(id);
    };
    fetchCommunityId();
  }, []); // Run only once on mount

  const fetchPlans = async () => {
    if (!communityId) return;
    setIsLoading(true);
    try {
      setIsLoading(true);
      let response;
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
        "myPlans" in response &&
        Array.isArray((response as any).myPlans)
      ) {
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
      <div className="container mx-auto px-4 sm:px-6 lg:px-20">
        <div className="flex flex-col gap-2 justify-center items-center my-10">
          <Skeleton className="h-6 w-[200px]" />
          <Skeleton className="h-4 w-3/4 rounded-md" />
          <Skeleton className="h-4 w-3/6 rounded-md" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 py-16 px-4 lg:px-20">
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="border rounded-lg overflow-hidden shadow-sm p-4 space-y-4"
            >
              <Skeleton className="h-48 w-full rounded-md" />
              <Skeleton className="h-6 w-3/4" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
              <div className="flex justify-between items-center">
                <Skeleton className="h-6 w-20" />
                <Skeleton className="h-10 w-24 rounded-md" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (!isLoading && (!plans || plans.length === 0)) {
    return (
      <div className="text-center w-full h-[80vh] flex items-center justify-center">
        <p>No Plans available.</p>
      </div>
    );
  }

  return (
    <section className="py-10 font-inter">
      <div className="container mx-auto px-4 sm:px-6 lg:px-20">
        <CreatorSectionHeader
          title="Plans"
          description="Discover our comprehensive collection of courses designed to accelerate your personal and professional growth. From mindset transformation to leadership excellence."
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <CreatorPlansCard
              key={index}
              imageUrl={
                plan?.image?.value ||
                "/assets/creatorCoursesPlaceHolderImage.jpg"
              }
              title={plan.name}
              planId={plan._id}
              description={plan.description || plan.summary}
              price={plan.pricing || `${plan.totalPlanValue}`}
              period={`${plan.interval} ${capitalizeWords(plan.duration)}`}
              communityId={communityId}
              subscribers={plan?.subscribers}
              isSubscribedCommunity={isSubscribed}
              fetchPlans={fetchPlans}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CreatorPlansSection;
