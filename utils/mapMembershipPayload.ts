// utils/mapMembershipPayload.ts

import { MemberPayload } from "@/models/templates/madivala/membership.model";

export const mapMemberToPayload = (m: any): MemberPayload => ({
  name: m.fullName,
  emailId: m.email,
  mobileNumber: m.mobile,
  dob: m.dob, // already string
  caste: m.caste,
  subCaste: m.subCaste,
  city: m.city,
  profile: m.profileImage ? "https://photo.jpg" : "", // replace after upload
  document: m.documents ? "https://upload.pdf" : "", // replace after upload
});
