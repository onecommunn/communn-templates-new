// Root payload
export interface CreatorContactPage {
  templateId: "creator";
  pageName: "Contact";
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
  sectionName: "Contact details";
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
  sectionName: "CTA Section";
  title: string;
  description?: string;
  order: number;
  isActive: boolean;
  buttons?: Button[];
}

/** ---------------- Discriminated Union ---------------- */

export type ContactSection = ContactDetailsSection | CTASection;
