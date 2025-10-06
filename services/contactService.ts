import axios, { AxiosError } from "axios";
import { ContactForm } from "@/models/contact.model";

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
      "http://localhost:5002/api/v2.0/cms/send-cms_notification",
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
