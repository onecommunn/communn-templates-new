export interface SpawellHomePage {
  templateId: "spawell";
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
  /** Natural sort order of the section on the page */
  order: number;
  /** Toggle rendering */
  isActive: boolean;
}

export interface Header extends SectionBase {
  sectionName: "headerSection";
  content: {
    media: string[];
    heading: string;
    subHeading: string;
  };
}

export interface HeroSection extends SectionBase {
  sectionName: "heroSection";
  content: {
    heading: string;
    subHeading?: string;
    description?: string;
    media?: string[];
    buttons?: Button[];
    features: Features[];
  };
}

export interface AboutSection extends SectionBase {
  sectionName: "aboutSection";
  content: {
    heading: string;
    subHeading: string;
    description: string;
    bulletes: string[];
    buttons: Button[];
    teamCount: number;
    media: string[];
  };
}

export interface FeaturedAppointmentSection extends SectionBase {
  sectionName: "featuredAppointmentSection";
  content: {
    heading: string;
    subHeading: string;
    itemBox: { media: string; description: string }[];
    linkDescription: string;
    description: string;
  };
}

export interface AboutTwoSection extends SectionBase {
  sectionName: "aboutTwoSection";
  content: {
    heading: string;
    subHeading: string;
    description: string;
    services: { serviceName: string; media: string; description: string }[];
    media: string[];
  };
}

export interface ServiceSection extends SectionBase {
  sectionName: "serviceSection";
  content: {
    heading: string;
    subHeading: string;
    services: { serviceName: string; media: string; description: string }[];
    media: string[];
  };
}

export interface EventsSection extends SectionBase {
  sectionName: "eventsSection";
  content: {
    heading: string;
    subHeading: string;
  };
}

export interface WhyChooseUsSection extends SectionBase {
  sectionName: "whyChooseUsSection";
  content: {
    heading: string;
    subHeading: string;
    description: string;
    itemBox: { title: string; media: string; description: string }[];
    media: string[];
    buttons: Button[];
  };
}

export interface OurTeamSection extends SectionBase {
  sectionName: "ourTeamSection";
  content: {
    heading: string;
    subHeading: string;
    itemBox: { title: string; media: string; description: string }[];
  };
}

export interface Testimony {
  name: string;
  designation?: string;
  rating?: number;
  avatar?: string;
  message?: string;
}

export interface TestimoniesSection extends SectionBase {
  sectionName: "testimoniesSection";
  content: {
    heading: string;
    subHeading: string;
    testimonies: Testimony[];
    overallRating: number;
  };
}

export interface FaqSection extends SectionBase {
  sectionName: "faqSection";
  content: {
    heading: string;
    subHeading: string;
    description: string;
    itemBox: { title: string; description: string; media: string }[];
    faqItem: { question: string; answer: string }[];
  };
}

export interface ContactSection extends SectionBase {
  sectionName: "contactSection";
  content: {
    heading: string;
    subHeading: string;
    description: string;
    media: string[];
    availableTimings: { day: string; time: string }[];
  };
}

export interface PlansSection extends SectionBase {
  sectionName: "plansSection";
  content: { heading: string; subHeading: string };
}

export interface FooterSection extends SectionBase {
  sectionName: "footerSection";
  content: {
    logo: string;
    socialMedia: SocialMediaLink[];
    copyrightText: string;
    contact: {
      email: string;
      phoneNumber: string;
    };
  };
}

export type HomeSection =
  | Header
  | HeroSection
  | AboutSection
  | FeaturedAppointmentSection
  | AboutTwoSection
  | ServiceSection
  | EventsSection
  | WhyChooseUsSection
  | OurTeamSection
  | FaqSection
  | TestimoniesSection
  | ContactSection
  | PlansSection
  | FooterSection;

export interface Button {
  label: string;
  url: string;
}

export interface Features {
  icon: string;
  title: string;
}

export interface SocialMediaLink {
  platform: string;
  url: string;
}
