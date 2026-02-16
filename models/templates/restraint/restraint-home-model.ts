export interface RestarintHomePage {
  templateId: "restraint";
  pageName: "home";
  status: "published" | "draft" | string;
  __v?: number;
  sections: HomeSection[];
  color: {
    primary: string;
    secondary: string;
  };
}

export interface SectionBase {
  order: number;
  isActive: boolean;
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
    heading: string;
    subHeading: string;
    description: string;
    buttons: Button[];
    media: string;
  };
}

export interface AboutSection extends SectionBase {
  sectionName: "aboutSection";
  content: {
    heading: string;
    subHeading: string;
    description: string;
    features: {
      icon: string;
      title: string;
      description: string;
    }[];
    buttons: Button[];
    media: string;
  };
}

export interface EventsSection extends SectionBase {
  sectionName: "eventsSection";
  content: {
    heading: string;
    subHeading: string;
    description: string;
  };
}

export interface FeaturesSection extends SectionBase {
  sectionName: "featuresSection";
  content: {
    features: {
      icon: string;
      title: string;
      description: string;
    }[];
  };
}

export interface WhatWeDoSection extends SectionBase {
  sectionName: "whatWeDoSection";
  content: {
    heading: string;
    subHeading: string;
    description: string;
    bulletes: string[];
    features: {
      icon: string;
      title: string;
      description: string;
    }[];
    buttons: Button[];
    media: string[];
  };
}

export interface ServiceSection extends SectionBase {
  sectionName: "serviceSection";
  content: {
    heading: string;
    subHeading: string;
    buttons: Button[];
    media: string;
    services: Service[];
  };
}

export interface Service {
  serviceName: string;
  media: string;
  bgImage: string;
  description: string;
  sections: {
    title: string;
    tag: string;
    image: string;
    description: string;
  }[];
}

export interface HowItWorkSection extends SectionBase {
  sectionName: "howItWorkSection";
  content: {
    heading: string;
    subHeading: string;
    features: {
      title: string;
      description: string;
    }[];
    media: string;
  };
}

export interface PlansSection extends SectionBase {
  sectionName: "plansSection";
  content: { heading: string; subHeading: string; description: string };
}

export interface GallerySection extends SectionBase {
  sectionName: "gallerySection";
  content: {
    media: string[];
    bulletes: string[];
  };
}

export interface TestimoniesSection extends SectionBase {
  sectionName: "testimoniesSection";
  content: {
    heading: string;
    subHeading: string;
    media: string;
    testimonies: {
      name: string;
      designation: string;
      avatar: string;
      message: string;
      rating: number;
    }[];
    cta: {
      heading: string;
      description: string;
      clientCount: string;
    };
  };
}

export interface TeamSection extends SectionBase {
  sectionName: "teamSection";
  content: {
    title: string;
    heading: string;
    team: {
      name: string;
      role: string;
      description: string;
      imageUrl: string;
    }[];
  };
}

export interface FaqSection extends SectionBase {
  sectionName: "faqSection";
  content: {
    heading: string;
    subHeading: string;
    faqItem: { question: string; answer: string }[];
    phoneNumber: string;
    media: string;
  };
}

export interface ContactSection extends SectionBase {
  sectionName: "contactSection";
  content: {
    heading: string;
    subHeading: string;
    availableTimings: string[];
    contact: {
      address: string;
      phoneNumber: string;
      email: string;
    };
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
      email: string;
      address: string;
    };
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
  | AboutSection
  | EventsSection
  | WhatWeDoSection
  | ServiceSection
  | HowItWorkSection
  | PlansSection
  | GallerySection
  | TestimoniesSection
  | FaqSection
  | ContactSection
  | FooterSection
  | FeaturesSection
  | WhatsappWidgetSection
  | TeamSection;

export interface Button {
  label: string;
  url: string;
}

export interface SocialMediaLink {
  platform: string;
  url: string;
}
