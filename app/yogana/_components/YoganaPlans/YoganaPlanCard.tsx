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
import { ArrowRight } from "lucide-react";
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
}: YoganaPlanCardProps) => {
  const authContext = useContext(AuthContext);
  const userId = authContext?.user?.id;
  const isLoggedIn = !!userId;
  const { joinToPublicCommunity } = usePlans();
  const [mounted, setMounted] = useState(false);

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

  if (authContext?.loading || !mounted) return null;
  return (
    <div className="h-full">
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
          className={`z-10 h-full border gap-6 border-dashed border-[${primaryColor}] rounded-[30px] py-10 px-6 flex flex-col items-center justify-center`}
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
            <p className="font-cormorant font-semibold text-[40px] pr-4">
              {index}
            </p>
          </div>
          <h4
            className={`text-[${primaryColor}] font-cormorant font-semibold text-3xl text-center w-full`}
          >
            {capitalizeWords(title)}
          </h4>
          <p
            className={`font-plus-jakarta text-md text-center w-full text-[${secondaryColor}] line-clamp-5`}
          >
            {description}
          </p>
          {!isLoggedIn ? (
            <Link href="/login">
              <Button
                variant="ghost"
                className={`group hover:text-[${primaryColor}] border border-transparent hover:border-[${primaryColor}] rounded-full font-plus-jakarta font-semibold text-sm cursor-pointer bg-[${primaryColor}] text-white hover:rounded-full`}
              >
                Login to Subscribe
              </Button>
            </Link>
          ) : !isSubscribedCommunity ? (
            <Dialog>
              <DialogTrigger asChild>
                <Button className={`group hover:text-[${primaryColor}] border border-transparent hover:border-[${primaryColor}] rounded-full font-plus-jakarta font-semibold text-sm cursor-pointer bg-[${primaryColor}] text-white hover:rounded-full`}>
                  Join Community
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogTitle>Join Community</DialogTitle>
                <DialogDescription className="text-gray-700">
                  You're not a member of this community yet. Would you like to
                  join now?
                </DialogDescription>
                <div className="mt-4 flex justify-end">
                  <Button
                    onClick={() => handleClickJoin(communityId)}
                    disabled={isSubscribed}
                    className={`bg-[${primaryColor}] text-white cursor-pointer`}
                  >
                    Confirm Join
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          ) : (
            <Link
              href={`/subscriptions/?planid=${planId}&communityid=${communityId}`}
            >
              <Button
                variant={isSubscribed ? "outline" : "ghost"}
                className={`group text-[${primaryColor}] font-plus-jakarta font-semibold text-sm cursor-pointer hover:bg-[${primaryColor}] hover:text-white hover:rounded-full`}
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
