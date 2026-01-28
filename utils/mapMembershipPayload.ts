import { MemberPayload } from "@/models/templates/madivala/membership.model";

export const mapMemberToPayload = (m: any): MemberPayload => ({
  name: m.name,
  emailId: m.emailId,
  mobileNumber: m.mobileNumber,
  dateOfBirth: m.dob,
  caste: m.caste,
  subCaste: m.subCaste,
  city: m.city,
  profileImage: m.profileImage ? "https://photo.jpg" : "",
  document: m.document ? "https://upload.pdf" : "",
});
