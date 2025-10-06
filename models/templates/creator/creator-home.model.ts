// Root payload
export interface CreatorHomePage {
  templateId: "creator";
  pageName: "home";
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
  heading: string;
  subHeading?: string;
  order: number;
  isActive: boolean;
  media?: string[]; // URLs for slider images
  buttons?: Button[];
}

export type MediaPlacement = "left" | "right";

export interface TwoColumnSection {
  sectionName: "twoColumnSection";
  heading: string;
  subHeading?: string;
  title?: string;
  description?: string;
  order: number;
  isActive: boolean;
  mediaPlacement?: MediaPlacement;
  media?: string[];
  bulletes?: string[]; // NOTE: spelled as "bulletes" in API
  buttons?: Button[];
}

export interface OurBestsellersSection {
  sectionName: "ourBestSellers";
  heading: string;
  subHeading?: string;
  order: number;
  isActive: boolean;
}

export interface CollaborationSection {
  sectionName: "collaboration";
  heading:string
  description?: string;
  order: number;
  isActive: boolean;
  media?: string[]; // logo URLs
}

export interface TestimoniesSection {
  sectionName: "testimoniesSection";
  heading: string;
  subHeading?: string;
  order: number;
  isActive: boolean;
  testimonies: Testimony[];
}

export interface CTASection {
  sectionName: "ctaSection";
  title: string;
  description?: string;
  order: number;
  isActive: boolean;
  buttons?: Button[];
}

/** ---------------- Discriminated Union ---------------- */

export type HomeSection =
  | HeroSection
  | TwoColumnSection
  | OurBestsellersSection
  | CollaborationSection
  | TestimoniesSection
  | CTASection;

