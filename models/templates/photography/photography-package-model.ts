export interface PhotographyPackagesPage {
  templateId: "photography";
  pageName: "packages";
  status: "published" | "draft" | string;
  __v?: number;
  sections: PackagesSection[];
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

export interface PreWeddingPackagesSection extends SectionBase {
  sectionName: "preWeddingPackagesSection";
  content: {
    heading: string;
    preWeddingPackages: {
      name: string;
      price: string;
      features: string[];
      popular: boolean;
    }[];
  };
}

export interface WeddingPackageSection extends SectionBase {
  sectionName: "weddingPackageSection";
  content: {
    heading: string;
    weddingPackages: {
      name: string;
      price: string;
      features: string[];
      popular: boolean;
    }[];
  };
}

export interface PricingSection extends SectionBase {
  sectionName: "pricingSection";
  content: {
    tables: {
      title: string;
      columnOneLabel: string;
      columnTwoLabel: string;
      items: { label: string; price: string }[];
    }[];
  };
}

export interface PackageTCsection extends SectionBase {
  sectionName: "packageTCsection";
  content: {
    heading: string;
    terms: string[];
  };
}

export type PackagesSection =
  | HeroSection
  | PreWeddingPackagesSection
  | WeddingPackageSection
  | PricingSection
  | PackageTCsection;
