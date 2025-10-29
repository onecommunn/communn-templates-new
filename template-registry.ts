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
import MartivoLogin from "./app/martivo/login/page";
import MartivoSignupPage from "./app/martivo/sign-up/_components/MartivoSignupPage";
import MartivoEventDetailsPage from "./app/martivo/event-details/page";
import MartivoSubscriptionsPage from "./app/martivo/subscriptions/page";
import RestraintShell from "./app/restraint/RestraintShell";
import RestraintPlansRoot from "./app/restraint/plans/page";
import RestraintEventsRoot from "./app/restraint/events/pages";
import RestraintLogin from "./app/restraint/login/page";
import RestraintSignup from "./app/restraint/sign-up/page";
import RestraintSubscriptionsPage from "./app/restraint/subscriptions/page";
import RestraintEventDetailsPage from "./app/restraint/event-details/page";

export const templateLayouts: Record<
  string,
  React.FC<React.PropsWithChildren<{ community: Community }>>
> = {
  creator: CreatorShell,
  yogana: YoganaShell,
  default: DefaultShell,
  spawell: SpawellShell,
  martivo: MartivoShell,
  restraint: RestraintShell,
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
  restraint: {
    "/": RestraintRoot,
    "/plans": RestraintPlansRoot,
    "/events": RestraintEventsRoot,
    "/login": RestraintLogin,
    "/sign-up": RestraintSignup,
    "/subscriptions": RestraintSubscriptionsPage,
    "/event-details": RestraintEventDetailsPage,
  },
  martivo: {
    "/": MartivoRoot,
    "/login": MartivoLogin,
    "/sign-up": MartivoSignupPage,
    "/event-details": MartivoEventDetailsPage,
    "/subscriptions": MartivoSubscriptionsPage,
  },
};
