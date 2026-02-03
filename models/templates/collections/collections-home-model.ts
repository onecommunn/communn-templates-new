export interface CollectionsHomePage {
  templateId: "collections";
  pageName: "home";
  status: "published" | "draft" | string;
  __v?: number;
  sections: HomeSection[];
  color: {
    primary: string;
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

export interface Buttons {
  label: string;
  url: string;
}

export interface Header extends SectionBase {
  sectionName: "headerSection";
  content: {
    media: string[];
  };
}

export interface HeroSection extends SectionBase {
  sectionName: "heroSection";
  content: {
    carouse: {
      heading: string;
      description: string;
      buttons: Buttons;
      media: string;
    }[];
  };
}

export interface ScrollSection extends SectionBase {
  sectionName: "scrollSection";
  content: {
    items: string[];
  };
}

export interface CollectionsSection extends SectionBase {
  sectionName: "collectionsSection";
  content: {
    heading: string;
    description: string;
  };
}

export interface FeaturesSection extends SectionBase {
  sectionName: "featuresSection";
  content: {
    media: string;
    points: string[];
  };
}

export interface GallerySection extends SectionBase {
  sectionName: "gallerySection";
  content: {
    media: string[];
  };
}

export interface InstagramSection extends SectionBase {
  sectionName: "instagramSection";
  content: {
    instagramUrl: string;
  };
}

export interface FaqSection extends SectionBase {
  sectionName: "faqSection";
  content: {
    heading: string;
    description: string;
    media: string;
    faqItem: { question: string; answer: string }[];
  };
}

export interface FeatureStripSection extends SectionBase {
  sectionName: "featureStripSection";
  content: {
    chips: {
      text: string;
      image: string;
    }[];
  };
}

export interface CTAsection extends SectionBase {
  sectionName: "ctaSection";
  content: {
    media: string;
    heading: string;
    description: string;
    buttons: Buttons;
  };
}

export interface TestimoniesSection extends SectionBase {
  sectionName: "testimoniesSection";
  content: {
    heading: string;
    description: string;
    testimonies: {
      image: string;
      quote: string;
      name: string;
      country: string;
    }[];
  };
}

export interface FooterSection extends SectionBase {
  sectionName: "footerSection";
  content: {
    logo: string;
    description: string;
    socialMedia: SocialMediaLink[];
    copyrightText: string;
    contact: {
      phoneNumber: string;
      timing: string;
      email: string;
      location: string;
    };
  };
}

export type HomeSection =
  | Header
  | HeroSection
  | ScrollSection
  | CollectionsSection
  | FeaturesSection
  | FeatureStripSection
  | GallerySection
  | CTAsection
  | FaqSection
  | InstagramSection
  | TestimoniesSection
  | FooterSection;
