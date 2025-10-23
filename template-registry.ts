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
import CreatorSubscriptionsPage from "./app/creator/subscriptions/page";

/** LAYOUTS (per template) */
import CreatorShell from "./app/creator/CreatorShell";
import CreatorEventDetailsPage from "./app/creator/event-details/page";
import DefaultShell from "./app/default/DefaultShell";
import YoganaShell from "./app/yogana/YoganaShell";
import YoganaEventDetailsPage from "./app/yogana/event-details/page";
import YoganaLogin from "./app/yogana/login/page";
import YoganaSubscriptionsPage from "./app/yogana/subscriptions/page";
import SpawellRoot from "./app/spawell/page";
import SpawellShell from "./app/spawell/SpawellShell";
import SpawellSubscriptionsPage from "./app/spawell/subscriptions/page";
import SpawellEventDetailsPage from "./app/spawell/event-details/page";
import SpawellLogin from "./app/spawell/login/page";
import FitkitRoot from "./app/fitkit/page";
import RestraintRoot from "./app/restraint/page";
import MartivoRoot from "./app/martivo/page";
import SpawellSignup from "./app/spawell/sign-up/page";
import YoganaSignup from "./app/yogana/sign-up/page";
import CreatorSignup from "./app/creator/sign-up/page";
import MartivoShell from "./app/martivo/MartivoShell";

export const templateLayouts: Record<
  string,
  React.FC<React.PropsWithChildren<{ community: Community }>>
> = {
  creator: CreatorShell,
  yogana: YoganaShell,
  default: DefaultShell,
  spawell: SpawellShell,
  martivo:MartivoShell
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
    "/subscriptions": CreatorSubscriptionsPage,
    "/event-details": CreatorEventDetailsPage,
    "/sign-up": CreatorSignup,
  },
  default: { "/": DefaultRoot },
  yogana: {
    "/": YoganaRoot,
    "/event-details": YoganaEventDetailsPage,
    "/login": YoganaLogin,
    "/sign-up": YoganaSignup,
    "/subscriptions": YoganaSubscriptionsPage,
  },
  spawell: {
    "/": SpawellRoot,
    "/subscriptions": SpawellSubscriptionsPage,
    "/login": SpawellLogin,
    "/event-details": SpawellEventDetailsPage,
    "/sign-up": SpawellSignup,
  },
  fitkit: { "/": FitkitRoot },
  restraint: { "/": RestraintRoot },
  martivo: { "/": MartivoRoot },
};
