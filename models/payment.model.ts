import { ICommunity } from "./community.model";
import { TrainingPlan } from "./plan.model";
import { IUserInfo } from "./user.model";

export interface ISubcriptionData {
  nextDueDate:string
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
  udf6:ISubcriptionData;
  cancellation_reason: string;
  dueDate: string;
  createdAt: string;
  updatedAt: string;
  appointment: {
    title:string;
    _id:string;
  }
  event: {
    title:string;
    _id:string;
  },
  course: {
    name:string;
    _id:string;
  },
}