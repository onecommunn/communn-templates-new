import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import type { CTASection } from "@/models/templates/creator/creator-home.model";
import { ArrowRight } from "lucide-react";

type Props = { data: CTASection };

const isInternal = (url: string) => url.startsWith("/");

const CreatorCTA: React.FC<Props> = ({ data }) => {
  const title = data.title ?? "Stay Inspired";
  const description =
    data.description ??
    "Get weekly insights, tips, and exclusive content delivered to your inbox.";

  const buttons =
    data.buttons?.filter((b) => b?.label?.trim() && b?.url?.trim()) ?? [];

  return (
    <section className="py-10 font-inter">
      <div className="container mx-auto px-4 sm:px-6 lg:px-20">
        <div className="bg-[#0C0407] text-white rounded-[20px] p-10 md:p-16 flex flex-col md:flex-row justify-center md:justify-between items-center gap-6">
          <div className="flex flex-col gap-2">
            <h3 className="font-poppins font-semibold md:text-5xl text-3xl text-center md:text-left">
              {title}
            </h3>
            {description && (
              <p className="text-[16px] max-w-2xl text-center md:text-left">
                {description}
              </p>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {buttons.length > 0 ? (
              buttons.map((btn, idx) =>
                isInternal(btn.url) ? (
                  <Link key={`${btn.label}-${idx}`} href={btn.url} aria-label={btn.label}>
                    <Button variant="secondary" className="cursor-pointer inline-flex items-center gap-2">
                      {btn.label}
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                ) : (
                  <a
                    key={`${btn.label}-${idx}`}
                    href={btn.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={btn.label}
                  >
                    <Button variant="secondary" className="cursor-pointer inline-flex items-center gap-2">
                      {btn.label}
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </a>
                )
              )
            ) : (
              // Fallback CTA if no buttons provided
              <Link href="/" aria-label="Explore All Activities">
                <Button variant="secondary" className="cursor-pointer inline-flex items-center gap-2">
                  Explore All Activities
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CreatorCTA;
