// Root payload
export interface CreatorFooterPage {
  templateId: "creator";
  pageName: "footer";
  color: {
    primary: string;
    secondary: string;
  };
  sections: FooterSection[];
  status: "published" | "draft" | string;
  __v?: number;
}

/** ---------------- Shared Types ---------------- */

export interface FooterLink {
  label: string;
  url: string;
}

export interface NavigationColumn {
  heading: string;
  links: FooterLink[];
}

export interface SocialMedia {
  platform: string;
  url: string;
}

/** ---------------- Section Types ---------------- */


export interface FooterSection {
  sectionName: "footerSection";
  content: {
    logo: string; // URL
    navigationColumns: NavigationColumn[];
    socialMedia?: SocialMedia[];
    copyrightText?: string;
  };
  order: number;
  isActive: boolean;
}
