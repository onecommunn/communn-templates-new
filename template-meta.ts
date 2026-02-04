// template-meta.ts (SERVER FILE)
import type { Metadata } from "next";
import type { Community } from "./services/communityService";

type MetaFn = (args: { community: Community }) => Promise<Metadata> | Metadata;

export function getFaviconMeta(logo?: string) {
  if (!logo) return undefined;

  const ext = logo.split(".").pop()?.toLowerCase();

  const typeMap: Record<string, string> = {
    png: "image/png",
    jpg: "image/jpeg",
    jpeg: "image/jpeg",
    svg: "image/svg+xml",
    webp: "image/webp",
    ico: "image/x-icon",
  };

  return {
    icon: [
      {
        url: logo,
        type: typeMap[ext ?? ""] || "image/png",
      },
    ],
    shortcut: logo,
    apple: logo,
  };
}

export const templatePageMeta: Record<string, Record<string, MetaFn>> = {
  creator: {
    "/": async ({ community }) => ({
      title: `Home - ${community.name}`,
      description: `${community.description}`,
      alternates: { canonical: "/" },
      openGraph: {
        title: `Home - ${community?.name || ""}`,
        description: community?.description || "",
      },
      icons: getFaviconMeta(community.logo),
    }),
    "/about": async ({ community }) => ({
      title: `About - ${community.name}`,
      description: `Learn more about ${community.name} — our story, mission, and team.`,
      alternates: { canonical: "/about" },
      openGraph: {
        title: `About - ${community?.name || ""}`,
        description: `Learn more about ${community.name} — our story, mission, and team.`,
      },
      icons: getFaviconMeta(community.logo),
    }),
    "/events": ({ community }) => ({
      title: `Events - ${community.name}`,
      description: `Explore upcoming and past events by ${community.name}`,
      alternates: { canonical: "/events" },
      openGraph: {
        title: `Events - ${community?.name || ""}`,
        description: `Explore upcoming and past events by ${community.name}`,
      },
      icons: getFaviconMeta(community.logo),
    }),
    "/plans": ({ community }) => ({
      title: `Plans - ${community.name}`,
      description: `View membership plans, pricing, and benefits for ${community.name}.`,
      alternates: { canonical: "/plans" },
      openGraph: {
        title: `Plans - ${community?.name || ""}`,
        description: `View membership plans, pricing, and benefits for ${community.name}.`,
      },
      icons: getFaviconMeta(community.logo),
    }),
    "/contact": ({ community }) => ({
      title: `Contact - ${community.name}`,
      description: `Contact ${community.name} for enquiries, support, or collaborations.`,
      alternates: { canonical: "/contact" },
      openGraph: {
        title: `Contact - ${community?.name || ""}`,
        description: `Contact ${community.name} for enquiries, support, or collaborations.`,
      },
      icons: getFaviconMeta(community.logo),
    }),
    "/login": ({ community }) => ({
      title: `Login - ${community.name}`,
      description: `Log in to access your ${community.name} account and member benefits.`,
      alternates: { canonical: "/login" },
      openGraph: {
        title: `Login - ${community?.name || ""}`,
        description: `Log in to access your ${community.name} account and member benefits.`,
      },
      icons: getFaviconMeta(community.logo),
    }),
    "/subscriptions": ({ community }) => ({
      title: `Subscriptions - ${community.name}`,
      description: `Manage your subscriptions and membership access.`,
      alternates: { canonical: "/subscriptions" },
      openGraph: {
        title: `Subscriptions - ${community?.name || ""}`,
        description: `Manage your subscriptions and membership access.`,
      },
      icons: getFaviconMeta(community.logo),
    }),
    "/event-details": ({ community }) => ({
      title: `Event - ${community.name}`,
      description: `Event details, schedule, venue, and registration information.`,
      alternates: { canonical: "/event-details" },
      openGraph: {
        title: `Event - ${community?.name || ""}`,
        description: `Event details, schedule, venue, and registration information.`,
      },
      icons: getFaviconMeta(community.logo),
    }),
    "/sign-up": ({ community }) => ({
      title: `SignUp - ${community.name}`,
      description: `Create your ${community.name} account to join plans and events.`,
      alternates: { canonical: "/sign-up" },
      openGraph: {
        title: `SignUp - ${community?.name || ""}`,
        description: `Create your ${community.name} account to join plans and events.`,
      },
      icons: getFaviconMeta(community.logo),
    }),
  },

  default: {
    "/": ({ community }) => ({
      title: `Home - ${community?.name}`,
      description: community?.description || "",
      alternates: { canonical: "/" },
      openGraph: {
        title: `Home - ${community?.name || ""}`,
        description: community?.description || "",
      },
      icons: getFaviconMeta(community.logo),
    }),
    "/event-details": ({ community }) => ({
      title: `Event - ${community.name}`,
      description:
        "Event details, schedule, venue, and registration information.",
      alternates: { canonical: "/event-details" },
      openGraph: {
        title: `Events - ${community?.name || ""}`,
        description:
          "Event details, schedule, venue, and registration information.",
      },
      icons: getFaviconMeta(community.logo),
    }),
    "/login": ({ community }) => ({
      title: `Login - ${community.name}`,
      description: `Log in to access your ${community.name} account and member benefits.`,
      alternates: { canonical: "/login" },
      openGraph: {
        title: `Login - ${community?.name || ""}`,
        description: `Log in to access your ${community.name} account and member benefits.`,
      },
      icons: getFaviconMeta(community.logo),
    }),
    "/profile": ({ community }) => ({
      title: `Profile - ${community.name}`,
      description: `View and manage your ${community.name} profile, membership, and account settings.`,
      alternates: { canonical: "/profile" },
      openGraph: {
        title: `Profile - ${community?.name || ""}`,
        description: `View and manage your ${community.name} profile, membership, and account settings.`,
      },
      icons: getFaviconMeta(community.logo),
    }),
    "/payments": ({ community }) => ({
      title: `Payments - ${community.name}`,
      description: `View and manage your ${community.name} payments, transactions, invoices, and billing history.`,
      alternates: { canonical: "/payments" },
      openGraph: {
        title: `Payments - ${community?.name || ""}`,
        description: `View and manage your ${community.name} payments, transactions, invoices, and billing history.`,
      },
      icons: getFaviconMeta(community.logo),
    }),
    "/subscriptions": ({ community }) => ({
      title: `Subscriptions - ${community.name}`,
      description: `Manage your subscriptions and membership access.`,
      alternates: { canonical: "/subscriptions" },
      openGraph: {
        title: `Subscriptions - ${community?.name || ""}`,
        description: `Manage your subscriptions and membership access.`,
      },
      icons: getFaviconMeta(community.logo),
    }),
    "/course-details": ({ community }) => ({
      title: `Course - ${community.name}`,
      description: `View course details, lessons, schedule, and enrollment information for this ${community.name} course.`,
      alternates: { canonical: "/course-details" },
      openGraph: {
        title: `Course - ${community?.name || ""}`,
        description: `View course details, lessons, schedule, and enrollment information for this ${community.name} course.`,
      },
      icons: getFaviconMeta(community.logo),
    }),
  },

  yogana: {
    "/": ({ community }) => ({
      title: `Home - ${community.name}`,
      description: `${community.description}`,
      alternates: { canonical: "/" },
      openGraph: {
        title: `Home - ${community?.name || ""}`,
        description: community?.description || "",
      },
      icons: getFaviconMeta(community.logo),
    }),
    "/event-details": ({ community }) => ({
      title: `Event - ${community.name}`,
      description: `Event details, schedule, venue, and registration information.`,
      alternates: { canonical: "/event-details" },
      openGraph: {
        title: `Event - ${community?.name || ""}`,
        description: `Event details, schedule, venue, and registration information.`,
      },
      icons: getFaviconMeta(community.logo),
    }),
    "/login": ({ community }) => ({
      title: `Login - ${community.name}`,
      description: `Log in to access your ${community.name} account and member benefits.`,
      alternates: { canonical: "/login" },
      openGraph: {
        title: `Login - ${community?.name || ""}`,
        description: `Log in to access your ${community.name} account and member benefits.`,
      },
      icons: getFaviconMeta(community.logo),
    }),
    "/sign-up": ({ community }) => ({
      title: `SignUp - ${community.name}`,
      description: `Create your ${community.name} account to join plans and events.`,
      alternates: { canonical: "/sign-up" },
      openGraph: {
        title: `SignUp - ${community?.name || ""}`,
        description: `Create your ${community.name} account to join plans and events.`,
      },
      icons: getFaviconMeta(community.logo),
    }),
    "/subscriptions": ({ community }) => ({
      title: `Subscriptions - ${community.name}`,
      description: `Manage your subscriptions and membership access.`,
      alternates: { canonical: "/subscriptions" },
      openGraph: {
        title: `Subscriptions - ${community?.name || ""}`,
        description: `Manage your subscriptions and membership access.`,
      },
      icons: getFaviconMeta(community.logo),
    }),
    "/service": ({ community }) => ({
      title: `Service - ${community.name} `,
      description: `Explore services offered by ${community.name}, including details, pricing, and availability.`,
      alternates: { canonical: "/service" },
      openGraph: {
        title: `Service - ${community?.name || ""}`,
        description: `Explore services offered by ${community.name}, including details, pricing, and availability.`,
      },
      icons: getFaviconMeta(community.logo),
    }),
    "/profile": ({ community }) => ({
      title: `Profile - ${community.name}`,
      description: `View and manage your ${community.name} profile, membership, and account settings.`,
      alternates: { canonical: "/profile" },
      openGraph: {
        title: `Profile - ${community?.name || ""}`,
        description: `View and manage your ${community.name} profile, membership, and account settings.`,
      },
      icons: getFaviconMeta(community.logo),
    }),
    "/payments": ({ community }) => ({
      title: `Payments - ${community.name}`,
      description: `View and manage your ${community.name} payments, transactions, invoices, and billing history.`,
      alternates: { canonical: "/payments" },
      openGraph: {
        title: `Payments - ${community?.name || ""}`,
        description: `View and manage your ${community.name} payments, transactions, invoices, and billing history.`,
      },
      icons: getFaviconMeta(community.logo),
    }),
  },

  spawell: {
    "/": async ({ community }) => ({
      title: `Home - ${community.name}`,
      description: `${community.description}`,
      alternates: { canonical: "/" },
      openGraph: {
        title: `Home - ${community?.name || ""}`,
        description: community?.description || "",
      },
      icons: getFaviconMeta(community.logo),
    }),
    "/subscriptions": ({ community }) => ({
      title: `Subscriptions - ${community.name}`,
      description: `Manage your subscriptions and membership access.`,
      alternates: { canonical: "/subscriptions" },
      openGraph: {
        title: `Subscriptions - ${community?.name || ""}`,
        description: `Manage your subscriptions and membership access.`,
      },
      icons: getFaviconMeta(community.logo),
    }),
    "/login": ({ community }) => ({
      title: `Login - ${community.name}`,
      description: `Log in to access your ${community.name} account and member benefits.`,
      alternates: { canonical: "/login" },
      openGraph: {
        title: `Login - ${community?.name || ""}`,
        description: `Log in to access your ${community.name} account and member benefits.`,
      },
      icons: getFaviconMeta(community.logo),
    }),
    "/event-details": ({ community }) => ({
      title: `Event - ${community.name}`,
      description: `Event details, schedule, venue, and registration information.`,
      alternates: { canonical: "/event-details" },
      openGraph: {
        title: `Event - ${community?.name || ""}`,
        description: `Event details, schedule, venue, and registration information.`,
      },
      icons: getFaviconMeta(community.logo),
    }),
    "/sign-up": ({ community }) => ({
      title: `SignUp - ${community.name}`,
      description: `Create your ${community.name} account to join plans and events.`,
      alternates: { canonical: "/sign-up" },
      openGraph: {
        title: `SignUp - ${community?.name || ""}`,
        description: `Create your ${community.name} account to join plans and events.`,
      },
      icons: getFaviconMeta(community.logo),
    }),
    "/service": ({ community }) => ({
      title: `Service - ${community.name} `,
      description: `Explore services offered by ${community.name}, including details, pricing, and availability.`,
      alternates: { canonical: "/service" },
      openGraph: {
        title: `Service - ${community?.name || ""}`,
        description: `Explore services offered by ${community.name}, including details, pricing, and availability.`,
      },
      icons: getFaviconMeta(community.logo),
    }),
    "/profile": ({ community }) => ({
      title: `Profile - ${community.name}`,
      description: `View and manage your ${community.name} profile, membership, and account settings.`,
      alternates: { canonical: "/profile" },
      openGraph: {
        title: `Profile - ${community?.name || ""}`,
        description: `View and manage your ${community.name} profile, membership, and account settings.`,
      },
      icons: getFaviconMeta(community.logo),
    }),
    "/payments": ({ community }) => ({
      title: `Payments - ${community.name}`,
      description: `View and manage your ${community.name} payments, transactions, invoices, and billing history.`,
      alternates: { canonical: "/payments" },
      openGraph: {
        title: `Payments - ${community?.name || ""}`,
        description: `View and manage your ${community.name} payments, transactions, invoices, and billing history.`,
      },
      icons: getFaviconMeta(community.logo),
    }),
  },

  fitkit: {
    "/": ({ community }) => ({
      title: `Home - ${community?.name}`,
      description: community?.description || "",
      alternates: { canonical: "/" },
      openGraph: {
        title: `Home - ${community?.name || ""}`,
        description: community?.description || "",
      },
      icons: getFaviconMeta(community.logo),
    }),
    "/login": ({ community }) => ({
      title: `Login - ${community.name}`,
      description: `Log in to access your ${community.name} account and member benefits.`,
      alternates: { canonical: "/login" },
      openGraph: {
        title: `Login - ${community?.name || ""}`,
        description: `Log in to access your ${community.name} account and member benefits.`,
      },
      icons: getFaviconMeta(community.logo),
    }),
    "/sign-up": ({ community }) => ({
      title: `SignUp - ${community.name}`,
      description: `Create your ${community.name} account to join plans and events.`,
      alternates: { canonical: "/sign-up" },
      openGraph: {
        title: `SignUp - ${community?.name || ""}`,
        description: `Create your ${community.name} account to join plans and events.`,
      },
      icons: getFaviconMeta(community.logo),
    }),
    "/event-details": ({ community }) => ({
      title: `Event - ${community.name}`,
      description:
        "Event details, schedule, venue, and registration information.",
      alternates: { canonical: "/event-details" },
      openGraph: {
        title: `Events - ${community?.name || ""}`,
        description:
          "Event details, schedule, venue, and registration information.",
      },
      icons: getFaviconMeta(community.logo),
    }),
    "/subscriptions": ({ community }) => ({
      title: `Subscriptions - ${community.name}`,
      description: `Manage your subscriptions and membership access.`,
      alternates: { canonical: "/subscriptions" },
      openGraph: {
        title: `Subscriptions - ${community?.name || ""}`,
        description: `Manage your subscriptions and membership access.`,
      },
      icons: getFaviconMeta(community.logo),
    }),
    "/service": ({ community }) => ({
      title: `Service - ${community.name} `,
      description: `Explore services offered by ${community.name}, including details, pricing, and availability.`,
      alternates: { canonical: "/service" },
      openGraph: {
        title: `Service - ${community?.name || ""}`,
        description: `Explore services offered by ${community.name}, including details, pricing, and availability.`,
      },
      icons: getFaviconMeta(community.logo),
    }),
    "/profile": ({ community }) => ({
      title: `Profile - ${community.name}`,
      description: `View and manage your ${community.name} profile, membership, and account settings.`,
      alternates: { canonical: "/profile" },
      openGraph: {
        title: `Profile - ${community?.name || ""}`,
        description: `View and manage your ${community.name} profile, membership, and account settings.`,
      },
      icons: getFaviconMeta(community.logo),
    }),
    "/payments": ({ community }) => ({
      title: `Payments - ${community.name}`,
      description: `View and manage your ${community.name} payments, transactions, invoices, and billing history.`,
      alternates: { canonical: "/payments" },
      openGraph: {
        title: `Payments - ${community?.name || ""}`,
        description: `View and manage your ${community.name} payments, transactions, invoices, and billing history.`,
      },
      icons: getFaviconMeta(community.logo),
    }),
  },

  restraint: {
    "/": ({ community }) => ({
      title: `Home - ${community.name}`,
      description: `${community.description}`,
      alternates: { canonical: "/" },
      openGraph: {
        title: `Home - ${community?.name || ""}`,
        description: community?.description || "",
      },
      icons: getFaviconMeta(community.logo),
    }),
    "/plans": ({ community }) => ({
      title: `Plans - ${community.name}`,
      description: `View membership plans, pricing, and benefits for ${community.name}.`,
      alternates: { canonical: "/plans" },
      openGraph: {
        title: `Plans - ${community?.name || ""}`,
        description: `View membership plans, pricing, and benefits for ${community.name}.`,
      },
      icons: getFaviconMeta(community.logo),
    }),
    "/events": ({ community }) => ({
      title: `Events - ${community.name}`,
      description: `Explore upcoming and past events by ${community.name}`,
      alternates: { canonical: "/events" },
      openGraph: {
        title: `Events - ${community?.name || ""}`,
        description: `Explore upcoming and past events by ${community.name}`,
      },
      icons: getFaviconMeta(community.logo),
    }),
    "/login": ({ community }) => ({
      title: `Login - ${community.name}`,
      description: `Log in to access your ${community.name} account and member benefits.`,
      alternates: { canonical: "/login" },
      openGraph: {
        title: `Login - ${community?.name || ""}`,
        description: `Log in to access your ${community.name} account and member benefits.`,
      },
      icons: getFaviconMeta(community.logo),
    }),
    "/sign-up": ({ community }) => ({
      title: `SignUp - ${community.name}`,
      description: `Create your ${community.name} account to join plans and events.`,
      alternates: { canonical: "/sign-up" },
      openGraph: {
        title: `SignUp - ${community?.name || ""}`,
        description: `Create your ${community.name} account to join plans and events.`,
      },
      icons: getFaviconMeta(community.logo),
    }),
    "/subscriptions": ({ community }) => ({
      title: `Subscriptions - ${community.name}`,
      description: `Manage your subscriptions and membership access.`,
      alternates: { canonical: "/subscriptions" },
      openGraph: {
        title: `Subscriptions - ${community?.name || ""}`,
        description: `Manage your subscriptions and membership access.`,
      },
      icons: getFaviconMeta(community.logo),
    }),
    "/event-details": ({ community }) => ({
      title: `Event - ${community.name}`,
      description: `Event details, schedule, venue, and registration information.`,
      alternates: { canonical: "/event-details" },
      openGraph: {
        title: `Event - ${community?.name || ""}`,
        description: `Event details, schedule, venue, and registration information.`,
      },
      icons: getFaviconMeta(community.logo),
    }),
    "/service": ({ community }) => ({
      title: `Service - ${community.name} `,
      description: `Explore services offered by ${community.name}, including details, pricing, and availability.`,
      alternates: { canonical: "/service" },
      openGraph: {
        title: `Service - ${community?.name || ""}`,
        description: `Explore services offered by ${community.name}, including details, pricing, and availability.`,
      },
      icons: getFaviconMeta(community.logo),
    }),
    "/profile": ({ community }) => ({
      title: `Profile - ${community.name}`,
      description: `View and manage your ${community.name} profile, membership, and account settings.`,
      alternates: { canonical: "/profile" },
      openGraph: {
        title: `Profile - ${community?.name || ""}`,
        description: `View and manage your ${community.name} profile, membership, and account settings.`,
      },
      icons: getFaviconMeta(community.logo),
    }),
    "/payments": ({ community }) => ({
      title: `Payments - ${community.name}`,
      description: `View and manage your ${community.name} payments, transactions, invoices, and billing history.`,
      alternates: { canonical: "/payments" },
      openGraph: {
        title: `Payments - ${community?.name || ""}`,
        description: `View and manage your ${community.name} payments, transactions, invoices, and billing history.`,
      },
      icons: getFaviconMeta(community.logo),
    }),
  },

  martivo: {
    "/": ({ community }) => ({
      title: `Home - ${community.name}`,
      description: `${community.description}`,
      alternates: { canonical: "/" },
      openGraph: {
        title: `Home - ${community?.name || ""}`,
        description: community?.description || "",
      },
      icons: getFaviconMeta(community.logo),
    }),
    "/login": ({ community }) => ({
      title: `Login - ${community.name}`,
      description: `Log in to access your ${community.name} account and member benefits.`,
      alternates: { canonical: "/login" },
      openGraph: {
        title: `Login - ${community?.name || ""}`,
        description: `Log in to access your ${community.name} account and member benefits.`,
      },
      icons: getFaviconMeta(community.logo),
    }),
    "/sign-up": ({ community }) => ({
      title: `SignUp - ${community.name}`,
      description: `Create your ${community.name} account to join plans and events.`,
      alternates: { canonical: "/sign-up" },
      openGraph: {
        title: `SignUp - ${community?.name || ""}`,
        description: `Create your ${community.name} account to join plans and events.`,
      },
      icons: getFaviconMeta(community.logo),
    }),
    "/event-details": ({ community }) => ({
      title: `Event - ${community.name}`,
      description: `Event details, schedule, venue, and registration information.`,
      alternates: { canonical: "/event-details" },
      openGraph: {
        title: `Event - ${community?.name || ""}`,
        description: `Event details, schedule, venue, and registration information.`,
      },
      icons: getFaviconMeta(community.logo),
    }),
    "/subscriptions": ({ community }) => ({
      title: `Subscriptions - ${community.name}`,
      description: `Manage your subscriptions and membership access.`,
      alternates: { canonical: "/subscriptions" },
      openGraph: {
        title: `Subscriptions - ${community?.name || ""}`,
        description: `Manage your subscriptions and membership access.`,
      },
      icons: getFaviconMeta(community.logo),
    }),
    "/service": ({ community }) => ({
      title: `Service - ${community.name} `,
      description: `Explore services offered by ${community.name}, including details, pricing, and availability.`,
      alternates: { canonical: "/service" },
      openGraph: {
        title: `Service - ${community?.name || ""}`,
        description: `Explore services offered by ${community.name}, including details, pricing, and availability.`,
      },
      icons: getFaviconMeta(community.logo),
    }),
    "/profile": ({ community }) => ({
      title: `Profile - ${community.name}`,
      description: `View and manage your ${community.name} profile, membership, and account settings.`,
      alternates: { canonical: "/profile" },
      openGraph: {
        title: `Profile - ${community?.name || ""}`,
        description: `View and manage your ${community.name} profile, membership, and account settings.`,
      },
      icons: getFaviconMeta(community.logo),
    }),
    "/payments": ({ community }) => ({
      title: `Payments - ${community.name}`,
      description: `View and manage your ${community.name} payments, transactions, invoices, and billing history.`,
      alternates: { canonical: "/payments" },
      openGraph: {
        title: `Payments - ${community?.name || ""}`,
        description: `View and manage your ${community.name} payments, transactions, invoices, and billing history.`,
      },
      icons: getFaviconMeta(community.logo),
    }),
  },

  influencer: {
    "/": ({ community }) => ({
      title: `Home - ${community.name}`,
      description: `${community.description}`,
      alternates: { canonical: "/" },
      openGraph: {
        title: `Home - ${community?.name || ""}`,
        description: community?.description || "",
      },
      icons: getFaviconMeta(community.logo),
    }),
    "/explore": ({ community }) => ({
      title: `Explore - ${community.name}`,
      description: `Discover curated place recommendations by ${community.name}, including food, cafes, experiences, and hidden gems.`,
      alternates: { canonical: "/explore" },
      openGraph: {
        title: `Explore - ${community.name}`,
        description: `Discover curated place recommendations by ${community.name}, including food, cafes, experiences, and hidden gems.`,
      },
      icons: getFaviconMeta(community.logo),
    }),
    "/login": ({ community }) => ({
      title: `Login - ${community.name}`,
      description: `Log in to access your ${community.name} account and member benefits.`,
      alternates: { canonical: "/login" },
      openGraph: {
        title: `Login - ${community?.name || ""}`,
        description: `Log in to access your ${community.name} account and member benefits.`,
      },
      icons: getFaviconMeta(community.logo),
    }),
    "/sign-up": ({ community }) => ({
      title: `SignUp - ${community.name}`,
      description: `Create your ${community.name} account to join plans and events.`,
      alternates: { canonical: "/sign-up" },
      openGraph: {
        title: `SignUp - ${community?.name || ""}`,
        description: `Create your ${community.name} account to join plans and events.`,
      },
      icons: getFaviconMeta(community.logo),
    }),
    "/details": ({ community }) => ({
      title: `Details - ${community.name}`,
      description: `View detailed insights, reviews, and recommendations for this place curated by ${community.name}.`,
      alternates: { canonical: "/details" },
      openGraph: {
        title: `Details - ${community.name}`,
        description: `View detailed insights, reviews, and recommendations for this place curated by ${community.name}.`,
      },
      icons: getFaviconMeta(community.logo),
    }),
  },

  consultingo: {
    "/": ({ community }) => ({
      title: `Home - ${community.name}`,
      description: `${community.description}`,
      alternates: { canonical: "/" },
      openGraph: {
        title: `Home - ${community?.name || ""}`,
        description: community?.description || "",
      },
      icons: getFaviconMeta(community.logo),
    }),
    "/about-us": async ({ community }) => ({
      title: `About - ${community.name}`,
      description: `Learn more about ${community.name} — our story, mission, and team.`,
      alternates: { canonical: "/about" },
      openGraph: {
        title: `About - ${community?.name || ""}`,
        description: `Learn more about ${community.name} — our story, mission, and team.`,
      },
      icons: getFaviconMeta(community.logo),
    }),
    "/service": ({ community }) => ({
      title: `Service - ${community.name} `,
      description: `Explore services offered by ${community.name}, including details, pricing, and availability.`,
      alternates: { canonical: "/service" },
      openGraph: {
        title: `Service - ${community?.name || ""}`,
        description: `Explore services offered by ${community.name}, including details, pricing, and availability.`,
      },
      icons: getFaviconMeta(community.logo),
    }),
    "/event-details": ({ community }) => ({
      title: `Event - ${community.name}`,
      description: `Event details, schedule, venue, and registration information.`,
      alternates: { canonical: "/event-details" },
      openGraph: {
        title: `Event - ${community?.name || ""}`,
        description: `Event details, schedule, venue, and registration information.`,
      },
      icons: getFaviconMeta(community.logo),
    }),
    "/subscriptions": ({ community }) => ({
      title: `Subscriptions - ${community.name}`,
      description: `Manage your subscriptions and membership access.`,
      alternates: { canonical: "/subscriptions" },
      openGraph: {
        title: `Subscriptions - ${community?.name || ""}`,
        description: `Manage your subscriptions and membership access.`,
      },
      icons: getFaviconMeta(community.logo),
    }),
    "/contact-us": ({ community }) => ({
      title: `Contact - ${community.name}`,
      description: `Contact ${community.name} for enquiries, support, or collaborations.`,
      alternates: { canonical: "/contact" },
      openGraph: {
        title: `Contact - ${community?.name || ""}`,
        description: `Contact ${community.name} for enquiries, support, or collaborations.`,
      },
      icons: getFaviconMeta(community.logo),
    }),
    "/course-details": ({ community }) => ({
      title: `Course Details - ${community.name}`,
      description: `View course details, lessons, schedule, and enrollment information for this ${community.name} course.`,
      openGraph: {
        title: `Course Details - ${community?.name || ""}`,
        description: `View course details, lessons, schedule, and enrollment information for this ${community.name} course.`,
      },
      alternates: { canonical: "/course-details" },
      icons: getFaviconMeta(community.logo),
    }),
    "/appointment-detail": ({ community }) => ({
      title: `Appointment Details - ${community.name}`,
      description: `View Appointment details, schedule, and booking information for this ${community.name} appointment.`,
      openGraph: {
        title: `Appointment Details - ${community.name}`,
        description: `View Appointment details, schedule, and booking information for this ${community.name} appointment.`,
      },
      alternates: { canonical: "/appointment-detail" },
      icons: getFaviconMeta(community.logo),
    }),
  },

  collections: {
    "/": async ({ community }) => ({
      title: `Home - ${community.name}`,
      description: `${community.description}`,
      alternates: { canonical: "/" },
      openGraph: {
        title: `Home - ${community?.name || ""}`,
        description: community?.description || "",
      },
      icons: getFaviconMeta(community.logo),
    }),
    "/contact": ({ community }) => ({
      title: `Contact - ${community.name}`,
      description: `Contact ${community.name} for enquiries, support, or collaborations.`,
      alternates: { canonical: "/contact" },
      openGraph: {
        title: `Contact - ${community?.name || ""}`,
        description: `Contact ${community.name} for enquiries, support, or collaborations.`,
      },
      icons: getFaviconMeta(community.logo),
    }),
    "/about": async ({ community }) => ({
      title: `About - ${community.name}`,
      description: `Learn more about ${community.name} — our story, mission, and team.`,
      alternates: { canonical: "/about" },
      openGraph: {
        title: `About - ${community?.name || ""}`,
        description: `Learn more about ${community.name} — our story, mission, and team.`,
      },
      icons: getFaviconMeta(community.logo),
    }),
    "/collections": ({ community }) => ({
      title: `Collections - ${community?.name}`,
      description: `Browse curated product collections by ${community.name}, including featured items, categories, and latest additions.`,
      alternates: { canonical: "/collections" },
      openGraph: {
        title: `Collections - ${community?.name || ""}`,
        description: `Browse curated product collections by ${community.name}, including featured items, categories, and latest additions.`,
      },
      icons: getFaviconMeta(community.logo),
    }),
  },

  madivala: {
    "/": ({ community }) => ({
      title: `Home - ${community.name}`,
      description: `${community.description}`,
      alternates: { canonical: "/" },
      openGraph: {
        title: `Home - ${community?.name || ""}`,
        description: community?.description || "",
      },
      icons: getFaviconMeta(community.logo),
    }),
    "/team": ({ community }) => ({
      title: `Team - ${community?.name}`,
      description: `Meet the team behind ${community.name}, dedicated to building, managing, and supporting the community.`,
      alternates: { canonical: "/team" },
      openGraph: {
        title: `Team - ${community?.name || ""}`,
        description: `Meet the team behind ${community.name}, dedicated to building, managing, and supporting the community.`,
      },
      icons: getFaviconMeta(community.logo),
    }),
    "/about": ({ community }) => ({
      title: `About - ${community.name}`,
      description: `Learn more about ${community.name} — our story, mission, and team.`,
      alternates: { canonical: "/about" },
      openGraph: {
        title: `About - ${community?.name || ""}`,
        description: `Learn more about ${community.name} — our story, mission, and team.`,
      },
      icons: getFaviconMeta(community.logo),
    }),
    "/join-member": ({ community }) => ({
      title: `Join Member - ${community?.name}`,
      description: `Join ${community.name} to become a member and access events, benefits, and community features.`,
      alternates: { canonical: "/join-member" },
      openGraph: {
        title: `Join Member - ${community?.name}`,
        description: `Join ${community.name} to become a member and access events, benefits, and community features.`,
      },
      icons: getFaviconMeta(community.logo),
    }),
    "/id-card": ({ community }) => ({
      title: `ID Card - ${community?.name}`,
      description: `View and download your ${community.name} membership ID card for identification and access.`,
      alternates: { canonical: "/id-card" },
      openGraph: {
        title: `ID Card - ${community?.name}`,
        description: `View and download your ${community.name} membership ID card for identification and access.`,
      },
      icons: getFaviconMeta(community.logo),
    }),
    "/contact": ({ community }) => ({
      title: `Contact - ${community.name}`,
      description: `Contact ${community.name} for enquiries, support, or collaborations.`,
      alternates: { canonical: "/contact" },
      openGraph: {
        title: `Contact - ${community?.name || ""}`,
        description: `Contact ${community.name} for enquiries, support, or collaborations.`,
      },
      icons: getFaviconMeta(community.logo),
    }),
    "/events": ({ community }) => ({
      title: `Events - ${community.name}`,
      description: `Explore upcoming and past events by ${community.name}`,
      alternates: { canonical: "/events" },
      openGraph: {
        title: `Events - ${community?.name || ""}`,
        description: `Explore upcoming and past events by ${community.name}`,
      },
      icons: getFaviconMeta(community.logo),
    }),
    "/infrastructure": ({ community }) => ({
      title: `Infrastructure - ${community?.name}`,
      description: `Explore the infrastructure and facilities provided by ${community.name}, designed to support members and activities.`,
      alternates: { canonical: "/infrastructure" },
      openGraph: {
        title: `Infrastructure - ${community?.name}`,
        description: `Explore the infrastructure and facilities provided by ${community.name}, designed to support members and activities.`,
      },
      icons: getFaviconMeta(community.logo),
    }),
    "/news": ({ community }) => ({
      title: `News - ${community?.name}`,
      description: `Stay updated with the latest news, announcements, and updates from ${community.name}.`,
      alternates: { canonical: "/news" },
      openGraph: {
        title: `News - ${community?.name}`,
        description: `Stay updated with the latest news, announcements, and updates from ${community.name}.`,
      },
      icons: getFaviconMeta(community.logo),
    }),
  },
};
