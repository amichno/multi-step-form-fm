import React from "react";
import AddOnItem from "../ui/AddOnItem";
import { ADDONS } from "../../data/content";

export default function StepAddOns({ data, onToggleAddon }) {
  return (
    <div>
      <h1 className="font-mono text-3xl font-bold text-slate-900">
        Pick add-ons
      </h1>
      <p className="mt-2 text-sm text-slate-500">
        Add-ons help enhance your gaming experience.
      </p>

      <div className="mt-6 space-y-3">
        {ADDONS.map((addon) => (
          <AddOnItem
            key={addon.id}
            addon={addon}
            billing={data.billing}
            checked={data.addons.includes(addon.id)}
            onToggle={onToggleAddon}
          />
        ))}
      </div>
    </div>
  );
}
