export interface MartivoHomePage {
  templateId: "martivo";
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
    media: string[];
  };
}

export interface AboutSection extends SectionBase {
  sectionName: "aboutSection";
  content: {
    heading: string;
    description: string;
    subHeading: string;
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

export interface PlansSection extends SectionBase {
  sectionName: "plansSection";
  content: { heading: string; subHeading: string };
}
export interface EventsSection extends SectionBase {
  sectionName: "eventsSection";
  content: {
    heading: string;
    subHeading: string;
  };
}

export interface OurTeamSection extends SectionBase {
  sectionName: "ourTeamSection";
  content: {
    heading: string;
    subHeading: string;
    itemBox: {
      name: string;
      media: string;
      role: string;
    }[];
  };
}

export interface TestimoniesSection extends SectionBase {
  sectionName: "testimoniesSection";
  content: {
    heading: string;
    media: string;
    testimonies: {
      name: string;
      designation: string;
      avatar: string;
      message: string;
    }[];
    itemBox: {
      title: string;
      count: number;
    }[];
  };
}

export interface GallerySection extends SectionBase {
  sectionName: "gallerySection";
  content: {
    media: string[];
  };
}

export interface ContactSection extends SectionBase {
  sectionName: "contactSection";
  content: {
    heading: string;
    subHeading: string;
    description: string;
    availableTimings: string;
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
    socialMedia: {
      platform: string;
      url: string;
    }[];
    copyrightText: string;
    contact: {
      phoneNumber: string;
      email: string;
      address: string;
    };
  };
}

export type HomeSection =
  | Header
  | HeroSection
  | AboutSection
  | ServiceSection
  | PlansSection
  | EventsSection
  | OurTeamSection
  | TestimoniesSection
  | GallerySection
  | ContactSection
  | FooterSection;

export interface Button {
  label: string;
  url: string;
}

export interface SocialMediaLink {
  platform: string;
  url: string;
}
