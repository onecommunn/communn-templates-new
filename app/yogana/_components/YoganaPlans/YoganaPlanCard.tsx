// ✅ YoganaPlanCard.tsx (UPDATED: button labels same as Restraint + uses hook meta)
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
import { usePlans } from "@/hooks/usePlan";
import { useRequests } from "@/hooks/useRequests";
import Image from "next/image";
import React, { useContext, useEffect, useState } from "react";
import { toast } from "sonner";

type PlanMeta = null | {
  plan: any;
  nextDue: any;
  isActive: boolean;
  isExpired: boolean;
  isSequencePlan: boolean;
  isSubscribed: boolean;
};

interface YoganaPlanCardProps {
  index: number;
  title: string;
  description: string;
  subscribers: { _id: string }[];
  fetchPlans?: () => void;
  isSubscribedCommunity?: boolean;
  onJoinedCommunity?: () => void;
  planId: string;
  communityId: string;
  primaryColor: string;
  secondaryColor: string;
  neutralColor: string;
  price: string;
  period: string;
  coverImage: string;
  isPrivate: boolean;
  isRequested: boolean;
  initialPayment: string | number;
  coupons: {
    _id: string;
    couponCode: string;
    cycleCount: number;
    discountName: string;
    discountType: string;
    discountValue: number;
    expiryDate: string;
    maxRedemptions: number;
    usedRedemptions: number;
  }[];

  // ✅ flow props
  isLoggedIn: boolean;
  onStartFlow: () => void;

  // ✅ from hook
  planMeta: PlanMeta;
  isProcessing?: boolean;
}

