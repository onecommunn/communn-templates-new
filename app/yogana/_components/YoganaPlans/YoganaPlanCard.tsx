"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { capitalizeWords } from "@/components/utils/StringFunctions";
import { AuthContext } from "@/contexts/Auth.context";
import { usePlans } from "@/hooks/usePlan";
import { useRequests } from "@/hooks/useRequests";
import Image from "next/image";
import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";
import { toast } from "sonner";

interface YoganaPlanCardProps {
  index: number;
  title: string;
  description: string;
  subscribers: { _id: string }[];
  fetchPlans?: () => void;
  isSubscribedCommunity?: boolean;
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
}: YoganaPlanCardProps) => {
  const authContext = useContext(AuthContext);
  const userId = authContext?.user?.id;
  const isLoggedIn = !!userId;
  const { joinToPublicCommunity } = usePlans();
  const [mounted, setMounted] = useState(false);
  const { SendCommunityRequest } = useRequests();

  console.log(coverImage, "coverImage");

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

  const isSubscribed =
    isLoggedIn && subscribers?.some((sub) => sub._id === userId);

  useEffect(() => {
    setMounted(true);
  }, []);

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

  if (authContext?.loading || !mounted) return null;
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
            alt="yogana-plans-card-bg-image-1"
            width={157}
            height={74}
            className="absolute bottom-0 right-0"
            unoptimized
          />
        </div>
        <div
          style={{
            borderColor: primaryColor,
          }}
          className={`z-10 h-full border gap-6 border-dashed border-[#C2A74E] rounded-[30px] py-10 px-6 flex flex-col items-center justify-center`}
        >
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

          {/* <div className="relative aspect-[13/16] rounded-2xl overflow-hidden">
            <Image
              src={
                coverImage ||
                "/assets/yogona-hero-image.jpg"
              }
              alt={title || "Plan Image"}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
              sizes="(max-width:768px) 100vw, (max-width:1280px) 33vw, 33vw"
              priority
              unoptimized
            />s
          </div> */}
          <h4
            style={{
              color: primaryColor,
            }}
            className={`text-[#C2A74E] font-cormorant font-semibold text-2xl text-center w-full`}
          >
            {capitalizeWords(title)}
          </h4>

          <p
            style={{
              color: neutralColor,
            }}
            className={`font-plus-jakarta text-sm text-center w-full text-[#000] line-clamp-5`}
          >
            {description}
          </p>
          <div className="flex items-baseline space-x-2">
            <span
              className="text-lg font-bold text-[#C2A74E] font-plus-jakarta"
              style={{ color: primaryColor }}
            >
              ₹{price}
            </span>
            <span
              className="text-lg font-medium text-[#C2A74E] font-plus-jakarta"
              style={{ color: primaryColor }}
            >
              / {period}
            </span>
          </div>

          {!isLoggedIn ? (
            <Link href="/login">
              <Button
                variant="ghost"
                className="group rounded-full font-plus-jakarta font-semibold text-sm cursor-pointer hover:rounded-full"
                style={{
                  backgroundColor: primaryColor, // button background
                  color: "#fff", // button text
                  border: `1px solid ${primaryColor}`, // optional: border same as primary
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.backgroundColor =
                    secondaryColor;
                  (e.currentTarget as HTMLElement).style.color = primaryColor;
                  (e.currentTarget as HTMLElement).style.borderColor =
                    primaryColor;
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.backgroundColor =
                    primaryColor;
                  (e.currentTarget as HTMLElement).style.color = "#fff";
                  (e.currentTarget as HTMLElement).style.borderColor =
                    primaryColor;
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
                    className="group rounded-full font-plus-jakarta font-semibold text-sm cursor-pointer transition-all duration-300 hover:rounded-full"
                    style={{
                      backgroundColor: primaryColor,
                      color: "#fff",
                      border: `1px solid transparent`,
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.backgroundColor =
                        "transparent";
                      (e.currentTarget as HTMLElement).style.color =
                        primaryColor;
                      (e.currentTarget as HTMLElement).style.borderColor =
                        primaryColor;
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.backgroundColor =
                        primaryColor;
                      (e.currentTarget as HTMLElement).style.color = "#fff";
                      (e.currentTarget as HTMLElement).style.borderColor =
                        "transparent";
                    }}
                  >
                    Join Community
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
                    <Button
                      onClick={() => handleClickJoin(communityId)}
                      disabled={isSubscribed}
                      className={`bg-[${primaryColor}] text-white cursor-pointer`}
                      style={{
                        backgroundColor: primaryColor,
                      }}
                    >
                      Confirm Join
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            ) : isRequested ? (
              <div className="mt-4 inline-flex flex-col items-center text-[var(--pri)] gap-2 text-[16px] font-bold">
                <h5>Already Requested</h5>
                <p className="font-normal text-sm text-center text-[var(--sec)]">
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
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.backgroundColor =
                        "transparent";
                      (e.currentTarget as HTMLElement).style.color =
                        primaryColor;
                      (e.currentTarget as HTMLElement).style.borderColor =
                        primaryColor;
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.backgroundColor =
                        primaryColor;
                      (e.currentTarget as HTMLElement).style.color = "#fff";
                      (e.currentTarget as HTMLElement).style.borderColor =
                        "transparent";
                    }}
                  >
                    Send Join Request
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
                      disabled={isSubscribed}
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
            <Link
              href={`/subscriptions/?planid=${planId}&communityid=${communityId}&image=${coverImage}`}
            >
              <Button
                variant={isSubscribed ? "outline" : "ghost"}
                className={`group text-[${primaryColor}] text-white font-plus-jakarta font-semibold text-sm cursor-pointer hover:bg-[${primaryColor}] hover:text-white hover:rounded-full`}
                style={{
                  backgroundColor: primaryColor,
                }}
              >
                {isSubscribed ? "Subscribed" : "Subscribe"}
              </Button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default YoganaPlanCard;
