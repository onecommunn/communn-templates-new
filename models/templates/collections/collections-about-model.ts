export interface CollectionsAboutPage {
  templateId: "collections";
  pageName: "aboutUs";
  status: "published" | "draft" | string;
  __v?: number;
  sections: AboutSection[];
  color: {
    primary: string;
  };
}

export interface SectionBase {
  order: number;
  isActive: boolean;
}

export interface Buttons {
  label: string;
  url: string;
}

export interface HeroSection extends SectionBase {
  sectionName: "heroSection";
  content: {
    heading: string;
    media: string;
  };
}

export interface TwoColumnSection extends SectionBase {
  sectionName: "twoColumnSection";
  content: {
    columnData: {
      media: string;
      heading: string;
      description: string;
      points?: string[];
      buttons: Buttons;
    }[];
  };
}

export interface PersonalizationSection extends SectionBase {
  sectionName: "personalizationSection";
  content: {
    heading: string;
    description: string;
    media: string;
    image: string;
    buttons: Buttons;
  };
}

export interface TestimoniesSection extends SectionBase {
  sectionName: "testimoniesSection";
  content: {
    heading: string;
    testimonies: {
      quote: string;
      name: string;
      designation: string;
      rating: number;
    }[];
  };
}

export type AboutSection =
  | HeroSection
  | TwoColumnSection
  | PersonalizationSection
  | TestimoniesSection;
