import type { Community } from "./services/communityService";

/** PAGES (no layout here) */
import CreatorAbout from "./app/creator/about/page";
import CreatorEvents from "./app/creator/events/pages";
import CreatorRoot from "./app/creator/page";
import DefaultRoot from "./app/default/page";
import YoganaRoot from "./app/yogana/page";
import CreatorPlans from "./app/creator/plans/page";
import CreatorContact from "./app/creator/contact/pages";
import CreatorLogin from "./app/creator/login/page";
import CreatorSubscriptions from "./app/creator/subscriptions/page";
import CreatorSubscriptionsPage from "./app/creator/subscriptions/page";

/** LAYOUTS (per template) */
import CreatorShell from "./app/creator/layout";
import YoganaLayout from "./app/yogana/layout";

// import DefaultShell from "./templates/default/DefaultShell";
// import YoganaShell from "./templates/yogana/YoganaShell";

export const templateLayouts: Record<
  string,
  React.FC<React.PropsWithChildren<{ community: Community }>>
> = {
  creator: CreatorShell,
  // default: DefaultShell,
  yogana: YoganaLayout,
};

export const templates: Record<
  string,
  Record<string, React.FC<{ community: Community }>>
> = {
  creator: {
    "/": CreatorRoot,
    "/about": CreatorAbout,
    "/events": CreatorEvents,
    "/plans": CreatorPlans,
    "/contact": CreatorContact,
    "/login": CreatorLogin,
    "/subscriptions": CreatorSubscriptions,
    "/event-details": CreatorSubscriptionsPage,
  },
  default: { "/": DefaultRoot },
  yogana: { "/": YoganaRoot },
};
