export interface PhotographyAboutPage {
  templateId: "photography";
  pageName: "about";
  status: "published" | "draft" | string;
  __v?: number;
  sections: AboutSection[];
  color: {
    primary: string;
    secondary: string;
    neutral: string;
  };
}

export interface SectionBase {
  order: number;
  isActive: boolean;
}

export interface SocialMediaLink {
  platform: string;
  url: string;
}

export interface HeroSection extends SectionBase {
  sectionName: "heroSection";
  content: {
    badgeText: string;
    heading: string;
    image: string;
  };
}

export interface BioSection extends SectionBase {
  sectionName: "bioSection";
  content: {
    badgeText: string;
    name: string;
    designation: string;
    image: string;
    description: string;
    contacts: {
      type: "location" | "phone";
      value: string;
    }[];
  };
}

export interface HighlightsSection extends SectionBase {
  sectionName: "highlightsSection";
  content: {
    highlights: { icon: string; title: string; description: string }[];
  };
}

export type AboutSection = HeroSection | BioSection | HighlightsSection;
