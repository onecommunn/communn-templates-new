"use client";

import { Button } from "@/components/ui/button";
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
  const showOneTimeFee = Number(initialPayment) > 0 && !planMeta?.isSubscribed;

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

          {/* Price */}
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
              (e.currentTarget as HTMLElement).style.backgroundColor = secondaryColor;
              (e.currentTarget as HTMLElement).style.color = primaryColor;
              (e.currentTarget as HTMLElement).style.borderColor = primaryColor;
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.backgroundColor = primaryColor;
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
