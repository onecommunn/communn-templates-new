// Root payload
export interface CreatorHeaderPage {
  color: {
    primary: string;
    secondary: string;
  };
  templateId: "creator";
  pageName: "header";
  sections: HeaderSection[];
  status: "published" | "draft" | string;
  __v?: number;
}

/** ---------------- Shared Types ---------------- */

export interface HeaderButton {
  label: string;
  url: string;
}

/** ---------------- Section Types ---------------- */

export interface HeaderSection {
  sectionName: "headerSection";
  order: number;
  isActive: boolean;
  content: {
    media?: string[]; // image URLs
    buttons?: HeaderButton[];
  };
}
