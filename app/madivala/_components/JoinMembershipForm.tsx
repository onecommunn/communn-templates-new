"use client";

import React, { useEffect, useId, useRef, useState } from "react";
import { Calendar, Upload, Plus, ArrowRight, Trash2, X } from "lucide-react";
import { sendJoinMembershipRequest } from "@/services/Madivala/Madivala.service";
import { mapMemberToPayload } from "@/utils/mapMembershipPayload";
import { useCommunity } from "@/hooks/useCommunity";
import { toast } from "sonner";
import { useUpload } from "@/hooks/useUpload";
import { getPaymentStatusByIdNoAuth } from "@/services/eventService";
import PaymentSuccess from "@/utils/PaymentSuccess";
import PaymentFailure from "@/utils/PaymentFailure";

type UploadResponse = {
  type?: string;
  value?: string;
  label?: string;
  _id?: string;
};

type Member = {
  name: string;
  emailId: string;
  dateOfBirth: string;
  mobileNumber: string;
  city: string;
  caste: string;
  subCaste: string;

  profileImage?: File | null;
  document?: File | null;
  adharCard?: File | null;

  profilePreviewUrl?: string;

  profileImageUrl?: string;
  documentUrl?: string;
  adharCardUrl?: string;

  documentName?: string;
  adharCardName?: string;
};

type MemberErrors = Partial<Record<keyof Member, string>> & {
  profileImage?: string;
  document?: string;
  adharCard?: string;
};

type InitiateCoursePaymentPayload = {
  url: string;
  transactionId: string;
  transaction: any;
};

const unwrapAxios = <T,>(res: any): T | null => {
  if (!res) return null;
  if (typeof res === "object" && "data" in res) return res.data as T;
  return res as T;
};

const emptyMember = (): Member => ({
  name: "",
  emailId: "",
  dateOfBirth: "",
  mobileNumber: "",
  city: "",
  caste: "",
  subCaste: "",

  profileImage: null,
  document: null,
  adharCard: null,

  profilePreviewUrl: "",
  profileImageUrl: "",
  documentUrl: "",
  adharCardUrl: "",

  documentName: "",
  adharCardName: "",
});

const emptyErrors = (): MemberErrors => ({});

enum PaymentStatus {
  SUCCESS = "SUCCESS",
  FAILED = "FAILED",
  PENDING = "PENDING",
}

const isValidEmail = (email: string) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
const isValidMobile = (mobile: string) => /^[0-9]{10}$/.test(mobile.trim());

function pickUploadedUrl(res: any): string {
  if (!res) return "";
  if (typeof res === "string") return res;
  if (typeof res.value === "string") return res.value;
  if (typeof res.url === "string") return res.url;
  return "";
}

function validateMemberFields(
  m: Member,
  opts: { isPrimary: boolean },
): MemberErrors {
  const e: MemberErrors = {};

  if (!m.name?.trim()) e.name = "Name is required";

  if (!m.emailId?.trim()) e.emailId = "Email is required";
  else if (!isValidEmail(m.emailId)) e.emailId = "Enter a valid email";

  if (!m.mobileNumber?.trim()) e.mobileNumber = "Mobile Number is required";
  else if (!isValidMobile(m.mobileNumber))
    e.mobileNumber = "Enter a valid 10-digit mobile";

  // ✅ Profile Image required for everyone (primary + family)
  if (!m.profileImageUrl?.trim()) {
    e.profileImage = "Profile image is required";
  }

  // ✅ only primary must upload document
  if (opts.isPrimary) {
    if (!m.documentUrl?.trim()) e.document = "Documents are required";
  }

  return e;
}

function hasAnyError(err: MemberErrors) {
  return Object.values(err).some(Boolean);
}

const withTimestampFileName = (file: File) => {
  const ext = file.name.split(".").pop();
  const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
  const newName = `${file.name}-${timestamp}.${ext}`;

  return new File([file], newName, {
    type: file.type,
    lastModified: Date.now(),
  });
};

