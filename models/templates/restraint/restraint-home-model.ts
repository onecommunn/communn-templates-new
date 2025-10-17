export interface RestraintHomePage {
  templateId: "restraint";
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
    subheading: string;
  };
}

export interface HeroSection extends SectionBase {
  sectionName: "heroSection";
  content: {
    media: string[];
    title: string;
    heading: string;
    subheading?: string;
    description?: string;
    buttons?: Button[];
  };
}

export interface AboutSection extends SectionBase {
  sectionName: "aboutSection";
  content: {
    media: string[];
    title: string;
    heading: string;
    subheading?: string;
    description?: string;
    listItems?: { title: string; media: string; description: string }[];
    buttons?: Button[];
  };
}

export interface AppointmentSection extends SectionBase {
  sectionName: "appointmentSection";
  content: {
    media: string;
    title: string;
    heading: string;
    subheading?: string;
    appointmentTypes: {
      title: string;
      description: string;
      media?: string;
    }[];
    buttons?: Button[];
  };
}

export interface ServiceSection extends SectionBase {
  sectionName: "serviceSection";
  content: {
    media: string;
    title: string;
    heading: string;
    subheading?: string;
    services: {
      title: string;
      description: string;
      icon?: string;
    }[];
  };
}

export interface WhatWeDoSection extends SectionBase {
  sectionName: "whatWeDoSection";
  content: {
    title: string;
    heading: string;
    subheading?: string;
    description?: string;
    bullets?: string[];
    listItems?: {
      title: string;
      description: string;
      icon?: string;
    }[];
    buttons?: Button[];
    mainMedia?: string;
  };
}

export interface EventsSection extends SectionBase {
  sectionName: "eventsSection";
  content: {
    title: string;
    heading: string;
    subheading?: string;
    description?: string;
    eventItems: {
      title: string;
      description: string;
      date: string;
      price: string;
      media?: string;
    }[];
    stats?: {
      label: string;
      value: string | number;
    }[];
  };
}

export interface TestimonialSection extends SectionBase {
  sectionName: "testimonialSection";
  content: {
    title?: string;
    heading?: string;
    testimonials: {
      name: string;
      quote: string;
      avatar?: string;
      role?: string;
    }[];
  }
}

export interface FaqSection extends SectionBase {
  sectionName: "faqSection";
  content: {
    title?: string;
    heading?: string;
    faqs: {
      question: string;
      answer: string;
    }[];
  };
}

export interface BlogSection extends SectionBase {
  sectionName: "blogSection";
  content: {
    title?: string;
    heading?: string;
    posts: {
      title: string;
      excerpt: string;
      date?: string;
      author?: string;
      media?: string;
    }[];
  };
}

export interface FooterSection extends SectionBase {
  sectionName: "footerSection";
  content: {
    logo: string;
    tagline: string;
    socialLinks: {
      icon: string; // e.g., "pinterest", "facebook", "instagram"
      url: string;
    }[];
    quickLinks: {
      label: string;
      url: string;
    }[];
    services: {
      label: string;
      url: string;
    }[];
    contact: {
      phone: string;
      email: string;
      address: string;
    };
    newsletter: {
      heading: string;
      placeholder: string;
      buttonLabel: string;
    };
    copyright: string;
    bottomLinks: {
      label: string;
      url: string;
    }[];
  };
}

export interface VideoSection extends SectionBase {
  sectionName: "videoSection";
  content: {
    videoUrl: string;
    playButtonLabel: string;
    heading: string;
    readMore: {
      label: string;
      url: string;
    };
  };
}

export interface HowItWorksSection extends SectionBase {
  sectionName: "howItWorksSection";
  content: {
    heading: string;
    subHeading: string;
    steps: {
      number: number;
      title: string;
      description: string;
    }[];
    image: string; 
  };
}

export interface OurCoursesSection extends SectionBase {
  sectionName: "ourCoursesSection";
  content: {
    heading: string;
    subHeading: string;
    description: string;
    courses: {
      title: string;
      instructor: string;
      itemsCount: number;
      image: string; // URL or path to the course image
    }[];
  };
}

export interface OurPlansSection extends SectionBase {
  sectionName: "ourPlansSection";
  content: {
    heading: string;
    subHeading: string;
    description: string;
    plans: {
      title: string;
      price: string; 
      period: string; 
      thumbnail: string; 
      features: string[];
      button: {
        label: string;
        url: string;
      };
    }[];
  };
}

export type HomeSection =
  | Header
  | HeroSection
  | AboutSection
  | AppointmentSection
  | WhatWeDoSection
  | EventsSection
  | ServiceSection
  | VideoSection
  | HowItWorksSection
  | OurCoursesSection
  | OurPlansSection
  | TestimonialSection
  | FaqSection
  | BlogSection
  | FooterSection;

export interface Button {
  label: string;
  url: string;
}
