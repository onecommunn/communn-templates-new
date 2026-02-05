export interface ConsultingoAboutUsPage {
  templateId: "consultingo";
  pageName: "aboutUs";
  status: "published" | "draft" | string;
  __v?: number;
  sections: AboutSection[];
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

export interface HeroSection extends SectionBase {
  sectionName: "heroSection";
  content: {
    heading: string;
    description: string;
    media: string;
    statistics: {
      value: string;
      label: string;
    }[];
  };
}

export interface ValuesSection extends SectionBase {
  sectionName: "valuesSection";
  content: {
    heading: string;
    cards: {
      goalCard: {
        title: string;
        description: string;
        list: string[];
      };
      visionCard: {
        title: string;
        description: string;
        image: string;
        list: string[];
      };
      coreValues: {
        title: string;
        description: string;
        variant: "white" | "beige" | "dark";
      }[];
    };
  };
}

export interface FounderSection extends SectionBase {
  sectionName: "founderSection";
  content: {
    heading: string;
    founderName: string;
    description: string;
    media: string;
  };
}

export interface TeamSection extends SectionBase {
  sectionName: "teamSection";
  content: {
    heading: string;
    teamMembers: {
      name: string;
      role: string;
      image: string;
      socials: {
        facebook: string;
        twitter: string;
      };
    }[];
  };
}

export type AboutSection =
  | HeroSection
  | ValuesSection
  | FounderSection
  | TeamSection;
