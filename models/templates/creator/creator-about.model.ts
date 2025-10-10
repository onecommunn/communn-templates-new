// Root payload
export interface CreatorAboutPage {
  templateId: "creator";
  pageName: "about";
  color: {
    primary: string;
    secondary: string;
  };
  sections: AboutSection[];
  status: "published" | "draft" | string;
  __v?: number;
}

/** ---------------- Shared Types ---------------- */

export type MediaPlacement = "left" | "right";

export interface SectionBase {
  /** Natural sort order of the section on the page */
  order: number;
  /** Toggle rendering */
  isActive: boolean;
}

export interface TimelineItem {
  title: string;
  description: string;
}

export interface TeamMember {
  name: string;
  designation: string;
  avatar: string; // URL
  description?: string;
}

export interface CTAButton {
  label: string;
  url: string; // URL
}

/** ---------------- Section Types ---------------- */

// "Two Column Section"
export interface TwoColumnSection extends SectionBase {
  sectionName: "twoColumnSection";
  content: {
    heading: string;
    subHeading?: string;
    title?: string;
    description?: string;
    story?: string;
    mediaPlacement?: MediaPlacement;
    media?: string[];
    bulletes?: string[];
    mission?: string;
    vision?: string;
  };
}

// "Journey Timeline"
export interface JourneyTimelineSection extends SectionBase {
  sectionName: "journeyTimelineSection";
  heading: string;
  subHeading?: string;
  timeline: TimelineItem[];
}

// "Our Team"
export interface OurTeamSection extends SectionBase {
  sectionName: "ourTeamSection";
  heading: string;
  subHeading?: string;
  members: TeamMember[];
}

// "CTA Section"
export interface CTASection extends SectionBase {
  sectionName: "ctaSection";
  content: { title: string; description?: string; buttons?: CTAButton[] };
}

/** ---------------- Discriminated Union ---------------- */

export type AboutSection =
  | TwoColumnSection
  | JourneyTimelineSection
  | OurTeamSection
  | CTASection;
