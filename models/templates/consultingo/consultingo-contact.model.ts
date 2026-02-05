export interface ConsultingoContactPage {
  templateId: "consultingo";
  pageName: "contact";
  status: "published" | "draft" | string;
  __v?: number;
  sections: ContactSectionMain[];
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

export interface ContactSection extends SectionBase {
  sectionName: "contactSection";
  content: {
    heading: string;
    description: string;
    contactDetails: {
      phone: string;
      email: string;
      address: string;
    };
    availableTimings: {
      day: string;
      time: string;
    }[];
    socialLinks: {
      platform: string;
      url: string;
    }[];
  };
}
export type ContactSectionMain = ContactSection;
