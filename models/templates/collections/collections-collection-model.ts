export interface CollectionsCollectionPage {
  templateId: "collections";
  pageName: "collections";
  status: "published" | "draft" | string;
  __v?: number;
  sections: CollectionSection[];
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

export interface ItemsSections extends SectionBase {
  sectionName: "itemsSections";
  content: {
    itembox: {
      isfeatured: boolean;
      price: string;
      media: string;
      title: string;
    }[];
  };
}

export type CollectionSection = HeroSection | ItemsSections;
