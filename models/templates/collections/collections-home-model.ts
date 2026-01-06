export interface CollectionsHomePage {
  templateId: "collections";
  pageName: "home";
  status: "published" | "draft" | string;
  __v?: number;
  sections: HomeSection[];
  color: {
    primary: string;
  };
}

export interface SectionBase {
  order: number;
  isActive: boolean;
}

export interface SocialMediaLink {
  platform: string;
  url: string;
}

export interface Header extends SectionBase {
  sectionName: "headerSection";
  content: {
    media: string[];
  };
}

type HomeSection = Header;
