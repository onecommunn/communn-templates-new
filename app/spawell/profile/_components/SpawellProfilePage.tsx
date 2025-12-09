"use client";

import React, { useState, useEffect, useContext } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { Camera, CheckCircle2 } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { IEditUser, useUsers } from "@/hooks/useUsers";
import { toast } from "sonner";
import { AuthContext } from "@/contexts/Auth.context";
import Link from "next/link";
import {
  Accordion,
  AccordionContent,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { AccordionItem } from "@radix-ui/react-accordion";

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

interface UserPlanCard {
  id: string;
  title: string;
  description: string;
  price: string;
  periodLabel: string;
  coverImage?: string;
  communityName: string;
  subscriptionStatus: string;
  nextDueDate?: string;
  daysLeft?: number | null;
  interval?: string;
  planId: string;
}

const SpawellProfilePage = ({
  primaryColor,
  secondaryColor,
  neutralColor,
}: {
  secondaryColor: string;
  primaryColor: string;
  neutralColor: string;
}) => {
  const authContext = useContext(AuthContext);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true); // profile loading
  const [isPlansLoading, setIsPlansLoading] = useState(false); // plans loading
  const [userPlans, setUserPlans] = useState<UserPlanCard[]>([]);

  const searchParams = useSearchParams();
  const userId = searchParams.get("id");
  const { editUsers, loadUserPlans } = useUsers();

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

  const { isAuthenticated, loading, communityId } = authContext || {};

  /* ------------------------ ROUTE GUARD ------------------------ */
  useEffect(() => {
    if (loading) return;
    if (!isAuthenticated) router.push("/");
  }, [loading, isAuthenticated, router]);

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

      await editUsers(userId, profileData, profileImage);
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

  // useEffect(() => {
  //   if (!userId) {
  //     setIsLoading(false);
  //     return;
  //   }

  //   if (loading || !isAuthenticated) return;

  //   const fetchUser = async () => {
  //     try {
  //       setIsLoading(true);
  //       const response = await loadUser(userId);

  //       setFormValues({
  //         id: response?.id ?? "",
  //         firstName: response?.firstName ?? "",
  //         lastName: response?.lastName ?? "",
  //         emailId: response?.emailId ?? "",
  //         phoneNumber: response?.phoneNumber ?? "",
  //         isPhoneVerified: !!response?.isPhoneVerified,
  //         isEmailVerified: !!response?.isEmailVerified,
  //         userName: response?.userName ?? "",
  //         description: response?.description ?? "",
  //         pincode: response?.pincode ?? "",
  //         city: response?.city ?? "",
  //         address: response?.address ?? "",
  //         aadhar: response?.aadhar ?? "",
  //         pan: response?.pan ?? "",
  //         avatar: response?.avatar ?? "",
  //         about: response?.about ?? response?.description ?? "",
  //         whatsappNumber: response?.whatsappNumber ?? 0,
  //       });

  //       if (response?.avatar) {
  //         setAvatarImage(response.avatar);
  //       }
  //     } catch (error) {
  //       console.error("Error fetching user data:", error);
  //       toast.error("Failed to load profile");
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   };

  //   fetchUser();
  // }, [userId, isAuthenticated, loading]);

  /* --------------------------- LOAD USER PLANS --------------------------- */

  useEffect(() => {
    if (!userId || !communityId) {
      return;
    }

    if (loading || !isAuthenticated) return;

    const fetchUserPlans = async () => {
      try {
        setIsPlansLoading(true);
        setIsLoading(true);
        const response = await loadUserPlans(userId, communityId);
        console.log(response, "loadUserPlans");
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

        // Handle both shapes: { subscriptionDetail: [...] } or direct array
        const rawSubs = Array.isArray(response?.subscriptionDetail)
          ? response.subscriptionDetail
          : Array.isArray(response)
          ? response
          : [];

        const mapped: UserPlanCard[] = rawSubs
          .filter((sub: any) => sub?.subscription_status === "ACTIVE")
          .map((sub: any) => {
            const plan = sub.plan || {};
            const community = sub.community || {};

            const duration = (plan.duration || "").toString().toLowerCase();
            let periodLabel = duration;
            if (duration === "day") periodLabel = "day";
            if (duration === "month") periodLabel = "month";
            if (duration === "year") periodLabel = "year";

            return {
              id: sub._id,
              title: plan.name || "Untitled Plan",
              description: plan.description || "",
              price: (plan.pricing ?? "").toString(),
              periodLabel,
              coverImage: community.logo, // using community logo as image
              communityName: community.name || "",
              subscriptionStatus: sub.subscription_status,
              nextDueDate: sub.nextDueDate,
              daysLeft: sub.daysLeft ?? null,
              interval: plan?.interval ?? "",
              planId: plan?._id,
            };
          });

        setUserPlans(mapped);
      } catch (error) {
        console.error("Error fetching user plans data:", error);
        toast.error("Failed to load plans");
      } finally {
        setIsPlansLoading(false);
        setIsLoading(false);
      }
    };

    fetchUserPlans();
  }, [userId, isAuthenticated, loading, communityId]);

  /* ------------------------------ RENDER ------------------------------ */

  if (isLoading)
    return (
      <ProfileSkeleton
        primaryColor={primaryColor}
        secondaryColor={secondaryColor}
      />
    );

  return (
    <div
      className="min-h-screen py-12 px-4 sm:px-8 md:px-20 font-plus-jakarta bg-[var(--nue)]"
      style={
        {
          "--pri": primaryColor,
          "--sec": secondaryColor,
          "--nue": neutralColor,
        } as React.CSSProperties
      }
    >
      <div className="container mx-auto space-y-8">
        {/* HEADER */}
        <div className="text-center space-y-2">
          <h1 className="text-xl md:text-4xl font-medium font-lora tracking-tight text-[var(--pri)]">
            Account 
          </h1>
          <p className="text-sm md:text-lg text-gray-600">
            Manage your personal and contact information.
          </p>

          <div className="w-20 h-1 mx-auto mt-4 rounded-full bg-[var(--pri)]" />
        </div>

        {/* MAIN GRID */}
        <div className="grid lg:grid-cols-3 gap-4 md:gap-8 relative">
          {/* SIDEBAR */}
          <aside className="lg:col-span-1 space-y-4 md:space-y-8">
            {/* PROFILE */}
            <Card className="rounded-xl shadow-none border border-gray-200 p-3 md:p-6 md:py-[30px] h-fit">
              <CardContent className="p-0 flex md:flex-col items-center justify-start md:justify-center gap-6">
                <div className="relative">
                  <Avatar
                    className="size-24 md:size-40 shadow-lg"
                    style={{ border: `4px solid ${secondaryColor}` }}
                  >
                    <AvatarImage
                      src={avatarImage || formValues.avatar}
                      alt="Profile"
                      className="object-cover object-center"
                    />
                    <AvatarFallback style={{ backgroundColor: secondaryColor }}>
                      {formValues.firstName?.[0] ??
                        formValues.emailId?.[0] ??
                        "U"}
                    </AvatarFallback>
                  </Avatar>

                  <Button
                    size="icon"
                    className="absolute bottom-0 right-0 h-9 w-9 rounded-full border-2 border-white shadow-none cursor-pointer bg-[var(--pri)]"
                    type="button"
                    onClick={handleImageChange}
                  >
                    <Camera className="h-5 w-5 text-white" />
                  </Button>
                </div>

                <div className="space-y-1 md:text-center">
                  <p className="text-xl font-medium text-[var(--pri)] font-lora">
                    {formValues.firstName || "First Name"}
                  </p>
                  <p className="text-sm text-gray-500">
                    {formValues.userName || "User Name"}
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* SUBSCRIBED PLANS */}
            <Card className="rounded-xl shadow-none border border-gray-200 p-3 md:p-6 md:py-[30px] h-fit">
              <CardContent className="p-0 flex flex-col gap-4 w-full">
                {/* Header */}
                <div className="flex items-center justify-between w-full mb-1">
                  <p className="text-base font-medium text-[var(--pri)] font-lora">
                    Subscribed Plans
                  </p>
                  <Badge className="text-[11px] font-medium px-2 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-100">
                    {isPlansLoading
                      ? "Loading..."
                      : `${userPlans.length} Plans`}
                  </Badge>
                </div>

                {/* Plans List */}
                {isPlansLoading && userPlans.length === 0 && (
                  <div className="w-full border border-dashed border-gray-200 rounded-lg p-3 text-xs text-gray-500 text-center">
                    Fetching your plans...
                  </div>
                )}

                {!isPlansLoading && userPlans.length === 0 && (
                  <div className="w-full border border-dashed border-gray-200 rounded-lg p-3 text-xs text-gray-500 text-center">
                    No active plans found for this community.
                  </div>
                )}

                {userPlans.map((plan) => (
                  <Accordion
                    type="single"
                    collapsible
                    className="w-full border px-2 rounded-md"
                    key={plan?.id}
                  >
                    <AccordionItem value={plan?.id}>
                      <AccordionTrigger className="hover:no-underline cursor-pointer">
                        <div className="flex items-center gap-3 w-full justify-between">
                          <div className="w-12 h-12 rounded-lg bg-gray-100 flex overflow-hidden items-center justify-center text-[10px] font-semibold text-gray-400 uppercase tracking-wide">
                            {plan.coverImage ? (
                              <img
                                src={plan.coverImage}
                                alt={plan.title}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              "IMG"
                            )}
                          </div>
                          <div className="flex-1">
                            <p className="text-sm font-semibold text-gray-900 line-clamp-1">
                              {plan?.title}
                            </p>
                            <p className="text-xs text-gray-500">
                              ₹{plan.price} / {plan?.interval}{" "}
                              {plan.periodLabel}
                            </p>
                            {plan.nextDueDate && (
                              <p className="text-[11px] text-gray-500 mt-0.5">
                                {plan?.nextDueDate === "forever"
                                  ? "Forever"
                                  : `Due on: ${new Date(
                                      plan?.nextDueDate
                                    ).toLocaleDateString("en-GB", {
                                      year: "numeric",
                                      month: "short",
                                      day: "2-digit",
                                    })}`}
                              </p>
                            )}
                          </div>
                          <div className="flex flex-col gap-2 items-end">
                            <Link
                              href={`/subscriptions/?planid=${encodeURIComponent(
                                plan?.planId
                              )}&communityid=${encodeURIComponent(
                                communityId || ""
                              )}`}
                              className=" flex items-center justify-center h-8 px-3 text-xs font-medium bg-[var(--pri)] text-white rounded-md cursor-pointer"
                            >
                              Manage
                            </Link>
                            {plan?.nextDueDate ? (
                              plan?.nextDueDate === "forever" ? (
                                <p className="text-[11px] font-medium px-2 py-1 rounded-full text-emerald-700 self-end">
                                  Active
                                </p>
                              ) : new Date(plan?.nextDueDate) >= new Date() ? (
                                <p className="text-[11px] font-medium px-2 py-1 rounded-full text-emerald-700 self-end">
                                  Active
                                </p>
                              ) : (
                                <p className="text-[11px] font-medium px-2 py-1 rounded-full text-red-700 self-end">
                                  Expired
                                </p>
                              )
                            ) : (
                              ""
                            )}
                          </div>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="space-y-2">
                        {/* Description */}
                        {plan.description && (
                          <p className="text-xs text-gray-600 leading-relaxed line-clamp-2">
                            {plan.description}
                          </p>
                        )}

                        {/* Footer row */}
                        {/* <div className={`flex items-center justify-end pt-1`}> */}
                        {/* {plan?.nextDueDate ? (
                            plan?.nextDueDate === "forever" ? (
                              <Badge className="text-[11px] font-medium px-2 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-100">
                                Active
                              </Badge>
                            ) : new Date(plan?.nextDueDate) >= new Date() ? (
                              <Badge className="text-[11px] font-medium px-2 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-100">
                                Active
                              </Badge>
                            ) : (
                              <Badge className="text-[11px] font-medium px-2 py-1 rounded-full bg-red-50 text-red-700 border border-red-100">
                                Expired
                              </Badge>
                            )
                          ) : (
                            ""
                          )} */}
                        {/* <Link
                            href={`/subscriptions/?planid=${encodeURIComponent(
                              plan?.planId
                            )}&communityid=${encodeURIComponent(
                              communityId || ""
                            )}`}
                          >
                            <Button
                              size="sm"
                              className="h-8 px-3 text-xs font-medium bg-[var(--pri)] text-white rounded-md cursor-pointer"
                            >
                              Manage
                            </Button>
                          </Link> */}
                        {/* </div> */}
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                ))}

                {/* CTA to see all plans */}
                <Link href={"/#plans"}>
                  <button
                    type="button"
                    className="mt-1 w-full text-[11px] font-medium text-[var(--pri)] hover:underline text-center cursor-pointer"
                  >
                    View all plans
                  </button>
                </Link>
              </CardContent>
            </Card>
          </aside>

          {/* RIGHT COLUMN */}
          <section className="lg:col-span-2 space-y-4 md:space-y-8">
            {/* BASIC INFO */}
            <Card className="rounded-xl shadow-none border border-gray-200 p-3 md:p-8">
              <CardContent className="p-0 space-y-6">
                <h2 className="text-lg md:text-2xl font-medium text-[var(--pri)] font-lora">
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
            <Card className="rounded-xl shadow-none border border-gray-200 p-3 md:p-8 h-fit">
              <CardContent className="p-0 space-y-6">
                <h2 className="text-lg md:text-2xl font-medium text-[var(--pri)] font-lora">
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
                className="px-10 py-6 text-[16px] text-white rounded-lg shadow-none bg-[var(--pri)] cursor-pointer"
              >
                {isSubmiting ? "Submitting..." : "Save Profile"}
              </Button>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default SpawellProfilePage;

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
      <div className="container mx-auto space-y-8">
        {/* HEADER */}
        <div className="text-center space-y-2">
          <Skeleton className="h-8 w-52 mx-auto rounded-md bg-[var(--sec)]" />
          <Skeleton className="h-5 w-72 mx-auto rounded-md bg-[var(--sec)]" />
          <div className="w-20 h-1 mx-auto mt-4 rounded-full bg-[var(--sec)]" />
        </div>

        {/* MAIN GRID */}
        <div className="grid lg:grid-cols-3 gap-8 relative">
          {/* SIDEBAR */}
          <aside className="lg:col-span-1 space-y-8">
            {/* PROFILE CARD */}
            <Card className="rounded-xl shadow-none border border-gray-200 p-6 py-[30px] h-fit">
              <CardContent className="p-0 flex flex-col items-center justify-center gap-6">
                <Skeleton
                  className="size-40 rounded-full"
                  style={{ border: `4px solid ${secondaryColor}` }}
                />
                <div className="space-y-2 w-full flex flex-col items-center">
                  <Skeleton className="h-5 w-32 rounded-md bg-[var(--sec)]" />
                  <Skeleton className="h-4 w-24 rounded-md bg-[var(--sec)]" />
                </div>
              </CardContent>
            </Card>

            {/* SUBSCRIBED PLANS CARD */}
            <Card className="rounded-xl shadow-none border border-gray-200 p-6 py-[30px] h-fit">
              <CardContent className="p-0 flex flex-col gap-4 w-full">
                {/* Header */}
                <div className="flex items-center justify-between w-full mb-1">
                  <Skeleton className="h-4 w-28 rounded-md bg-[var(--sec)]" />
                  <Skeleton className="h-5 w-16 rounded-full bg-[var(--sec)]" />
                </div>

                {/* Plan skeleton items */}
                <div className="space-y-3">
                  {[1, 2].map((i) => (
                    <div
                      key={i}
                      className="w-full border border-gray-200 rounded-lg p-3 flex flex-col gap-3 bg-white"
                    >
                      <div className="flex items-center gap-3">
                        <Skeleton className="w-12 h-12 rounded-lg bg-[var(--sec)]" />
                        <div className="flex-1 space-y-2">
                          <Skeleton className="h-4 w-32 rounded-md bg-[var(--sec)]" />
                          <Skeleton className="h-3 w-24 rounded-md bg-[var(--sec)]" />
                          <Skeleton className="h-3 w-28 rounded-md bg-[var(--sec)]" />
                        </div>
                      </div>

                      <Skeleton className="h-3 w-full rounded-md bg-[var(--sec)]" />
                      <Skeleton className="h-3 w-3/4 rounded-md bg-[var(--sec)]" />

                      <div className="flex justify-end pt-1">
                        <Skeleton className="h-8 w-20 rounded-md bg-[var(--sec)]" />
                      </div>
                    </div>
                  ))}
                </div>

                {/* View all button skeleton */}
                <Skeleton className="mt-1 h-3 w-24 mx-auto rounded-md bg-[var(--sec)]" />
              </CardContent>
            </Card>
          </aside>

          {/* RIGHT COLUMN */}
          <section className="lg:col-span-2 space-y-8">
            {/* BASIC INFO CARD */}
            <Card className="rounded-xl shadow-none border border-gray-200 p-6 md:p-8">
              <CardContent className="p-0 space-y-6">
                <Skeleton className="h-5 w-40 rounded-md bg-[var(--sec)]" />

                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-2">
                    <Skeleton className="h-3 w-20 rounded-md bg-[var(--sec)]" />
                    <Skeleton className="h-11 w-full rounded-lg bg-[var(--sec)]" />
                  </div>

                  <div className="space-y-2">
                    <Skeleton className="h-3 w-24 rounded-md bg-[var(--sec)]" />
                    <Skeleton className="h-11 w-full rounded-lg bg-[var(--sec)]" />
                  </div>

                  <div className="space-y-2">
                    <Skeleton className="h-3 w-28 rounded-md bg-[var(--sec)]" />
                    <Skeleton className="h-11 w-full rounded-lg bg-[var(--sec)]" />
                  </div>

                  <div className="space-y-2">
                    <Skeleton className="h-3 w-16 rounded-md bg-[var(--sec)]" />
                    <Skeleton className="h-11 w-full rounded-lg bg-[var(--sec)]" />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* LOCATION CARD */}
            <Card className="rounded-xl shadow-none border border-gray-200 p-6 md:p-8 h-fit">
              <CardContent className="p-0 space-y-6">
                <Skeleton className="h-5 w-32 rounded-md bg-[var(--sec)]" />

                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-2 md:col-span-2">
                    <Skeleton className="h-3 w-24 rounded-md bg-[var(--sec)]" />
                    <Skeleton className="h-11 w-full rounded-lg bg-[var(--sec)]" />
                  </div>

                  <div className="space-y-2">
                    <Skeleton className="h-3 w-28 rounded-md bg-[var(--sec)]" />
                    <Skeleton className="h-11 w-full rounded-lg bg-[var(--sec)]" />
                  </div>

                  <div className="space-y-2">
                    <Skeleton className="h-3 w-16 rounded-md bg-[var(--sec)]" />
                    <Skeleton className="h-11 w-full rounded-lg bg-[var(--sec)]" />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* SAVE BUTTON SKELETON */}
            <div className="flex justify-end pt-2">
              <Skeleton className="h-12 w-44 rounded-lg bg-[var(--sec)]" />
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};
