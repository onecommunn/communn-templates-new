"use client";

import React, { useContext, useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
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

type DefaultHeroProps = {
  name: string;
  logo: string;
  banner: string;
  membersCount: number;
  type: string;
  phoneNumber: number;
  numberOfPost: number;
  adminName?: string;
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
}: DefaultHeroProps) => {
  const auth = useContext(AuthContext);
  const { communityData, communityId } = useCommunity();

  const { joinToPublicCommunity, getPlansList, getCommunityPlansListAuth } =
    usePlans();
  const { SendCommunityRequest } = useRequests();

  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isPlansOpen, setIsPlansOpen] = useState(false);

  const [plans, setPlans] = useState<TrainingPlan[]>([]);
  const [isLoadingPlans, setIsLoadingPlans] = useState(false);

  const [actionDialogOpen, setActionDialogOpen] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);

  const isLoggedIn = !!auth?.isAuthenticated;

  // ✅ unify user id (you used _id in other places)
  const userId = (auth as any)?.user?._id ?? (auth as any)?.user?.id;

  const communityType = communityData?.community?.type; // "PUBLIC" | "PRIVATE"

  const isAlreadyJoined = useMemo(() => {
    const members = communityData?.community?.members || [];
    if (!userId || !members?.length) return false;

    return members.some(
      (m: any) => (m?.user?._id ?? m?.user?.id) === userId
    );
  }, [communityData?.community?.members, userId]);

  // ✅ Fetch plans only when we want to show plans popup (or when logged-in state changes)
  const fetchPlans = async () => {
    if (!communityId) return;
    setIsLoadingPlans(true);
    try {
      const resp = isLoggedIn
        ? await getCommunityPlansListAuth(communityId)
        : await getPlansList(communityId);

      if (Array.isArray(resp)) {
        setPlans(resp);
      } else if (resp && typeof resp === "object" && "myPlans" in resp) {
        setPlans((resp as any).myPlans);
      } else {
        setPlans([]);
      }
    } catch (e) {
      console.error("Failed to fetch plans:", e);
      setPlans([]);
    } finally {
      setIsLoadingPlans(false);
    }
  };

  // Optional: keep plans warm after login
  useEffect(() => {
    if (!communityId) return;
    if (isLoggedIn && isAlreadyJoined) {
      fetchPlans();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [communityId, isLoggedIn, isAlreadyJoined]);

  // ✅ This is called AFTER successful login/signup
  const afterAuthFlow = () => {
    // If already a member => open plans popup
    if (isAlreadyJoined) {
      fetchPlans();
      setIsPlansOpen(true);
      return;
    }

    // Else ask them to Join/Request first
    setActionDialogOpen(true);
  };

  const handleConfirmJoinOrRequest = async () => {
    if (!communityId) return;

    setActionLoading(true);
    try {
      if (communityType === "PRIVATE") {
        // Send request
        const formData = new FormData();
        formData.append("community", communityId);
        formData.append("Message", "Request to join the community.");

        const res = await SendCommunityRequest(formData);

        if (res?.status === 201) {
          toast.success("Request sent to admin.");
          setActionDialogOpen(false);
          return;
        }

        toast.error("Could not send request.");
        return;
      }

      // PUBLIC join
      await joinToPublicCommunity(communityId);

      toast.success("Successfully joined the community");
      setActionDialogOpen(false);

      // After join => open plans popup
      await fetchPlans();
      setIsPlansOpen(true);
    } catch (e) {
      toast.error(
        communityType === "PRIVATE"
          ? "Could not send request."
          : "Could not join the community."
      );
    } finally {
      setActionLoading(false);
    }
  };

  const handlePrimaryCTA = () => {
    if (!isLoggedIn) {
      setIsLoginOpen(true);
      return;
    }

    // Logged in
    if (isAlreadyJoined) {
      fetchPlans();
      setIsPlansOpen(true);
    } else {
      setActionDialogOpen(true);
    }
  };

  return (
    <section className="relative flex flex-col items-center pt-8 pb-8 font-montserrat">
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
        <h1 className="text-xl md:text-3xl font-bold text-[#2E59A7]">{name}</h1>
        {adminName ? (
          <p className="text-sm text-gray-500 font-medium mt-1">By {adminName}</p>
        ) : null}
      </div>

      {/* Stats */}
      <div
        style={{
          background:
            "linear-gradient(90deg, rgba(223, 34, 90, 0.1) 9.3%, rgba(59, 155, 127, 0.1) 34.8%, rgba(80, 161, 202, 0.1) 64.3%, rgba(42, 83, 162, 0.1) 95.3%)",
        }}
        className="mt-10 w-[95%] max-w-6xl bg-white/70 backdrop-blur-md border border-gray-100 rounded-2xl shadow-md grid grid-cols-4 py-4 md:py-6 px-2 md:px-4"
      >
        <div className="flex flex-col items-center">
          <span className="text-[12px] md:text-sm text-black mb-1">Members</span>
          <span className="text-xs md:text-2xl font-bold">
            {Number(membersCount).toLocaleString()}
          </span>
        </div>

        <div className="flex flex-col items-center">
          <span className="text-[12px] md:text-sm text-black mb-1">No of Posts</span>
          <span className="text-xs md:text-2xl font-bold">
            {Number(numberOfPost).toLocaleString()}
          </span>
        </div>

        <div className="flex flex-col items-center">
          <span className="text-[12px] md:text-sm text-black mb-1">Access</span>
          <span className="text-xs md:text-2xl font-bold text-black capitalize">
            {type?.toLowerCase()}
          </span>
        </div>

        <div className="flex flex-col items-center">
          <span className="text-[12px] md:text-sm text-black mb-1">Call Now</span>
          <span className="text-xs md:text-2xl font-bold text-black">{phoneNumber}</span>
        </div>
      </div>

      {/* CTA (popup-only flow) */}
      <button
        onClick={handlePrimaryCTA}
        className="cursor-pointer mt-8 bg-[#3056A7] md:text-lg text-xs text-white px-12 py-3 rounded-full font-semibold shadow-md hover:bg-[#25468a] transition-all"
      >
        {isAlreadyJoined ? "View Plans" : "Join Community"}
      </button>

      {/* Login popup */}
      <LoginPopUp
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
        redirectTo={null}
        onSuccess={() => {
          setIsLoginOpen(false);
          afterAuthFlow();
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

            <Button onClick={handleConfirmJoinOrRequest} disabled={actionLoading}>
              {actionLoading
                ? "Please wait..."
                : communityType === "PRIVATE"
                  ? "Send Request"
                  : "Join Community"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Plans popup */}
      <PlansPopUp
        isOpen={isPlansOpen}
        onClose={() => setIsPlansOpen(false)}
        plans={plans}
        loading={isLoadingPlans}
        communityId={communityId || ""}
      />
    </section>
  );
};

export default DefaultHero;
