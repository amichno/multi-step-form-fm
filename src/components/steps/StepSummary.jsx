import React from "react";
import { PLANS, ADDONS } from "../../data/content";

export default function StepSummary({ data, onChangePlanStep }) {
  const plan = PLANS.find((p) => p.id === data.plan);
  const isYearly = data.billing === "yearly";
  const suffix = isYearly ? "/yr" : "/mo";

  const selectedAddons = ADDONS.filter((a) => data.addons.includes(a.id));

  const planPrice = plan ? (isYearly ? plan.priceYearly : plan.priceMonthly) : 0;
  const addonsTotal = selectedAddons.reduce(
    (sum, a) => sum + (isYearly ? a.priceYearly : a.priceMonthly),
    0
  );
  const total = planPrice + addonsTotal;

  return (
    <div>
      <h1 className="font-mono text-3xl font-bold text-slate-900">
        Finishing up
      </h1>
      <p className="mt-2 text-sm text-slate-500">
        Double-check everything looks OK before confirming.
      </p>

      <div className="mt-6 rounded-lg bg-slate-50 p-5">
        <div className="flex items-center justify-between border-b border-slate-200 pb-4">
          <div>
            <p className="text-sm font-bold text-slate-900">
              {plan ? `${plan.name} (${isYearly ? "Yearly" : "Monthly"})` : "No plan selected"}
            </p>
            <button
              type="button"
              onClick={onChangePlanStep}
              className="mt-1 text-xs text-slate-500 underline hover:text-indigo-600"
            >
              Change
            </button>
          </div>
          <p className="text-sm font-bold text-slate-900">
            ${planPrice}{suffix}
          </p>
        </div>

        {selectedAddons.length > 0 && (
          <div className="mt-4 space-y-3">
            {selectedAddons.map((addon) => (
              <div key={addon.id} className="flex items-center justify-between">
                <p className="text-sm text-slate-500">{addon.name}</p>
                <p className="text-sm text-slate-900">
                  +${isYearly ? addon.priceYearly : addon.priceMonthly}{suffix}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="mt-4 flex items-center justify-between px-1">
        <p className="text-sm text-slate-500">
          Total (per {isYearly ? "year" : "month"})
        </p>
        <p className="font-mono text-lg font-bold text-indigo-600">
          +${total}{suffix}
        </p>
      </div>
    </div>
  );
}
