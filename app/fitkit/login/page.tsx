"use client";

import React, { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { AuthContext } from "@/contexts/Auth.context";
import { useOtp } from "@/hooks/useOtp";
import { getOtp, sendOtpEmailService, verifyOtp } from "@/services/otpService";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/CustomComponents/CustomInputOtp";
import { Input } from "@/components/ui/input";
import { useCMS } from "../CMSProvider.client";
import { dummyData } from "../dummyData";
import { FitkitHomePage } from "@/models/templates/fitkit/fitkit-home-model";
import { useUsers } from "@/hooks/useUsers";

const FitkitLogin = () => {
  const { home } = useCMS();
  const isLoading = home === undefined;
  const source: FitkitHomePage | undefined = !isLoading
    ? (home as FitkitHomePage | undefined) ?? dummyData
    : undefined;

  const primaryColor = source?.color?.primary || "#141414";
  const secondaryColor = source?.color?.secondary || "#F41E1E";
  const [mobileNumber, setMobileNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState<"mobile" | "otp">("mobile");
  const [useEmail, setUseEmail] = useState(false);
  const [loading, setLoading] = useState(false);

  const [resendTimer, setResendTimer] = useState(0);
  const authContext = useContext(AuthContext);
  const router = useRouter();
  const { verifyEmailOtp } = useOtp();
  const { loadUserPlans } = useUsers();

  useEffect(() => {
    if (authContext?.isAuthenticated) router.push("/");
  }, [authContext?.isAuthenticated]);

  useEffect(() => {
    if (resendTimer <= 0) return;
    const interval = setInterval(() => setResendTimer((t) => t - 1), 1000);
    return () => clearInterval(interval);
  }, [resendTimer]);

  const isInputValid = () => {
    if (useEmail) return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(mobileNumber);
    return /^\d{10}$/.test(mobileNumber);
  };

  // Request OTP
  const requestOtp = async () => {
    if (!mobileNumber) {
      toast.error(
        `Please enter a valid ${useEmail ? "email" : "mobile number"}`
      );
      return;
    }

    setLoading(true);
    try {
      let response: any;
      if (useEmail) response = await sendOtpEmailService(mobileNumber);
      else response = await getOtp(mobileNumber);

      if (response?.status === 200) {
        toast.success(
          `OTP sent to your ${useEmail ? "email" : "mobile number"}`
        );
        setStep("otp");
        setResendTimer(30); // 30-second cooldown for resend
      } else {
        toast.error(response?.data?.message || "Failed to send OTP");
      }
    } catch (err) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleGetOtp = () => requestOtp();

  // Resend OTP
  const handleResendOtp = () => {
    if (resendTimer > 0) return;
    requestOtp();
  };

  const handleLogin = async () => {
    if (otp.length !== 6) {
      toast.error("Please enter a valid 6-digit OTP");
      return;
    }

    setLoading(true);
    try {
      let verifyResponse: any;
      if (useEmail) verifyResponse = await verifyEmailOtp(otp, mobileNumber);
      else verifyResponse = await verifyOtp(mobileNumber, otp);

      if (verifyResponse.status === 200) {
        let res: any = null;
        res = await authContext.autoLogin(
          useEmail ? "" : mobileNumber,
          useEmail ? mobileNumber : "",
          null
        );

        console.log(res, "res");

        if (res.status === 200) {
          toast.success("Login successful!");
          await new Promise((resolve) => setTimeout(resolve, 50));

          const response = await loadUserPlans(
            res?.data?.user?.id,
            authContext?.communityId
          );
          const plansList = response?.subscriptionDetail ?? [];
          if (plansList.length > 0) {
            router.push(`/profile?id=${res?.data?.user?.id}`);
          } else {
            router.push("/");
          }
        } else if (res.status === 403) {
          toast.error(
            "We regret to inform you that your account has been temporarily deactivated. Please contact the Administrator."
          );
        } else if (res.status === 404) {
          toast.error("User not found. Please sign up.");
          const queryKey = useEmail ? "email" : "mobile";
          router.push(
            `/sign-up?${queryKey}=${encodeURIComponent(mobileNumber)}`
          );
        } else toast.error("Login failed. Please try again.");

        if (res?.response?.status === 401) {
          toast.error("Incorrect Password/Username.");
        } else if (res?.response?.status === 404) {
          toast.error("User not Found, check your Account Credentials");
        }
      } else toast.error("Invalid OTP");
    } finally {
      setLoading(false);
    }
  };

  // Toggle email/mobile login
  const toggleAuthMethod = () => {
    setUseEmail(!useEmail);
    setMobileNumber("");
    setOtp("");
    setStep("mobile");
  };

  return (
    <main
      className="flex-grow flex h-[85vh] pb-2 items-center justify-center  font-archivo  bg-[var(--sec)]  border-t border-[#383D46]"
      style={
        {
          "--pri": primaryColor,
          "--sec": secondaryColor,
        } as React.CSSProperties
      }
    >
      <div className="bg-[var(--pri)] font-kanit h-[85vh] z-0 hero-clip [clip-path:inherit] w-full flex justify-center items-center">
        <div className="rounded-none shadow-md p-8 text-[#ffffff] w-full max-w-xl border border-[var(--sec)] mx-6 md:mx-0">
          <h2 className="font-semibold text-3xl md:text-5xl text-white text-center">
            Login
          </h2>

          {step === "mobile" ? (
            <div className="space-y-6">
              <div className="text-center my-6">
                <button
                  onClick={toggleAuthMethod}
                  className="cursor-pointer underline text-sm font-medium text-[var(--sec)]"
                  disabled={loading}
                  // style={{ color: primaryColor }}
                >
                  {useEmail ? "Use Mobile No" : "Use Email ID"}
                </button>
              </div>

              <div>
                <label
                  className="block text-sm mb-2 font-bold"
                  // style={{ color: primaryColor }}
                >
                  {useEmail ? "Enter Email ID" : "Enter Mobile No"}
                </label>
                <div className="flex gap-3 flex-col">
                  <Input
                    type={useEmail ? "email" : "tel"}
                    value={mobileNumber}
                    onChange={(e) =>
                      setMobileNumber(
                        useEmail
                          ? e.target.value
                          : e.target.value.replace(/\D/g, "")
                      )
                    }
                    placeholder={
                      useEmail ? "Enter your email" : "Enter your mobile number"
                    }
                    className="w-full  border col-span-12 border-[var(--sec)]/20 md:col-span-4 rounded-none h-12 placeholder:text-[#6B7586] text-white md:text-lg px-[30px] font-archivo"
                    disabled={loading}
                    // style={{
                    //   border: "1px solid #ddd",
                    //   borderRadius: "6px",
                    //   padding: "0.75rem 1rem",
                    // }}
                  />

                  <button
                    onClick={handleGetOtp}
                    disabled={!isInputValid() || loading}
                    className={`text-white px-6 py-3 bg-[var(--sec)] cursor-pointer rounded-none uppercase font-medium w-full ${
                      isInputValid() && !loading
                        ? ""
                        : "bg-[var(--sec)]/80 cursor-not-allowed"
                    }`}
                    // style={{ backgroundColor: primaryColor }}
                  >
                    {loading ? "Sending..." : "Get OTP"}
                  </button>
                </div>
              </div>

              {/* <p className="text-center text-sm text-gray-600 mt-8">
                Don't have an account?{" "}
                <Link href="/sign-up" className="font-medium text-[var(--pri)]">
                  Sign up now
                </Link>
              </p> */}
            </div>
          ) : (
            <div className="space-y-6">
              <div>
                <label
                  className="block text-sm font-medium mb-4"
                  // style={{ color: primaryColor }}
                >
                  Enter OTP
                </label>
                <div className="flex justify-center">
                  <InputOTP
                    maxLength={6}
                    value={otp}
                    onChange={setOtp}
                    className="gap-2"
                    disabled={loading}
                  >
                    <InputOTPGroup>
                      {Array.from({ length: 6 }).map((_, i) => (
                        <InputOTPSlot
                          key={i}
                          index={i}
                          className="w-12 h-12 border-2 border-gray-300 rounded-lg text-center text-lg font-medium"
                        />
                      ))}
                    </InputOTPGroup>
                  </InputOTP>
                </div>
              </div>

              <button
                onClick={handleLogin}
                disabled={otp.length !== 6 || loading}
                className="text-white px-6 py-3 bg-[#f60000] cursor-pointer rounded-none uppercase font-medium w-full"
                // style={{ backgroundColor: primaryColor }}
              >
                {loading ? "Verifying..." : "Login"}
              </button>

              <div className="flex justify-center gap-4 mt-2">
                <button
                  onClick={handleResendOtp}
                  disabled={resendTimer > 0 || loading}
                  className={`text-sm underline font-medium ${
                    resendTimer > 0
                      ? "text-gray-400 cursor-not-allowed"
                      : "text-[var(--pri)]"
                  }`}
                >
                  {resendTimer > 0
                    ? `Resend OTP in ${resendTimer}s`
                    : "Resend OTP"}
                </button>
              </div>

              <div className="text-center mt-2">
                <button
                  onClick={() => setStep("mobile")}
                  className="text-sm cursor-pointer font-medium underline"
                  disabled={loading}
                  // style={{ color: primaryColor }}s
                >
                  Change {useEmail ? "email" : "mobile number"}?
                </button>
              </div>

              {/* <p className="text-center text-sm text-gray-600 mt-2">
                Don't have an account?{" "}
                <Link href="/sign-up" className="font-medium text-[var(--pri)]">
                  Sign up now
                </Link>
              </p> */}
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default FitkitLogin;
