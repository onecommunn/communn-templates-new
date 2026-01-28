"use client";

import React, { useId, useMemo, useState } from "react";
import { Calendar, Upload, Plus, ArrowRight, Trash2, X } from "lucide-react";
import { sendJoinMembershipRequest } from "@/services/Madivala/Madivala.service";
import { mapMemberToPayload } from "@/utils/mapMembershipPayload";
import { useCommunity } from "@/hooks/useCommunity";
import { toast } from "sonner";
import { useUpload } from "@/hooks/useUpload";

type UploadedFile = { url?: string } | string;

type Member = {
    name: string;
    emailId: string;
    dateOfBirth: string;
    mobileNumber: string;
    city: string;
    caste: string;
    subCaste: string;
    profileImage?: File | null;
    document?: FileList | null;
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
});

export default function JoinMembershipForm({
  primaryColor = "#1F514C",
}: {
  primaryColor?: string;
}) {
  const { uploadImages } = useUpload(); // ✅ returns array of urls (or url objects)
  const { communityId } = useCommunity();

  const [primary, setPrimary] = useState<Member>(emptyMember());
  const [family, setFamily] = useState<Member[]>([emptyMember()]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [submittedOnce, setSubmittedOnce] = useState(false);
  const [primaryErrors, setPrimaryErrors] = useState<MemberErrors>(emptyErrors());
  const [familyErrors, setFamilyErrors] = useState<MemberErrors[]>([emptyErrors()]);

  // ✅ per-field uploading state (best UX)
  const [uploading, setUploading] = useState<{
    primaryProfile: boolean;
    primaryDocs: boolean;
    familyProfile: Record<number, boolean>;
    familyDocs: Record<number, boolean>;
  }>({
    primaryProfile: false,
    primaryDocs: false,
    familyProfile: {},
    familyDocs: {},
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
    setFamily((prev) => (prev.length <= 1 ? prev : prev.filter((_, i) => i !== idx)));
    setFamilyErrors((prev) => (prev.length <= 1 ? prev : prev.filter((_, i) => i !== idx)));
    setUploading((p) => {
      const next = { ...p };
      const fp = { ...next.familyProfile };
      const fd = { ...next.familyDocs };
      delete fp[idx];
      delete fd[idx];
      next.familyProfile = fp;
      next.familyDocs = fd;
      return next;
    });
  };

  const validateAll = () => {
    const pErr = validateMemberFields(primary);
    const fErr = family.map(validateMemberFields);
    setPrimaryErrors(pErr);
    setFamilyErrors(fErr);
    return !(hasAnyError(pErr) || fErr.some(hasAnyError));
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
        primaryMember: mapMemberToPayload(primary), // already has urls ✅
        familyMember: family.map(mapMemberToPayload), // already has urls ✅
      };

      await sendJoinMembershipRequest(payload);
      toast("Membership request sent successfully");

      // cleanup preview blobs
      if (primary.profilePreviewUrl) URL.revokeObjectURL(primary.profilePreviewUrl);
      family.forEach((m) => m.profilePreviewUrl && URL.revokeObjectURL(m.profilePreviewUrl));

      setPrimary(emptyMember());
      setFamily([emptyMember()]);
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

  // =========================
  // ✅ Upload handlers (upload immediately on select/change)
  // =========================

  const uploadPrimaryProfile = async (file: File | null) => {
    // remove old preview
    if (primary.profilePreviewUrl) URL.revokeObjectURL(primary.profilePreviewUrl);

    if (!file) {
      setPrimary((p) => ({ ...p, profileImage: null, profilePreviewUrl: "", profileImageUrl: "" }));
      if (submittedOnce) setPrimaryErrors(validateMemberFields({ ...primary, profileImageUrl: "" }));
      return;
    }

    const preview = URL.createObjectURL(file);
    setPrimary((p) => ({ ...p, profileImage: file, profilePreviewUrl: preview, profileImageUrl: "" }));

    try {
      setUploading((p) => ({ ...p, primaryProfile: true }));
      const res = await uploadImages([file]);
      const url = toUrls(res)[0] || "";
      setPrimary((p) => ({ ...p, profileImageUrl: url }));
      if (submittedOnce) setPrimaryErrors((_) => validateMemberFields({ ...primary, profileImageUrl: url }));
    } catch (e) {
      console.error(e);
      toast("Profile image upload failed");
      setPrimary((p) => ({ ...p, profileImageUrl: "" }));
    } finally {
      setUploading((p) => ({ ...p, primaryProfile: false }));
    }
  };

  const uploadPrimaryDocs = async (fl: FileList | null) => {
    if (!fl || fl.length === 0) {
      setPrimary((p) => ({ ...p, documents: null, documentUrls: [] }));
      if (submittedOnce) setPrimaryErrors(validateMemberFields({ ...primary, documentUrls: [] }));
      return;
    }

    const files = Array.from(fl);
    setPrimary((p) => ({ ...p, documents: fl, documentUrls: [] }));

    try {
      setUploading((p) => ({ ...p, primaryDocs: true }));
      const res = await uploadImages(files);
      const urls = toUrls(res);
      setPrimary((p) => ({ ...p, documentUrls: urls }));
      if (submittedOnce) setPrimaryErrors((_) => validateMemberFields({ ...primary, documentUrls: urls }));
    } catch (e) {
      console.error(e);
      toast("Documents upload failed");
      setPrimary((p) => ({ ...p, documentUrls: [] }));
    } finally {
      setUploading((p) => ({ ...p, primaryDocs: false }));
    }
  };

  const uploadFamilyProfile = async (idx: number, file: File | null) => {
    setFamily((prev) =>
      prev.map((m, i) => {
        if (i !== idx) return m;
        if (m.profilePreviewUrl) URL.revokeObjectURL(m.profilePreviewUrl);
        const preview = file ? URL.createObjectURL(file) : "";
        return { ...m, profileImage: file, profilePreviewUrl: preview, profileImageUrl: "" };
      })
    );

    if (!file) return;

    try {
      setUploading((p) => ({
        ...p,
        familyProfile: { ...p.familyProfile, [idx]: true },
      }));
      const res = await uploadImages([file]);
      const url = toUrls(res)[0] || "";
      setFamily((prev) => prev.map((m, i) => (i === idx ? { ...m, profileImageUrl: url } : m)));

      if (submittedOnce) {
        setFamilyErrors((prevErr) =>
          prevErr.map((e, i) => (i === idx ? validateMemberFields({ ...family[idx], profileImageUrl: url }) : e))
        );
      }
    } catch (e) {
      console.error(e);
      toast("Profile image upload failed");
      setFamily((prev) => prev.map((m, i) => (i === idx ? { ...m, profileImageUrl: "" } : m)));
    } finally {
      setUploading((p) => ({
        ...p,
        familyProfile: { ...p.familyProfile, [idx]: false },
      }));
    }
  };

  const uploadFamilyDocs = async (idx: number, fl: FileList | null) => {
    if (!fl || fl.length === 0) {
      setFamily((prev) => prev.map((m, i) => (i === idx ? { ...m, documents: null, documentUrls: [] } : m)));
      return;
    }

    const files = Array.from(fl);
    setFamily((prev) => prev.map((m, i) => (i === idx ? { ...m, documents: fl, documentUrls: [] } : m)));

    try {
      setUploading((p) => ({
        ...p,
        familyDocs: { ...p.familyDocs, [idx]: true },
      }));
      const res = await uploadImages(files);
      const urls = toUrls(res);
      setFamily((prev) => prev.map((m, i) => (i === idx ? { ...m, documentUrls: urls } : m)));

      if (submittedOnce) {
        setFamilyErrors((prevErr) =>
          prevErr.map((e, i) => (i === idx ? validateMemberFields({ ...family[idx], documentUrls: urls }) : e))
        );
      }
    } catch (e) {
      console.error(e);
      toast("Documents upload failed");
      setFamily((prev) => prev.map((m, i) => (i === idx ? { ...m, documentUrls: [] } : m)));
    } finally {
      setUploading((p) => ({
        ...p,
        familyDocs: { ...p.familyDocs, [idx]: false },
      }));
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
            onChange={setPrimary}
            errors={submittedOnce ? primaryErrors : emptyErrors()}
            colors={{ field, fieldBorder, muted }}
            disabled={isSubmitting}
            isProfileUploading={uploading.primaryProfile}
            isDocsUploading={uploading.primaryDocs}
            onPickProfile={uploadPrimaryProfile}
            onPickDocs={uploadPrimaryDocs}
          />

          <div className="space-y-8">
            {family.map((m, idx) => (
              <MemberBlock
                key={idx}
                title={`Member ${String(idx + 1).padStart(2, "0")}`}
                value={m}
                onChange={(next) => setFamily((prev) => prev.map((x, i) => (i === idx ? next : x)))}
                errors={submittedOnce ? familyErrors[idx] || emptyErrors() : emptyErrors()}
                colors={{ field, fieldBorder, muted }}
                removable={family.length > 1}
                onRemove={() => removeFamily(idx)}
                disabled={isSubmitting}
                isProfileUploading={!!uploading.familyProfile[idx]}
                isDocsUploading={!!uploading.familyDocs[idx]}
                onPickProfile={(file) => uploadFamilyProfile(idx, file)}
                onPickDocs={(fl) => uploadFamilyDocs(idx, fl)}
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
  isDocsUploading,
  onPickProfile,
  onPickDocs,
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

  // ✅ immediate upload support
  isProfileUploading?: boolean;
  isDocsUploading?: boolean;
  onPickProfile: (file: File | null) => void;
  onPickDocs: (fl: FileList | null) => void;
}) {
  const { field, fieldBorder, muted } = colors;

  // ✅ hydration-safe ids
  const rid = useId();
  const profileInputId = `profile-${rid}`;
  const docsInputId = `docs-${rid}`;

  const docsSelectedName =
    value.documents?.length ? (value.documents.length === 1 ? value.documents[0].name : `${value.documents.length} files selected`) : "";

  const docsLabel =
    value.documentUrls?.length
      ? value.documentUrls.length === 1
        ? "1 file uploaded"
        : `${value.documentUrls.length} files uploaded`
      : docsSelectedName || "Upload Documents";

  // ✅ allow "change" by forcing remove first
  const profileLocked = !!value.profileImageUrl || isProfileUploading;
  const docsLocked = (value.documentUrls?.length ?? 0) > 0 || isDocsUploading;

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
          <FieldWithError error={errors.fullName}>
            <InputBox
              placeholder="Full Name"
              value={value.name}
              onChange={(v) => onChange({ ...value, name: v })}
              bg={field}
              border={fieldBorder}
              placeholderColor={muted}
              disabled={disabled}
              hasError={!!errors.fullName}
            />
          </FieldWithError>

          <FieldWithError error={errors.email}>
            <InputBox
              placeholder="Email Address"
              value={value.emailId}
              onChange={(v) => onChange({ ...value, emailId: v })}
              bg={field}
              border={fieldBorder}
              placeholderColor={muted}
              disabled={disabled}
              hasError={!!errors.email}
            />
          </FieldWithError>

          <FieldWithError error={errors.dob}>
            <DateInput
              placeholder="Date of Birth"
              value={value.dateOfBirth}
              onChange={(v) => onChange({ ...value, dateOfBirth: v })}
              bg={field}
              border={fieldBorder}
              placeholderColor={muted}
              disabled={disabled}
              hasError={!!errors.dob}
            />
          </FieldWithError>

          <FieldWithError error={errors.mobile}>
            <InputBox
              placeholder="Mobile Number"
              value={value.mobileNumber}
              onChange={(v) => onChange({ ...value, mobileNumber: v })}
              bg={field}
              border={fieldBorder}
              placeholderColor={muted}
              disabled={disabled}
              hasError={!!errors.mobile}
            />
          </FieldWithError>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-3 md:col-span-2">
            <FieldWithError error={errors.city}>
              <InputBox
                placeholder="City"
                value={value.city}
                onChange={(v) => onChange({ ...value, city: v })}
                bg={field}
                border={fieldBorder}
                placeholderColor={muted}
                disabled={disabled}
                hasError={!!errors.city}
              />
            </FieldWithError>

            <FieldWithError error={errors.caste}>
              <InputBox
                placeholder="Caste"
                value={value.caste}
                onChange={(v) => onChange({ ...value, caste: v })}
                bg={field}
                border={fieldBorder}
                placeholderColor={muted}
                disabled={disabled}
                hasError={!!errors.caste}
              />
            </FieldWithError>

            <FieldWithError error={errors.subCaste}>
              <InputBox
                placeholder="Sub Caste"
                value={value.subCaste}
                onChange={(v) => onChange({ ...value, subCaste: v })}
                bg={field}
                border={fieldBorder}
                placeholderColor={muted}
                disabled={disabled}
                hasError={!!errors.subCaste}
              />
            </FieldWithError>
          </div>

          <div className="md:col-span-2 grid grid-cols-1 gap-5 md:grid-cols-2">
            <FieldWithError error={errors.profileImage}>
              <ProfileUploadWithPreview
                id={profileInputId}
                value={value}
                disabled={disabled}
                locked={profileLocked}
                uploading={!!isProfileUploading}
                hasError={!!errors.profileImage}
                onPick={(file) => onPickProfile(file)}
                onRemove={() => onPickProfile(null)}
              />
            </FieldWithError>

            <FieldWithError error={errors.documents}>
              <UploadBox
                id={docsInputId}
                label={isDocsUploading ? "Uploading..." : docsLabel}
                multiple
                disabled={disabled}
                accept=".pdf,.jpg,.jpeg,.png"
                locked={docsLocked}
                hasError={!!errors.documents}
                onFiles={(fl) => onPickDocs(fl)}
                onClear={() => onPickDocs(null)}
              />
            </FieldWithError>
          </div>
        </div>
      </div>
    </div>
  );
}

function FieldWithError({ children, error }: { children: React.ReactNode; error?: string }) {
  return (
    <div className="space-y-1">
      {children}
      {error ? <p className="text-[12px] leading-4 text-red-200 font-inter">{error}</p> : null}
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
    <div className="flex items-center gap-3">
      <UploadBox
        id={id}
        label={uploading ? "Uploading..." : value.profileImageUrl ? "Profile Image Uploaded" : hasPreview ? "Profile Image Selected" : "Upload Profile Image"}
        disabled={disabled}
        accept="image/*"
        locked={locked}
        hasError={hasError}
        onFile={(f) => onPick(f)}
        onClear={onRemove}
      />

      {hasPreview ? (
        <div className="relative h-[56px] w-[56px] rounded-[12px] border border-white/20 overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={value.profilePreviewUrl} alt="Profile preview" className="h-full w-full object-cover" />
          <button
            type="button"
            onClick={onRemove}
            className="absolute -top-2 -right-2 h-6 w-6 rounded-full bg-white text-black grid place-items-center shadow"
            aria-label="Remove profile image"
          >
            <X className="h-3 w-3" />
          </button>
        </div>
      ) : null}
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
  placeholderColor: string;
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
          color: ${placeholderColor};
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
  placeholderColor,
  disabled,
  hasError,
}: {
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
  bg: string;
  border: string;
  placeholderColor: string;
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
        input::placeholder {
          color: ${placeholderColor};
        }
        input::-webkit-calendar-picker-indicator {
          opacity: 0;
          cursor: pointer;
        }
      `}</style>
    </div>
  );
}

/**
 * ✅ Upload behavior:
 * - uploads immediately on select (handled by parent)
 * - locked while uploaded/uploading (user must remove to change)
 * - remove button works always
 * - shows filename for docs (via label from parent)
 */
function UploadBox({
  id,
  label,
  multiple,
  onFile,
  onFiles,
  disabled,
  accept,
  locked,
  hasError,
  onClear,
}: {
  id: string;
  label: string;
  multiple?: boolean;
  onFile?: (f: File | null) => void;
  onFiles?: (fl: FileList | null) => void;
  disabled?: boolean;
  accept?: string;
  locked?: boolean;
  hasError?: boolean;
  onClear?: () => void;
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
        aria-disabled={locked ? true : undefined}
      >
        <Upload className="h-4 w-4 text-white/85" />
        <span className="font-medium truncate">{label}</span>

        <input
          id={id}
          type="file"
          className="hidden"
          multiple={multiple}
          accept={accept}
          disabled={disabled || locked}
          onChange={(e) => {
            if (locked) return;

            if (multiple) onFiles?.(e.target.files);
            else onFile?.(e.target.files?.[0] ?? null);

            // allow picking same file again after remove
            e.currentTarget.value = "";
          }}
        />
      </label>

      {locked ? (
        <button
          type="button"
          onClick={onClear}
          className="h-[36px] w-[36px] rounded-full bg-white text-black grid place-items-center shadow"
          aria-label="Remove selected file(s)"
        >
          <X className="h-4 w-4" />
        </button>
      ) : null}
    </div>
  );
}
