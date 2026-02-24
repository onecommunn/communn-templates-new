export interface PhotographyHomePage {
  templateId: "photography";
  pageName: "home";
  status: "published" | "draft" | string;
  __v?: number;
  sections: HomeSection[];
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

export interface Header extends SectionBase {
  sectionName: "headerSection";
  content: {
    media: string[];
  };
}

export interface HeroSection extends SectionBase {
  sectionName: "heroSection";
  content: {
    images: string[];
    branding: string;
    heading: {
      main: string;
      highlight: string;
    };
    subtitle: string;
    buttons: {
      primary: {
        label: string;
        href: string;
      };
      secondary: {
        label: string;
        href: string;
      };
    };
  };
}

export interface MovingcollageSection extends SectionBase {
  sectionName: "movingcollagesection";
  content: {
    badgeText: string;
    heading: string;
    images: string[];
  };
}

export interface YouTubeShowreelSection extends SectionBase {
  sectionName: "youTubeShowreelSection";
  content: {
    badgeText: string;
    heading: string;
    videos: { embedUrl: string; title: string }[];
  };
}

export interface StatscounterSection extends SectionBase {
  sectionName: "statscounterSection";
  content: {
    stats: { icon: string; value: string; label: string }[];
  };
}

export interface ServicespreviewSection extends SectionBase {
  sectionName: "servicespreviewSection";
  content: {
    badgeText: string;
    heading: string;
    services: {
      title: string;
      image: string;
      description: string;
    }[];
  };
}

export interface FeaturedworkSection extends SectionBase {
  sectionName: "featuredworkSection";
  content: {
    badgeText: string;
    heading: {
      main: string;
      highlight: string;
    };
    description: string;
    button: {
      label: string;
      link: string;
    };
    images: string[]; // max 4 images
    bgImage: string;
  };
}

export interface TestimonialsSection extends SectionBase {
  sectionName: "testimonialsSection";
  content: {
    badgeText: string;
    heading: string;
    testimonials: {
      name: string;
      text: string;
      rating: number;
    }[];
  };
}

export interface CTASection extends SectionBase {
  sectionName: "ctaSection";
  content: {
    heading: string;
    description: string;
    bgImage: string;
    button: {
      label: string;
      link: string;
    };
  };
}

export interface FooterSection extends SectionBase {
  sectionName: "footerSection";
  content: {
    logo: string;
    description: string;
    addresses: string[];
    socialMedia: { platform: string; url: string }[];
    copyRightText: string;
    phoneNumbers: string[];
  };
}

export interface WhatsappWidgetSection extends SectionBase {
  sectionName: "whatsappWidgetSection";
  content: {
    callNumber: string;
    predefinedMessage: string;
    whatsappNumber: string;
  };
}

export type HomeSection =
  | Header
  | HeroSection
  | MovingcollageSection
  | YouTubeShowreelSection
  | StatscounterSection
  | ServicespreviewSection
  | FeaturedworkSection
  | TestimonialsSection
  | CTASection
  | FooterSection
  | WhatsappWidgetSection;
