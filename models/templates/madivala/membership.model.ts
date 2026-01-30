export interface MemberPayload {
  name: string;
  emailId: string;
  mobileNumber: string;
  dateOfBirth: string;
  caste: string;
  subCaste: string;
  city: string;
  profileImage?: string;
  document?: string;
  adharCard?: string;
}

export interface JoinMembershipPayload {
  community: string;
  primaryMember: MemberPayload;
  familyMember: MemberPayload[];
}
