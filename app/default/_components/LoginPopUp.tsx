"use client";

import React, { useContext, useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { X } from "lucide-react";

import { AuthContext } from "@/contexts/Auth.context";
import { useOtp } from "@/hooks/useOtp";
import { getOtp, sendOtpEmailService, verifyOtp } from "@/services/otpService";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/CustomComponents/CustomInputOtp";

interface LoginPopUpProps {
  isOpen: boolean;
  onClose: () => void;
  redirectTo?: string | null;
}

const LoginPopUp = ({ isOpen, onClose, redirectTo }: LoginPopUpProps) => {
  const [mobileNumber, setMobileNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState<"mobile" | "otp">("mobile");
  const [useEmail, setUseEmail] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resendTimer, setResendTimer] = useState(0);

  const authContext = useContext(AuthContext);
  const router = useRouter();
  const { verifyEmailOtp } = useOtp();
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (resendTimer <= 0) return;
    const interval = setInterval(() => setResendTimer((t) => t - 1), 1000);
    return () => clearInterval(interval);
  }, [resendTimer]);

  if (!isOpen) return null;

  const isInputValid = () => {
    if (useEmail) return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(mobileNumber);
    return /^\d{10}$/.test(mobileNumber);
  };

  const requestOtp = async () => {
    if (!mobileNumber) {
      toast.error(
        `Please enter a valid ${useEmail ? "email" : "mobile number"}`
      );
      return;
    }
    setLoading(true);
    try {
      const response = useEmail
        ? await sendOtpEmailService(mobileNumber)
        : await getOtp(mobileNumber);

      if (response?.status === 200) {
        toast.success(
          `OTP sent to your ${useEmail ? "email" : "mobile number"}`
        );
        setStep("otp");
        setResendTimer(30);
      } else {
        toast.error(response?.data?.message || "Failed to send OTP");
      }
    } catch (err) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async () => {
    if (otp.length !== 6) {
      toast.error("Please enter a valid 6-digit OTP");
      return;
    }
    setLoading(true);
    try {
      const verifyResponse: any = useEmail
        ? await verifyEmailOtp(otp, mobileNumber)
        : await verifyOtp(mobileNumber, otp);

      if (verifyResponse.status === 200) {
        const res: any = await authContext.autoLogin(
          useEmail ? "" : mobileNumber,
          useEmail ? mobileNumber : "",
          null
        );

        if (res.status === 200) {
          toast.success("Login successful!");
          onClose(); // Close popup on success
          if (redirectTo) {
            router.push(redirectTo);
          }
        } else if (res.status === 404) {
          toast.error("User not found. Please sign up.");
          onClose();
          router.push(
            `/sign-up?${useEmail ? "email" : "mobile"}=${encodeURIComponent(
              mobileNumber
            )}`
          );
        } else {
          toast.error(res?.data?.message || "Login failed");
        }
      } else {
        toast.error("Invalid OTP");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      {/* Backdrop click to close */}
      <div className="absolute inset-0" onClick={onClose} />

      <div
        ref={modalRef}
        className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl border p-8 animate-in fade-in zoom-in duration-200"
      >
        <button
          onClick={onClose}
          className="absolute right-4 top-4 p-1 hover:bg-gray-100 rounded-full transition-colors"
        >
          <X size={20} className="text-gray-500" />
        </button>

        <h2 className="text-2xl font-bold mb-6 text-center font-montserrat text-gray-800">
          Login
        </h2>

        {step === "mobile" ? (
          <div className="space-y-5">
            <div className="text-center">
              <button
                onClick={() => {
                  setUseEmail(!useEmail);
                  setMobileNumber("");
                }}
                className="text-sm font-medium text-[#3056A7] hover:underline transition-all"
                disabled={loading}
              >
                {useEmail ? "Use Mobile Number" : "Use Email Address"}
              </button>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-gray-500">
                {useEmail ? "Email Address" : "Mobile Number"}
              </label>
              <input
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
                  useEmail ? "name@company.com" : "Enter 10 digit number"
                }
                className="w-full px-4 py-3 mt-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#3056A7] focus:outline-none transition-all"
                disabled={loading}
              />
            </div>

            <button
              onClick={requestOtp}
              disabled={!isInputValid() || loading}
              className="w-full cursor-pointer bg-[#3056A7] text-white py-3 rounded-xl font-semibold hover:bg-[#3056A7] disabled:bg-gray-300 disabled:cursor-not-allowed transition-all"
            >
              {loading ? "Sending..." : "Get OTP"}
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="text-center">
              <p className="text-sm text-gray-500">
                OTP sent to {mobileNumber}
              </p>
            </div>

            <div className="flex justify-center">
              <InputOTP
                maxLength={6}
                value={otp}
                onChange={setOtp}
                disabled={loading}
              >
                <InputOTPGroup className="gap-2">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <InputOTPSlot
                      key={i}
                      index={i}
                      className="w-11 h-12 border-2 border-gray-200 rounded-lg text-lg focus:border-[#3056A7]"
                    />
                  ))}
                </InputOTPGroup>
              </InputOTP>
            </div>

            <button
              onClick={handleLogin}
              disabled={otp.length !== 6 || loading}
              className="w-full bg-[#3056A7] text-white py-3 rounded-xl font-semibold hover:bg-[#3056A7] transition-all"
            >
              {loading ? "Verifying..." : "Confirm Login"}
            </button>

            <div className="flex flex-col items-center gap-3">
              <button
                onClick={requestOtp}
                disabled={resendTimer > 0 || loading}
                className={`text-sm font-medium underline ${
                  resendTimer > 0 ? "text-gray-400" : "text-[#3056A7]"
                }`}
              >
                {resendTimer > 0 ? `Resend in ${resendTimer}s` : "Resend OTP"}
              </button>
              <button
                onClick={() => setStep("mobile")}
                className="text-xs text-gray-400 hover:text-gray-600 underline"
              >
                Change {useEmail ? "Email" : "Number"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LoginPopUp;
