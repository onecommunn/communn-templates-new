"use client";
import { AuthContext } from "@/contexts/Auth.context";
import { useOtp } from "@/hooks/useOtp";
import { getOtp, sendOtpEmailService, verifyOtp } from "@/services/otpService";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/CustomComponents/CustomInputOtp";
import { useRouter } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";
import { toast } from "sonner";
import { useCMS } from "../CMSProvider.client";
import { SpawellHomePage } from "@/models/templates/spawell/spawell-home-model";

const SpawellLogin = () => {
  const { home } = useCMS();
  const isLoading = home === undefined;
  const source: SpawellHomePage | undefined = !isLoading
    ? (home as SpawellHomePage | undefined)
    : undefined;
  const primaryColor = source?.color?.primary || "#5D3222";
  const secondaryColor = source?.color?.secondary || "#fff";
  const neutralColor = source?.color?.neutral || "#F9F6F1";
  const [mobileNumber, setMobileNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState<"mobile" | "otp">("mobile");
  const [useEmail, setUseEmail] = useState(false);
  const [loading, setLoading] = useState(false);
  const authContext = useContext(AuthContext);
  const router = useRouter();
  const { verifyEmailOtp } = useOtp();
  useEffect(() => {
    if (authContext?.isAuthenticated) {
      router.push("/");
    }
  }, []);

  // console.log(authContext?.isAuthenticated, "authContext");

  const handleGetOtp = async () => {
    if (!mobileNumber) {
      toast.error(
        `Please enter a valid ${useEmail ? "email" : "mobile number"}`
      );
      return;
    }
    setLoading(true);
    try {
      let response: any;
      if (useEmail) {
        const token = localStorage.getItem("access-token") || "";
        response = await sendOtpEmailService(mobileNumber);
        console.log(response, "Response from email OTP service");
      } else {
        response = await getOtp(mobileNumber);
      }
      if (response?.status === 200) {
        toast.success(
          `OTP sent to your ${useEmail ? "email" : "mobile number"}`
        );
        setStep("otp");
      } else {
        toast.error(response.data?.message || "Failed to send OTP");
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleLoginResponse = async (response: any) => {
    if (response.status === 200) {
      toast.success("Login successful!");
      router.push("/");
    } else if (response.status === 404) {
      toast.error("User not found. Please sign up.");
      const encodedValue = encodeURIComponent(mobileNumber);
      const queryKey = useEmail ? "email" : "mobile";
      router.push(`/sign-up?${queryKey}=${encodedValue}`);
    } else {
      toast.error("Login failed. Please try again.");
    }
  };

  const handleLogin = async () => {
    if (otp.length !== 6) {
      toast.error("Please enter a valid 6-digit OTP");
      return;
    }
    setLoading(true);
    try {
      let verifyResponse: any;
      if (useEmail) {
        verifyResponse = await verifyEmailOtp(otp, mobileNumber);
      } else {
        verifyResponse = await verifyOtp(mobileNumber, otp);
      }
      console.log(verifyResponse, "verifyResponse");
      if (verifyResponse.status === 200) {
        const res: any = await authContext.autoLogin(
          useEmail ? "" : mobileNumber,
          useEmail ? mobileNumber : "",
          null
        );
        handleLoginResponse(res);
        console.log(res, "Response from auto login");
      } else {
        toast.error("Invalid OTP. Please try again.");
      }
    } catch (error) {
      toast.error("Verification failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const toggleAuthMethod = () => {
    setUseEmail(!useEmail);
    setMobileNumber("");
    setOtp("");
    setStep("mobile");
  };

  // const isValidMobile = (number: string): boolean => {
  //   const mobileRegex = /^[6-9]\d{9}$/;
  //   return mobileRegex.test(number);
  // };

  // const isValidEmail = (email: string): boolean => {
  //   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  //   return emailRegex.test(email);
  // };

  const isInputValid = () => {
    if (useEmail) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(mobileNumber);
    } else {
      return /^\d{10}$/.test(mobileNumber); // exactly 10 digits
    }
  };

  return (
    <>
      <main
        className="flex-grow flex h-[80vh] items-center justify-center py-12 px-4 bg-[#C2A74E1A]"
        // style={{ backgroundColor: `${primaryColor}1A` }}
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
                    className="block text-sm text-gray-600 mb-2 font-plus-jakarta font-bold"
                    style={{ color: primaryColor }}
                  >
                    {useEmail ? "Enter Email ID" : "Enter Mobile No"}
                  </label>
                  <div className="flex gap-3 flex-col">
                    <input
                      type={useEmail ? "email" : "tel"}
                      value={mobileNumber}
                      onChange={(e) => {
                        const input = e.target.value;
                        if (useEmail) {
                          setMobileNumber(input);
                        } else {
                          const numericOnly = input.replace(/\D/g, "");
                          setMobileNumber(numericOnly);
                        }
                      }}
                      placeholder={
                        useEmail
                          ? "Enter your email"
                          : "Enter your mobile number"
                      }
                      className="flex-1 px-4 py-2 border font-plus-jakarta border-gray-300 rounded-lg focus:ring-[#C2A74E] focus:outline-none focus:ring-2"
                      disabled={loading}
                      style={{
                        border: "1px solid #ddd",
                        borderRadius: "6px",
                        padding: "0.75rem 1rem",
                        outline: "none",
                        transition: "all 0.3s ease",
                      }}
                      onFocus={(e) => {
                        e.currentTarget.style.boxShadow = `0 0 0 3px ${primaryColor}10`; // 25% opacity
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
                      className={`${
                        isInputValid() && !loading
                          ? "bg-[#C2A74E] rounded-none cursor-pointer"
                          : "bg-gray-300 cursor-not-allowed"
                      } text-white px-6 py-3 rounded-lg font-medium w-full`}
                      style={{ backgroundColor: primaryColor }}
                    >
                      {loading ? "Sending..." : "Get OTP"}
                    </button>
                  </div>
                </div>

                {/* <p className="text-center text-sm text-gray-600 mt-8">
                Don't have an account?{" "}
                <Link
                  href="/sign-up"
                  className="font-medium text-[#FF6347] hover:text-[#FF6347]-dark"
                >
                  Sign up now
                </Link>
              </p> */}
              </div>
            ) : (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-4" style={{color:primaryColor}}>
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
                        <InputOTPSlot
                          index={0}
                          className="w-12 h-12 border-2 border-gray-300 rounded-lg text-center text-lg font-medium"
                        />
                        <InputOTPSlot
                          index={1}
                          className="w-12 h-12 border-2 border-gray-300 rounded-lg text-center text-lg font-medium"
                        />
                        <InputOTPSlot
                          index={2}
                          className="w-12 h-12 border-2 border-gray-300 rounded-lg text-center text-lg font-medium"
                        />
                        <InputOTPSlot
                          index={3}
                          className="w-12 h-12 border-2 border-gray-300 rounded-lg text-center text-lg font-medium"
                        />
                        <InputOTPSlot
                          index={4}
                          className="w-12 h-12 border-2 border-gray-300 rounded-lg text-center text-lg font-medium"
                        />
                        <InputOTPSlot
                          index={5}
                          className="w-12 h-12 border-2 border-gray-300 rounded-lg text-center text-lg font-medium"
                        />
                      </InputOTPGroup>
                    </InputOTP>
                  </div>
                </div>

                <button
                  onClick={handleLogin}
                  disabled={otp.length !== 6 || loading}
                  className="w-full bg-[#C2A74E] rounded-none cursor-pointer text-white py-3 font-medium"
                  style={{backgroundColor:primaryColor}}
                >
                  {loading ? "Verifying..." : "Login"}
                </button>

                <div className="text-center">
                  <button
                    onClick={() => setStep("mobile")}
                    className="text-sm text-gray-600 cursor-pointer font-medium underline font-plus-jakarta"
                    disabled={loading}
                    style={{color:primaryColor}}
                  >
                    Change {useEmail ? "email" : "mobile number"}?
                  </button>
                </div>

                {/* <p className="text-center text-sm text-gray-600">
                Don't have an account?{" "}
                <Link
                  href="/signup"
                  className="font-medium text-[#FF6347] hover:text-[#FF6347]-dark"
                >
                  Sign up now
                </Link>
              </p> */}
              </div>
            )}
          </div>
        </div>
      </main>
    </>
  );
};

export default SpawellLogin;
