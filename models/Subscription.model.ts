export interface Subscription {
  lastPaidUserCount: number;
  _id: string;
  community: Community;
  plan: Plan;
  user: User;
  startDate: string;
  sequences: Sequence[];
  subscription_status: "ACTIVE" | "STOP" | "PAUSED" | "INACTIVE";
  isSequenceNonPay: boolean;
  isAdminCreated: boolean;
  createdAt: string;
  updatedAt: string;
  pauseStartDate: string;
  pauseEndDate: string;
  remainingPauseDays: number;
  nextDueDate:string;
  pausedDays:number
}

export interface Community {
  _id: string;
  name: string;
  type: "PUBLIC" | "PRIVATE";
  status: "PUBLISHED" | "DRAFT" | "ARCHIVED";
  logo: string;
}

export interface Plan {
  maxPauseDays: number;
  _id: string;
  name: string;
  duration: "DAY" | "WEEK" | "MONTH" | "YEAR";
  interval: string;
  startDate: string;
  endDate: string;
  status: "ACTIVE" | "INACTIVE" | "EXPIRED";
  totalPlanValue: number;
  summary: string;
  addOn: any[];
  promoCode: string;
  community: string;
  offerValue: number;
  description: string;
  image: string;
  isOfferEnds: boolean;
  offerEndsAfter: number;
  subscribers: string[];
  offerEndsDuration: string;
  totalCount: string;
  subscriptionDue: string[];
  createdAt: string;
  updatedAt: string;
  __v: number;
  isSequenceAvailable: boolean;
  totalSequences: string;
  pricing: string;
  coupons: Coupon[];
}

export interface Coupon {
  _id: string;
  discountName: string;
  couponCode: string;
  discountType: "PERCENTAGE" | "FLAT";
  discountValue: number;
  maxRedemptions: number;
  expiryDate: string;
  cycleCount: number;
  usedRedemptions: number;
}

export interface User {
  _id: string;
  firstName: string;
  lastName: string;
  phoneNumber: number;
  emailId: string;
  avatar: string;
}

export interface Sequence {
  _id: string;
  status: "PAID" | "NOT_PAID" | "EXPIRED" | "PENDING";
  startDate: string;
  previousStatus: "PAID" | "NOT_PAID" | "EXPIRED" | "PENDING";
  isnonPayable: boolean;
}
