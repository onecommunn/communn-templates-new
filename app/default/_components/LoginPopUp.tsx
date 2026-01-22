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

type Mode = "login" | "signup";
type Step = "mobile" | "otp" | "signup";

const LoginPopUp = ({ isOpen, onClose, redirectTo }: LoginPopUpProps) => {
  // LOGIN (OTP) STATE
  const [identifier, setIdentifier] = useState(""); // mobile or email
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState<Step>("mobile");
  const [mode, setMode] = useState<Mode>("login");
  const [useEmail, setUseEmail] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resendTimer, setResendTimer] = useState(0);

  // SIGNUP STATE (same as your RestraintSignupPage)
  const [signupData, setSignupData] = useState({
    firstName: "",
    phoneNumber: "",
    emailId: "",
  });

  const [touched, setTouched] = useState({
    firstName: false,
    phoneNumber: false,
    emailId: false,
  });

  const [submitted, setSubmitted] = useState(false);

  const authContext = useContext(AuthContext);
  const router = useRouter();
  const { verifyEmailOtp } = useOtp();
  const modalRef = useRef<HTMLDivElement>(null);

  // Reset state whenever popup opens
  useEffect(() => {
    if (!isOpen) return;

    setIdentifier("");
    setOtp("");
    setStep("mobile");
    setMode("login");
    setUseEmail(false);
    setLoading(false);
    setResendTimer(0);
    setSubmitted(false);
    setTouched({ firstName: false, phoneNumber: false, emailId: false });
    setSignupData({ firstName: "", phoneNumber: "", emailId: "" });
  }, [isOpen]);

  useEffect(() => {
    if (resendTimer <= 0) return;
    const interval = setInterval(() => setResendTimer((t) => t - 1), 1000);
    return () => clearInterval(interval);
  }, [resendTimer]);

  if (!isOpen) return null;

  // ---------- VALIDATIONS ----------
  const isEmailValid = /^\S+@\S+\.\S+$/.test(signupData.emailId);
  const isMobileValid = /^[6-9]\d{9}$/.test(signupData.phoneNumber);
  const isNameValid = signupData.firstName.trim().length >= 2;
  const isSignupFormValid = isNameValid && isEmailValid && isMobileValid;

  const showError = (field: keyof typeof touched, isValid: boolean) =>
    (touched[field] || submitted) && !isValid;

  const isIdentifierValid = () => {
    if (useEmail) return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(identifier);
    return /^\d{10}$/.test(identifier);
  };

  // ---------- OTP ----------
  const requestOtp = async () => {
    if (!isIdentifierValid()) {
      toast.error(`Please enter a valid ${useEmail ? "email" : "mobile number"}`);
      return;
    }

    setLoading(true);
    try {
      const response = useEmail
        ? await sendOtpEmailService(identifier)
        : await getOtp(identifier);

      if (response?.status === 200) {
        toast.success(`OTP sent to your ${useEmail ? "email" : "mobile number"}`);
        setStep("otp");
        setResendTimer(30);

        // Pre-fill signup values for convenience
        if (useEmail) {
          setSignupData((p) => ({ ...p, emailId: identifier }));
        } else {
          setSignupData((p) => ({ ...p, phoneNumber: identifier }));
        }
      } else {
        toast.error(response?.data?.message || "Failed to send OTP");
      }
    } catch (err) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const verifyOtpAndLogin = async () => {
    if (otp.length !== 6) {
      toast.error("Please enter a valid 6-digit OTP");
      return;
    }

    setLoading(true);
    try {
      const verifyResponse: any = useEmail
        ? await verifyEmailOtp(otp, identifier)
        : await verifyOtp(identifier, otp);

      if (verifyResponse?.status !== 200) {
        toast.error("Invalid OTP");
        return;
      }

      // OTP verified -> attempt login
      const res: any = await authContext.autoLogin(
        useEmail ? "" : identifier,
        useEmail ? identifier : "",
        null
      );

      if (res?.status === 200) {
        toast.success("Login successful!");
        onClose();
        if (redirectTo) router.push(redirectTo);
        else router.push("/");
        return;
      }

      if (res?.status === 404) {
        // Switch to signup mode (inside popup)
        toast.error("User not found. Please sign up.");
        setMode("signup");
        setStep("signup");

        // helpful defaults
        if (useEmail) {
          setSignupData((p) => ({ ...p, emailId: identifier }));
        } else {
          setSignupData((p) => ({ ...p, phoneNumber: identifier }));
        }
        return;
      }

      toast.error(res?.data?.message || "Login failed");
    } catch (e) {
      toast.error("Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // ---------- SIGNUP ----------
  const handleSignupChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === "phoneNumber") {
      const numericValue = value.replace(/\D/g, "");
      if (numericValue.length > 10) return;
      setSignupData((prev) => ({ ...prev, phoneNumber: numericValue }));
      return;
    }

    setSignupData((prev) => ({
      ...prev,
      [name]: value.trimStart(),
    }));
  };

  const handleBlur = (field: keyof typeof touched) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  const handleSignup = async () => {
    setSubmitted(true);
    if (!isSignupFormValid) return;

    setLoading(true);
    try {
      const payload = JSON.stringify(signupData);
      const response: any = await authContext.autoCreate(payload);

      if (response?.status === 200) {
        toast.success("Account created successfully");
        onClose();
        if (redirectTo) router.push(redirectTo);
        else router.push("/");
        return;
      }

      if (response?.status === 404) {
        toast.error("User not found. Please try again.");
        return;
      }

      toast.error(response?.data?.message || "Signup failed. Please try again.");
    } catch (err) {
      toast.error("Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const title =
    mode === "login"
      ? "Login"
      : mode === "signup"
        ? "Create Account"
        : "Login";

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      {/* Backdrop click */}
      <div className="absolute inset-0" onClick={onClose} />

      <div
        ref={modalRef}
        className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl border p-8 animate-in fade-in zoom-in duration-200"
      >
        <button
          onClick={onClose}
          className="absolute right-4 top-4 p-1 hover:bg-gray-100 rounded-full transition-colors cursor-pointer"
          aria-label="Close"
        >
          <X size={20} className="text-gray-500" />
        </button>

        <h2 className="text-2xl font-bold mb-6 text-center font-montserrat text-gray-800">
          {title}
        </h2>

        {/* ---------------- LOGIN FLOW ---------------- */}
        {mode === "login" && step !== "signup" && (
          <>
            {step === "mobile" ? (
              <div className="space-y-5">
                <div className="text-center">
                  <button
                    onClick={() => {
                      setUseEmail(!useEmail);
                      setIdentifier("");
                      setOtp("");
                      setStep("mobile");
                    }}
                    className="text-sm font-medium text-[#3056A7] hover:underline transition-all cursor-pointer"
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
                    value={identifier}
                    onChange={(e) =>
                      setIdentifier(
                        useEmail
                          ? e.target.value
                          : e.target.value.replace(/\D/g, "")
                      )
                    }
                    placeholder={useEmail ? "name@company.com" : "Enter 10 digit number"}
                    className="w-full px-4 py-3 mt-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#3056A7] focus:outline-none transition-all"
                    disabled={loading}
                  />
                </div>

                <button
                  onClick={requestOtp}
                  disabled={!isIdentifierValid() || loading}
                  className="w-full cursor-pointer bg-[#3056A7] text-white py-3 rounded-xl font-semibold hover:bg-[#2a4d98] disabled:bg-gray-300 disabled:cursor-not-allowed transition-all"
                >
                  {loading ? "Sending..." : "Get OTP"}
                </button>

              </div>
            ) : (
              <div className="space-y-6">
                <div className="text-center">
                  <p className="text-sm text-gray-500">
                    OTP sent to {identifier}
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
                  onClick={verifyOtpAndLogin}
                  disabled={otp.length !== 6 || loading}
                  className="w-full bg-[#3056A7] text-white py-3 cursor-pointer rounded-xl font-semibold hover:bg-[#2a4d98] transition-all disabled:bg-gray-300 disabled:cursor-not-allowed"
                >
                  {loading ? "Verifying..." : "Confirm Login"}
                </button>

                <div className="flex flex-col items-center gap-3">
                  <button
                    onClick={requestOtp}
                    disabled={resendTimer > 0 || loading}
                    className={`text-sm font-medium underline cursor-pointer ${
                      resendTimer > 0 ? "text-gray-400" : "text-[#3056A7]"
                    }`}
                  >
                    {resendTimer > 0 ? `Resend in ${resendTimer}s` : "Resend OTP"}
                  </button>

                  <button
                    onClick={() => {
                      setStep("mobile");
                      setOtp("");
                    }}
                    className="text-xs text-gray-400 hover:text-gray-600 underline cursor-pointer"
                    disabled={loading}
                  >
                    Change {useEmail ? "Email" : "Number"}
                  </button>
                </div>
              </div>
            )}
          </>
        )}

        {/* ---------------- SIGNUP FLOW ---------------- */}
        {(mode === "signup" || step === "signup") && (
          <div className="space-y-6">
            {/* Name */}
            <div>
              <label className="block text-sm text-gray-700 font-semibold mb-2">
                Full Name
              </label>
              <input
                type="text"
                name="firstName"
                value={signupData.firstName}
                onChange={handleSignupChange}
                onBlur={() => handleBlur("firstName")}
                placeholder="Enter your full name"
                className={`w-full px-4 py-3 border ${
                  showError("firstName", isNameValid)
                    ? "border-red-500"
                    : "border-gray-300"
                } rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3056A7]`}
                disabled={loading}
              />
              {showError("firstName", isNameValid) && (
                <p className="text-sm text-red-500 mt-1">
                  Name must be at least 2 characters
                </p>
              )}
            </div>

            {/* Mobile */}
            <div>
              <label className="block text-sm text-gray-700 font-semibold mb-2">
                Mobile Number
              </label>
              <input
                type="tel"
                name="phoneNumber"
                value={signupData.phoneNumber}
                onChange={handleSignupChange}
                onBlur={() => handleBlur("phoneNumber")}
                placeholder="Enter your mobile number"
                className={`w-full px-4 py-3 border ${
                  showError("phoneNumber", isMobileValid)
                    ? "border-red-500"
                    : "border-gray-300"
                } rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3056A7]`}
                disabled={loading}
              />
              {showError("phoneNumber", isMobileValid) && (
                <p className="text-sm text-red-500 mt-1">
                  Enter valid 10-digit mobile number
                </p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm text-gray-700 font-semibold mb-2">
                Email Address
              </label>
              <input
                type="email"
                name="emailId"
                value={signupData.emailId}
                onChange={handleSignupChange}
                onBlur={() => handleBlur("emailId")}
                placeholder="Enter your email"
                className={`w-full px-4 py-3 border ${
                  showError("emailId", isEmailValid)
                    ? "border-red-500"
                    : "border-gray-300"
                } rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3056A7]`}
                disabled={loading}
              />
              {showError("emailId", isEmailValid) && (
                <p className="text-sm text-red-500 mt-1">Enter a valid email</p>
              )}
            </div>

            <button
              onClick={handleSignup}
              disabled={!isSignupFormValid || loading}
              className={`w-full py-3 rounded-xl font-semibold transition-all ${
                isSignupFormValid && !loading
                  ? "bg-[#3056A7] text-white hover:bg-[#2a4d98]"
                  : "bg-gray-300 text-white cursor-not-allowed"
              }`}
            >
              {loading ? "Submitting..." : "Save & Continue"}
            </button>

            <div className="text-center">
              <button
                onClick={() => {
                  setMode("login");
                  setStep("mobile");
                  setSubmitted(false);
                  setTouched({ firstName: false, phoneNumber: false, emailId: false });
                }}
                className="text-sm font-medium text-gray-500 hover:underline"
                disabled={loading}
              >
                Already have an account? Login
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LoginPopUp;
