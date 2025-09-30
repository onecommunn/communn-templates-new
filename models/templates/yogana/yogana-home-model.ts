export interface YoganaHomePage {
  templateId: "yogana";
  pageName: "home";
  sections: HomeSection[];
  status: "published" | "draft" | string;
  __v?: number;
}

export interface Button {
  label: string;
  url: string; // relative or absolute URL
}

export interface Header {
  sectionName: "Header";
  order: number;
  isActive: boolean;
  media?: string[];
}

export interface HeroSection {
  sectionName: "Hero Section";
  heading: string;
  subHeading?: string;
  description?: string;
  order: number;
  isActive: boolean;
  media?: string[]; // URLs for slider images
  buttons?: Button[];
}

export interface Aboutus {
  sectionName: "About us";
  heading: string;
  subHeading?: string;
  description?: string;
  order: number;
  isActive: boolean;
  media?: string[];
  bulletes?: string[];
  buttons?: Button[];
}

export interface Service {
  serviceName: string;
  description: string;
  media: string;
}

export interface ServiceSection {
  sectionName: "Service section";
  heading: string;
  subHeading?: string;
  order: number;
  isActive: boolean;
  services: Service[];
}

export interface Plans {
  sectionName: "Plans";
  heading: string;
  subHeading?: string;
  order: number;
  isActive: boolean;
}

export interface Events {
  sectionName: "Events";
  heading: string;
  subHeading?: string;
  order: number;
  isActive: boolean;
}

export interface Collaboration {
  sectionName: "Collaboration logos section";
  heading: string;
  order: number;
  isActive: boolean;
  media: string[];
}

export interface Testimony {
  name: string;
  designation?: string;
  rating?: number;
  avatar?: string;
  message?: string;
}

export interface TestimoniesSection {
  sectionName: "Testimonies Section";
  heading: string;
  subHeading?: string;
  testimonies?: Testimony[];
  order: number;
  isActive: boolean;
}

export interface Gallery {
  sectionName: "Gallery";
  media?: string[];
  order: number;
  isActive: boolean;
}

export interface ContactField {
  heading: string;
  subHeading?: string;
  value: string;
}

export interface ContactDetails {
  sectionName: "Contact details";
  heading: string;
  subHeading: string;
  email: ContactField;
  call: ContactField;
  order: number;
  isActive: boolean;
  address: ContactField;
}

export interface CTASection {
  sectionName: "Whatsapp join";
  heading: string;
  subHeading: string;
  buttons?: Button[];
  order: number;
  isActive: boolean;
}

export interface SocialMediaLink {
  platform: string;
  url: string;
}
export interface Timming {
  title: string;
  description: string;
}
export interface FooterSection {
  footer: {
    logo: string;
    socialMedia: SocialMediaLink[];
    contentDescription: Timming[];
    copyrightText: string;
  };
  order: number;
  isActive: boolean;
  sectionName: "Footer Section";
}

export type HomeSection =
  | Header
  | HeroSection
  | Aboutus
  | ServiceSection
  | Plans
  | Events
  | Collaboration
  | TestimoniesSection
  | Gallery
  | ContactDetails
  | CTASection
  | FooterSection;
