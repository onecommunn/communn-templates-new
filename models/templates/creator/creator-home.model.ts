// Root payload
export interface CreatorHomePage {
  templateId: "creator";
  pageName: "home";
  color: {
    primary: string;
    secondary: string;
  };
  sections: HomeSection[];
  status: "published" | "draft" | string;
  __v?: number;
}

/** ---------------- Shared Types ---------------- */

export interface Button {
  label: string;
  url: string; // relative or absolute URL
}

export interface Testimony {
  name: string;
  designation: string;
  rating: number;
  avatar: string; // URL
  message: string;
}

/** ---------------- Section Types ---------------- */

export interface HeroSection {
  sectionName: "heroSection";
  content: {
    heading: string;
    subHeading?: string;
    media?: string[]; // URLs for slider images
    buttons?: Button[];
  };
  order: number;
  isActive: boolean;
}

export type MediaPlacement = "left" | "right";

export interface TwoColumnSection {
  sectionName: "twoColumnSection";
  content: {
    heading: string;
    subHeading?: string;
    title?: string;
    description?: string;
    mediaPlacement?: MediaPlacement;
    media?: string[];
    bulletes?: string[]; // NOTE: spelled as "bulletes" in API
    buttons?: Button[];
  };
  order: number;
  isActive: boolean;
}

export interface OurBestsellersSection {
  sectionName: "ourBestSellers";
  content: {
    heading: string;
    subHeading?: string;
  };
  order: number;
  isActive: boolean;
}

export interface CollaborationSection {
  sectionName: "collaboration";
  content: {
    heading: string;
    description?: string;
    media?: string[]; // logo URLs
  };
  order: number;
  isActive: boolean;
}

export interface TestimoniesSection {
  sectionName: "testimoniesSection";
  content: {
    heading: string;
    subHeading?: string;
    testimonies: Testimony[];
  };
  order: number;
  isActive: boolean;
}

export interface CTASection {
  sectionName: "ctaSection";
  content: { title: string; description?: string; buttons?: Button[] };
  order: number;
  isActive: boolean;
}

/** ---------------- Discriminated Union ---------------- */

export type HomeSection =
  | HeroSection
  | TwoColumnSection
  | OurBestsellersSection
  | CollaborationSection
  | TestimoniesSection
  | CTASection;
