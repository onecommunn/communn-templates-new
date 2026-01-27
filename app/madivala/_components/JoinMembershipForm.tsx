
"use client";

import React, { useMemo, useState } from "react";
import { Calendar, Upload, Plus, ArrowRight, Trash2 } from "lucide-react";

type Member = {
    fullName: string;
    email: string;
    dob: string;
    mobile: string;
    city: string;
    caste: string;
    subCaste: string;
    profileImage?: File | null;
    documents?: FileList | null;
};

const emptyMember = (): Member => ({
    fullName: "",
    email: "",
    dob: "",
    mobile: "",
    city: "",
    caste: "",
    subCaste: "",
    profileImage: null,
    documents: null,
});

export default function JoinMembershipForm({
    primaryColor = "#1F514C",
    onSubmit,
}: {
    primaryColor?: string;
    onSubmit?: (payload: { primary: Member; family: Member[] }) => void;
}) {
    const [primary, setPrimary] = useState<Member>(emptyMember());
    const [family, setFamily] = useState<Member[]>([emptyMember()]);

    const bg = primaryColor;
    const field = "#2f6660";
    const fieldBorder = "rgba(255,255,255,0.08)";
    const muted = "rgba(255,255,255,0.75)";

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit?.({ primary, family });
    };

    const addFamily = () => setFamily((p) => [...p, emptyMember()]);

    const removeFamily = (idx: number) => {
        setFamily((prev) => {
            if (prev.length <= 1) return prev;
            return prev.filter((_, i) => i !== idx);
        });
    };

    return (
        <section className="w-full" style={{ backgroundColor: bg }}>
            <div className="mx-auto max-w-[1200px] px-6 md:px-10 py-12 md:py-14">
                {/* Eyebrow */}
                <div className="flex items-center gap-2 text-white/90">
                    <span className="h-1.5 w-1.5 rounded-full bg-white/90" />
                    <span className="text-sm font-medium">Membership</span>
                </div>

                {/* Heading */}
                <h1 className="mt-4 text-white font-serif text-[52px] leading-[1.05]">
                    Join Membership
                </h1>

                <form onSubmit={submit} className="mt-10 space-y-10">
                    {/* Primary block */}
                    <MemberBlock
                        title="Membership"
                        showTitle={false}
                        value={primary}
                        onChange={setPrimary}
                        colors={{ field, fieldBorder, muted }}
                    />

                    {/* Family label */}
                    {/* <div className="flex items-center gap-2 text-white/90">
                        <span className="h-1.5 w-1.5 rounded-full bg-white/90" />
                        <span className="text-sm font-medium">Member 01</span>
                    </div> */}

                    <div className="space-y-8">
                        {family.map((m, idx) => (
                            <MemberBlock
                                key={idx}
                                title={`Member ${String(idx + 1).padStart(2, "0")}`}
                                value={m}
                                onChange={(next) =>
                                    setFamily((prev) => prev.map((x, i) => (i === idx ? next : x)))
                                }
                                colors={{ field, fieldBorder, muted }}
                                removable={family.length > 1}
                                onRemove={() => removeFamily(idx)}
                            />
                        ))}

                        {/* Add family member */}
                        <button
                            type="button"
                            onClick={addFamily}
                            className="w-full rounded-full bg-white/10 hover:bg-white/15 transition text-white/90 h-[54px] flex items-center justify-center gap-3"
                        >
                            <Plus className="h-4 w-4" />
                            <span className="text-sm font-medium">Add Family Member</span>
                        </button>
                    </div>

                    {/* Submit */}
                    <div className="pt-2">
                        <button
                            type="submit"
                            className="inline-flex items-center gap-3 rounded-full bg-white text-[#1b1b1b] px-8 py-2 shadow-sm hover:shadow transition"
                        >
                            <span className="text-sm font-semibold">Submit</span>
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
    colors,
    removable,
    onRemove,
}: {
    title: string;
    showTitle?: boolean;
    value: Member;
    onChange: (m: Member) => void;
    colors: {
        field: string;
        fieldBorder: string;
        muted: string;
    };
    removable?: boolean;
    onRemove?: () => void;
}) {
    const { field, fieldBorder, muted } = colors;

    const profileInputId = useMemo(
        () => `profile-${Math.random().toString(36).slice(2)}`,
        []
    );
    const docsInputId = useMemo(
        () => `docs-${Math.random().toString(36).slice(2)}`,
        []
    );

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
                            className="inline-flex items-center gap-2 text-white/80 hover:text-white transition text-sm"
                            aria-label="Remove family member"
                        >
                            <Trash2 className="h-4 w-4" />
                            Remove
                        </button>
                    ) : null}
                </div>
            ) : null}

            {/* Grid */}
            <div className="rounded-[18px] p-0 bg-transparent">
                <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                    <InputBox
                        placeholder="Full Name"
                        value={value.fullName}
                        onChange={(v) => onChange({ ...value, fullName: v })}
                        bg={field}
                        border={fieldBorder}
                        placeholderColor={muted}
                    />
                    <InputBox
                        placeholder="Email Address"
                        value={value.email}
                        onChange={(v) => onChange({ ...value, email: v })}
                        bg={field}
                        border={fieldBorder}
                        placeholderColor={muted}
                    />

                    <DateInput
                        placeholder="Date of Birth"
                        value={value.dob}
                        onChange={(v) => onChange({ ...value, dob: v })}
                        bg={field}
                        border={fieldBorder}
                        placeholderColor={muted}
                    />

                    <InputBox
                        placeholder="Mobile Number"
                        value={value.mobile}
                        onChange={(v) => onChange({ ...value, mobile: v })}
                        bg={field}
                        border={fieldBorder}
                        placeholderColor={muted}
                    />

                    <div className="grid grid-cols-1 gap-5 md:grid-cols-3 md:col-span-2">
                        <InputBox
                            placeholder="City"
                            value={value.city}
                            onChange={(v) => onChange({ ...value, city: v })}
                            bg={field}
                            border={fieldBorder}
                            placeholderColor={muted}
                        />
                        <InputBox
                            placeholder="Caste"
                            value={value.caste}
                            onChange={(v) => onChange({ ...value, caste: v })}
                            bg={field}
                            border={fieldBorder}
                            placeholderColor={muted}
                        />
                        <InputBox
                            placeholder="Sub Caste"
                            value={value.subCaste}
                            onChange={(v) => onChange({ ...value, subCaste: v })}
                            bg={field}
                            border={fieldBorder}
                            placeholderColor={muted}
                        />
                    </div>

                    {/* Uploads */}
                    <div className="md:col-span-2 grid grid-cols-1 gap-5 md:grid-cols-2">
                        <UploadBox
                            id={profileInputId}
                            label="Upload Profile Image"
                            onFile={(f) => onChange({ ...value, profileImage: f })}
                        />
                        <UploadBox
                            id={docsInputId}
                            label="Upload Documents"
                            onFiles={(fl) => onChange({ ...value, documents: fl })}
                            multiple
                        />
                    </div>
                </div>
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
}: {
    placeholder: string;
    value: string;
    onChange: (v: string) => void;
    bg: string;
    border: string;
    placeholderColor: string;
}) {
    return (
        <div
            className="h-[56px] rounded-[12px] px-5 flex items-center"
            style={{ backgroundColor: bg, border: `1px solid ${border}` }}
        >
            <input
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
                className="w-full bg-transparent outline-none font-inter text-[16px] text-white"
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
}: {
    placeholder: string;
    value: string;
    onChange: (v: string) => void;
    bg: string;
    border: string;
    placeholderColor: string;
}) {
    return (
        <div
            className="h-[56px] rounded-[12px] px-5 flex items-center justify-between gap-3"
            style={{ backgroundColor: bg, border: `1px solid ${border}` }}
        >
            <input
                type="date"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="w-full bg-transparent outline-none font-inter text-[16px] text-white"
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

function UploadBox({
    id,
    label,
    multiple,
    onFile,
    onFiles,
}: {
    id: string;
    label: string;
    multiple?: boolean;
    onFile?: (f: File | null) => void;
    onFiles?: (fl: FileList | null) => void;
}) {
    return (
        <label
            htmlFor={id}
            className="
        h-[56px] rounded-[12px]
        border border-dashed border-white/30
        flex items-center gap-3 px-5
        text-white/90 font-inter text-[16px]
        cursor-pointer hover:border-white/45 transition
      "
        >
            <Upload className="h-4 w-4 text-white/85" />
            <span className="font-medium">{label}</span>

            <input
                id={id}
                type="file"
                className="hidden"
                multiple={multiple}
                onChange={(e) => {
                    if (multiple) onFiles?.(e.target.files);
                    else onFile?.(e.target.files?.[0] ?? null);
                }}
            />
        </label>
    );
}
