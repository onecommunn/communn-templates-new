export interface PhotograpyContactPage {
  templateId: "photography";
  pageName: "contact";
  status: "published" | "draft" | string;
  __v?: number;
  sections: ContactPageSection[];
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

export interface ContactSection extends SectionBase {
  sectionName: "contactSection";
  content: {
    phoneNumbers: string[];
    whatsappNumber: string[];
    email: string[];
    branches: {
      title: string;
      address: string;
      mapUrl: string;
      embedUrl: string;
    }[];
  };
}

export type ContactPageSection = HeroSection | ContactSection;
