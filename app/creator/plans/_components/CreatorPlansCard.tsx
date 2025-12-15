"use client";
import { Card, CardFooter, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import React, { useContext, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { AuthContext } from "@/contexts/Auth.context";
import { usePlans } from "@/hooks/usePlan";
import { toast } from "sonner";
import { capitalizeWords } from "@/utils/StringFunctions";
import { LockKeyhole } from "lucide-react";
import { useRequests } from "@/hooks/useRequests";
interface ICreatorPlansCard {
  imageUrl: string;
  title: string;
  description: string;
  price: string;
  period: string;
  planId: string;
  communityId: string;
  isSubscribedCommunity?: boolean;
  fetchPlans?: () => void;
  subscribers: { _id: string }[];
  primaryColor: string;
  secondaryColor: string;
  isPrivate: boolean;
  isRequested: boolean;
  initialPayment: string | number;
  onJoinedCommunity?: () => void;
}

const CreatorPlansCard = ({
  imageUrl,
  title,
  description,
  price,
  period,
  planId,
  communityId,
  isSubscribedCommunity,
  fetchPlans,
  subscribers,
  primaryColor,
  secondaryColor,
  isPrivate,
  isRequested,
  initialPayment,
  onJoinedCommunity,
}: ICreatorPlansCard) => {
  const authContext = useContext(AuthContext);
  const userId = authContext?.user?.id;
  const isLoggedIn = !!userId;
  const { joinToPublicCommunity } = usePlans();
  const [mounted, setMounted] = useState(false);
  const { SendCommunityRequest } = useRequests();

  const isSubscribed =
    isLoggedIn && subscribers?.some((sub) => sub._id === userId);

  const handleClickJoin = async (id: string) => {
    try {
      await joinToPublicCommunity(id);
      if (fetchPlans) {
        fetchPlans();
      }

      onJoinedCommunity?.();
      toast.success("Successfully joined the community");
    } catch (error) {
      console.error("Error joining community:", error);
    }
  };

  const handleClickSendRequest = async (community: string, message: string) => {
    try {
      const formData = new FormData();
      formData.append("community", community);
      // Keeping the existing capitalized key since your backend expects it this way
      formData.append("Message", message || "Request to join the community.");
      const response = await SendCommunityRequest(formData);
      if (response && response.status === 201) {
        fetchPlans?.();
        // toast.success("Request sent to the admin.");
      } else {
        // toast.info("Your request has been recorded.");
      }
    } catch (error) {
      console.error("Error while sending community request:", error);
      toast.error("Could not send the request. Please try again.");
    }
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  if (authContext?.loading || !mounted) return null;
  return (
    <Card
      className="p-0 rounded-xl border-none gap-1"
      style={{ backgroundColor: primaryColor }}
    >
      {/* image */}
      <div className="rounded-xl overflow-hidden">
        <div className="relative aspect-[16/10]">
          <Image
            src={imageUrl || "/assets/creatorCoursesPlaceHolderImage.jpg"}
            alt={title || "Plan Image"}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
            className="object-cover"
            priority
            unoptimized
          />
        </div>
      </div>
      <CardTitle
        style={{ color: secondaryColor }}
        className="text-[#0C0407] font-semibold text-[20px] font-inter px-2 transform-none mt-1 line-clamp-1"
      >
        {capitalizeWords(title)}
      </CardTitle>
      <p
        style={{ color: secondaryColor }}
        className="text-[#333333] text-[16px] px-2 line-clamp-2"
      >
        {description}
      </p>
      <CardFooter className="flex flex-row justify-between items-center p-0 px-2 pb-2 mt-2">
        <div className="flex flex-col">
          <div className="flex items-center" style={{ color: secondaryColor }}>
            <span className="text-[16px] font-semibold mr-1 text-current">
              ₹{price}
            </span>
            <span className="text-[16px] font-semibold text-current">
              / {period}
            </span>
          </div>
          <div className="text-sm">
            {Number(initialPayment) > 0 &&
              ` + One Time Fee :  ₹ ${initialPayment}`}
          </div>
        </div>

        {!isLoggedIn ? (
          <Link href="/login">
            <Button
              style={{
                color: primaryColor,
                backgroundColor: secondaryColor,
              }}
            >
              Login to Subscribe
            </Button>
          </Link>
        ) : !isSubscribedCommunity ? (
          !isPrivate ? (
            <Dialog>
              <DialogTrigger asChild>
                <Button
                  style={{
                    color: primaryColor,
                    backgroundColor: secondaryColor,
                  }}
                >
                  Join Community
                </Button>
              </DialogTrigger>
              <DialogContent
                style={{ backgroundColor: primaryColor, color: secondaryColor }}
              >
                <DialogTitle>Join Community</DialogTitle>
                <DialogDescription
                  className="text-gray-700"
                  style={{ color: secondaryColor }}
                >
                  You're not a member of this community yet. Would you like to
                  join now?
                </DialogDescription>
                <div className="mt-4 flex justify-end">
                  <DialogClose asChild>
                    <Button
                      onClick={() => handleClickJoin(communityId)}
                      disabled={isSubscribed}
                      style={{
                        backgroundColor: secondaryColor,
                        color: primaryColor,
                      }}
                    >
                      Confirm Join
                    </Button>
                  </DialogClose>
                </div>
              </DialogContent>
            </Dialog>
          ) : isRequested ? (
            <div className="mt-4 inline-flex flex-col text-[var(--pri)] gap-2 text-[16px] font-bold pr-3">
              <h5>Already Requested</h5>
            </div>
          ) : (
            <Dialog>
              <DialogTrigger asChild>
                <Button
                  className="flex items-center"
                  style={{
                    color: primaryColor,
                    backgroundColor: secondaryColor,
                  }}
                >
                  <LockKeyhole size={20} strokeWidth={1.5} />
                  Send Join Request
                </Button>
              </DialogTrigger>
              <DialogContent
                style={{ backgroundColor: primaryColor, color: secondaryColor }}
              >
                <DialogTitle> Send Join Request</DialogTitle>
                <DialogDescription
                  className="text-gray-700"
                  style={{ color: secondaryColor }}
                >
                  This is a private community. Your request will be sent to the
                  admin. You can proceed with payment once approved.
                </DialogDescription>
                <div className="mt-4 flex justify-end">
                  <Button
                    onClick={() =>
                      handleClickSendRequest(
                        communityId,
                        "Request to join the community."
                      )
                    }
                    disabled={isSubscribed}
                    style={{
                      backgroundColor: secondaryColor,
                      color: primaryColor,
                    }}
                  >
                    Send Request
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          )
        ) : (
          <Link
            href={`/subscriptions/?planid=${planId}&communityid=${communityId}`}
          >
            <Button
              variant={isSubscribed ? "outline" : "default"}
              className={`w-full py-3 cursor-pointer rounded-md`}
              style={{
                color: isSubscribed ? secondaryColor : primaryColor,
                backgroundColor: isSubscribed ? primaryColor : secondaryColor,
                borderColor: isSubscribed ? secondaryColor : "",
              }}
            >
              {isSubscribed ? "Subscribed" : "Subscribe"}
            </Button>
          </Link>
        )}
      </CardFooter>
    </Card>
  );
};

export default CreatorPlansCard;
