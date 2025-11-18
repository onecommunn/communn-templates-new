"use client";
import { Input } from "@/components/ui/input";
import { AuthContext } from "@/contexts/Auth.context";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";
import { toast } from "sonner";

const FitKitSignupPage = () => {
  const [formData, setFormData] = useState({
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
  const [isLoading, setIsLoading] = useState(false);
  const authContext = useContext(AuthContext);
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const mobileFromQuery = searchParams.get("mobile");
    const emailFromQuery = searchParams.get("email");

    if (authContext.isAuthenticated) {
      router.push("/");
    }

    if (mobileFromQuery) {
      setFormData((prev) => ({ ...prev, phoneNumber: mobileFromQuery }));
    } else if (emailFromQuery) {
      setFormData((prev) => ({ ...prev, emailId: emailFromQuery }));
    }
  }, [searchParams]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;

    if (name === "phoneNumber") {
      const numericValue = value.replace(/\D/g, "");
      if (numericValue.length > 10) return;
      setFormData((prev) => ({ ...prev, [name]: numericValue }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: type === "checkbox" ? e.target.checked : value.trimStart(),
      }));
    }
  };

  const handleBlur = (field: keyof typeof touched) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  const handleLoginResponse = async (response: any) => {
    if (response.status === 200) {
      toast.success("Account created successfully");
      router.push("/");
    } else if (response.status === 404) {
      toast.error("User not found. Please try again.");
    } else {
      toast.error("Signup failed. Please try again.");
    }
  };

  const handleSignup = async () => {
    setSubmitted(true);

    if (!isFormValid) return;

    const data = JSON.stringify(formData);
    try {
      setIsLoading(true);
      const response: any = await authContext.autoCreate(data);
      await handleLoginResponse(response);
    } catch (err) {
      toast.error("Registration failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const isEmailValid = /^\S+@\S+\.\S+$/.test(formData.emailId);
  const isMobileValid = /^[6-9]\d{9}$/.test(formData.phoneNumber);
  const isNameValid = formData.firstName.trim().length >= 2;

  const isFormValid = isNameValid && isEmailValid && isMobileValid;

  const showError = (field: keyof typeof touched, isValid: boolean) =>
    (touched[field] || submitted) && !isValid;

  return (
    <main
      className="flex-grow flex h-[85vh] items-center justify-center pb-2 font-archivo  bg-[#f60000]  border-t border-[#383D46]"
      // style={
      //   {
      //     "--pri": primaryColor,
      //     "--sec": secondaryColor,
      //   } as React.CSSProperties
      // }
    >
      <div className="bg-[#141414] font-kanit h-[85vh] z-0 hero-clip [clip-path:inherit] w-full flex justify-center items-center">
        <div className="rounded-none shadow-md p-8 text-[#ffffff] w-full max-w-xl border border-[#57606b] mx-6 md:mx-0">
          <h2 className="text-3xl md:text-5xl font-semibold mb-8 text-center font-kanit text-white">
            Create Account
          </h2>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSignup();
            }}
            className="space-y-6"
          >
            {/* Name */}
            <div>
              <label className="block text-[16px] text-[var(--pri)] font-medium mb-2">
                Full Name
              </label>
              <Input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                onBlur={() => handleBlur("firstName")}
                placeholder="Enter your full name"
                required
                className="w-full  border col-span-12 border-[#57606b] md:col-span-4 rounded-none h-12 placeholder:text-[#6B7586] text-white md:text-lg px-[30px] font-archivo"
              />
              {showError("firstName", isNameValid) && (
                <p className="text-sm text-red-500 mt-1">
                  Name must be at least 2 characters
                </p>
              )}
            </div>

            {/* Mobile */}
            <div>
              <label className="block text-[16px] text-[var(--pri)] font-medium mb-2">
                Mobile Number
              </label>
              <Input
                type="tel"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                onBlur={() => handleBlur("phoneNumber")}
                placeholder="Enter your mobile number"
                required
                className="w-full  border col-span-12 border-[#57606b] md:col-span-4 rounded-none h-12 placeholder:text-[#6B7586] text-white md:text-lg px-[30px] font-archivo"
              />
              {showError("phoneNumber", isMobileValid) && (
                <p className="text-sm text-red-500 mt-1">
                  Enter valid 10-digit mobile number
                </p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="block text-[16px] text-[var(--pri)] font-medium mb-2">
                Email Address
              </label>
              <Input
                type="email"
                name="emailId"
                value={formData.emailId}
                onChange={handleChange}
                onBlur={() => handleBlur("emailId")}
                placeholder="Enter your email"
                required
                className="w-full  border col-span-12 border-[#57606b] md:col-span-4 rounded-none h-12 placeholder:text-[#6B7586] text-white md:text-lg px-[30px] font-archivo"
              />
              {showError("emailId", isEmailValid) && (
                <p className="text-sm text-red-500 mt-1">Enter a valid email</p>
              )}
            </div>

            <div>
              <button
                onClick={handleSignup}
                type="submit"
                disabled={!isFormValid || isLoading}
                className={`${
                  isFormValid && !isLoading
                    ? "bg-[#f60000] cursor-pointer"
                    : "bg-red-400 cursor-not-allowed"
                } text-white px-6 py-3 rounded-none font-medium w-full uppercase`}
              >
                {isLoading ? "Submitting..." : "Save & Continue"}
              </button>
            </div>
          </form>
          {/* <p className="text-center text-sm text-[var(--pri)] mt-8">
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-semibold text-[var(--pri)] hover:underline"
            >
              Login
            </Link>
          </p> */}
        </div>
      </div>
    </main>
  );
};

export default FitKitSignupPage;
