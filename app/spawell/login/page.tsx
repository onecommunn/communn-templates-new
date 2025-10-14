"use client";

import React, { useContext, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { AuthContext } from "@/contexts/Auth.context";
import { useOtp } from "@/hooks/useOtp";
import { getOtp, sendOtpEmailService, verifyOtp } from "@/services/otpService";
import { useCMS } from "../CMSProvider.client";
import { SpawellHomePage } from "@/models/templates/spawell/spawell-home-model";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/CustomComponents/CustomInputOtp";

const SpawellLogin = () => {
  const { home } = useCMS();
  const source: SpawellHomePage | undefined = home as SpawellHomePage | undefined;
  const primaryColor = source?.color?.primary || "#5D3222";
  const secondaryColor = source?.color?.secondary || "#fff";
  const neutralColor = source?.color?.neutral || "#F9F6F1";

  const [mobileNumber, setMobileNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState<"mobile" | "otp">("mobile");
  const [useEmail, setUseEmail] = useState(false);
  const [loading, setLoading] = useState(false);

  const [resendTimer, setResendTimer] = useState(0);
  const authContext = useContext(AuthContext);
  const router = useRouter();
  const { verifyEmailOtp } = useOtp();

  // Redirect authenticated users
  useEffect(() => {
    if (authContext?.isAuthenticated) router.push("/");
  }, [authContext?.isAuthenticated]);

  // Countdown timer for resend OTP
  useEffect(() => {
    if (resendTimer <= 0) return;
    const interval = setInterval(() => setResendTimer((t) => t - 1), 1000);
    return () => clearInterval(interval);
  }, [resendTimer]);

  // Input validation
  const isInputValid = () => {
    if (useEmail) return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(mobileNumber);
    return /^\d{10}$/.test(mobileNumber);
  };

  // Request OTP
  const requestOtp = async () => {
    if (!mobileNumber) {
      toast.error(`Please enter a valid ${useEmail ? "email" : "mobile number"}`);
      return;
    }

    setLoading(true);
    try {
      let response: any;
      if (useEmail) response = await sendOtpEmailService(mobileNumber);
      else response = await getOtp(mobileNumber);

      if (response?.status === 200) {
        toast.success(`OTP sent to your ${useEmail ? "email" : "mobile number"}`);
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

  // Handle login / OTP verification
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
        const res: any = await authContext.autoLogin(
          useEmail ? "" : mobileNumber,
          useEmail ? mobileNumber : "",
          null
        );

        if (res.status === 200) {
          toast.success("Login successful!");
          router.push("/");
        } else if (res.status === 500) {
          toast.error("User not found. Please sign up.");
          const queryKey = useEmail ? "email" : "mobile";
          router.push(`/sign-up?${queryKey}=${encodeURIComponent(mobileNumber)}`);
        } else toast.error("Login failed. Please try again.");
      } else if (verifyResponse.status === 500) {
        toast.error("User not found. Please sign up.");
        const queryKey = useEmail ? "email" : "mobile";
        router.push(`/sign-up?${queryKey}=${encodeURIComponent(mobileNumber)}`);
      } else toast.error("Invalid OTP. Please try again.");
    } catch (error) {
      toast.error("Verification failed. Please try again.");
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
      className="flex-grow flex h-[80vh] items-center justify-center py-12 px-4 bg-[#C2A74E1A]"
      style={
        {
          "--pri": primaryColor,
          "--sec": secondaryColor,
          "--neu": neutralColor,
        } as React.CSSProperties
      }
    >
      <div className="w-full max-w-md">
        <div className="rounded-lg shadow-md border p-8 bg-[#ffffff]">
          <h2
            className="text-3xl font-bold mb-8 text-center font-cormorant"
            style={{ color: primaryColor }}
          >
            Login
          </h2>

          {step === "mobile" ? (
            <div className="space-y-6">
              <div className="text-center mb-6">
                <button
                  onClick={toggleAuthMethod}
                  className="cursor-pointer underline font-plus-jakarta text-sm font-medium"
                  disabled={loading}
                  style={{ color: primaryColor }}
                >
                  {useEmail ? "Use Mobile No" : "Use Email ID"}
                </button>
              </div>

              <div>
                <label
                  className="block text-sm mb-2 font-plus-jakarta font-bold"
                  style={{ color: primaryColor }}
                >
                  {useEmail ? "Enter Email ID" : "Enter Mobile No"}
                </label>
                <div className="flex gap-3 flex-col">
                  <input
                    type={useEmail ? "email" : "tel"}
                    value={mobileNumber}
                    onChange={(e) =>
                      setMobileNumber(useEmail ? e.target.value : e.target.value.replace(/\D/g, ""))
                    }
                    placeholder={useEmail ? "Enter your email" : "Enter your mobile number"}
                    className="flex-1 px-4 py-2 border font-plus-jakarta border-gray-300 rounded-lg focus:ring-[#C2A74E] focus:outline-none focus:ring-2"
                    disabled={loading}
                    style={{ border: "1px solid #ddd", borderRadius: "6px", padding: "0.75rem 1rem" }}
                    onFocus={(e) => {
                      e.currentTarget.style.boxShadow = `0 0 0 3px ${primaryColor}10`;
                      e.currentTarget.style.borderColor = primaryColor;
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.boxShadow = "none";
                      e.currentTarget.style.borderColor = "#ddd";
                    }}
                  />

                  <button
                    onClick={handleGetOtp}
                    disabled={!isInputValid() || loading}
                    className={`text-white px-6 py-3 rounded-lg font-medium w-full ${
                      isInputValid() && !loading ? "" : "bg-gray-300 cursor-not-allowed"
                    }`}
                    style={{ backgroundColor: primaryColor }}
                  >
                    {loading ? "Sending..." : "Get OTP"}
                  </button>
                </div>
              </div>

              <p className="text-center text-sm text-gray-600 mt-8">
                Don't have an account?{" "}
                <Link href="/sign-up" className="font-medium text-[var(--pri)]">
                  Sign up now
                </Link>
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-4" style={{ color: primaryColor }}>
                  Enter OTP
                </label>
                <div className="flex justify-center">
                  <InputOTP maxLength={6} value={otp} onChange={setOtp} className="gap-2" disabled={loading}>
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
                className="w-full text-white py-3 font-medium rounded-lg"
                style={{ backgroundColor: primaryColor }}
              >
                {loading ? "Verifying..." : "Login"}
              </button>

              <div className="flex justify-center gap-4 mt-2">
                <button
                  onClick={handleResendOtp}
                  disabled={resendTimer > 0 || loading}
                  className={`text-sm underline font-medium ${
                    resendTimer > 0 ? "text-gray-400 cursor-not-allowed" : "text-[var(--pri)]"
                  }`}
                >
                  {resendTimer > 0 ? `Resend OTP in ${resendTimer}s` : "Resend OTP"}
                </button>
              </div>

              <div className="text-center mt-2">
                <button
                  onClick={() => setStep("mobile")}
                  className="text-sm cursor-pointer font-medium underline font-plus-jakarta"
                  disabled={loading}
                  style={{ color: primaryColor }}
                >
                  Change {useEmail ? "email" : "mobile number"}?
                </button>
              </div>

              <p className="text-center text-sm text-gray-600 mt-2">
                Don't have an account?{" "}
                <Link href="/sign-up" className="font-medium text-[var(--pri)]">
                  Sign up now
                </Link>
              </p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default SpawellLogin;
