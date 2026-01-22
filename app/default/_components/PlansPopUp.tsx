"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import { X, Check } from "lucide-react";
import { TrainingPlan } from "@/models/plan.model";

type PlansPopUpProps = {
  isOpen: boolean;
  onClose: () => void;
  plans: TrainingPlan[];
  loading?: boolean;
  communityId: string;
};

export default function PlansPopUp({
  isOpen,
  onClose,
  plans,
  loading = false,
  communityId,
}: PlansPopUpProps) {
  const [selectedId, setSelectedId] = useState<string>("");

  const selectedPlan = useMemo(
    () => plans?.find((p) => p._id === selectedId),
    [plans, selectedId]
  );

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      {/* Backdrop */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Modal */}
      <div className="relative w-full max-w-3xl bg-white rounded-2xl shadow-2xl border overflow-hidden">
        {/* Header */}
        <div className="relative px-6 md:px-8 py-5 border-b">
          <button
            onClick={onClose}
            className="absolute right-4 top-4 p-2 hover:bg-gray-100 rounded-full"
            aria-label="Close"
          >
            <X size={20} className="text-gray-600" />
          </button>

          <h3 className="text-xl md:text-2xl font-bold text-gray-900 text-center font-montserrat">
            Choose a Plan
          </h3>
          <p className="text-sm text-gray-500 text-center mt-1">
            Select a plan to subscribe and join the community.
          </p>
        </div>

        {/* Body (scrollable) */}
        <div className="max-h-[70vh] overflow-y-auto px-6 md:px-8 py-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {(plans || []).map((plan) => {
              const selected = plan._id === selectedId;

              const price = Number(plan.pricing || plan.totalPlanValue || 0);
              const durationText = (plan.duration || "").toLowerCase();

              const descParts =
                plan.description && plan.description.includes("/")
                  ? plan.description
                      .split("/")
                      .map((t) => t.trim())
                      .filter(Boolean)
                  : null;

              return (
                <button
                  key={plan._id}
                  type="button"
                  onClick={() => setSelectedId(plan._id)}
                  className={`text-left rounded-2xl border p-4 md:p-5 transition-all ${
                    selected
                      ? "border-[#3056A7] ring-2 ring-[#3056A7]/20"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="font-semibold text-gray-900">{plan.name}</p>
                      <p className="text-sm text-gray-500 mt-1">
                        {durationText || "Plan"}
                      </p>
                    </div>

                    {selected && (
                      <span className="inline-flex items-center justify-center h-7 w-7 rounded-full bg-[#3056A7] text-white">
                        <Check size={16} />
                      </span>
                    )}
                  </div>

                  <div className="mt-4">
                    <p className="text-2xl font-bold text-gray-900">
                      ₹{price.toLocaleString()}
                    </p>
                  </div>

                  {/* Description / bullet list */}
                  {plan.description ? (
                    <div className="mt-3 text-sm text-gray-600">
                      {descParts ? (
                        <div className="space-y-2">
                          {descParts.slice(0, 6).map((text, idx) => (
                            <div
                              key={idx}
                              className="flex items-start gap-2 text-gray-600"
                            >
                              <Check size={16} className="mt-0.5 text-black" />
                              <span className="leading-snug">{text}</span>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="line-clamp-3">{plan.description}</p>
                      )}
                    </div>
                  ) : null}
                </button>
              );
            })}
          </div>

          {/* Spacer so the sticky bar doesn't cover content */}
          <div className="h-24" />
        </div>

        {/* Swiggy-style sticky action bar (appears only after selection) */}
        <div
          className={`absolute left-0 right-0 bottom-0 border-t bg-white/95 backdrop-blur px-6 md:px-8 py-4
          transition-all duration-300
          ${selectedPlan ? "translate-y-0 opacity-100" : "translate-y-full opacity-0 pointer-events-none"}`}
        >
          <div className="flex flex-col md:flex-row gap-3 md:items-center md:justify-between">
            {/* Selected summary */}
            <div className="min-w-0">
              <p className="text-sm text-gray-500">Selected plan</p>
              <p className="font-semibold text-gray-900 truncate">
                {selectedPlan?.name}
                <span className="text-gray-500 font-medium">
                  {" "}
                  • ₹{Number(selectedPlan?.pricing || selectedPlan?.totalPlanValue || 0).toLocaleString()}
                </span>
              </p>
            </div>

            {/* Buttons */}
            <div className="flex flex-col md:flex-row gap-3 md:justify-end">
              <button
                onClick={onClose}
                className="w-full md:w-auto px-5 py-3 rounded-xl border border-gray-200 font-semibold text-gray-700 hover:bg-gray-50 transition"
                disabled={loading}
              >
                Not now
              </button>

              {/* Subscribe route same as your current system */}
              <Link
                href={
                  selectedPlan
                    ? `/subscriptions/?planid=${selectedPlan._id}&communityid=${communityId}`
                    : "#"
                }
                className={`w-full md:w-auto px-6 py-3 rounded-xl font-semibold text-white text-center transition-all
                ${
                  selectedPlan && !loading
                    ? "bg-[#3056A7] hover:bg-[#25468a]"
                    : "bg-gray-300 pointer-events-none"
                }`}
              >
                {loading ? "Processing..." : "Subscribe & Join"}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
