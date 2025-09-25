import React from "react";
import CreatorSectionHeader from "@/components/CustomComponents/Creator/CreatorSectionHeader";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import type { TestimoniesSection } from "@/models/templates/creator/creator-home.model";

type Props = { data: TestimoniesSection };

const Stars: React.FC<{ count: number }> = ({ count }) => {
  const n = Number.isFinite(count) ? Math.max(0, Math.min(5, Math.floor(count))) : 0;
  return (
    <div className="flex flex-row items-center gap-0.5" aria-label={`${n} out of 5 stars`}>
      {Array.from({ length: n }).map((_, i) => (
        <span key={i} className="text-black text-xl leading-none" aria-hidden>
          ★
        </span>
      ))}
      {Array.from({ length: 5 - n }).map((_, i) => (
        <span key={`e-${i}`} className="text-gray-300 text-xl leading-none" aria-hidden>
          ★
        </span>
      ))}
    </div>
  );
};

const initialsOf = (name?: string) =>
  (name ?? "")
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((s) => s[0]?.toUpperCase() ?? "")
    .join("") || "U";

const CreatorTestimonies: React.FC<Props> = ({ data }) => {
  const title = data.heading || "Success Stories";
  const description =
    data.subHeading ||
    "Real transformations from real people who've taken action on their growth journey.";

  const testimonials = data.testimonies ?? [];

  return (
    <section className="py-10 font-inter">
      <div className="container mx-auto px-4 sm:px-6 lg:px-20">
        <CreatorSectionHeader title={title} description={description} />

        {testimonials.length === 0 ? (
          <p className="text-center text-sm text-gray-500">No testimonials yet.</p>
        ) : (
          <div className="columns-1 md:columns-2 xl:columns-3 gap-4">
            {testimonials.map((t, idx) => {
              const name = t.name?.trim() || "Anonymous";
              const role = t.designation?.trim() || "Member";
              const avatar = t.avatar || "/assets/userProfile1.png";
              const review = (t.message || "").trim();

              return (
                <Card className="mb-4 break-inside-avoid" key={`${name}-${idx}`}>
                  <CardHeader className="gap-2">
                    <Stars count={t.rating ?? 0} />
                  </CardHeader>

                  <CardContent>
                    {/* preserve line breaks from CMS */}
                    <p className="font-inter text-[16px] md:text-lg whitespace-pre-line">
                      “{review}”
                    </p>
                  </CardContent>

                  <CardFooter className="mt-2">
                    <div className="flex flex-row items-center gap-2">
                      <Avatar className="w-10 h-10">
                        <AvatarImage src={avatar} alt={`${name} avatar`} />
                        <AvatarFallback>{initialsOf(name)}</AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col">
                        <p className="text-sm text-black font-inter font-medium">{name}</p>
                        <p className="text-xs text-black/80 font-inter">{role}</p>
                      </div>
                    </div>
                  </CardFooter>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};

export default CreatorTestimonies;
