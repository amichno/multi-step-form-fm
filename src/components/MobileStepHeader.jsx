import React from "react";
import { STEPS } from "../data/content";

function DecorativeBlobsMobile() {
  return (
    <svg
      viewBox="0 0 375 172"
      className="pointer-events-none absolute inset-0 h-full w-full text-transparent"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      <circle cx="55" cy="30" r="90" fill="#F8A272" />
      <path
        d="M190 30C230 -20 330 0 390 70C420 110 405 172 385 172H190Z"
        fill="#F49999"
      />
    </svg>
  );
}

export default function MobileStepHeader({ currentStep }) {
  return (
    <div className="relative h-44 w-full overflow-hidden bg-indigo-600 sm:hidden">
      <DecorativeBlobsMobile />

      <div className="relative z-10 flex items-center justify-center gap-4 pt-10">
        {STEPS.map((step) => {
          const isActive = step.id === currentStep;
          return (
            <span
              key={step.id}
              className={`flex h-10 w-10 flex-none items-center justify-center rounded-full border font-mono text-sm font-bold transition-colors ${
                isActive
                  ? "border-transparent bg-sky-200 text-slate-900"
                  : "border-white/50 bg-transparent text-white"
              }`}
            >
              {step.id}
            </span>
          );
        })}
      </div>
    </div>
  );
}
