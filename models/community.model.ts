import { TrainingPlan } from "./plan.model";
import { IUserInfo } from "./user.model";




export interface ITeam {
  name: String;
  designation: String;
  experience: String;
  description: String;
  image: String;
}


export interface IService {
  _id: string;
  title: String;
  description: String;
  status: String;
  image: String;
}


export interface SocialLink {
  type: string;
  value: string;
  _id: string;
}




export interface ICommunity {
  [x: string]: any;
  title: string;
  totalMembers: number;
  category: string;
  markedAs: string;
  membership: string;
  createdBy: IUserInfo;
  status: string;
  updated: string;
  earnings: number;
  fullAddress: string;
  url: string;
  createdAt: string;
  updatedAt: string;
  members: [];
  updatedBy: string;
  posts: number;
  type: string;
  favorite: boolean;
  logo: string;
  banner: string;
  images: string[];
  shouldDisplaySingleImage: boolean;
  description: string;
  services: IService[];
  mission: string;
  vision: string;
  adminMessage: string;
  socialLinks: SocialLink[];
  directorMessage: string;
  email: string;
  phoneNumber: number;
  mobileNumber: number;
  addressLine: string;
  pinCode: string;
  location: string;
  path: string;
  name: string;
  zipCode: string;
  _id: string;
  otherCategory: string;
  teams: ITeam[];
  gallery: string[];
  plans: TrainingPlan[];
  collectSubscription:string;
  subscriptionStatus:string;
  
}