"use client";

import React, { useId, useState } from "react";
import { Calendar, Upload, Plus, ArrowRight, Trash2, X } from "lucide-react";
import { sendJoinMembershipRequest } from "@/services/Madivala/Madivala.service";
import { mapMemberToPayload } from "@/utils/mapMembershipPayload";
import { useCommunity } from "@/hooks/useCommunity";
import { toast } from "sonner";
import { useUpload } from "@/hooks/useUpload";

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

  // local selection
  profileImage?: File | null;
  document?: File | null;

  // UI helpers
  profilePreviewUrl?: string;

  // uploaded urls (SINGLE URL)
  profileImageUrl?: string;
  documentUrl?: string;

  // file names for label
  documentName?: string;
};

type MemberErrors = Partial<Record<keyof Member, string>> & {
  profileImage?: string;
  document?: string;
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
  profilePreviewUrl: "",
  profileImageUrl: "",
  documentUrl: "",
  documentName: "",
});

const emptyErrors = (): MemberErrors => ({});

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

  const [primaryErrors, setPrimaryErrors] =
    useState<MemberErrors>(emptyErrors());
  const [familyErrors, setFamilyErrors] = useState<MemberErrors[]>([
    emptyErrors(),
  ]);

  const [uploading, setUploading] = useState<{
    primaryProfile: boolean;
    primaryDoc: boolean;
    familyProfile: Record<number, boolean>;
  }>({
    primaryProfile: false,
    primaryDoc: false,
    familyProfile: {},
  });

  const bg = primaryColor;
  const field = "#2f6660";
  const fieldBorder = "rgba(255,255,255,0.08)";
  const muted = "rgba(255,255,255,0.75)";

  const addFamily = () => {
    setFamily((p) => [...p, emptyMember()]);
    setFamilyErrors((p) => [...p, emptyErrors()]);
  };

  const removeFamily = (idx: number) => {
    setFamily((prev) =>
      prev.length <= 1 ? prev : prev.filter((_, i) => i !== idx),
    );
    setFamilyErrors((prev) =>
      prev.length <= 1 ? prev : prev.filter((_, i) => i !== idx),
    );
    setUploading((p) => {
      const fp = { ...p.familyProfile };
      delete fp[idx];
      return { ...p, familyProfile: fp };
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

  const uploadPrimaryProfile = async (file: File | null) => {
    setPrimary((prev) => {
      if (prev.profilePreviewUrl) URL.revokeObjectURL(prev.profilePreviewUrl);
      const preview = file ? URL.createObjectURL(file) : "";
      const next = {
        ...prev,
        profileImage: file,
        profilePreviewUrl: preview,
        profileImageUrl: file ? "" : "",
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
      setPrimary((prev) => {
        const next = { ...prev, profileImageUrl: "" };
        if (submittedOnce)
          setPrimaryErrors(validateMemberFields(next, { isPrimary: true }));
        return next;
      });
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

  const uploadFamilyProfile = async (idx: number, file: File | null) => {
    setFamily((prev) =>
      prev.map((m, i) => {
        if (i !== idx) return m;
        if (m.profilePreviewUrl) URL.revokeObjectURL(m.profilePreviewUrl);
        const preview = file ? URL.createObjectURL(file) : "";
        const next = {
          ...m,
          profileImage: file,
          profilePreviewUrl: preview,
          profileImageUrl: "",
        };
        return next;
      }),
    );

    if (!file) {
      if (submittedOnce) {
        setFamilyErrors((prevErr) =>
          prevErr.map((e, i) =>
            i === idx
              ? validateMemberFields(family[idx], { isPrimary: false })
              : e,
          ),
        );
      }
      return;
    }

    try {
      setUploading((p) => ({
        ...p,
        familyProfile: { ...p.familyProfile, [idx]: true },
      }));

      const [res] = (await uploadImages([file])) as UploadResponse[];
      const url = pickUploadedUrl(res);

      setFamily((prev) =>
        prev.map((m, i) => (i === idx ? { ...m, profileImageUrl: url } : m)),
      );

      if (submittedOnce) {
        setFamilyErrors((prevErr) =>
          prevErr.map((e, i) =>
            i === idx
              ? validateMemberFields(
                  { ...family[idx], profileImageUrl: url },
                  { isPrimary: false },
                )
              : e,
          ),
        );
      }
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
        }),
        familyMember: family.map((m) =>
          mapMemberToPayload({
            ...m,
            profileImage: m.profileImageUrl || "",
            document: "", // family document not sent
          }),
        ),
      };

      await sendJoinMembershipRequest(payload);
      toast("Membership request sent successfully");

      // cleanup previews
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
      setFamilyErrors([emptyErrors()]);
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
          {/* Primary */}
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
            onPickProfile={uploadPrimaryProfile}
            onPickDocument={uploadPrimaryDocument}
            showDocuments
          />

          {/* Family */}
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
                removable={family.length > 0}
                onRemove={() => removeFamily(idx)}
                disabled={isSubmitting}
                isProfileUploading={!!uploading.familyProfile[idx]}
                onPickProfile={(file) => uploadFamilyProfile(idx, file)}
                onPickDocument={() => {}}
                showDocuments={false}
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
  onPickProfile,
  onPickDocument,
  showDocuments = true,
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
  onPickProfile: (file: File | null) => void;
  onPickDocument: (file: File | null) => void;
  showDocuments?: boolean;
}) {
  const { field, fieldBorder, muted } = colors;

  const rid = useId();
  const profileInputId = `profile-${rid}`;
  const docsInputId = `docs-${rid}`;

  const profileLocked = !!isProfileUploading;
  const docLocked = !!isDocUploading;

  const docLabel = (() => {
    if (isDocUploading) return "Uploading...";
    if (value.documentName) return value.documentName;
    if (value.documentUrl) return "Document uploaded";
    return "Upload Documents";
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

          <div
            className={`md:col-span-2 grid grid-cols-1 gap-5 ${
              showDocuments ? "md:grid-cols-2" : ""
            }`}
          >
            <FieldWithError error={errors.profileImage}>
              <ProfileUploadWithPreview
                id={profileInputId}
                value={value}
                disabled={disabled}
                locked={profileLocked}
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
                    Upload caste certification or education TC
                  </p>

                  <UploadBox
                    id={docsInputId}
                    label={docLabel}
                    disabled={disabled}
                    accept=".pdf,.jpg,.jpeg,.png"
                    locked={docLocked}
                    hasError={!!errors.document}
                    onFile={(f) => onPickDocument(f)}
                    onClear={() => onPickDocument(null)}
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
    <div className="space-y-2">
      <p className="text-white capitalize text-base font-inter">
        Profile Image
      </p>

      <div className="flex items-center gap-3">
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
          showRemove={!!value.profileImageUrl || hasPreview}
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

type InputBoxProps = {
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
  bg: string;
  border: string;
  placeholderColor?: string;
  disabled?: boolean;
  hasError?: boolean;
};

function InputBox({
  placeholder,
  value,
  onChange,
  bg,
  border,
  placeholderColor,
  disabled,
  hasError,
}: InputBoxProps) {
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

type DateInputProps = {
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
  bg: string;
  border: string;
  disabled?: boolean;
  hasError?: boolean;
};

function DateInput({
  placeholder,
  value,
  onChange,
  bg,
  border,
  disabled,
  hasError,
}: DateInputProps) {
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
    <div className="flex items-center gap-3">
      <label
        htmlFor={!locked ? id : undefined}
        className="
          h-[56px] rounded-[12px] flex-1
          border border-dashed border-white/30
          flex items-center gap-3 px-5
          text-white/90 font-inter text-[16px]
          cursor-pointer hover:border-white/45 transition
        "
        style={{
          opacity: disabled ? 0.6 : 1,
          pointerEvents: disabled ? "none" : "auto",
          borderColor: hasError ? "rgba(255,120,120,0.9)" : undefined,
          cursor: locked ? "not-allowed" : "pointer",
        }}
      >
        <Upload className="h-4 w-4 text-white/85" />
        <span className="font-medium truncate">{label}</span>

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
          className="h-[36px] w-[36px] rounded-full bg-white text-black grid place-items-center shadow"
          aria-label="Remove selected file"
        >
          <X className="h-4 w-4" />
        </button>
      ) : null}
    </div>
  );
}
