"use client";
import { AuthContext } from "@/contexts/Auth.context";
import { useCommunity } from "@/hooks/useCommunity";
import { usePlans } from "@/hooks/usePlan";
import { Event } from "@/models/event.model";
import { getEvents } from "@/services/eventService";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowRight, UserRoundCog } from "lucide-react";
import Image from "next/image";
import React, { useId } from "react";
import { toast } from "sonner";

/* ----------------------- Reusable Pieces ---------------------- */
function TopMeta({ by }: { by?: string }) {
  if (!by) return null;
  return (
    <div className="flex items-center text-muted-foreground text-sm">
      <span className="inline-flex items-center gap-2">
        <UserRoundCog size={18} />
        By {by}
      </span>
    </div>
  );
}

function IconRow({ meta }: { meta?: Item["meta"] }) {
  if (!meta?.length) return null;
  return (
    <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
      {meta.map((m, i) => (
        <div key={i} className="inline-flex items-center gap-1.5">
          {m.icon}
          <span>{m.text}</span>
        </div>
      ))}
    </div>
  );
}

/* -------------------------- Card UI -------------------------- */

function CatalogCard({ item }: { item: Item }) {
  const hasImage = Boolean(item.image);

  return (
    <Card className="relative rounded-xl mb-4 break-inside-avoid overflow-hidden border flex-1 pt-0">
      {/* {hasImage && ( */}
      <div className="m-1 rounded-xl overflow-hidden border bg-muted">
        <div className="relative aspect-[16/9]">
          <Image
            src={item.image || "/assets/creatorCoursesPlaceHolderImage.jpg"}
            alt={item.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
            className="object-cover"
            priority
            unoptimized
          />
        </div>
      </div>
      {/* )} */}

      <CardHeader className="gap-2">
        {item.by && (
          <div className="flex items-start justify-between">
            <TopMeta by={item.by} />
          </div>
        )}

        {item.meta && (
          <div className="mb-3">
            <IconRow meta={item.meta} />
          </div>
        )}

        <CardTitle className="text-xl">{item.title}</CardTitle>
        <CardDescription className="flex-1 line-clamp-3">
          {item.description}
        </CardDescription>
      </CardHeader>

      <CardFooter className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="text-base font-semibold">
            {item.priceLabel ?? ""}
          </span>
          {/* {item.priceStrike && (
            <span className="text-sm text-muted-foreground line-through">
              {item.priceStrike}
            </span>
          )} */}
        </div>

        <Button
          variant={kindToCTAVariant[item.kind]}
          className="shrink-0 cursor-pointer"
        >
          {item.cta}{" "}
          <span>
            <ArrowRight />
          </span>
        </Button>
      </CardFooter>
    </Card>
  );
}

type ItemKind = "event" | "plan";
const kindToCTAVariant: Record<ItemKind, "default" | "secondary" | "outline"> =
  {
    event: "default",
    plan: "default",
  };

type Item = {
  id: string;
  kind: ItemKind;
  title: string;
  by?: string;
  priceLabel?: string;
  priceStrike?: string;
  cta: string;
  description: string;
  image?: string;
  meta?: Array<{ icon: React.ReactNode; text: string }>;
  chips?: string[];
};

const TABS: Array<{ key: "all" | ItemKind; label: string }> = [
  { key: "all", label: "All" },
  { key: "event", label: "Events" },
  { key: "plan", label: "Plans" },
];

const CatalogGrid = () => {
  const { communityId } = useCommunity();
  const [items, setItems] = React.useState<Item[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [active, setActive] =
    React.useState<(typeof TABS)[number]["key"]>("all");
  const { getPlansList, getCommunityPlansListAuth } = usePlans();
  const authContext = React.useContext(AuthContext);
  const isAuthenticated = authContext?.isAuthenticated;
  const tabId = useId();

  React.useEffect(() => {
    if (!communityId) return;

    const fetchData = async () => {
      try {
        setLoading(true);

        /* 🔹 Fetch Events */
        const evRes: any = await getEvents(communityId);
        const evItems: Item[] = (evRes?.events || [])
          .slice(0, 3)
          .map((e: Event) => ({
            id: e._id,
            kind: "event",
            title: e.title,
            description: e.description,
            priceLabel: e.isPaidService ? `₹${e.pricing}` : "Free",
            cta: "Register",
            image: e.coverImage?.value,
            chips: ["Event"],
          }));

        /* 🔹 Fetch Plans (auth or guest) */
        let plRes:
          | Awaited<ReturnType<typeof getPlansList>>
          | Awaited<ReturnType<typeof getCommunityPlansListAuth>>;

        if (isAuthenticated) {
          plRes = await getCommunityPlansListAuth(communityId);
        } else {
          plRes = await getPlansList(communityId);
        }

        let plItems: Item[] = [];

        // Case: array of plans
        if (Array.isArray(plRes)) {
          plItems = plRes.slice(0, 3).map((p) => ({
            id: p._id,
            kind: "plan",
            title: p.name,
            description: p.description,
            priceLabel: p.pricing ? `₹${p.pricing}` : "Free",
            priceStrike: p.offerValue ? `₹${p.totalPlanValue}` : undefined,
            cta: p.isUserSubscribed ? "Subscribed" : "Subscribe",
            image: p.image?.value,
            chips: ["Plan"],
          }));
        }
        // Case: object with myPlans
        else if (plRes && "myPlans" in plRes) {
          plItems = plRes.myPlans.slice(0, 3).map((p) => ({
            id: p._id,
            kind: "plan",
            title: p.name,
            description: p.description,
            priceLabel: p.pricing ? `₹${p.pricing}` : "Free",
            priceStrike: p.offerValue ? `₹${p.totalPlanValue}` : undefined,
            cta: p.isUserSubscribed ? "Subscribed" : "Subscribe",
            image: p.image?.value,
            chips: ["Plan"],
          }));
        }

        setItems([...evItems, ...plItems]);
      } catch (err) {
        toast.error("❌ Failed to fetch catalog data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [communityId, isAuthenticated]);
  return (
    <section className="mx-auto">
      <Tabs
        value={active}
        onValueChange={(v) => setActive(v as any)}
        className="w-full items-center"
      >
        {/* Filter pills */}
        <TabsList className="md:md-6 mb-12 flex h-10 w-fit flex-wrap gap-2 rounded-full bg-muted p-1">
          {TABS.map((t) => (
            <TabsTrigger
              key={t.key}
              value={t.key}
              id={`${tabId}-${t.label}`}
              aria-controls={`${tabId}-${t.label}`}
              className="cursor-pointer rounded-full px-4 data-[state=active]:bg-[#0C0407] data-[state=active]:text-white"
            >
              {t.label}
            </TabsTrigger>
          ))}
        </TabsList>

        {TABS.map((t) => {
          const itemsForTab =
            t.key === "all" ? items : items.filter((i) => i.kind === t.key);

          return (
            <TabsContent key={t.key} value={t.key} className="m-0 w-full">
              {loading ? (
                <p className="text-center text-muted-foreground">Loading...</p>
              ) : (
                <>
                  <div
                    className={`${"grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 w-full"}`}
                  >
                    {itemsForTab.map((item) => (
                      <CatalogCard key={item.id} item={item} />
                    ))}
                  </div>
                </>
              )}
            </TabsContent>
          );
        })}
      </Tabs>
    </section>
  );
};

export default CatalogGrid;
