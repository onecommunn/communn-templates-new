import axios, { AxiosError } from "axios";
import { ContactForm } from "@/models/contact.model";
import { BASE_URL_V2 } from "@/configurations/url.config";

interface ApiResponse {
  status: number;
  message?: string;
  data?: any;
}

export const sendNotification = async (
  contactForm: ContactForm
): Promise<ApiResponse> => {
  try {
    const response = await axios.post<ApiResponse>(
      `${BASE_URL_V2}/cms/send-cms_notification`,
      contactForm
    );
    return response.data;
  } catch (error) {
    const err = error as AxiosError;

    console.error("Error sending notification:", err.response?.data || err.message);

    return {
      status: err.response?.status || 500,
      message: (err.response?.data as any)?.message || "Something went wrong",
      data: [],
    };
  }
};
