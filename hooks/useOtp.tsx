import React, { useContext, useState } from "react";
import { AuthContext, IAuthContext } from "../contexts/Auth.context";
import { emailOtpVerify, sendOtpEmailService } from "../services/otpService";

export const useOtp = () => {
  const { getAccessToken } = useContext<IAuthContext>(AuthContext);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  //   const sendOtpEmail = async (email: string) => {
  //     try {
  //       const response = await sendOtpEmailService(getAccessToken(), email);
  //       return response;
  //     } catch {
  //      console.error(`Error while sending OTP to email - ${email}`);
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   };

  const verifyEmailOtp = async (otp: string, email: string) => {
    try {
      const response = await emailOtpVerify(email, otp);
      return response;
    } catch {
      console.log(`Error while verifying OTP for email - ${email}`);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    //sendOtpEmail,
    verifyEmailOtp,
  };
};
