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
import FitKitShell from "./app/fitkit/FitKitShell";
import FitkitLogin from "./app/fitkit/login/page";
import FitKitSignup from "./app/fitkit/sign-up/page";
import FitkitEventDetailsPage from "./app/fitkit/event-details/page";
import FitkitSubscriptionsPage from "./app/fitkit/subscriptions/page";
import FitkitServiceRoot from "./app/fitkit/service/page";
import RestraintServiceRoot from "./app/restraint/service/page";
import SpawellServiceRoot from "./app/spawell/service/page";
import YoganaServiceRoot from "./app/yogana/service/page";
import MartivoServiceRoot from "./app/martivo/service/page";
import RestraintProfileRoot from "./app/restraint/profile/page";
import SpawellProfileRoot from "./app/spawell/profile/page";
import YoganaProfileRoot from "./app/yogana/profile/page";
import MartivoProfileRoot from "./app/martivo/profile/page";
import FitkitProfileRoot from "./app/fitkit/profile/page";
import RestraintPaymentsRoot from "./app/restraint/payments/page";
import FitkitPaymentsRoot from "./app/fitkit/payments/page";
import SpawellPaymentsRoot from "./app/spawell/payments/page";
import MartivoPaymentsRoot from "./app/martivo/payments/page";
import YoganaPaymentsRoot from "./app/yogana/payments/page";
import InfluencerPage from "./app/Influencer/page";
import InfluencerLayout from "./app/Influencer/InfluencerLayout";
import InfluencerExploreRoot from "./app/Influencer/explore/page";
import InfluencerLogin from "./app/Influencer/login/page";
import InfluencerSignup from "./app/Influencer/sign-up/page";
import AutoLogin from "./app/default/auto-login/page";
import InfluencerDetailsRoot from "./app/Influencer/details/page";
import ConsultingoRoot from "./app/consultingo/pages";
import ConsultingoShell from "./app/consultingo/ConsultingoShell";
import ConsultingoAboutUsRoot from "./app/consultingo/about-us/page";
import ConsultingoServiceRoot from "./app/consultingo/service/page";
import ConsultingoEventDetailsRoot from "./app/consultingo/event-details/page";
import ConsultingoSubscriptionsRoot from "./app/consultingo/subscriptions/pages";
import ConsultingoContactusRoot from "./app/consultingo/contact-us/page";
import CollectionsRoot from "./app/collections/page";
import CollectionsShell from "./app/collections/CollectionsShell";
import CollectionsContactusRoot from "./app/collections/contact-us/page";
import CollectionsAboutRoot from "./app/collections/about/page";
import CollectionsCollectionsPageRoot from "./app/collections/collections/page";
import DefaultEventDetailsPage from "./app/default/event-details/page";
import DefaultLogin from "./app/default/login/page";
import DefaultProfileRoot from "./app/default/profile/page";
import DefaultPaymentsRoot from "./app/default/payments/page";
import DefaultSubscriptionsRoot from "./app/default/subscriptions/pages";
import InfluencerCopy from "./app/Influencer/page copy";
import CreatePage from "./app/Influencer/create/page";
import MadivalaRoot from "./app/madivala/page";
import MadivalaShell from "./app/madivala/MadivalaShell";
import MadivalaTeamPageRoot from "./app/madivala/team/page";
import MadivalaAboutPageRoot from "./app/madivala/about/page";
import JoinMemberShipPageRoot from "./app/madivala/joinembership/page";
import CourseDetailsPageRoot from "./app/default/course-details/page";
import MemberShipCardPageRoot from "./app/madivala/idcard/page";

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
  fitkit: FitKitShell,
  influencer: InfluencerLayout,
  consultingo: ConsultingoShell,
  collections: CollectionsShell,
  madivala: MadivalaShell,
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
    "/auto-login": AutoLogin,
  },
  default: {
    "/": DefaultRoot,
    "/auto-login": AutoLogin,
    "/event-details": DefaultEventDetailsPage,
    "/login": DefaultLogin,
    "/profile": DefaultProfileRoot,
    "/payments": DefaultPaymentsRoot,
    "/subscriptions": DefaultSubscriptionsRoot,
    "/course-details": CourseDetailsPageRoot,
  },
  yogana: {
    "/": YoganaRoot,
    "/event-details": YoganaEventDetailsPage,
    "/login": YoganaLogin,
    "/sign-up": YoganaSignup,
    "/subscriptions": YoganaSubscriptionsPage,
    "/service": YoganaServiceRoot,
    "/profile": YoganaProfileRoot,
    "/payments": YoganaPaymentsRoot,
    "/auto-login": AutoLogin,
  },
  spawell: {
    "/": SpawellRoot,
    "/subscriptions": SpawellSubscriptionsPage,
    "/login": SpawellLogin,
    "/event-details": SpawellEventDetailsPage,
    "/sign-up": SpawellSignup,
    "/service": SpawellServiceRoot,
    "/profile": SpawellProfileRoot,
    "/payments": SpawellPaymentsRoot,
    "/auto-login": AutoLogin,
  },
  fitkit: {
    "/": FitkitRoot,
    "/login": FitkitLogin,
    "/sign-up": FitKitSignup,
    "/event-details": FitkitEventDetailsPage,
    "/subscriptions": FitkitSubscriptionsPage,
    "/service": FitkitServiceRoot,
    "/profile": FitkitProfileRoot,
    "/payments": FitkitPaymentsRoot,
    "/auto-login": AutoLogin,
  },
  restraint: {
    "/": RestraintRoot,
    "/plans": RestraintPlansRoot,
    "/events": RestraintEventsRoot,
    "/login": RestraintLogin,
    "/sign-up": RestraintSignup,
    "/subscriptions": RestraintSubscriptionsPage,
    "/event-details": RestraintEventDetailsPage,
    "/service": RestraintServiceRoot,
    "/profile": RestraintProfileRoot,
    "/payments": RestraintPaymentsRoot,
    "/auto-login": AutoLogin,
  },
  martivo: {
    "/": MartivoRoot,
    "/login": MartivoLogin,
    "/sign-up": MartivoSignupPage,
    "/event-details": MartivoEventDetailsPage,
    "/subscriptions": MartivoSubscriptionsPage,
    "/service": MartivoServiceRoot,
    "/profile": MartivoProfileRoot,
    "/payments": MartivoPaymentsRoot,
    "/auto-login": AutoLogin,
  },
  influencer: {
    "/": InfluencerCopy,
    "/copy": InfluencerPage,
    "/create": CreatePage,
    "/explore": InfluencerExploreRoot,
    "/login": InfluencerLogin,
    "/sign-up": InfluencerSignup,
    "/auto-login": AutoLogin,
    "/details": InfluencerDetailsRoot,
  },
  consultingo: {
    "/": ConsultingoRoot,
    "/auto-login": AutoLogin,
    "/about-us": ConsultingoAboutUsRoot,
    "/service": ConsultingoServiceRoot,
    "/event-details": ConsultingoEventDetailsRoot,
    "/subscriptions": ConsultingoSubscriptionsRoot,
    "/contact-us": ConsultingoContactusRoot,
  },
  collections: {
    "/": CollectionsRoot,
    "/contact": CollectionsContactusRoot,
    "/about": CollectionsAboutRoot,
    "/collections": CollectionsCollectionsPageRoot,
  },
  madivala: {
    "/": MadivalaRoot,
    "/team": MadivalaTeamPageRoot,
    "/about": MadivalaAboutPageRoot,
    "/join-member": JoinMemberShipPageRoot,
    "/id-card": MemberShipCardPageRoot,
  },
};
