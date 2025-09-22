import { ICommunity } from "./community.model";
import { IUserInfo } from "./user.model";

export interface Subscriber {
  _id: string;
  firstName: string;
  lastName: string;
  emailId: string;
  avatar: string;
}

export interface Image {
  _id: string;
  type: string;
  value: string;
  label: string;
}

export interface TrainingPlan {
  _id: string;
  name: string;
  duration: string; // e.g., "MONTH"
  interval: string; // typically a number string
  startDate: string; // ISO string
  endDate: string;   // ISO string
  status: string;    // e.g., "ACTIVE"
  totalPlanValue: number;
  summary: string;
  addOn: any[]; // Define specific structure if known
  promoCode: string;
  community: string;
  offerValue: number;
  description: string;
  image: Image;
  isOfferEnds: boolean;
  offerEndsAfter: number;
  subscribers: Subscriber[];
  offerEndsDuration: string; // e.g., "Year"
  totalCount: string; // could be number if converted
  subscriptionDue: string[]; // list of subscription IDs
  createdAt: string; // ISO string
  updatedAt: string; // ISO string
  __v: number;
  offerEndDate: string;
  isSequenceAvailable: boolean;
  totalSequences: string; // could be number
  pricing: string; // could be number
  initialPayment: string;
  isUserSubscribed: boolean;
  nextDueDate: string; // ISO string
}


export interface ISequences {
    previousStatus:string;
    startDate: string;
    status: string;
    _id: string;
}


export interface ISubscribers {
    _id: string;
    community: ICommunity;
    createdAt: string;
    plan: TrainingPlan;
    initialPayment:string,
    pricing:string,
    isInitialPaymentPaid:boolean,
    sequences: ISequences[];
    status: string;
    user: IUserInfo;
    startDate: string;
    subscription_status: string;
    courseAmount:string

}