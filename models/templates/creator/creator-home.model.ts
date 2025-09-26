// Root payload
export interface CreatorHomePage {
  templateId: "creator";
  pageName: "Home";
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
  sectionName: "Hero Section";
  heading: string;
  subHeading?: string;
  order: number;
  isActive: boolean;
  media?: string[]; // URLs for slider images
  buttons?: Button[];
}

export type MediaPlacement = "left" | "right";

export interface TwoColumnSection {
  sectionName: "Two Column Section";
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
  sectionName: "Our Bestsellers";
  heading: string;
  subHeading?: string;
  order: number;
  isActive: boolean;
}

export interface CollaborationSection {
  sectionName: "Collaboration";
  heading:string
  description?: string;
  order: number;
  isActive: boolean;
  media?: string[]; // logo URLs
}

export interface TestimoniesSection {
  sectionName: "Testimonies Section";
  heading: string;
  subHeading?: string;
  order: number;
  isActive: boolean;
  testimonies: Testimony[];
}

export interface CTASection {
  sectionName: "CTA Section";
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

