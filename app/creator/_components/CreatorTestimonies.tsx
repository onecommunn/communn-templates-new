import CreatorSectionHeader from "@/components/CustomComponents/Creator/CreatorSectionHeader";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  CardFooter,
  Card,
  CardContent,
  CardHeader,
} from "@/components/ui/card";
import React from "react";

interface IReview {
  starsCount: number;
  userName: string;
  role: string;
  review: string;
  profile: string;
}

const data: IReview[] = [
  {
    starsCount: 5,
    userName: "Cora Stiedemann",
    role: "Customer Integration ",
    review: `The courses on Learly are incredible. I learned digital marketing from scratch and landed a job in just three months. The instructors are amazing, and the platform is so easy to use. Truly life-changing!`,
    profile: "/assets/userProfile1.png",
  },
  {
    starsCount: 5,
    userName: "Cora Stiedemann",
    role: "Customer Integration",
    review: `Edupro’s UX/UI bootcamp gave me
the tools and knowledge to feel
confident diving into the world of UX.`,
    profile: "/assets/userProfile1.png",
  },
  {
    starsCount: 5,
    userName: `Luz Medhurst`,
    role: "Principal Program Designer",
    review: `The courses on Learly are incredible.
I learned digital marketing from
scratch and landed a job in just three
months. The instructors are amazing,
and the platform is so easy to use.
Truly life-changing!`,
    profile: "/assets/userProfile1.png",
  },
  {
    starsCount: 5,
    userName: `Leland Kshlerin III`,
    role: "Chief Marketing Consultant",
    review: `Edupro’s UX/UI bootcamp gave me
the tools and knowledge to feel
confident diving into the world of UX.`,
    profile: "/assets/userProfile1.png",
  },
  {
    starsCount: 5,
    userName: `Casey Wisoky`,
    role: "Future Infrastructure Manager",
    review: `The courses on Learly are incredible.
I learned digital marketing from
scratch and landed a job in just three
months. The instructors are amazing,
and the platform is so easy to use.
Truly life-changing!`,
    profile: "/assets/userProfile1.png",
  },
  {
    starsCount: 5,
    userName: `Francisco Wolf`,
    role: "Forward Intranet Strategist",
    review: `The courses on Learly are incredible.
I learned digital marketing from
scratch and landed a job in just three
months. The instructors are amazing,
and the platform is so easy to use.
Truly life-changing!`,
    profile: "/assets/userProfile1.png",
  },
  {
    starsCount: 5,
    userName: `Dr. Erik Collins`,
    role: "Legacy Markets Agent",
    review: `The courses on Learly are incredible.
I learned digital marketing from
scratch and landed a job in just three
months. The instructors are amazing,
and the platform is so easy to use.
Truly life-changing!`,
    profile: "/assets/userProfile1.png",
  },
  {
    starsCount: 5,
    userName: `Erick Gutmann`,
    role: "Senior Configuration Manager",
    review: `The courses on Learly are incredible.
I learned digital marketing from
scratch and landed a job in just three
months. The instructors are amazing,
and the platform is so easy to use.
Truly life-changing!`,
    profile: "/assets/userProfile1.png",
  },
  {
    starsCount: 5,
    userName: `Wendy Quitzon`,
    role: "Customer Metrics Technician",
    review: `Edupro’s UX/UI bootcamp gave me
the tools and knowledge to feel
confident diving into the world of UX.`,
    profile: "/assets/userProfile1.png",
  },
];

const CreatorTestimonies = () => {
  return (
    <section className="py-10 font-inter">
      <div className="container mx-auto px-4 sm:px-6 lg:px-20">
        <CreatorSectionHeader
          title="Success Stories"
          description="Real transformations from real people who've taken action on their
            growth journey."
        />

        <div className="columns-1 md:columns-2 xl:columns-3 gap-4">
          {data.map((each, idx) => (
            <Card className="mb-4 gap-1" key={idx}>
              <CardHeader className="gap-2">
                <div className="flex flex-row items-center gap-1">
                  {[...Array(each.starsCount)].map((_, i) => (
                    <span key={i} className="text-black text-2xl">
                      ★
                    </span>
                  ))}
                </div>
              </CardHeader>
              <CardContent>
                <p className="font-inter text-[16px] md:text-lg">{`"${each.review}"`}</p>
              </CardContent>
              <CardFooter className="mt-2">
                <div className="flex flex-row items-center gap-2">
                  <Avatar className="w-10 h-10">
                    <AvatarImage src={each.profile} />
                    <AvatarFallback>{each.userName[0]}</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col">
                    <p className="text-sm text-black font-inter font-medium">
                      {each.userName}
                    </p>
                    <p className="text-xs text-black font-inter">{each.role}</p>
                  </div>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CreatorTestimonies;
