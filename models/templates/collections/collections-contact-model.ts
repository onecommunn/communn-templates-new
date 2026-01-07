export interface CollectionsContactPage {
  templateId: "collections";
  pageName: "contactUs";
  status: "published" | "draft" | string;
  __v?: number;
  sections: ContactSection[];
  color: {
    primary: string;
  };
}

export interface SectionBase {
  order: number;
  isActive: boolean;
}

export interface Buttons {
  label: string;
  url: string;
}

export interface HeroSection extends SectionBase {
  sectionName: "heroSection";
  content: {
    heading: string;
    media: string;
  };
}

export interface ContactInfoSection extends SectionBase {
  sectionName: "contactInfoSection";
  content: {
    heading: string;
    description: string;
    contact: {
      phoneNumber: string;
      email: string;
      location: string;
      website: string;
      googleMapLink: string;
    };
  };
}

export interface ContactFormSection extends SectionBase {
  sectionName: "contactFormSection";
  content: {
    heading: string;
    description: string;
  };
}

export interface CTASection extends SectionBase {
  sectionName: "ctaSection";
  content: {
    heading: string;
    description: string;
    media: string;
    buttons: Buttons;
  };
}
export type ContactSection =
  | HeroSection
  | ContactInfoSection
  | CTASection
  | ContactFormSection;
