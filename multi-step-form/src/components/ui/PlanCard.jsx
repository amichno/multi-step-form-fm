import React from "react";
import { Gamepad2, Swords, Trophy } from "lucide-react";

const ICONS = {
  arcade: Gamepad2,
  advanced: Swords,
  pro: Trophy,
};

export default function PlanCard({ plan, billing, selected, onSelect }) {
  const price = billing === "yearly" ? plan.priceYearly : plan.priceMonthly;
  const suffix = billing === "yearly" ? "/yr" : "/mo";
  const Icon = ICONS[plan.icon];

  return (
    <button
      type="button"
      onClick={() => onSelect(plan.id)}
      className={`flex w-full items-center gap-4 rounded-lg border px-4 py-4 text-left transition-colors sm:flex-col sm:items-start sm:gap-10 sm:py-5 ${
        selected
          ? "border-indigo-600 bg-indigo-50"
          : "border-slate-300 hover:border-indigo-400"
      }`}
    >
      <span
        className={`flex h-11 w-11 flex-none items-center justify-center rounded-full ${plan.color}`}
      >
        <Icon className="h-5 w-5 text-white" />
      </span>

      <div>
        <p className="font-bold text-slate-900">{plan.name}</p>
        <p className="mt-1 text-sm text-slate-500">
          ${price}{suffix}
        </p>
        {billing === "yearly" && (
          <p className="mt-1 text-xs font-semibold text-slate-900">
            2 months free
          </p>
        )}
      </div>
    </button>
  );
}
