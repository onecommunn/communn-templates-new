

export interface IUserInfo {
  firstName: string;
  lastName: string;
  role: string;
  emailId: string;
  phoneNumber: number;
  avatar: string;
  _id: string;
  isEmailVerified: boolean;
  isPhoneVerified: boolean;
  subscribed?: ISubscription;
}
export interface ISubscription {
  _id: string;
  name: string;
  totalPlanValue: number;
  offerValue: number;
}

export interface ILoginData {
  username: string;
  password: string;
}
export interface INewUser {
  firstName: string;
  lastName: string;
  role?: string;
  emailId: string;
  phoneNumber: string;
  status: string;
  community: string;
}

export interface IAddUser {
  firstName: string;
  lastName: string;
  phoneNumber: number;
  emailId: string;
}
export interface IEditUser {
  id: string;
  firstName: string;
  lastName: string;
  emailId: string;
  phoneNumber: string;
  isPhoneVerified: boolean;
  description: string;
  pincode: string;
  city: string;
  address: string;
  aadhar: string;
  pan: string;
  userName: string;
  avatar: string;
  about: string;
}
export interface CommunityInvitation {
  _id: string;
  name: string;
  category: string;
  fullAddress: string;
  members: [];
}
export interface ICreatedBy {
  _id: string;
  firstName: string;
  lastName: string;
  emailId: string;
}

export interface IUser1 {
  role: string;
  _id: string;
  firstName: string;
  lastName: string;
  phoneNumber: number;
  emailId: string;
  community: {
    _id: string;
    name: string;
    category: string;
    fullAddress: string;
    members: any[]; // You can define a more specific type for members if needed
  };
  createdBy: {
    _id: string;
    firstName: string;
    lastName: string;
    emailId: string;
  };
  status: string;
  createdAt: string;
  updatedAt: string;
}
export interface IUser {
  _id: string;
  firstName: string;
  lastName: string;
  phoneNumber: number;
  emailId: string;
  displayId: string;
  id: string;
  avatar: string;
  isEmailVerified: boolean;
  isPhoneVerified: boolean;
  role: string;
  roleType: string; // TO identify the loggedin user role in a community
  country: string;
  state: string;
  city: string;
  pincode: number;
  createdBy: string;
  isGoogleAuthenticated: string;
  googleEmail: string;
  status: string;
  userType: 'Free' | 'Paid' | 'Expired';
 
  joinedOn: string;
  joiningType: 'Joined' | 'Created';
  createdDate: string;
  userName: string;
  pan: string;
  aadhar: string;
  address: string;
  about: string;
  whatsappNumber?: string;
}



export interface INotes {
  description: string;
  community: string;
  user: string;
}
