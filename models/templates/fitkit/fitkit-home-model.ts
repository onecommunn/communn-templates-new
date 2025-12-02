export interface FitkitHomePage {
  templateId: "fitkit";
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
    carouse: {
      bgMedia: string[];
      media: string[];
      tagline: string;
      line1: string;
      line2: string;
      description: string;
      buttons: Button[];
      statValue: string;
      statLabel: string;
    }[];
  };
}

export interface AboutSection extends SectionBase {
  sectionName: "aboutSection";
  content: {
    heading: string;
    description: string;
    buttons: Button[];
    media: string[];
    bulletes: string[];
  };
}

export interface ServiceSection extends SectionBase {
  sectionName: "serviceSection";
  content: {
    heading: string;
    services: Service[];
  };
}

export interface Service {
  serviceName: string;
  media: string;
  description: string;
  sections: {
    title: string;
    tag: string;
    image: string;
    description: string;
  }[];
}

export interface EventsSection extends SectionBase {
  sectionName: "eventSection";
  content: {
    heading: string;
  };
}

export interface PlansSection extends SectionBase {
  sectionName: "plansSection";
  content: { heading: string };
}

export interface Whychooseus extends SectionBase {
  sectionName: "whychooseus";
  content: {
    heading: string;
    description: string;
    bulletes: string[];
    buttons: Button[];
    media: string;
  };
}

export interface OurTeamSection extends SectionBase {
  sectionName: "ourTeamSection";
  content: {
    heading: string;
    features: Features[];
  };
}

export interface GallerySection extends SectionBase {
  sectionName: "gallerySection";
  content: {
    media: string[];
  };
}

export interface TestimoniesSection extends SectionBase {
  sectionName: "testimoniesSection";
  content: {
    testimonies: {
      name: string;
      designation: string;
      media: string[];
      bgMedia: string[];
      message: string;
      rating: number;
    }[];
  };
}

export interface ContactSection extends SectionBase {
  sectionName: "contactSection";
  content: {
    availableTimings: string[];
    contact: {
      address: string;
      phoneNumber: string;
      email: string;
      mapUrl:string
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
  | ServiceSection
  | EventsSection
  | PlansSection
  | Whychooseus
  | OurTeamSection
  | GallerySection
  | TestimoniesSection
  | ContactSection
  | FooterSection
  | WhatsappWidgetSection;

export interface Button {
  label: string;
  url: string;
}

export interface Features {
  image: string;
  title: string;
  description: string;
}
export interface SocialMediaLink {
  platform: string;
  url: string;
}
