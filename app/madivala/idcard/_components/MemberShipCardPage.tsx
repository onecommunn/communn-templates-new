"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { toast } from "sonner";
import { fetchUserDatabyId } from "@/services/Madivala/Madivala.service";
import { Skeleton } from "@/components/ui/skeleton";
import IdCardUI from "../../_components/IdCardUI";

// Optional: simple skeleton placeholder
const CardSkeleton = () => {
  return <Skeleton className="w-full h-[90dvh]" />;
};

type ApiState = "idle" | "loading" | "success" | "not_found" | "error";

const FALLBACK_IMAGE =
  "https://upload-community-files-new.s3.ap-south-1.amazonaws.com/95eacd45-1680-493c-bd7a-32feb5afb50d.png";

const MemberShipCardPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const userId = searchParams.get("id");

  const [status, setStatus] = useState<ApiState>("idle");
  const [userData, setUserData] = useState<any>(null);

  const fetchData = useCallback(async () => {
    if (!userId) return;

    setStatus("loading");
    try {
      const res = await fetchUserDatabyId(userId);

      const apiUser = res?.data?.data;

      if (res?.status === 200 && apiUser) {
        setUserData(apiUser);
        setStatus("success");
        return;
      }

      // Not found case
      setUserData(null);
      setStatus("not_found");
      toast.error("User Data Not Found");
    } catch (err) {
      console.error(err);
      setUserData(null);
      setStatus("error");
      toast.error("Failed to fetch user data");
    }
  }, [userId]);

  useEffect(() => {
    if (!userId) {
      setStatus("not_found");
      toast.error("Missing user id in URL");
      return;
    }
    fetchData();
  }, [userId, fetchData]);

  const cardData = useMemo(() => {
    const pm = userData?.primaryMember;

    return {
      name: pm?.name ?? "-",
      role: pm?.isPrimary ? "Owner" : "Member",
      idNumber: pm?._id ?? "-",
      dob: pm?.dateOfBirth ?? "-",
      city: pm?.city ?? "-",
      phone: pm?.mobileNumber ?? "-",
      email: pm?.emailId ?? "-",
      caste: pm?.caste ?? "-",
      subCaste: pm?.subCaste ?? "-",
      image: pm?.profileImage || FALLBACK_IMAGE,
    };
  }, [userData]);

  return (
    <>
      {status === "loading" && <CardSkeleton />}

      {(status === "not_found") && (
        <div className="mx-auto max-w-xl my-20 rounded-2xl border border-gray-200 bg-white p-5 text-center shadow-sm">
          <div className="text-base font-semibold text-gray-900">
            User not found
          </div>
          <div className="mt-1 text-sm text-gray-600">
            Please check the link or try again.
          </div>

          <div className="mt-4 flex items-center justify-center gap-2">
            <button
              onClick={() => router.back()}
              className="rounded-lg border px-4 py-2 text-sm font-medium hover:bg-gray-50"
            >
              Go Back
            </button>
            <button
              onClick={fetchData}
              disabled={!userId}
              className="rounded-lg bg-black px-4 py-2 text-sm font-medium text-white hover:opacity-90 disabled:opacity-50"
            >
              Try Again
            </button>
          </div>
        </div>
      )}

      {(status === "error") && (
        <div className="mx-auto max-w-xl my-20 rounded-2xl border border-red-200 bg-white p-5 text-center shadow-sm">
          <div className="text-base font-semibold text-red-700">
            Something went wrong
          </div>
          <div className="mt-1 text-sm text-gray-600">
            We couldn’t load the membership card. Please retry.
          </div>

          <div className="mt-4">
            <button
              onClick={fetchData}
              disabled={!userId}
              className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:opacity-90 disabled:opacity-50"
            >
              Retry
            </button>
          </div>
        </div>
      )}

      {status === "success" && (
        <IdCardUI primaryColor="#1F514C" data={cardData} />
      )}
    </>
  );
};

export default MemberShipCardPage;
