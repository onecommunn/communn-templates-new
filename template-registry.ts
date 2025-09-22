import CreatorAbout from "./app/creator/about/page";
import CreatorEvents from "./app/creator/events/pages";
import CreatorRoot from "./app/creator/page";
import DefaultRoot from "./app/default/page";
import { Community } from "./services/communityService";
import YoganaRoot from "./app/yogana/page";
import CreatorPlans from "./app/creator/plans/page";
import CreatorContact from "./app/creator/contact/pages";
import CreatorLogin from "./app/creator/login/page";

export const templates: Record<string, Record<string, React.FC<{ community: Community }>>> = {
  creator: {
    "/": CreatorRoot,
    "/about": CreatorAbout,
    "/events":CreatorEvents,
    "/plans":CreatorPlans,
    "/contact":CreatorContact,
    "/login":CreatorLogin
  },
  default: {
    "/": DefaultRoot,
  },
  yogana:{
    "/":YoganaRoot,
  }
};