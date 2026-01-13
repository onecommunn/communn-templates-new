import { BASE_URL_V2 } from "@/configurations/url.config";
import axios from "axios";

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
  type: "PRIVATE" | "PUBLIC";
  collectSubscription: "YES" | "NO";
  createdBy: string;
  status: "CREATED" | "ACTIVE" | "INACTIVE";
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
  requests: any[];
  mission: string;
  email: string;
  vision: string;
  directorMessage: string;
  phoneNumber: number;
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
  phoneNumber?: number;
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
  duration: "MONTH" | "WEEK" | "YEAR";
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

const COMMUNITY_API_BASE = `${BASE_URL_V2}/community`;
const DOMAIN_API_BASE = `${BASE_URL_V2}/domain`;

/** ---------------- API Function ------------------ **/

function extractHostname(input: string): string {
  // Accepts: full URL, host:port, plain host
  try {
    // If no protocol, prepend http:// so URL() can parse it
    const url = new URL(input.includes("://") ? input : `http://${input}`);
    return url.hostname.toLowerCase();
  } catch {
    // Fallback: strip path/port crud
    return input.split("/")[0].split(":")[0].trim().toLowerCase();
  }
}

function stripWww(host: string): string {
  return host.startsWith("www.") ? host.slice(4) : host;
}

export async function getCommunityData(
  hostOrSubdomain: string
): Promise<CommunityResponse> {
  const rawHost = extractHostname(hostOrSubdomain); // e.g. "www.website.com" or "sub.mycommunn.com"
  const cleanedHost = stripWww(rawHost); // e.g. "website.com" or "sub.mycommunn.com"

  // Consider localhost and IPs as non-custom (dev)
  const isLocal =
    cleanedHost === "localhost" ||
    cleanedHost.endsWith(".localhost") ||
    /^[0-9.]+$/.test(cleanedHost); // simple IPv4 check

  const isMyCommunn = cleanedHost.endsWith("mycommunn.com");

  const isCustomDomain = !isLocal && !isMyCommunn;

  let endpoint = "";
  if (isCustomDomain) {
    // Custom domain path (e.g., website.com)
    endpoint = `${DOMAIN_API_BASE}/${cleanedHost}`;
  } else {
    // Platform subdomain path (e.g., sub.mycommunn.com)
    const subdomain = cleanedHost.split(".")[0]; // "sub"
    endpoint = `${COMMUNITY_API_BASE}/by-subdomain/${subdomain}`;
  }
  try {
    const response = await axios.get<CommunityResponse>(endpoint);
    return response.data;
  } catch (error) {
    console.error("❌ Axios error fetching community:", error);

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
        _id: "",
        name: "Unknown Community",
        category: "",
        description: "",
        zipCode: null,
        fullAddress: "",
        city: "",
        gstNumber: "",
        type: "PRIVATE",
        collectSubscription: "NO",
        createdBy: "",
        status: "CREATED",
        banner: "",
        logo: "",
        gallery: [],
        members: [],
        maxMembers: 0,
        otherCategory: "",
        teams: [],
        faq: [],
        services: [],
        plans: [],
        course: [],
        appointments: [],
        slidings: [],
        testimonial: [],
        contactus: [],
        googleAuth: "",
        socialLinks: [],
        requests: [],
        createdAt: "",
        phoneNumber: 0,
        mission: "",
        directorMessage: "",
        vision: "",
        email:'',
        updatedAt: "",
        template: "default",
      },
    };
  }
}
