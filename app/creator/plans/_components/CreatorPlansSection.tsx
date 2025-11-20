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
import { useCommunity } from "@/hooks/useCommunity";

const CreatorPlansSection = ({
  primaryColor,
  secondaryColor,
}: {
  primaryColor: string;
  secondaryColor: string;
}) => {
  const { getPlansList, getCommunityPlansListAuth, joinToPublicCommunity } =
    usePlans();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [plans, setPlans] = useState<TrainingPlan[]>([]);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const authContext = useContext(AuthContext);
  const isAuthenticated = authContext?.isAuthenticated;
  // const [communityId, setCommunityId] = useState<string>("");

  const { communityId, communityData } = useCommunity();
  const [joinedCommunityLocal, setJoinedCommunityLocal] = React.useState(false);

  // ✅ support both _id and id on auth user
  const userId = authContext?.user?._id ?? authContext?.user?.id ?? undefined;

  // ✅ top-level community membership check (server data + local flag)
  const isSubscribedCommunity =
    joinedCommunityLocal ||
    communityData?.community?.members?.some(
      (m: any) => (m?.user?._id ?? m?.user?.id) === userId
    );

  const isLoggedIn = !!userId;
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

  // useEffect(() => {
  //   const fetchCommunityId = async () => {
  //     const id = await getCommunityId();
  //     setCommunityId(id);
  //   };
  //   fetchCommunityId();
  // }, []); // Run only once on mount

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
      <div
        className="container mx-auto px-4 sm:px-6 lg:px-20"
        style={{ backgroundColor: primaryColor }}
      >
        <div className="flex flex-col gap-2 justify-center items-center py-10">
          <Skeleton
            className="h-6 w-[200px]"
            style={{ backgroundColor: secondaryColor }}
          />
          <Skeleton
            className="h-4 w-3/4 rounded-md"
            style={{ backgroundColor: secondaryColor }}
          />
          <Skeleton
            className="h-4 w-3/6 rounded-md"
            style={{ backgroundColor: secondaryColor }}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 py-16 px-4 lg:px-20">
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="rounded-lg overflow-hidden shadow-sm p-4 space-y-4"
            >
              <Skeleton
                className="h-48 w-full rounded-md"
                style={{ backgroundColor: secondaryColor }}
              />
              <Skeleton
                className="h-6 w-3/4"
                style={{ backgroundColor: secondaryColor }}
              />
              <Skeleton
                className="h-4 w-full"
                style={{ backgroundColor: secondaryColor }}
              />
              <Skeleton
                className="h-4 w-5/6"
                style={{ backgroundColor: secondaryColor }}
              />
              <div className="flex justify-between items-center">
                <Skeleton
                  className="h-6 w-20"
                  style={{ backgroundColor: secondaryColor }}
                />
                <Skeleton
                  className="h-10 w-24 rounded-md"
                  style={{ backgroundColor: secondaryColor }}
                />
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

  const isRequested = Boolean(
    communityData?.community?.requests?.some(
      (req: any) => (req?.createdBy?._id ?? req?.createdBy?.id) === userId
    )
  );

  return (
    <section
      className="py-10 font-inter"
      style={{ backgroundColor: primaryColor }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-20">
        <CreatorSectionHeader
          textColor={secondaryColor}
          title="Plans"
          description="Explore flexible creator plans tailored to your growth journey. Unlock tools, resources, and support to help you monetize, scale, and elevate your creative projects with ease."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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
              // ✅ use the top-level isSubscribedCommunity
              isSubscribedCommunity={isSubscribedCommunity}
              fetchPlans={fetchPlans}
              primaryColor={primaryColor}
              secondaryColor={secondaryColor}
              isPrivate={communityData?.community?.type === "PRIVATE"}
              isRequested={!!isRequested}
              initialPayment={plan?.initialPayment}
              // ✅ let the card tell parent “join succeeded”
              onJoinedCommunity={() => setJoinedCommunityLocal(true)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CreatorPlansSection;
