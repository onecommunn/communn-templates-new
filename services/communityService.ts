import axios from 'axios';

/** ---------------- Interfaces ------------------ **/

export interface CommunityResponse {
  status: boolean;
  community: Community;
}

export interface Community {
  enabledService: EnabledService;
  _id: string;
  name: string;
  category: string;
  description: string;
  zipCode: string | null;
  fullAddress: string;
  city: string;
  gstNumber: string;
  type: 'PRIVATE' | 'PUBLIC';
  collectSubscription: 'YES' | 'NO';
  createdBy: string;
  status: 'CREATED' | 'ACTIVE' | 'INACTIVE';
  banner: string;
  logo: string;
  gallery: string[];
  members: Member[];
  maxMembers: number;
  otherCategory: string;
  teams: any[];
  faq: any[];
  services: any[];
  plans: Plan[];
  course: any[];
  appointments: any[];
  slidings: any[];
  testimonial: any[];
  contactus: any[];
  googleAuth: string;
  socialLinks: any[];
  createdAt: string;
  updatedAt: string;
  template: string;
}

export interface EnabledService {
  appointment: boolean;
  event: boolean;
  subscription: boolean;
  course: boolean;
  meeting: boolean;
  product: boolean;
  member: boolean;
  custompay: boolean;
}

export interface Member {
  _id: string;
  community: string;
  user: User;
  type: string;
  addedBy: string;
  status: string;
  isDefault: boolean;
  favorite: boolean;
  slug: string;
  aboutMe: string;
  plans: any[];
  subscriptionStatus: string;
  subscriptionDue: any[];
  createdAt: string;
  updatedAt: string;
}

export interface User {
  _id: string;
  firstName: string;
  lastName: string;
  phoneNumber: number;
  emailId: string;
  hash: string;
  salt: string;
  role: string;
  isPhoneVerified: boolean;
  avatar: string;
  userName: string;
  status: string;
  subscribed: any[];
  notificationTokens: any[];
  createdAt: string;
  updatedAt: string;
}

export interface Plan {
  _id: string;
  name: string;
  duration: 'MONTH' | 'WEEK' | 'YEAR';
  interval: string;
  endDateDuration: string;
  endDateDurationCount: string;
  status: string;
  pricing: string;
  community: string;
  description: string;
  image: string | null;
  document: string | null;
  subscribers: any[];
  initialPayment: string;
  isSequenceAvailable: boolean;
  totalSequences: string;
  isExpiry: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

/** ---------------- API Constants ------------------ **/

const COMMUNITY_API_BASE = 'https://communn.io/api/v2.0/community';
const DOMAIN_API_BASE = 'https://communn.io/api/v2.0/domain';

/** ---------------- API Function ------------------ **/

export async function getCommunityData(hostOrSubdomain: string): Promise<CommunityResponse> {
  const cleanedHost = hostOrSubdomain.split(':')[0];
  let endpoint = '';

  const isCustomDomain =
    cleanedHost.includes('.') &&
    !cleanedHost.includes('localhost') &&
    !cleanedHost.includes('mycommunn.com');

  if (isCustomDomain) {
    endpoint = `${DOMAIN_API_BASE}/${cleanedHost}`;
  } else {
    const subdomain = cleanedHost.split('.')[0];
    endpoint = `${COMMUNITY_API_BASE}/by-subdomain/${subdomain}`;
  }
  try {
    const response = await axios.get<CommunityResponse>(endpoint);
    return response.data;
  } catch (error) {
    console.error('❌ Axios error fetching community:', error);

    return {
      status: false,
      community: {
        enabledService: {
          appointment: false,
          event: false,
          subscription: false,
          course: false,
          meeting: false,
          product: false,
          member: false,
          custompay: false,
        },
        _id: '',
        name: 'Unknown Community',
        category: '',
        description: '',
        zipCode: null,
        fullAddress: '',
        city: '',
        gstNumber: '',
        type: 'PRIVATE',
        collectSubscription: 'NO',
        createdBy: '',
        status: 'CREATED',
        banner: '',
        logo: '',
        gallery: [],
        members: [],
        maxMembers: 0,
        otherCategory: '',
        teams: [],
        faq: [],
        services: [],
        plans: [],
        course: [],
        appointments: [],
        slidings: [],
        testimonial: [],
        contactus: [],
        googleAuth: '',
        socialLinks: [],
        createdAt: '',
        updatedAt: '',
        template: 'default',
      },
    };
  }
}
