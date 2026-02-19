export interface PhotographyServicePage {
  templateId: "photography";
  pageName: "services";
  status: "published" | "draft" | string;
  __v?: number;
  sections: ServicesSection[];
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

export interface ServiceSection extends SectionBase {
  sectionName: "serviceSection";
  content: {
    services: {
      title: string;
      image: string;
      description: string;
    }[];
  };
}

export type ServicesSection = HeroSection | ServiceSection;
