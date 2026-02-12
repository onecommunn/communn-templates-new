"use client";

import React, { useContext, useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { toast } from "sonner";

import { AuthContext } from "@/contexts/Auth.context";
import { useCommunity } from "@/hooks/useCommunity";
import { usePlans } from "@/hooks/usePlan";
import { useRequests } from "@/hooks/useRequests";

import LoginPopUp from "./LoginPopUp";
import PlansPopUp from "./PlansPopUp";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

import { TrainingPlan } from "@/models/plan.model";
import { useRouter } from "next/navigation";

type DefaultHeroProps = {
  name: string;
  logo: string;
  banner: string;
  membersCount: number;
  type: string;
  phoneNumber: number;
  numberOfPost: number;
  adminName?: string;
  colors: {
    primaryColor: string;
    secondaryColor: string;
    textcolor: string;
  };
};

const DefaultHero = ({
  name,
  logo,
  banner,
  membersCount,
  numberOfPost,
  type,
  phoneNumber,
  adminName,
  colors,
}: DefaultHeroProps) => {
  const auth = useContext(AuthContext);
  const { communityData, communityId } = useCommunity();
  const router = useRouter();

  const { joinToPublicCommunity, getPlansList, getCommunityPlansListAuth } =
    usePlans();
  const { SendCommunityRequest } = useRequests();

  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isPlansOpen, setIsPlansOpen] = useState(false);

  const [plans, setPlans] = useState<TrainingPlan[]>([]);
  const [isLoadingPlans, setIsLoadingPlans] = useState(false);

  const [actionDialogOpen, setActionDialogOpen] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);

  // ✅ Post-auth intent to avoid race-condition (auth + community data delay)
  const [postAuthIntent, setPostAuthIntent] = useState(false);

  // ✅ Optimistic join flag to avoid "join again" flash after join API success
  const [joinedOptimistic, setJoinedOptimistic] = useState(false);
  const [requestedOptimistic, setRequestedOptimistic] = useState(false);

  const isLoggedIn = !!auth?.isAuthenticated;
  const userId = (auth as any)?.user?._id ?? (auth as any)?.user?.id;

  const communityType = communityData?.community?.type; // "PUBLIC" | "PRIVATE"

  const isAlreadyJoined = useMemo(() => {
    if (joinedOptimistic) return true;

    const members = communityData?.community?.members || [];
    if (!userId || !members?.length) return false;

    return members.some((m: any) => (m?.user?._id ?? m?.user?.id) === userId);
  }, [communityData?.community?.members, userId, joinedOptimistic]);

  const fetchPlans = async (): Promise<TrainingPlan[]> => {
    if (!communityId) return [];
    setIsLoadingPlans(true);

    try {
      const resp = isLoggedIn
        ? await getCommunityPlansListAuth(communityId)
        : await getPlansList(communityId);

      let list: TrainingPlan[] = [];

      if (Array.isArray(resp)) list = resp;
      else if (resp && typeof resp === "object" && "myPlans" in resp)
        list = (resp as any).myPlans;

      setPlans(list);
      return list;
    } catch (e) {
      console.error("Failed to fetch plans:", e);
      setPlans([]);
      return [];
    } finally {
      setIsLoadingPlans(false);
    }
  };

  const isSubscribedToAnyPlan = useMemo(() => {
    const plansList = auth?.userData?.subscriptionDetail ?? [];
    return plansList.length > 0;
  }, [userId, auth]);

  const ctaState = useMemo(() => {
    if (!isLoggedIn) return "LOGIN";

    if (isSubscribedToAnyPlan) return "SUBSCRIBED";

    // If PRIVATE and request already sent, don’t show join again
    if (communityType === "PRIVATE" && requestedOptimistic) return "REQUESTED";

    if (isAlreadyJoined) return "VIEW_PLANS";

    return "JOIN";
  }, [
    isLoggedIn,
    isSubscribedToAnyPlan,
    communityType,
    requestedOptimistic,
    isAlreadyJoined,
  ]);

  // Keep plans warm after login if already joined (optional)
  useEffect(() => {
    if (!communityId) return;
    if (isLoggedIn && isAlreadyJoined) {
      fetchPlans();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [communityId, isLoggedIn, isAlreadyJoined]);

  // ✅ Post-auth flow runs only when auth is committed (prevents join dialog flicker)
  useEffect(() => {
    if (!postAuthIntent) return;
    if (!isLoggedIn) return;
    if (!communityId) return;
    if (!userId) return;

    const run = async () => {
      // Ensure no stale dialog stays open
      setActionDialogOpen(false);

      // Fetch latest plans (auth is now valid)
      const list = await fetchPlans();

      // Decide subscription based on fetched list (most reliable)
      const alreadySubscribed = list.some((p: any) =>
        p?.subscribers?.some((s: any) => (s?._id ?? s?.id) === userId),
      );

      const joinedFromMembers = isAlreadyJoined;
      const joinedFromPlansAccess =
        communityType !== "PRIVATE" && Array.isArray(list) && list.length > 0;

      const joinedFinal = joinedFromMembers || joinedFromPlansAccess;

      if (!joinedFinal) {
        setActionDialogOpen(true);
        setPostAuthIntent(false);
        return;
      }

      if (alreadySubscribed) {
        // toast.success("You are already subscribed ✅");
        setPostAuthIntent(false);
        return;
      }

      setIsPlansOpen(true);
      setPostAuthIntent(false);
    };

    run();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [postAuthIntent, isLoggedIn, communityId, userId, communityType]);

  const handleConfirmJoinOrRequest = async () => {
    if (!communityId) return;

    setActionLoading(true);
    try {
      if (communityType === "PRIVATE") {
        const formData = new FormData();
        formData.append("community", communityId);
        formData.append("Message", "Request to join the community.");

        const res = await SendCommunityRequest(formData);

        if (res?.status === 201) {
          toast.success("Request sent to admin.");
          setRequestedOptimistic(true); // ✅ important
          setActionDialogOpen(false);
          return;
        }

        toast.error("Could not send request.");
        return;
      }

      // PUBLIC join
      await joinToPublicCommunity(communityId);
      toast.success("Successfully joined the community");

      setJoinedOptimistic(true); // ✅ important
      setActionDialogOpen(false);

      // open plans only if not subscribed
      await fetchPlans();
      if (!isSubscribedToAnyPlan) setIsPlansOpen(true);
    } catch (e) {
      toast.error(
        communityType === "PRIVATE"
          ? "Could not send request."
          : "Could not join the community.",
      );
    } finally {
      setActionLoading(false);
    }
  };

  const handlePrimaryCTA = async () => {
    if (ctaState === "LOGIN") {
      setIsLoginOpen(true);
      return;
    }

    if (ctaState === "SUBSCRIBED") {
      router.push(`/profile?id=${userId}`);
      return;
    }

    if (ctaState === "REQUESTED") {
      toast.info("Request already sent. Please wait for admin approval.");
      return;
    }

    if (ctaState === "VIEW_PLANS") {
      setIsPlansOpen(true);
      return;
    }

    // JOIN
    setActionDialogOpen(true);
  };

  return (
    <section
      className="relative flex flex-col items-center pt-8 pb-8 font-montserrat"
      style={
        {
          "--pri": colors?.primaryColor,
          "--sec": colors?.secondaryColor,
          "--nue": colors?.textcolor,
        } as React.CSSProperties
      }
    >
      {/* Banner */}
      <div className="relative w-[95%] max-w-6xl h-30 md:h-64 rounded-2xl overflow-hidden shadow-md">
        <Image
          src={
            banner ??
            "https://upload-community-files-new.s3.ap-south-1.amazonaws.com/uploads/0bd20f5258772df219803cab7a887485d34a2e70.jpg"
          }
          alt="Community Banner"
          fill
          className="object-cover rounded-2xl"
          priority
          unoptimized
        />
      </div>

      {/* Logo */}
      <div className="relative -mt-12 md:-mt-16 z-10">
        <div className="bg-white p-4 rounded-[20px] md:w-[120px] md:h-[120px] h-[90px] w-[90px] shadow-xl border border-gray-100">
          <Image
            src={
              logo ??
              "https://upload-community-files-new.s3.ap-south-1.amazonaws.com/uploads/Group 238944.svg"
            }
            alt="Community Logo"
            height={95}
            width={95}
            unoptimized
            className="object-cover rounded-[8px]"
          />
        </div>
      </div>

      {/* Title */}
      <div className="text-center mt-6">
        <h1 className="text-xl md:text-3xl font-bold text-[var(--pri)]">
          {name}
        </h1>
        {adminName ? (
          <p className="text-sm text-gray-500 font-medium mt-1">
            By {adminName}
          </p>
        ) : null}
      </div>

      {/* Stats */}
      <div
        style={{
          background:
            "linear-gradient(90deg, rgba(223, 34, 90, 0.1) 9.3%, rgba(59, 155, 127, 0.1) 34.8%, rgba(80, 161, 202, 0.1) 64.3%, rgba(42, 83, 162, 0.1) 95.3%)",
        }}
        className="mt-10 w-[95%] max-w-6xl bg-white/70 backdrop-blur-md border border-gray-100 rounded-2xl shadow-md grid grid-cols-3 py-4 md:py-6 px-2 md:px-4"
      >
        <div className="flex flex-col items-center">
          <span className="text-[12px] md:text-sm text-black mb-1">
            Members
          </span>
          <span className="text-xs md:text-2xl font-bold">
            {Number(membersCount).toLocaleString()}
          </span>
        </div>

        {/* <div className="flex flex-col items-center">
          <span className="text-[12px] md:text-sm text-black mb-1">
            No of Posts
          </span>
          <span className="text-xs md:text-2xl font-bold">
            {Number(numberOfPost).toLocaleString()}
          </span>
        </div> */}

        <div className="flex flex-col items-center">
          <span className="text-[12px] md:text-sm text-black mb-1">Access</span>
          <span className="text-xs md:text-2xl font-bold text-black capitalize">
            {type?.toLowerCase()}
          </span>
        </div>

        <div className="flex flex-col items-center">
          <span className="text-[12px] md:text-sm text-black mb-1">
            Call Now
          </span>
          <span className="text-xs md:text-2xl font-bold text-black">
            {phoneNumber}
          </span>
        </div>
      </div>

      {/* CTA */}
      <button
        onClick={handlePrimaryCTA}
        disabled={ctaState === "REQUESTED"}
        className="cursor-pointer mt-8 bg-[var(--sec)] md:text-lg text-xs text-[var(--nue)] px-12 py-3 rounded-full font-semibold shadow-md hover:bg-[var(--sec)] transition-all disabled:opacity-70 disabled:cursor-not-allowed"
      >
        {ctaState === "LOGIN"
          ? "Join Community"
          : ctaState === "SUBSCRIBED"
            ? "Subscribed"
            : ctaState === "REQUESTED"
              ? "Request Sent"
              : ctaState === "VIEW_PLANS"
                ? "Subscribe Plans"
                : "Join Community"}
      </button>

      {/* Login popup */}
      <LoginPopUp
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
        redirectTo={null}
        onSuccess={() => {
          setIsLoginOpen(false);
          setPostAuthIntent(true); // ✅ avoid race condition
        }}
        colors={{
          primaryColor: colors?.primaryColor,
          secondaryColor: colors?.secondaryColor,
          textcolor: colors?.textcolor,
        }}
      />

      {/* Join / Request dialog */}
      <Dialog open={actionDialogOpen} onOpenChange={setActionDialogOpen}>
        <DialogContent>
          <DialogTitle>Community Membership Required</DialogTitle>
          <DialogDescription>
            {communityType === "PRIVATE"
              ? "This is a private community. Send a request to the admin to get access to plans."
              : "You need to join the community before subscribing to a plan."}
          </DialogDescription>

          <div className="flex justify-end gap-2 mt-4">
            <Button
              variant="outline"
              onClick={() => setActionDialogOpen(false)}
              disabled={actionLoading}
            >
              Cancel
            </Button>

            <Button
              onClick={handleConfirmJoinOrRequest}
              disabled={actionLoading}
            >
              {actionLoading
                ? "Please wait..."
                : communityType === "PRIVATE"
                  ? "Send Request"
                  : "Join Community"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Plans popup (only if not subscribed) */}
      <PlansPopUp
        isOpen={isPlansOpen && !isSubscribedToAnyPlan}
        onClose={() => setIsPlansOpen(false)}
        plans={plans}
        loading={isLoadingPlans}
        communityId={communityId || ""}
        colors={colors}
      />
    </section>
  );
};

export default DefaultHero;
