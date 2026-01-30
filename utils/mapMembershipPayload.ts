import { MemberPayload } from "@/models/templates/madivala/membership.model";

export const mapMemberToPayload = (m: any): MemberPayload => ({
  name: m.name,
  emailId: m.emailId,
  mobileNumber: m.mobileNumber,
  dateOfBirth: m.dateOfBirth,
  caste: m.caste,
  subCaste: m.subCaste,
  city: m.city,
  profileImage: m.profileImage,
  document: m.document,
});