const YoganaPlanCard = ({
  index,
  title,
  description,
  subscribers,
  fetchPlans,
  isSubscribedCommunity,
  planId,
  communityId,
  primaryColor,
  secondaryColor,
  neutralColor,
  price,
  period,
  coverImage,
  isPrivate,
  isRequested,
  initialPayment,
  coupons,
  onJoinedCommunity,

  isLoggedIn,
  onStartFlow,

  planMeta,
  isProcessing = false,
}: YoganaPlanCardProps) => {
  const authContext = useContext(AuthContext);
  const userId =
    (authContext as any)?.user?._id ?? (authContext as any)?.user?.id;

  const { joinToPublicCommunity } = usePlans();
  const { SendCommunityRequest } = useRequests();

  const [mounted, setMounted] = useState(false);

  const isSubscribed =
    !!isLoggedIn &&
    subscribers?.some((sub: any) => (sub?._id ?? sub?.id) === userId);

  useEffect(() => setMounted(true), []);

  const handleClickJoin = async (id: string) => {
    try {
      await joinToPublicCommunity(id);
      onJoinedCommunity?.();
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
      formData.append("Message", message || "Request to join the community.");
      const response = await SendCommunityRequest(formData);
      if (response && response.status === 201) fetchPlans?.();
    } catch (error) {
      console.error("Error while sending community request:", error);
      toast.error("Could not send the request. Please try again.");
    }
  };

  if (authContext?.loading || !mounted) return null;

  // ✅ Hide one-time fee on renewals
  const showOneTimeFee = Number(initialPayment) > 0 && !isSubscribed;

  // ✅ CTA text like Restraint
  const showSubscribedDisabled = !!planMeta?.isSubscribed && !!planMeta?.isActive;
  const showExpired = !!planMeta?.isSubscribed && !!planMeta?.isExpired;

  const getCTA = () => {
    if (!isLoggedIn) return "Login to Subscribe";
    if (!isSubscribedCommunity) return isPrivate ? "Send Join Request" : "Join Community";
    if (showSubscribedDisabled) return "Subscribed";
    if (showExpired) {
      if (planMeta?.isSequencePlan) return "Renew";
      return "Pay to Renew";
    }
    // not subscribed yet
    return planMeta?.isSequencePlan ? "Subscribe" : "Subscribe";
  };

  const ctaText = getCTA();

  return (
    <div
      className="h-full"
      style={
        {
          "--pri": primaryColor,
          "--sec": secondaryColor,
          "--neu": neutralColor,
        } as React.CSSProperties
      }
    >
      <div className="bg-white rounded-[30px] p-2 relative h-full">
        <div className="absolute z-0">
          <Image
            src={"/assets/yogana-plans-card-bg-image-1.png"}
            alt="yogana-plans-card-bg-image-1"
            width={157}
            height={74}
            className="absolute top-0 left-0"
            unoptimized
          />
          <Image
            src={"/assets/yogana-plans-card-bg-image-2.png"}
            alt="yogana-plans-card-bg-image-2"
            width={157}
            height={74}
            className="absolute bottom-0 right-0"
            unoptimized
          />
        </div>

        <div
          style={{ borderColor: primaryColor }}
          className="z-10 h-full border gap-6 border-dashed rounded-[30px] py-10 px-6 flex flex-col items-center justify-center"
        >
          <div
            style={{
              backgroundImage: "url('/assets/yogana-plans-card-bg-image-3.png')",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
            className="w-[103px] h-[103px] flex items-center justify-center"
          >
            <p
              className="font-cormorant font-semibold text-[40px] pr-4"
              style={{ color: secondaryColor }}
            >
              {index}
            </p>
          </div>

          <h4
            style={{ color: primaryColor }}
            className="font-cormorant font-semibold text-2xl text-center w-full"
          >
            {capitalizeWords(title)}
          </h4>

          <p
            style={{ color: neutralColor }}
            className="font-plus-jakarta text-sm text-center w-full line-clamp-5"
          >
            {description}
          </p>

          <div className="flex flex-col items-center gap-2">
            <div className="flex items-baseline space-x-2">
              <span
                className="text-lg font-bold font-plus-jakarta"
                style={{ color: primaryColor }}
              >
                ₹{price}
              </span>
              <span
                className="text-lg font-medium font-plus-jakarta"
                style={{ color: primaryColor }}
              >
                / {period}
              </span>
            </div>

            {showOneTimeFee && (
              <div
                className="text-sm font-plus-jakarta"
                style={{ color: primaryColor }}
              >
                + One Time Fee : ₹{initialPayment}
              </div>
            )}
          </div>

          {coupons?.length > 0 && (
            <p
              className="font-plus-jakarta text-xs font-medium px-3 py-1 rounded-full border"
              style={{ borderColor: primaryColor, color: primaryColor }}
            >
              {coupons?.length === 1
                ? "1 offer available"
                : `${coupons?.length} offers available`}
            </p>
          )}

          {/* ✅ CTA */}
          {!isLoggedIn ? (
            <Button
              className="group rounded-full font-plus-jakarta font-semibold text-sm cursor-pointer hover:rounded-full"
              style={{
                backgroundColor: primaryColor,
                color: "#fff",
                border: `1px solid ${primaryColor}`,
                transition: "all 0.3s ease",
              }}
              onClick={onStartFlow}
              disabled={isProcessing}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.backgroundColor =
                  secondaryColor;
                (e.currentTarget as HTMLElement).style.color = primaryColor;
                (e.currentTarget as HTMLElement).style.borderColor = primaryColor;
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.backgroundColor =
                  primaryColor;
                (e.currentTarget as HTMLElement).style.color = "#fff";
                (e.currentTarget as HTMLElement).style.borderColor = primaryColor;
              }}
            >
              {ctaText}
            </Button>
          ) : !isSubscribedCommunity ? (
            !isPrivate ? (
              <Dialog>
                <DialogTrigger asChild>
                  <Button
                    className="group rounded-full font-plus-jakarta font-semibold text-sm cursor-pointer transition-all duration-300 hover:rounded-full"
                    style={{
                      backgroundColor: primaryColor,
                      color: "#fff",
                      border: `1px solid transparent`,
                    }}
                  >
                    {ctaText}
                  </Button>
                </DialogTrigger>

                <DialogContent style={{ color: primaryColor }}>
                  <DialogTitle>Join Community</DialogTitle>
                  <DialogDescription
                    className="text-gray-700"
                    style={{ color: neutralColor }}
                  >
                    You're not a member of this community yet. Would you like to
                    join now?
                  </DialogDescription>
                  <div className="mt-4 flex justify-end">
                    <DialogClose asChild>
                      <Button
                        onClick={() => handleClickJoin(communityId)}
                        style={{ backgroundColor: primaryColor, color: "#fff" }}
                      >
                        Confirm Join
                      </Button>
                    </DialogClose>
                  </div>
                </DialogContent>
              </Dialog>
            ) : isRequested ? (
              <div className="mt-4 inline-flex flex-col items-center text-[var(--pri)] gap-2 text-[16px] font-bold">
                <h5>Already Requested</h5>
                <p
                  className="font-normal text-sm text-center"
                  style={{ color: secondaryColor }}
                >
                  * Your request will be sent to the admin. You can proceed with
                  payment once approved.
                </p>
              </div>
            ) : (
              <Dialog>
                <DialogTrigger asChild>
                  <Button
                    className="group rounded-full font-plus-jakarta font-semibold text-sm cursor-pointer transition-all duration-300 hover:rounded-full"
                    style={{
                      backgroundColor: primaryColor,
                      color: "#fff",
                      border: `1px solid transparent`,
                    }}
                  >
                    {ctaText}
                  </Button>
                </DialogTrigger>

                <DialogContent>
                  <DialogTitle style={{ color: primaryColor }}>
                    Send Join Request
                  </DialogTitle>
                  <DialogDescription style={{ color: secondaryColor }}>
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
                      style={{
                        backgroundColor: primaryColor,
                        color: secondaryColor,
                      }}
                      className="cursor-pointer"
                    >
                      Send Request
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            )
          ) : (
            <Button
              className="group rounded-full font-plus-jakarta font-semibold text-sm cursor-pointer hover:rounded-full"
              style={{ backgroundColor: primaryColor, color: "#fff" }}
              onClick={onStartFlow}
              disabled={isProcessing || showSubscribedDisabled}
            >
              {isProcessing ? "Processing..." : ctaText}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default YoganaPlanCard;
