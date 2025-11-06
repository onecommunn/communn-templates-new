import { BASE_URL_V2 } from "@/configurations/url.config";
import axios, { AxiosError } from "axios";

export const createPauseSubscription = async (
  subscriptionId: string,
  pauseDays: number,
  sequenceId: string,
  startDate: string,
    token: string
) => {
  try {
    const response = await axios.post(
      `${BASE_URL_V2}/subscriptions/${subscriptionId}/add-user-pausedays`,
      {
        pauseDays,
        sequenceId,
        startDate
      },
       {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    );
    return response;
  } catch (err: AxiosError | any) {
    if (err.response) {
      return {
        status: err.response.status,
        data: err.response.data,
      };
    }
    return { status: 500, data: [] };
  }
};