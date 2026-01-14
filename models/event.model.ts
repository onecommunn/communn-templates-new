export interface Event {
  oneHourReminderSent: boolean;
  oneDayReminderSent: boolean;
  _id: string;
  title: string;
  description: string;
  coverImage: CoverImage;
  availability: Availability[];
  meetingLink: string | null;
  googleEventId: string | null;
  location: string;
  community: {
    _id: string;
    name: string;
  };
  hostedBy: string;
  createdBy: User;
  pricing: number;
  isPaidService: boolean;
  limitCapacity: number;
  guestApproval: boolean;
  collectguestPayment: boolean;
  links: string;
  status: string;
  attendees: Attendee[];
  createdAt: string;
  updatedAt: string;
  plans: any[];
  isCustomLinkEnabled: boolean;
  customLink: string;
}

export interface CoverImage {
  _id: string;
  type: string;
  value: string;
  label: string;
  createdAt: string;
  updatedAt: string;
}

export interface Availability {
  day: string;
  availableTimes: AvailableTime[];
  _id: string;
}

export interface AvailableTime {
  startTime: string;
  endTime: string;
  _id: string;
}

export interface User {
  _id: string;
  firstName: string;
  lastName: string;
  phoneNumber: number;
  emailId: string;
}

export interface Attendee {
  email: string;
  attendeeId: User;
  _id: string;
}