export default function JoinMembershipForm({
  primaryColor = "#1F514C",
}: {
  primaryColor?: string;
}) {
  const { uploadImages } = useUpload();
  const { communityId } = useCommunity();

  const [primary, setPrimary] = useState<Member>(emptyMember());
  const [family, setFamily] = useState<Member[]>([]);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedOnce, setSubmittedOnce] = useState(false);

  const [successOpen, setSuccessOpen] = useState(false);
  const [failureOpen, setFailureOpen] = useState(false);

  // ✅ needed for PaymentSuccess/PaymentFailure props
  const [transaction, setTransaction] = useState<any>(null);
  const [timer, setTimer] = useState<number>(5);

  const [primaryErrors, setPrimaryErrors] =
    useState<MemberErrors>(emptyErrors());
  const [familyErrors, setFamilyErrors] = useState<MemberErrors[]>([]);

  const intervalRef = useRef<number | null>(null);
  const paymentWindowRef = useRef<Window | null>(null);

  const [uploading, setUploading] = useState<{
    primaryProfile: boolean;
    primaryDoc: boolean;
    primaryAadhar: boolean;
    familyProfile: Record<number, boolean>;
    familyDoc: Record<number, boolean>;
    familyAadhar: Record<number, boolean>;
  }>({
    primaryProfile: false,
    primaryDoc: false,
    primaryAadhar: false,
    familyProfile: {},
    familyDoc: {},
    familyAadhar: {},
  });

  useEffect(() => {
    return () => {
      if (intervalRef.current) window.clearInterval(intervalRef.current);
      intervalRef.current = null;
      paymentWindowRef.current?.close();
      paymentWindowRef.current = null;
    };
  }, []);

  const bg = primaryColor;
  const field = "#2f6660";
  const fieldBorder = "rgba(255,255,255,0.08)";
  const muted = "rgba(255,255,255,0.75)";

  const addFamily = () => {
    setFamily((p) => [...p, emptyMember()]);
    setFamilyErrors((p) => [...p, emptyErrors()]);
  };

  const removeFamily = (idx: number) => {
    setFamily((prev) => prev.filter((_, i) => i !== idx));
    setFamilyErrors((prev) => prev.filter((_, i) => i !== idx));
    setUploading((p) => {
      const fp = { ...p.familyProfile };
      const fd = { ...p.familyDoc };
      const fa = { ...p.familyAadhar };
      delete fp[idx];
      delete fd[idx];
      delete fa[idx];
      return { ...p, familyProfile: fp, familyDoc: fd, familyAadhar: fa };
    });
  };

  const validateAll = () => {
    const pErr = validateMemberFields(primary, { isPrimary: true });
    const fErr = family.map((m) =>
      validateMemberFields(m, { isPrimary: false }),
    );
    setPrimaryErrors(pErr);
    setFamilyErrors(fErr);
    return !(hasAnyError(pErr) || fErr.some(hasAnyError));
  };

  // -------------------------
  // Primary Uploads
  // -------------------------
  const uploadPrimaryProfile = async (file: File | null) => {
    setPrimary((prev) => {
      if (prev.profilePreviewUrl) URL.revokeObjectURL(prev.profilePreviewUrl);
      const preview = file ? URL.createObjectURL(file) : "";
      const next = {
        ...prev,
        profileImage: file,
        profilePreviewUrl: preview,
        profileImageUrl: "",
      };
      if (submittedOnce)
        setPrimaryErrors(validateMemberFields(next, { isPrimary: true }));
      return next;
    });

    if (!file) return;

    try {
      setUploading((p) => ({ ...p, primaryProfile: true }));
      const renamedFile = withTimestampFileName(file);
      const [res] = (await uploadImages([renamedFile])) as UploadResponse[];
      const url = pickUploadedUrl(res);

      setPrimary((prev) => {
        const next = { ...prev, profileImageUrl: url };
        if (submittedOnce)
          setPrimaryErrors(validateMemberFields(next, { isPrimary: true }));
        return next;
      });
    } catch (e) {
      console.error(e);
      toast("Profile image upload failed");
      setPrimary((prev) => ({ ...prev, profileImageUrl: "" }));
    } finally {
      setUploading((p) => ({ ...p, primaryProfile: false }));
    }
  };

  const uploadPrimaryDocument = async (file: File | null) => {
    setPrimary((prev) => {
      const next = {
        ...prev,
        document: file,
        documentUrl: "",
        documentName: file?.name ?? "",
      };
      if (submittedOnce)
        setPrimaryErrors(validateMemberFields(next, { isPrimary: true }));
      return next;
    });

    if (!file) return;

    try {
      setUploading((p) => ({ ...p, primaryDoc: true }));
      const renamedFile = withTimestampFileName(file);
      const [res] = (await uploadImages([renamedFile])) as UploadResponse[];

      const url = pickUploadedUrl(res);
      const label = res?.label || file.name;

      setPrimary((prev) => {
        const next = { ...prev, documentUrl: url, documentName: label };
        if (submittedOnce)
          setPrimaryErrors(validateMemberFields(next, { isPrimary: true }));
        return next;
      });
    } catch (e) {
      console.error(e);
      toast("Document upload failed");
      setPrimary((prev) => {
        const next = { ...prev, documentUrl: "" };
        if (submittedOnce)
          setPrimaryErrors(validateMemberFields(next, { isPrimary: true }));
        return next;
      });
    } finally {
      setUploading((p) => ({ ...p, primaryDoc: false }));
    }
  };

  const uploadPrimaryAadhar = async (file: File | null) => {
    setPrimary((prev) => ({
      ...prev,
      adharCard: file,
      adharCardUrl: "",
      adharCardName: file?.name ?? "",
    }));

    if (!file) return;

    try {
      setUploading((p) => ({ ...p, primaryAadhar: true }));
      const renamedFile = withTimestampFileName(file);
      const [res] = (await uploadImages([renamedFile])) as UploadResponse[];

      const url = pickUploadedUrl(res);
      const label = res?.label || file.name;

      setPrimary((prev) => ({
        ...prev,
        adharCardUrl: url,
        adharCardName: label,
      }));
    } catch (e) {
      console.error(e);
      toast("Aadhar upload failed");
      setPrimary((prev) => ({ ...prev, adharCardUrl: "" }));
    } finally {
      setUploading((p) => ({ ...p, primaryAadhar: false }));
    }
  };

  // -------------------------
  // Family Uploads
  // -------------------------
  const uploadFamilyProfile = async (idx: number, file: File | null) => {
    setFamily((prev) =>
      prev.map((m, i) => {
        if (i !== idx) return m;
        if (m.profilePreviewUrl) URL.revokeObjectURL(m.profilePreviewUrl);
        const preview = file ? URL.createObjectURL(file) : "";
        return {
          ...m,
          profileImage: file,
          profilePreviewUrl: preview,
          profileImageUrl: "",
        };
      }),
    );

    if (!file) return;

    try {
      setUploading((p) => ({
        ...p,
        familyProfile: { ...p.familyProfile, [idx]: true },
      }));
      const renamedFile = withTimestampFileName(file);
      const [res] = (await uploadImages([renamedFile])) as UploadResponse[];
      const url = pickUploadedUrl(res);

      setFamily((prev) =>
        prev.map((m, i) => (i === idx ? { ...m, profileImageUrl: url } : m)),
      );
    } catch (e) {
      console.error(e);
      toast("Profile image upload failed");
      setFamily((prev) =>
        prev.map((m, i) => (i === idx ? { ...m, profileImageUrl: "" } : m)),
      );
    } finally {
      setUploading((p) => ({
        ...p,
        familyProfile: { ...p.familyProfile, [idx]: false },
      }));
    }
  };

  const uploadFamilyDocument = async (idx: number, file: File | null) => {
    setFamily((prev) =>
      prev.map((m, i) =>
        i === idx
          ? {
              ...m,
              document: file,
              documentUrl: "",
              documentName: file?.name ?? "",
            }
          : m,
      ),
    );

    if (!file) return;

    try {
      setUploading((p) => ({
        ...p,
        familyDoc: { ...p.familyDoc, [idx]: true },
      }));
      const renamedFile = withTimestampFileName(file);
      const [res] = (await uploadImages([renamedFile])) as UploadResponse[];

      const url = pickUploadedUrl(res);
      const label = res?.label || file.name;

      setFamily((prev) =>
        prev.map((m, i) =>
          i === idx ? { ...m, documentUrl: url, documentName: label } : m,
        ),
      );
    } catch (e) {
      console.error(e);
      toast("Document upload failed");
      setFamily((prev) =>
        prev.map((m, i) => (i === idx ? { ...m, documentUrl: "" } : m)),
      );
    } finally {
      setUploading((p) => ({
        ...p,
        familyDoc: { ...p.familyDoc, [idx]: false },
      }));
    }
  };

  const uploadFamilyAadhar = async (idx: number, file: File | null) => {
    setFamily((prev) =>
      prev.map((m, i) =>
        i === idx
          ? {
              ...m,
              adharCard: file,
              adharCardUrl: "",
              adharCardName: file?.name ?? "",
            }
          : m,
      ),
    );

    if (!file) return;

    try {
      setUploading((p) => ({
        ...p,
        familyAadhar: { ...p.familyAadhar, [idx]: true },
      }));
      const renamedFile = withTimestampFileName(file);
      const [res] = (await uploadImages([renamedFile])) as UploadResponse[];

      const url = pickUploadedUrl(res);
      const label = res?.label || file.name;

      setFamily((prev) =>
        prev.map((m, i) =>
          i === idx ? { ...m, adharCardUrl: url, adharCardName: label } : m,
        ),
      );
    } catch (e) {
      console.error(e);
      toast("Aadhar upload failed");
      setFamily((prev) =>
        prev.map((m, i) => (i === idx ? { ...m, adharCardUrl: "" } : m)),
      );
    } finally {
      setUploading((p) => ({
        ...p,
        familyAadhar: { ...p.familyAadhar, [idx]: false },
      }));
    }
  };

  const handleSuccessClose = () => {
    setTimer(5);
    setSuccessOpen(false);
  };

  const handleFailureClose = () => {
    setTimer(5);
    setFailureOpen(false);
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!communityId) {
      toast("Community not found");
      return;
    }

    setSubmittedOnce(true);
    if (!validateAll()) return;

    try {
      setIsSubmitting(true);

      const payload = {
        community: communityId,
        primaryMember: mapMemberToPayload({
          ...primary,
          profileImage: primary.profileImageUrl || "",
          document: primary.documentUrl || "",
          adharCard: primary.adharCardUrl || "",
        }),
        familyMember: family.map((m) =>
          mapMemberToPayload({
            ...m,
            profileImage: m.profileImageUrl || "",
            document: m.documentUrl || "",
            adharCard: m.adharCardUrl || "",
          }),
        ),
      };

      const res = await sendJoinMembershipRequest(payload);
      const paymentRes = unwrapAxios<InitiateCoursePaymentPayload>(res);

      const url = paymentRes?.url;
      const transactionId = paymentRes?.transactionId;
      const txn = paymentRes?.transaction;

      // ✅ store for modal props
      if (txn) setTransaction(txn);

      if (!url || !transactionId) {
        toast.error("Payment link not generated. Please try again.");
        console.log("initiatePayment raw:", res);
        console.log("initiatePayment parsed:", paymentRes);
        return;
      }

      const screenWidth = window.screen.width;
      const screenHeight = window.screen.height;
      const width = Math.min(1000, screenWidth);
      const height = Math.min(1000, screenHeight);
      const left = (screenWidth - width) / 2;
      const top = (screenHeight - height) / 2;

      paymentWindowRef.current = window.open(
        url,
        "paymentWindow",
        `width=${width},height=${height},left=${left},top=${top},resizable=no`,
      );

      if (intervalRef.current) window.clearInterval(intervalRef.current);

      intervalRef.current = window.setInterval(async () => {
        try {
          const paymentStatusRes =
            await getPaymentStatusByIdNoAuth(transactionId);
          const status = (paymentStatusRes as any)?.[0]?.status;
          if (!status) return;

          if (status === PaymentStatus.PENDING) return;

          if (intervalRef.current) window.clearInterval(intervalRef.current);
          intervalRef.current = null;

          paymentWindowRef.current?.close();
          paymentWindowRef.current = null;

          if (status === PaymentStatus.SUCCESS) setSuccessOpen(true);
          else setFailureOpen(true);
        } catch (err) {
          console.error("Error fetching payment status:", err);
        }
      }, 1000);

      toast("Membership request sent successfully");

      setPrimary((prev) => {
        if (prev.profilePreviewUrl) URL.revokeObjectURL(prev.profilePreviewUrl);
        return prev;
      });
      setFamily((prev) => {
        prev.forEach(
          (m) =>
            m.profilePreviewUrl && URL.revokeObjectURL(m.profilePreviewUrl),
        );
        return prev;
      });

      setPrimary(emptyMember());
      setFamily([]);
      setPrimaryErrors(emptyErrors());
      setFamilyErrors([]);
      setSubmittedOnce(false);
    } catch (error) {
      console.error("Join membership failed", error);
      toast("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="w-full" style={{ backgroundColor: bg }}>
      <div className="mx-auto max-w-[1200px] px-6 md:px-10 py-12 md:py-14">
        <div className="flex items-center gap-2 text-white/90">
          <span className="h-1.5 w-1.5 rounded-full bg-white/90" />
          <span className="text-sm font-medium">Membership</span>
        </div>

        <h1 className="mt-4 text-white font-serif text-[52px] leading-[1.05]">
          Join Membership
        </h1>

        <form onSubmit={submit} className="mt-10 space-y-10">
          <MemberBlock
            title="Membership"
            showTitle={false}
            value={primary}
            onChange={(next) => {
              setPrimary(next);
              if (submittedOnce)
                setPrimaryErrors(
                  validateMemberFields(next, { isPrimary: true }),
                );
            }}
            errors={submittedOnce ? primaryErrors : emptyErrors()}
            colors={{ field, fieldBorder, muted }}
            disabled={isSubmitting}
            isProfileUploading={uploading.primaryProfile}
            isDocUploading={uploading.primaryDoc}
            isAadharUploading={uploading.primaryAadhar}
            onPickProfile={uploadPrimaryProfile}
            onPickDocument={uploadPrimaryDocument}
            onPickAadhar={uploadPrimaryAadhar}
            showDocuments
            showAadhar
            documentHelpText="Upload caste certification or education TC"
          />

          <div className="space-y-8">
            {family.map((m, idx) => (
              <MemberBlock
                key={idx}
                title={`Member ${String(idx + 1).padStart(2, "0")}`}
                value={m}
                onChange={(next) => {
                  setFamily((prev) =>
                    prev.map((x, i) => (i === idx ? next : x)),
                  );
                  if (submittedOnce) {
                    setFamilyErrors((prev) =>
                      prev.map((e, i) =>
                        i === idx
                          ? validateMemberFields(next, { isPrimary: false })
                          : e,
                      ),
                    );
                  }
                }}
                errors={
                  submittedOnce
                    ? familyErrors[idx] || emptyErrors()
                    : emptyErrors()
                }
                colors={{ field, fieldBorder, muted }}
                removable
                onRemove={() => removeFamily(idx)}
                disabled={isSubmitting}
                isProfileUploading={!!uploading.familyProfile[idx]}
                isDocUploading={!!uploading.familyDoc[idx]}
                isAadharUploading={!!uploading.familyAadhar[idx]}
                onPickProfile={(file) => uploadFamilyProfile(idx, file)}
                onPickDocument={(file) => uploadFamilyDocument(idx, file)}
                onPickAadhar={(file) => uploadFamilyAadhar(idx, file)}
                showDocuments
                showAadhar
                documentHelpText="Upload caste certification or education TC"
              />
            ))}

            <button
              type="button"
              onClick={addFamily}
              disabled={isSubmitting}
              className="w-full rounded-full bg-white/10 hover:bg-white/15 disabled:opacity-60 transition text-white/90 h-[54px] flex items-center justify-center gap-3"
            >
              <Plus className="h-4 w-4" />
              <span className="text-sm font-medium">Add Family Member</span>
            </button>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center gap-3 rounded-full bg-white text-[#1b1b1b] px-8 py-2 shadow-sm hover:shadow disabled:opacity-60 transition"
            >
              <span className="text-sm font-semibold">
                {isSubmitting ? "Submitting..." : "Submit"}
              </span>
              <span
                className="grid h-9 w-9 place-items-center rounded-full"
                style={{ backgroundColor: bg, color: "white" }}
              >
                <ArrowRight className="h-4 w-4" />
              </span>
            </button>
          </div>
        </form>
      </div>
      <PaymentSuccess
        txnid={transaction?.txnid || ""}
        open={successOpen}
        amount={transaction?.amount || ""}
        timer={timer}
        onClose={handleSuccessClose}
      />

      <PaymentFailure
        open={failureOpen}
        onClose={handleFailureClose}
        amount={transaction?.amount || ""}
        txnid={transaction?.txnid || ""}
        timer={timer}
      />
    </section>
  );
}

// ===================================
// UI Components
// ===================================

function MemberBlock({
  title,
  showTitle = true,
  value,
  onChange,
  errors,
  colors,
  removable,
  onRemove,
  disabled,
  isProfileUploading,
  isDocUploading,
  isAadharUploading,
  onPickProfile,
  onPickDocument,
  onPickAadhar,
  showDocuments = true,
  showAadhar = true,
  documentHelpText = "Upload Documents",
}: {
  title: string;
  showTitle?: boolean;
  value: Member;
  onChange: (m: Member) => void;
  errors: MemberErrors;
  colors: { field: string; fieldBorder: string; muted: string };
  removable?: boolean;
  onRemove?: () => void;
  disabled?: boolean;

  isProfileUploading?: boolean;
  isDocUploading?: boolean;
  isAadharUploading?: boolean;

  onPickProfile: (file: File | null) => void;
  onPickDocument: (file: File | null) => void;
  onPickAadhar: (file: File | null) => void;

  showDocuments?: boolean;
  showAadhar?: boolean;
  documentHelpText?: string;
}) {
  const { field, fieldBorder, muted } = colors;

  const rid = useId();
  const profileInputId = `profile-${rid}`;
  const docsInputId = `docs-${rid}`;
  const aadharInputId = `aadhar-${rid}`;

  const docLabel = (() => {
    if (isDocUploading) return "Uploading...";
    if (value.documentName) return value.documentName;
    if (value.documentUrl) return "Document uploaded";
    return "Upload Documents";
  })();

  const aadharLabel = (() => {
    if (isAadharUploading) return "Uploading...";
    if (value.adharCardName) return value.adharCardName;
    if (value.adharCardUrl) return "Aadhar uploaded";
    return "Upload Aadhar (Optional)";
  })();

  return (
    <div className="space-y-6">
      {showTitle ? (
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-white/90">
            <span className="h-1.5 w-1.5 rounded-full bg-white/90" />
            <span className="text-sm font-medium">{title}</span>
          </div>

          {removable ? (
            <button
              type="button"
              onClick={onRemove}
              disabled={disabled}
              className="inline-flex items-center gap-2 text-white/80 hover:text-white disabled:opacity-60 transition text-sm"
            >
              <Trash2 className="h-4 w-4" />
              Remove
            </button>
          ) : null}
        </div>
      ) : null}

      <div className="rounded-[18px] p-0 bg-transparent">
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <FieldWithError error={errors.name}>
            <InputBox
              placeholder="Full Name"
              value={value.name}
              onChange={(v) => onChange({ ...value, name: v })}
              bg={field}
              border={fieldBorder}
              placeholderColor={muted}
              disabled={disabled}
              hasError={!!errors.name}
            />
          </FieldWithError>

          <FieldWithError error={errors.emailId}>
            <InputBox
              placeholder="Email Address"
              value={value.emailId}
              onChange={(v) => onChange({ ...value, emailId: v })}
              bg={field}
              border={fieldBorder}
              placeholderColor={muted}
              disabled={disabled}
              hasError={!!errors.emailId}
            />
          </FieldWithError>

          <DateInput
            placeholder="Date of Birth"
            value={value.dateOfBirth}
            onChange={(v) => onChange({ ...value, dateOfBirth: v })}
            bg={field}
            border={fieldBorder}
            disabled={disabled}
          />

          <FieldWithError error={errors.mobileNumber}>
            <InputBox
              placeholder="Mobile Number"
              value={value.mobileNumber}
              onChange={(v) => onChange({ ...value, mobileNumber: v })}
              bg={field}
              border={fieldBorder}
              placeholderColor={muted}
              disabled={disabled}
              hasError={!!errors.mobileNumber}
            />
          </FieldWithError>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-3 md:col-span-2">
            <InputBox
              placeholder="City"
              value={value.city}
              onChange={(v) => onChange({ ...value, city: v })}
              bg={field}
              border={fieldBorder}
              placeholderColor={muted}
              disabled={disabled}
            />
            <InputBox
              placeholder="Caste"
              value={value.caste}
              onChange={(v) => onChange({ ...value, caste: v })}
              bg={field}
              border={fieldBorder}
              placeholderColor={muted}
              disabled={disabled}
            />
            <InputBox
              placeholder="Sub Caste"
              value={value.subCaste}
              onChange={(v) => onChange({ ...value, subCaste: v })}
              bg={field}
              border={fieldBorder}
              placeholderColor={muted}
              disabled={disabled}
            />
          </div>

          <div className="md:col-span-2 grid grid-cols-1 gap-5 md:grid-cols-3">
            <FieldWithError error={errors.profileImage}>
              <ProfileUploadWithPreview
                id={profileInputId}
                value={value}
                disabled={disabled}
                locked={!!isProfileUploading}
                uploading={!!isProfileUploading}
                hasError={!!errors.profileImage}
                onPick={onPickProfile}
                onRemove={() => onPickProfile(null)}
              />
            </FieldWithError>

            {showDocuments ? (
              <FieldWithError error={errors.document}>
                <div className="space-y-2">
                  <p className="text-white capitalize text-base font-inter">
                    {documentHelpText}
                  </p>
                  <UploadBox
                    id={docsInputId}
                    label={docLabel}
                    disabled={disabled}
                    accept=".pdf,.jpg,.jpeg,.png"
                    locked={!!isDocUploading}
                    hasError={!!errors.document}
                    onFile={(f) => onPickDocument(f)}
                    onClear={() => onPickDocument(null)}
                    showRemove={!!value.documentUrl}
                  />
                </div>
              </FieldWithError>
            ) : null}

            {showAadhar ? (
              <FieldWithError error={errors.adharCard}>
                <div className="space-y-2 md:col-span-2">
                  <p className="text-white capitalize text-base font-inter">
                    Upload Aadhar Card (Optional)
                  </p>
                  <UploadBox
                    id={aadharInputId}
                    label={aadharLabel}
                    disabled={disabled}
                    accept=".pdf,.jpg,.jpeg,.png"
                    locked={!!isAadharUploading}
                    hasError={!!errors.adharCard}
                    onFile={(f) => onPickAadhar(f)}
                    onClear={() => onPickAadhar(null)}
                    showRemove={!!value.adharCardUrl}
                  />
                </div>
              </FieldWithError>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}

function FieldWithError({
  children,
  error,
}: {
  children: React.ReactNode;
  error?: string;
}) {
  return (
    <div className="space-y-1">
      {children}
      {error ? (
        <p className="text-[12px] leading-4 text-red-200 font-inter">{error}</p>
      ) : null}
    </div>
  );
}

function ProfileUploadWithPreview({
  id,
  value,
  disabled,
  locked,
  uploading,
  hasError,
  onPick,
  onRemove,
}: {
  id: string;
  value: Member;
  disabled?: boolean;
  locked?: boolean;
  uploading?: boolean;
  hasError?: boolean;
  onPick: (file: File | null) => void;
  onRemove: () => void;
}) {
  const hasPreview = !!value.profilePreviewUrl;

  return (
    <div className="space-y-2 w-full">
      <p className="text-white capitalize text-base font-inter">
        Profile Image
      </p>

      <div className="flex items-center gap-3 w-full">
        <UploadBox
          id={id}
          label={
            uploading
              ? "Uploading..."
              : value.profileImageUrl
                ? "Profile Image Uploaded"
                : hasPreview
                  ? "Profile Image Selected"
                  : "Upload Profile Image"
          }
          disabled={disabled}
          accept="image/*"
          locked={locked}
          hasError={hasError}
          onFile={(f) => onPick(f)}
          onClear={onRemove}
          showRemove={false}
        />

        {hasPreview ? (
          <div className="relative h-[56px] w-[56px] rounded-[12px] border border-white/20">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={value.profilePreviewUrl}
              alt="Profile preview"
              className="h-full w-full object-cover rounded-[12px]"
            />
            <button
              type="button"
              onClick={onRemove}
              className="absolute -top-2 -right-2 h-6 w-6 rounded-full bg-white text-black grid place-items-center cursor-pointer hover:text-red-500 border"
              aria-label="Remove profile image"
            >
              <X className="h-3 w-3" />
            </button>
          </div>
        ) : null}
      </div>
    </div>
  );
}

function InputBox({
  placeholder,
  value,
  onChange,
  bg,
  border,
  placeholderColor,
  disabled,
  hasError,
}: {
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
  bg: string;
  border: string;
  placeholderColor?: string;
  disabled?: boolean;
  hasError?: boolean;
}) {
  return (
    <div
      className="h-[56px] rounded-[12px] px-5 flex items-center"
      style={{
        backgroundColor: bg,
        border: `1px solid ${hasError ? "rgba(255,120,120,0.9)" : border}`,
      }}
    >
      <input
        value={value}
        disabled={disabled}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-transparent outline-none font-inter text-[16px] text-white disabled:opacity-60"
      />
      <style jsx>{`
        input::placeholder {
          color: ${placeholderColor ?? "rgba(255,255,255,0.75)"};
        }
      `}</style>
    </div>
  );
}

function DateInput({
  placeholder,
  value,
  onChange,
  bg,
  border,
  disabled,
  hasError,
}: {
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
  bg: string;
  border: string;
  disabled?: boolean;
  hasError?: boolean;
}) {
  return (
    <div
      className="h-[56px] rounded-[12px] px-5 flex items-center justify-between gap-3"
      style={{
        backgroundColor: bg,
        border: `1px solid ${hasError ? "rgba(255,120,120,0.9)" : border}`,
      }}
    >
      <input
        type="date"
        value={value}
        disabled={disabled}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-transparent outline-none font-inter text-[16px] text-white disabled:opacity-60"
        aria-label={placeholder}
      />
      <Calendar className="h-4 w-4 text-white/80" />
      <style jsx>{`
        input::-webkit-calendar-picker-indicator {
          opacity: 0;
          cursor: pointer;
        }
      `}</style>
    </div>
  );
}

function UploadBox({
  id,
  label,
  onFile,
  disabled,
  accept,
  locked,
  hasError,
  onClear,
  showRemove = false,
}: {
  id: string;
  label: string;
  onFile?: (f: File | null) => void;
  disabled?: boolean;
  accept?: string;
  locked?: boolean;
  hasError?: boolean;
  onClear?: () => void;
  showRemove?: boolean;
}) {
  return (
    <div className="flex items-center gap-3 overflow-hidden w-full">
      <label
        htmlFor={!locked ? id : undefined}
        className="
          h-[56px] rounded-[12px] flex-1
          border border-dashed border-white/30
          flex items-center gap-3 px-5
          text-white/90 font-inter text-[16px]
          cursor-pointer hover:border-white/45 transition
           w-full
        "
        style={{
          opacity: disabled ? 0.6 : 1,
          pointerEvents: disabled ? "none" : "auto",
          borderColor: hasError ? "rgba(255,120,120,0.9)" : undefined,
          cursor: locked ? "not-allowed" : "pointer",
        }}
      >
        <Upload className="h-4 w-4 text-white/85 flex-shrink-0" />
        <span className="font-medium truncate min-w-0">{label}</span>

        <input
          id={id}
          type="file"
          className="hidden"
          accept={accept}
          disabled={disabled || locked}
          onChange={(e) => {
            if (locked) return;
            onFile?.(e.target.files?.[0] ?? null);
            e.currentTarget.value = "";
          }}
        />
      </label>

      {showRemove ? (
        <button
          type="button"
          onClick={onClear}
          className="h-[36px] w-[36px] rounded-full bg-white text-black grid place-items-center shadow flex-shrink-0"
          aria-label="Remove selected file"
        >
          <X className="h-4 w-4" />
        </button>
      ) : null}
    </div>
  );
}
