// template-meta.ts (SERVER FILE)
import type { Metadata } from "next";
import type { Community } from "./services/communityService";

type MetaFn = (args: { community: Community }) => Promise<Metadata> | Metadata;

export const templatePageMeta: Record<
  string, // template key
  Record<string, MetaFn> // path -> meta builder
> = {
  creator: {
    "/": async ({ community }) => ({
      title: `${community.name} - Home`,
      description: `${community.description}`,
      alternates: { canonical: "/" },
    }),
    "/about": async ({ community }) => ({
      title: `${community.name} - About`,
      description: `About us ${community.name}`,
      alternates: { canonical: "/about" },
    }),
    "/events": ({ community }) => ({
      title: `${community.name} - Events`,
      description: "Upcoming and past events",
      alternates: { canonical: "/events" },
    }),
    "/contact": ({ community }) => ({
      title: `${community.name} - Contact`,
      description: "Get in touch",
      alternates: { canonical: "/contact" },
    }),
    "/plans": ({ community }) => ({
      title: `${community.name} - Plans`,
      description: "Membership plans",
      alternates: { canonical: "/plans" },
    }),
    "/event-details": ({ community }) => ({
      title: `${community.name} - Event`,
      description: "Event details",
      alternates: { canonical: "/event-details" },
    }),
    "/login": ({ community }) => ({
      title: `${community.name} - Login`,
      alternates: { canonical: "/login" },
    }),
    "/subscriptions": ({ community }) => ({
      title: `${community.name} - Subscriptions`,
      alternates: { canonical: "/subscriptions" },
    }),
    // add the rest...
  },

  default: {
    "/": ({ community }) => ({
      title: community?.name || "Home",
      description: community?.description || "",
      alternates: { canonical: "/" },
    }),
  },

  yogana: {
    "/": ({ community }) => ({
      title: `${community?.name || "Yogana"}`,
      description: "Yoga programs, events, and community.",
      alternates: { canonical: "/" },
      openGraph: {
        title: community?.name || "Yogana",
        description: "Yoga programs, events, and community.",
      },
    }),
    "/event-details": ({ community }) => ({
      title: `${community.name} - Event`,
      description: "Event details",
      alternates: { canonical: "/event-details" },
    }),
    "/login": () => ({ title: "Login", alternates: { canonical: "/login" } }),
    "/subscriptions": ({ community }) => ({
      title: `${community.name} - Subscriptions`,
      alternates: { canonical: "/subscriptions" },
    }),
  },
};
