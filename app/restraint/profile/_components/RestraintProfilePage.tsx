"use client";

import React, { useState, useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Skeleton } from "@/components/ui/skeleton";
import { Camera, CheckCircle2 } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { IEditUser, useUsers } from "@/hooks/useUsers";
import { toast } from "sonner";

interface FormValues {
  id: string;
  firstName: string;
  lastName: string;
  emailId: string;
  phoneNumber: string;
  isPhoneVerified: boolean;
  isEmailVerified: boolean;
  description: string;
  pincode: string;
  city: string;
  address: string;
  aadhar: string;
  pan: string;
  userName: string;
  avatar: string;
  about: string;
  whatsappNumber: number;
}

const ProfileSettingsPage = ({
  primaryColor,
  secondaryColor,
}: {
  secondaryColor: string;
  primaryColor: string;
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const searchParams = useSearchParams();
  const userId = searchParams.get("id");
  const { editUsers, loadUser } = useUsers();

  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [avatarImage, setAvatarImage] = useState("");
  const [isSubmiting, setIsSubmiting] = useState(false);

  const [formValues, setFormValues] = useState<FormValues>({
    id: "",
    firstName: "",
    lastName: "",
    emailId: "",
    phoneNumber: "",
    isPhoneVerified: false,
    isEmailVerified: false,
    description: "",
    pincode: "",
    city: "",
    address: "",
    aadhar: "",
    pan: "",
    userName: "",
    avatar: "",
    about: "",
    whatsappNumber: 0,
  });

  /* ------------------------ GENERIC CHANGE HANDLERS ------------------------ */

  const handleChange =
    (field: keyof FormValues) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const value = e.target.value;
      setFormValues((prev) => ({
        ...prev,
        [field]:
          field === "whatsappNumber"
            ? Number(value || 0)
            : (value as (typeof prev)[typeof field]),
      }));
    };

  /* --------------------------- SAVE / UPDATE CALL -------------------------- */

  const handleEditProfile = async () => {
    if (!userId) {
      toast.error("User ID not found in URL");
      return;
    }

    try {
      setIsSubmiting(true);
      const profileData: IEditUser = {
        ...formValues,
      };

      const response = await editUsers(userId, profileData, profileImage);
      console.log(response);
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Something went wrong while updating profile");
    } finally {
      setIsSubmiting(false);
    }
  };

  /* ---------------------------- AVATAR UPLOAD ---------------------------- */

  const handleImageChange = () => {
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = "image/*";

    fileInput.addEventListener("change", (event) => {
      const file = (event.target as HTMLInputElement).files?.[0];
      if (file) {
        setProfileImage(file);
        const reader = new FileReader();
        reader.onload = (e) => {
          const newProfileImage = e.target?.result as string;
          setAvatarImage(newProfileImage);
        };
        reader.readAsDataURL(file);
      }
    });

    fileInput.click();
  };

  /* ------------------------------ LOAD USER ------------------------------ */

  useEffect(() => {
    if (!userId) {
      setIsLoading(false);
      return;
    }

    const fetchUser = async () => {
      try {
        setIsLoading(true);
        const response = await loadUser(userId);

        setFormValues({
          id: response?.id ?? "",
          firstName: response?.firstName ?? "",
          lastName: response?.lastName ?? "",
          emailId: response?.emailId ?? "",
          phoneNumber: response?.phoneNumber ?? "",
          isPhoneVerified: !!response?.isPhoneVerified,
          isEmailVerified: !!response?.isEmailVerified,
          userName: response?.userName ?? "",
          description: response?.description ?? "",
          pincode: response?.pincode ?? "",
          city: response?.city ?? "",
          address: response?.address ?? "",
          aadhar: response?.aadhar ?? "",
          pan: response?.pan ?? "",
          avatar: response?.avatar ?? "",
          about: response?.about ?? response?.description ?? "",
          whatsappNumber: response?.whatsappNumber ?? 0,
        });

        if (response?.avatar) {
          setAvatarImage(response.avatar);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        toast.error("Failed to load profile");
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, [userId]);

  if (isLoading)
    return (
      <ProfileSkeleton
        primaryColor={primaryColor}
        secondaryColor={secondaryColor}
      />
    );

  return (
    <div
      className="min-h-screen py-12 px-4 sm:px-8 md:px-20 font-inter bg-[#F8F7F4]"
      style={
        {
          "--pri": primaryColor,
          "--sec": secondaryColor,
        } as React.CSSProperties
      }
    >
      <div className="container mx-auto space-y-12">
        {/* HEADER */}
        <div className="text-center space-y-2">
          <h1 className="text-xl md:text-4xl font-extrabold tracking-tight text-[var(--pri)]">
            Profile Settings
          </h1>
          <p className="text-sm md:text-lg text-gray-600">
            Manage your personal and contact information.
          </p>

          <div className="w-20 h-1 mx-auto mt-4 rounded-full bg-[var(--sec)]" />
        </div>

        <div className="grid lg:grid-cols-3 gap-8 relative">
          {/* SIDEBAR */}
          <Card className="lg:col-span-1 rounded-xl shadow-md border border-gray-200 p-6 h-fit">
            <CardContent className="p-0 flex flex-col items-center gap-6">
              <div className="relative">
                <Avatar
                  className="size-40 shadow-lg"
                  style={{ border: `4px solid ${secondaryColor}` }}
                >
                  <AvatarImage
                    src={avatarImage || formValues.avatar}
                    alt="Profile"
                  />
                  <AvatarFallback style={{ backgroundColor: secondaryColor }}>
                    {formValues.firstName?.[0] ??
                      formValues.emailId?.[0] ??
                      "U"}
                  </AvatarFallback>
                </Avatar>

                <Button
                  size="icon"
                  className="absolute bottom-0 right-0 h-9 w-9 rounded-full border-2 border-white shadow-md cursor-pointer bg-[var(--pri)]"
                  type="button"
                  onClick={handleImageChange}
                >
                  <Camera className="h-5 w-5 text-white" />
                </Button>
              </div>

              <div className="space-y-1 text-center">
                <p className="text-xl font-semibold text-[var(--pri)]">
                  {formValues.firstName || "First Name"}
                </p>
                <p className="text-sm text-gray-500">
                  {formValues.userName || "User Name"}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* MAIN CONTENT */}
          <div className="lg:col-span-2 space-y-10">
            {/* BASIC INFO */}
            <Card className="rounded-xl shadow-md border border-gray-200 p-6 md:p-8">
              <CardContent className="p-0 space-y-6">
                <h2 className="text-lg md:text-2xl font-semibold text-[var(--pri)]">
                  Basic Information
                </h2>

                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label>Name</Label>
                    <Input
                      value={formValues.firstName}
                      onChange={handleChange("firstName")}
                      className="py-6 rounded-lg border-gray-300 focus:border-[#AEA17E]"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>User Name</Label>
                    <Input
                      disabled
                      value={formValues.userName}
                      onChange={handleChange("userName")}
                      className="py-6 rounded-lg border-gray-300 focus:border-[#AEA17E] cursor-not-allowed"
                    />
                  </div>

                  {/* <div className="space-y-2 md:col-span-2">
                    <Label>About Me</Label>
                    <Textarea
                      value={formValues.about}
                      onChange={handleChange("about")}
                      className="min-h-[120px] rounded-lg border-gray-300 focus:border-[#AEA17E]"
                    />
                  </div> */}
                  {/* MOBILE */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label>Mobile Number</Label>
                      <Badge
                        className={`text-xs font-medium rounded-full px-3 py-1 flex items-center gap-1 ${
                          formValues.isPhoneVerified
                            ? "bg-emerald-100 text-emerald-800"
                            : "bg-amber-100 text-amber-800"
                        }`}
                      >
                        {formValues.isPhoneVerified ? (
                          <>
                            <CheckCircle2 className="h-3 w-3" /> Verified
                          </>
                        ) : (
                          "Not Verified"
                        )}
                      </Badge>
                    </div>

                    <div className="flex items-center gap-3">
                      <Input
                        disabled
                        value={formValues.phoneNumber}
                        onChange={handleChange("phoneNumber")}
                        className="py-6 rounded-lg border-gray-300 focus:border-[#AEA17E] cursor-not-allowed"
                      />
                    </div>
                  </div>
                  {/* EMAIL */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label>Email</Label>
                      <Badge
                        className={`text-xs font-medium rounded-full px-3 py-1 flex items-center gap-1 ${
                          formValues.isEmailVerified
                            ? "bg-emerald-100 text-emerald-800"
                            : "bg-amber-100 text-amber-800"
                        }`}
                      >
                        {formValues.isEmailVerified ? (
                          <>
                            <CheckCircle2 className="h-3 w-3" /> Verified
                          </>
                        ) : (
                          "Not Verified"
                        )}
                      </Badge>
                    </div>

                    <div className="flex items-center gap-3">
                      <Input
                        disabled
                        type="email"
                        value={formValues.emailId}
                        onChange={handleChange("emailId")}
                        className="py-6 rounded-lg border-gray-300 focus:border-[#AEA17E] cursor-not-allowed"
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* ADDRESS */}
            <Card className="rounded-xl shadow-md border border-gray-200 p-6 md:p-8">
              <CardContent className="p-0 space-y-6">
                <h2 className="text-lg md:text-2xl font-semibold text-[var(--pri)]">
                  Location
                </h2>

                <div className="grid gap-6 md:grid-cols-2">
                  {/* ADDRESS LINE */}
                  <div className="space-y-2 md:col-span-2">
                    <Label>Address Line</Label>
                    <Input
                      value={formValues.address}
                      onChange={handleChange("address")}
                      className="py-6 rounded-lg border-gray-300 focus:border-[#AEA17E]"
                    />
                  </div>

                  {/* ZIP */}
                  <div className="space-y-2">
                    <Label>Pin / Zip Code</Label>
                    <Input
                      value={formValues.pincode}
                      onChange={handleChange("pincode")}
                      className="py-6 rounded-lg border-gray-300 focus:border-[#AEA17E]"
                    />
                  </div>

                  {/* CITY */}
                  <div className="space-y-2">
                    <Label>City</Label>
                    <Input
                      value={formValues.city}
                      onChange={handleChange("city")}
                      className="py-6 rounded-lg border-gray-300 focus:border-[#AEA17E]"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* SAVE BUTTON */}
            <div className="flex justify-end pt-2">
              <Button
                size="lg"
                type="button"
                onClick={handleEditProfile}
                disabled={isSubmiting}
                className="px-10 py-6 text-[16px] text-white rounded-lg shadow-md bg-[var(--pri)]"
              >
                {isSubmiting ? "Submitting..." : "Save Profile"}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSettingsPage;

/* ---------- SKELETON ---------- */

const ProfileSkeleton = ({
  primaryColor,
  secondaryColor,
}: {
  secondaryColor: string;
  primaryColor: string;
}) => {
  return (
    <div
      className="min-h-screen py-12 px-4 sm:px-8 md:px-20 font-inter bg-[#F8F7F4]"
      style={
        {
          "--pri": primaryColor,
          "--sec": secondaryColor,
        } as React.CSSProperties
      }
    >
      <div className="container mx-auto space-y-12">
        <div className="text-center space-y-2">
          <Skeleton className="h-10 w-64 mx-auto bg-[var(--sec)]" />
          <Skeleton className="h-6 w-96 mx-auto bg-[var(--sec)]" />
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <Card className="p-6 shadow-md border h-fit">
            <CardContent className="p-0 flex flex-col items-center gap-6">
              <Skeleton
                className="size-40 rounded-full"
                style={{ border: `4px solid ${secondaryColor}` }}
              />
              <Skeleton className="h-6 w-32 bg-[var(--sec)]" />
              <Skeleton className="h-4 w-20 bg-[var(--sec)]" />
            </CardContent>
          </Card>

          <div className="lg:col-span-2 space-y-8">
            <Card className="p-6 shadow-md border">
              <CardContent className="space-y-6">
                <Skeleton className="h-7 w-48 bg-[var(--sec)]" />
                <Skeleton className="h-12 w-full bg-[var(--sec)]" />
                <Skeleton className="h-12 w-full bg-[var(--sec)]" />
                <Skeleton className="h-32 w-full bg-[var(--sec)]" />
              </CardContent>
            </Card>

            <Card className="p-6 shadow-md border">
              <CardContent className="space-y-6">
                <Skeleton className="h-7 w-56 bg-[var(--sec)]" />
                <Skeleton className="h-12 w-full bg-[var(--sec)]" />
                <Skeleton className="h-12 w-full bg-[var(--sec)]" />
                <Skeleton className="h-12 w-full bg-[var(--sec)]" />
                <Skeleton className="h-12 w-full bg-[var(--sec)]" />
              </CardContent>
            </Card>

            <div className="flex justify-end">
              <Skeleton className="h-14 w-56 rounded-lg bg-[var(--sec)]" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
