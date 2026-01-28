// services/membership.service.ts

import { BASE_URL_V2 } from "@/configurations/url.config";
import { JoinMembershipPayload } from "@/models/templates/madivala/membership.model";
import axios from "axios";

export type UploadedFile = {
  _id: string;
  value: string;
};
export const sendJoinMembershipRequest = async (
  payload: JoinMembershipPayload,
) => {
  return axios.post(`${BASE_URL_V2}/cms/send-user-request`, payload, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const uploadImage = async (
  file: File,
  fieldName: string = "teams",
): Promise<UploadedFile> => {
  const formData = new FormData();
  formData.append(fieldName, file);

  const res = await axios.post(
    `${BASE_URL_V2}/files/upload-single-file`,
    formData,
    {
      headers: {
        Authorization: `Bearer`,
        "Content-Type": "multipart/form-data",
      },
    },
  );

  return res.data;
};
