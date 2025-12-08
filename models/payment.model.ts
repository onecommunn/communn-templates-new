import { ICommunity } from "./community.model";
import { TrainingPlan } from "./plan.model";
import { IUserInfo } from "./user.model";

export interface ISubcriptionData {
  nextDueDate: string;
}

export interface IPaymentList {
  _id: string;
  deduction_percentage: string;
  net_amount_debit: string;
  cardCategory: string;
  unmappedstatus: string;
  addedon: string;
  cash_back_percentage: string;
  bank_ref_num: string;
  error_Message: string;
  phone: number;
  easepayid: string;
  cardnum: string;
  upi_va: string;
  payment_source: string;
  card_type: string;
  mode: string;
  error: string;
  bankcode: string;
  name_on_card: string;
  bank_name: string;
  issuing_bank: string;
  PG_TYPE: string;
  amount: string;
  furl: string;
  productinfo: string;
  email: string;
  status: string;
  hash: string;
  firstname: string;
  surl: string;
  key: string;
  merchant_logo: string;
  txnid: string;
  udf1: IUserInfo;
  udf2: TrainingPlan;
  udf3: ICommunity;
  udf4: string;
  udf6: ISubcriptionData;
  cancellation_reason: string;
  dueDate: string;
  createdAt: string;
  updatedAt: string;
  appointment: {
    title: string;
    _id: string;
  };
  event: {
    title: string;
    _id: string;
  };
  course: {
    name: string;
    _id: string;
  };
}

export interface IPaymentUser {
  _id: string;
  firstName: string;
  lastName: string;
  phoneNumber: number;
  emailId: string;
  avatar: string;
  address: string;
  city: string;
  pincode: number | null;
}

export interface IPaymentPlan {
  _id: string;
  name: string;
  duration: string; // "DAY" | "MONTH" etc.
  interval: string;
  startDate: string;
  endDate: string;
  status: string;
  totalPlanValue: number;
  offerValue: number;
  pricing: string;
}

export interface IPaymentCommunity {
  _id: string;
  name: string;
  type: string;
  status: string;
  banner: string;
  logo: string;
}

export interface ISequence {
  _id: string;
  startDate: string;
}

export interface ISubscriptionDetails {
  _id: string;
  community: string;
  plan: string;
  user: string;
  startDate: string;
  sequences: string[];
  lastPaidUserCount: number;
  subscription_status: string;
  isSequenceNonPay: boolean;
  isAdminCreated: boolean;
  createdAt: string;
  updatedAt: string;
  nextDueDate: string;
}

export interface IPaymentTransaction {
  commissionPayment: Record<string, any>;
  _id: string;
  phone: string;
  easepayid: string;
  mode: string;
  amount: string;
  totalAmountPaid: string;
  furl: string;
  productinfo: string;
  email: string;
  status: string;
  firstname: string;
  surl: string;
  merchant_logo: string;
  txnid: string;

  udf1: IPaymentUser | null;
  udf2: IPaymentPlan | null;
  udf3: IPaymentCommunity | null;
  udf4: any | null;
  udf5: string | null;
  udf6: ISubscriptionDetails | null;

  userCount: number;
  endDate: string;
  startDate: string;
  isSettled: boolean;

  sequences: ISequence[];

  isAdminAdded: boolean;
  bankLabel: string;
  payingBankName: string;
  paymentMessage: string;
  payingBankHolderName: string;
  payingAccountNumber: string;

  createdAt: string;
  updatedAt: string;

  numberOfDays: number;
  isPlanPayment: boolean;
  isCustomPay: boolean;
  paymentType: string;

  couponDetails: any | null;
}

export interface IPaymentRequest {
  _id: string;
  community: ICommunity;
  user: IUser;
  createdBy: IUser;
  amount: string;
  frequency: string;
  notify: string;
  description: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  appointment: {
    title: string;
    _id: string;
  };
}

export interface IUser {
  firstName: string;
  lastName: string;
  phoneNumber: number;
  emailId: string;
  displayId: string;
  id: string | undefined;
  avatar: string;
  isEmailVerified: boolean;
  isPhoneVerified: boolean;
  role: string;
  country: string;
  state: string;
  city: string;
  pincode: number;
  createdBy: string;
  status: string;
  userType: "Free" | "Paid" | "Expired";
  community: ICommunity;
  joinedOn: string;
  joiningType: "Joined" | "Created";
  createdDate: string;
  userName: string;
  pan: string;
  aadhar: string;
  address: string;
  about: string;
  whatsappNumber?: string;
}
