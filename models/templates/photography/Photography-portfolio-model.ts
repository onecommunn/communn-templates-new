export interface PhotographyProtfolioPage {
  templateId: "photography";
  pageName: "portfolio";
  status: "published" | "draft" | string;
  __v?: number;
  sections: PortfolioSection[];
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

export interface GallerySection extends SectionBase {
  sectionName: "gallerySection";
  content: {
    categories: string[];
    photos: { imageUrl: string; category: string }[];
  };
}

export type PortfolioSection = HeroSection;
