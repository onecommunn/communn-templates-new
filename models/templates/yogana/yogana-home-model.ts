export interface YoganaHomePage {
  templateId: "yogana";
  pageName: "home";
  sections: HomeSection[];
  status: "published" | "draft" | string;
  __v?: number;
  color: {
    primary: string;
    secondary: string;
    neutral: string;
  };
}

export interface Button {
  label: string;
  url: string;
}

export interface Header {
  sectionName: "headerSection";
  order: number;
  isActive: boolean;
  media?: string[];
}

export interface HeroSection {
  sectionName: "heroSection";
  heading: string;
  subHeading?: string;
  tagLine?: string;
  description?: string;
  order: number;
  isActive: boolean;
  media?: string[]; // URLs for slider images
  buttons?: Button[];
}

export interface Aboutus {
  sectionName: "aboutSection";
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
  sectionName: "serviceSection";
  heading: string;
  subHeading?: string;
  order: number;
  isActive: boolean;
  services: Service[];
}

export interface Plans {
  sectionName: "plansSection";
  heading: string;
  subHeading?: string;
  order: number;
  isActive: boolean;
}

export interface Events {
  sectionName: "eventsSection";
  heading: string;
  subHeading?: string;
  order: number;
  isActive: boolean;
}

export interface Collaboration {
  sectionName: "clientsSection";
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
  sectionName: "testimoniesSection";
  heading: string;
  subHeading?: string;
  testimonies?: Testimony[];
  order: number;
  isActive: boolean;
}

export interface Gallery {
  sectionName: "gallerySection";
  heading: string;
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
  sectionName: "contactSection";
  heading: string;
  subHeading: string;
  email: ContactField;
  call: ContactField;
  order: number;
  isActive: boolean;
  address: ContactField;
}

export interface CTASection {
  sectionName: "whatsappSection";
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
  sectionName: "footerSection";
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
