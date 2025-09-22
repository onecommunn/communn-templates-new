import axios from "axios";

const BASE_URL = 'https://communn.io/api/v1';

export const getOtp = async (phoneNumber: string) => {
  try {
    const formData = new FormData();
    formData.append('phoneNumber', phoneNumber);
    const response = await axios.post(`${BASE_URL}/auth/otp/send`, formData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return { data: response.data, status: response.status };
  } catch (err: any) {
    if (err.response) {
      return { data: err.response.data, status: err.response.status };
    } else {
      return {
        status: 500,
        data: { message: 'Network error or something went wrong' },
      };
    }
  }
};

export const verifyOtp = async (phoneNumber: string, otp: string) => {
  try {
    const formData = new FormData();
    formData.append('phoneNumber', phoneNumber);
    formData.append('otp', otp.trim());
    const response = await axios.post(`${BASE_URL}/auth/otp/verify`, formData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response;
  } catch (err: any) {
    console.log('ERR:', err);
    return {
      status: 500,
      otp: undefined,
      verifyResponse: err.response || undefined,
    };
  }
};

export const sendOtpEmailService = async (emailId: string) => {
  try {
    const formData = new FormData();
    formData.append('emailId', emailId);
    const response = await axios.post(
      `${BASE_URL}/auth/otp/send-email`,
      formData,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    return response;
  } catch (err) {
    return { status: 500, data: [] };
  }
};

export const emailOtpVerify = async (emailId: string, otp: string) => {
  try {
    // console.log(token);
    const formData = new FormData();
    formData.append('emailId', emailId);
    formData.append('otp', otp.trim());
    const response = await axios.post(
      `${BASE_URL}/auth/otp/verify-email`,
      formData,
      {
        headers: {
          // Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    );
    return response;
  } catch (err) {
    console.log('ERR :', err);
    return { status: 500, data: undefined };
  }
};