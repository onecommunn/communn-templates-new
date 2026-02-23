"use client";

import { Button } from "@/components/ui/button";
import { TrainingPlan } from "@/models/plan.model";
import { capitalizeWords } from "@/utils/StringFunctions";
import Image from "next/image";
import React, { useEffect, useState } from "react";

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
  plan: TrainingPlan;
  description: string;
  subscribers: { _id?: string; id?: string }[];
  planId: string;
  communityId: string;
  primaryColor: string;
  secondaryColor: string;
  neutralColor: string;
  price: string;
  period: string;
  coverImage: string;
  initialPayment: string | number;
  discountAmount?: string;

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

  // ✅ flow props (ONLY)
  isLoggedIn: boolean;
  isSubscribedCommunity: boolean;
  onStartFlow: () => void;

  // ✅ from hook
  planMeta: PlanMeta;
  isProcessing?: boolean;
}

const YoganaPlanCard = ({
  index,
  title,
  plan,
  description,
  isSubscribedCommunity,
  primaryColor,
  secondaryColor,
  neutralColor,
  price,
  period,
  initialPayment,
  coupons,
  isLoggedIn,
  onStartFlow,
  discountAmount,
  planMeta,
  isProcessing = false,
}: YoganaPlanCardProps) => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  // ✅ Meta-based states
  const isSeq = !!planMeta?.isSequencePlan;
  const isActiveSub = !!planMeta?.isSubscribed && !!planMeta?.isActive;
  const isExpiredSub = !!planMeta?.isSubscribed && !!planMeta?.isExpired;

  // ✅ Hide one-time fee on renewals (if already subscribed)
  const basePrice = Number(price || 0);
  const discountValue = Number(discountAmount ?? 0);
  // ✅ Apply discount ONLY for non-sequence plans
  const hasDiscount = discountValue > 0 && basePrice > 0 && !isSeq;

  const finalRecurringAmount = hasDiscount
    ? Math.max(0, basePrice - discountValue)
    : basePrice;

  const showJoiningFee = Number(initialPayment) > 0 && !planMeta?.isSubscribed;

  // optional: show % off
  const discountPercent = hasDiscount
    ? Math.round((discountValue / basePrice) * 100)
    : 0;
  // ✅ CTA text EXACTLY like Restraint flow intent
  const ctaText = !isLoggedIn
    ? "Login to Subscribe"
    : !isSubscribedCommunity
      ? "Join & Subscribe"
      : isActiveSub
        ? "Subscribed"
        : isExpiredSub
          ? isSeq
            ? "Renew & Pay"
            : "Pay to Renew"
          : "Subscribe";

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
        {/* Background decals */}
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
          {/* Number badge */}
          <div
            style={{
              backgroundImage:
                "url('/assets/yogana-plans-card-bg-image-3.png')",
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

          {/* Price */}
          {/* Price */}
          <div className="flex flex-col items-center gap-2">
            {/* ✅ Discount pill */}
            {Number(plan?.discountAmount) > 0 && (
              <div
                className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-[12px] font-semibold font-plus-jakarta"
                style={{ borderColor: primaryColor, color: primaryColor }}
              >
                <span>
                  Save ₹{Number(plan?.pricing) - Number(plan?.discountAmount)}
                </span>
              </div>
            )}

            <div className="flex items-end justify-center gap-2">
              {/* original price */}
              {Number(plan?.discountAmount) > 0 ? (
                <>
                  <span className="text-[18px] font-bold font-plus-jakarta text-slate-400 line-through">
                    ₹{plan?.pricing}
                  </span>
                  <span
                    className="text-[28px] leading-none font-bold font-plus-jakarta"
                    style={{ color: primaryColor }}
                  >
                    ₹{plan?.discountAmount}
                  </span>
                </>
              ) : (
                <span
                  className="text-[28px] leading-none font-bold font-plus-jakarta"
                  style={{ color: primaryColor }}
                >
                  ₹{plan?.pricing}
                </span>
              )}
              {/* period */}
              <span
                className="text-[16px] font-medium font-plus-jakarta pb-[2px]"
                style={{ color: primaryColor }}
              >
                / {period}
              </span>
            </div>

            {/* ✅ Joining fee only for first-time */}
            {showJoiningFee && (
              <div
                className="text-[12px] font-plus-jakarta font-semibold"
                style={{ color: primaryColor }}
              >
                + Joining fee (one-time): ₹{Number(initialPayment)}
              </div>
            )}
          </div>
          {/* Offers */}
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

          {/* ✅ Single CTA (hook handles everything) */}
          <Button
            className="group rounded-full font-plus-jakarta font-semibold text-sm cursor-pointer hover:rounded-full"
            style={{
              backgroundColor: primaryColor,
              color: "#fff",
              border: `1px solid ${primaryColor}`,
              transition: "all 0.3s ease",
            }}
            onClick={onStartFlow}
            disabled={isProcessing || isActiveSub}
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
            {isProcessing ? "Processing..." : ctaText}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default YoganaPlanCard;
