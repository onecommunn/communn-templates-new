"use client";
import { Card, CardFooter, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import React, { useContext, useEffect, useState } from "react";
import { capitalizeWords } from "./CreatorPlansSection";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { AuthContext } from "@/contexts/Auth.context";
import { usePlans } from "@/hooks/usePlan";
import { toast } from "sonner";
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
}: ICreatorPlansCard) => {
  const authContext = useContext(AuthContext);
  const userId = authContext?.user?.id;
  const isLoggedIn = !!userId;
  const { joinToPublicCommunity } = usePlans();
  const [mounted, setMounted] = useState(false);

  const isSubscribed =
    isLoggedIn && subscribers?.some((sub) => sub._id === userId);

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

  useEffect(() => {
    setMounted(true);
  }, []);

  if (authContext?.loading || !mounted) return null;
  return (
    <Card className="p-0 rounded-xl border-none gap-1 shadow-none">
      {/* image */}
      <div className="rounded-xl overflow-hidden">
        <div className="relative aspect-[16/10]">
          <Image
            src={imageUrl || "/assets/creatorCoursesPlaceHolderImage.jpg"}
            alt={title || "Plan Image"}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
            className="object-cover"
            priority={false}
          />
        </div>
      </div>
      <CardTitle className="text-[#0C0407] font-semibold text-[20px] font-inter px-2 transform-none mt-1 line-clamp-1">
        {capitalizeWords(title)}
      </CardTitle>
      <p className="text-[#333333] text-[16px] px-2 line-clamp-2">
        {description}
      </p>
      <CardFooter className="flex flex-row justify-between items-center p-0 px-2 pb-2 mt-2">
        <div className="flex items-center">
          <span className="text-[16px] font-semibold mr-1">₹{price}</span>
          <span className="text-[16px] font-semibold">/ {period}</span>
        </div>
        {!isLoggedIn ? (
          <Link href="/login">
            <Button>Login to Subscribe</Button>
          </Link>
        ) : !isSubscribedCommunity ? (
          <Dialog>
            <DialogTrigger asChild>
              <Button>Join Community</Button>
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
                >
                  Confirm Join
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        ) : (
          <Link
            href={`/subscriptions/?planid=${planId}&communityid=${communityId}&image=${imageUrl}`}
          >
            <Button variant={isSubscribed ? 'outline' : 'default'} className={`w-full py-3 cursor-pointer rounded-md`}>
              {isSubscribed ? "Subscribed" : "Subscribe"}
            </Button>
          </Link>
        )}
      </CardFooter>
    </Card>
  );
};

export default CreatorPlansCard;
