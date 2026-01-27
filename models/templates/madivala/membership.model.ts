// models/membership.model.ts

export interface MemberPayload {
  name: string;
  emailId: string;
  mobileNumber: string;
  dob: string; // dd/mm/yyyy
  caste: string;
  subCaste: string;
  city: string;
  profile?: string; // uploaded image URL
  document?: string; // uploaded document URL
}

export interface JoinMembershipPayload {
  community: string;
  primaryMember: MemberPayload;
  familyMember: MemberPayload[];
}
