// Root payload
export interface CreatorContactPage {
  templateId: "creator";
  pageName: "contact";
  color: {
    primary: string;
    secondary: string;
  };
  sections: ContactSection[];
  status: "published" | "draft" | string;
  __v?: number;
}

/** ---------------- Shared Types ---------------- */

export interface Button {
  label: string;
  url: string;
}

export interface ContactField {
  heading: string;
  subHeading?: string;
  value: string;
}

/** ---------------- Section Types ---------------- */

// Contact details section
export interface ContactDetailsSection {
  sectionName: "contactSection";
  title: string;
  description?: string;
  order: number;
  isActive: boolean;
  email: ContactField;
  call: ContactField;
  address: ContactField;
}

// CTA Section (reusable from other pages)
export interface CTASection {
  sectionName: "ctaSection";
  content: {
    title: string;
    description?: string;
    buttons?: Button[];
  };
  order: number;
  isActive: boolean;
}

/** ---------------- Discriminated Union ---------------- */

export type ContactSection = ContactDetailsSection | CTASection;
