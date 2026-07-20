import React from "react";
import { STEPS } from "../data/content";

function DecorativeBlobs() {
  return (
    <svg
      viewBox="0 0 300 250"
      className="pointer-events-none absolute bottom-0 left-0 h-56 w-full text-transparent"
      preserveAspectRatio="xMidYMax slice"
      aria-hidden="true"
    >
      <circle cx="60" cy="230" r="55" fill="#F8A272" />
      <path
        d="M120 250C140 190 190 150 260 170C300 182 320 220 320 250Z"
        fill="#F49999"
      />
    </svg>
  );
}

export default function Sidebar({ currentStep }) {
  return (
    <div className="relative flex h-full w-full flex-col gap-8 overflow-hidden rounded-xl bg-indigo-600 p-8 sm:p-10">
      <DecorativeBlobs />

      {STEPS.map((step) => {
        const isActive = step.id === currentStep;
        return (
          <div key={step.id} className="relative z-10 flex items-center gap-4">
            <span
              className={`flex h-9 w-9 flex-none items-center justify-center rounded-full border font-mono text-sm font-bold transition-colors ${
                isActive
                  ? "border-transparent bg-sky-200 text-slate-900"
                  : "border-white/50 bg-transparent text-white"
              }`}
            >
              {step.id}
            </span>
            <div className="hidden sm:block">
              <p className="text-[11px] uppercase tracking-wide text-indigo-200">
                Step {step.id}
              </p>
              <p className="text-sm font-bold uppercase tracking-wide text-white">
                {step.label}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
