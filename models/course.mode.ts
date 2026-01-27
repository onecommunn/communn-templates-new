import { TrainingPlan } from "./plan.model";

export interface Course {
  _id: string;
  community: {
    _id: string;
    name: string;
    type: string;
    status: string;
    logo: string;
  };
  createdBy: string;
  name: string;
  description: string;
  coverImage: {
    _id: string;
    type: string;
    value: string;
    label: string;
  };
  endDateDuration: string;
  endDateDurationCount: string;
  isPlanAvailable: boolean;
  plan: TrainingPlan[];
  status: string;
  sections: Section[];
  documents: Document[];
  instructorName: string;
  amount: string;
  isAmountAvailable: boolean;
  attendees: Attendee[];
  courseNotes: any[];
  links: CourseLink[];
  createdAt: string;
  updatedAt: string;
}

export interface Attendee {
  email: string;
  attendeeId: User;
  _id: string;
}

export interface User {
  _id: string;
  firstName: string;
  lastName: string;
  phoneNumber: number;
  emailId: string;
}

export interface Section {
  _id: string;
  name: string;
  description: string;
  createdBy: string;
  links: CourseLink[];
  documents: Document[];
}

export interface CourseLink {
  _id: string;
  name: string;
  value: string;
}

export interface Document {
  _id: string;
  type: string;
  value: string;
  label: string;
  createdAt?: string;
  updatedAt?: string;
}
