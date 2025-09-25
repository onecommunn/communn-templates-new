// Root payload
export interface CreatorHeaderPage {
  templateId: "creator";
  pageName: "Header";
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
  sectionName: "Header";
  order: number;
  isActive: boolean;
  media?: string[]; // image URLs
  buttons?: HeaderButton[];
}
