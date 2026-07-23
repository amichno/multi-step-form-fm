import React from "react";

export default function AddOnItem({ addon, billing, checked, onToggle }) {
  const price = billing === "yearly" ? addon.priceYearly : addon.priceMonthly;
  const suffix = billing === "yearly" ? "/yr" : "/mo";

  return (
    <label
      className={`flex cursor-pointer items-center gap-4 rounded-lg border px-4 py-3.5 transition-colors ${
        checked
          ? "border-indigo-600 bg-indigo-50"
          : "border-slate-300 hover:border-indigo-400"
      }`}
    >
      <input
        type="checkbox"
        checked={checked}
        onChange={() => onToggle(addon.id)}
        className="h-5 w-5 flex-none rounded accent-indigo-600"
      />
      <div className="flex-1">
        <p className="text-sm font-bold text-slate-900">{addon.name}</p>
        <p className="text-xs text-slate-500">{addon.description}</p>
      </div>
      <p className="flex-none text-sm text-indigo-600">
        +${price}{suffix}
      </p>
    </label>
  );
}
