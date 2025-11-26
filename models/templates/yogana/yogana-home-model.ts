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
  content: {
    media?: string[];
  };
  order: number;
  isActive: boolean;
}

export interface HeroSection {
  sectionName: "heroSection";
  content: {
    heading: string;
    subHeading?: string;
    tagLine?: string;
    description?: string;
    media?: string[]; // URLs for slider images
    buttons?: Button[];
  };
  order: number;
  isActive: boolean;
}

export interface Aboutus {
  sectionName: "aboutSection";
  content: {
    heading: string;
    subHeading?: string;
    description?: string;
    media?: string[];
    bulletes?: string[];
    buttons?: Button[];
  };
  order: number;
  isActive: boolean;
}

export interface Service {
  serviceName: string;
  description: string;
  media: string;
}

export interface ServiceSection {
  sectionName: "serviceSection";
  content: {
    heading: string;
    subHeading?: string;
    services: Service[];
  };
  order: number;
  isActive: boolean;
}

export interface Service {
  serviceName: string;
  media: string;
  bgImage: string;
  description: string;
  sections: {
    title: string;
    tag: string;
    image: string;
    description: string;
  }[];
}

export interface Plans {
  sectionName: "plansSection";
  content: {
    heading: string;
    subHeading?: string;
  };
  order: number;
  isActive: boolean;
}

export interface Events {
  sectionName: "eventsSection";
  content: {
    heading: string;
    subHeading?: string;
  };
  order: number;
  isActive: boolean;
}

export interface Collaboration {
  sectionName: "clientsSection";
  content: {
    heading: string;
    media: string[];
  };
  order: number;
  isActive: boolean;
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
  content: {
    heading: string;
    subHeading?: string;
    testimonies?: Testimony[];
  };
  order: number;
  isActive: boolean;
}

export interface Gallery {
  sectionName: "gallerySection";
  content: { heading: string; media?: string[] };
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
  content: {
    heading: string;
    subHeading: string;
    email: ContactField;
    call: ContactField;
    address: ContactField;
  };
  order: number;
  isActive: boolean;
}

export interface CTASection {
  sectionName: "whatsappSection";
  content: { heading: string; subHeading: string; buttons?: Button[] };
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
  content: {
    logo: string;
    socialMedia: SocialMediaLink[];
    contentDescription: Timming[];
    copyrightText: string;
    description: string;
  };
  media: string[];
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
