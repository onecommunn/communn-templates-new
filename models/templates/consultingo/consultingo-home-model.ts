export interface ConsultingoHomePage {
  templateId: "consultingo";
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
    heading: string;
    description: string;
    heroImage: string;
    floatingCards: {
      sessionCard: {
        date: string;
        month: string;
        title: string;
        subtitle: string;
        tag: string;
        detail: string;
      };
      successCard: {
        percentage: number;
        label: string;
      };
    };
    actions: {
      label: string;
      link: string;
    }[];
  };
}

export interface TrustedBySection extends SectionBase {
  sectionName: "trustedBySection";
  content: {
    heading: string;
    media: string[];
  };
}

export interface FeaturesSection extends SectionBase {
  sectionName: "featuresSection";
  content: {
    heading: string;
    features: {
      trackRecord: {
        title: string;
        description: string;
        link: {
          label: string;
          url: string;
        };
      };
      clients: {
        count: string;
        title: string;
        description: string;
        avatars: string[];
      };
      successHighlight: {
        title: string;
        description: string;
        backgroundImage: string;
        cta: {
          label: string;
          url: string;
        };
      };
      customSolutions: {
        title: string;
        description: string;
        image: string;
      };
    };
  };
}

export interface SustainabilitySection extends SectionBase {
  sectionName: "sustainabilitySection";
  content: {
    heading: string;
    experienceBadge: {
      value: string;
      label: string;
    };
    media: string[];
    accordionData: {
      title: string;
      content: string;
    }[];
  };
}

export interface ServicesSection extends SectionBase {
  sectionName: "servicesSection";
  content: {
    heading: string;
    services: {
      title: string;
      description: string;
      image: string;
      link: string;
    }[];
  };
}

export interface AppointmentSection extends SectionBase {
  sectionName: "appointmentSection";
  content: {
    heading: string;
  };
}

export interface PlansSection extends SectionBase {
  sectionName: "plansSection";
  content: {
    heading: string;
  };
}

export interface EventsSection extends SectionBase {
  sectionName: "eventsSection";
  content: {
    heading: string;
  };
}

export interface TestimonialSection extends SectionBase {
  sectionName: "testimonialSection";
  content: {
    heading: string;
    summary: {
      averageRating: number;
      totalReviews: string;
    };
    testimonials: {
      rating: number;
      quote: string;
      author: string;
      role: string;
      image: string;
    }[];
  };
}

export interface CtaSection extends SectionBase {
  sectionName: "ctaSection";
  content: {
    heading: string;
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
    socialMedia: { platform: string; url: string }[];
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
  | TrustedBySection
  | FeaturesSection
  | SustainabilitySection
  | ServicesSection
  | AppointmentSection
  | PlansSection
  | EventsSection
  | TestimonialSection
  | CtaSection
  | FooterSection
  | WhatsappWidgetSection;
