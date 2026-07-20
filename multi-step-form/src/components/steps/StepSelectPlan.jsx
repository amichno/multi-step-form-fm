import React from "react";
import PlanCard from "../ui/PlanCard";
import { PLANS } from "../../data/content";

export default function StepSelectPlan({ data, errors, onSelectPlan, onToggleBilling }) {
  return (
    <div>
      <h1 className="font-mono text-3xl font-bold text-slate-900">
        Select your plan
      </h1>
      <p className="mt-2 text-sm text-slate-500">
        You have the option of monthly or yearly billing.
      </p>

      {errors.plan && (
        <p className="mt-3 text-xs font-semibold text-red-500">
          {errors.plan}
        </p>
      )}

      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        {PLANS.map((plan) => (
          <PlanCard
            key={plan.id}
            plan={plan}
            billing={data.billing}
            selected={data.plan === plan.id}
            onSelect={onSelectPlan}
          />
        ))}
      </div>

      <div className="mt-6 flex items-center justify-center gap-4 rounded-lg bg-slate-50 py-3.5">
        <span
          className={`text-sm font-semibold ${
            data.billing === "monthly" ? "text-slate-900" : "text-slate-400"
          }`}
        >
          Monthly
        </span>
        <button
          type="button"
          role="switch"
          aria-checked={data.billing === "yearly"}
          onClick={onToggleBilling}
          className="relative h-5 w-10 flex-none rounded-full bg-indigo-600"
        >
          <span
            className={`absolute left-0.5 top-0.5 z-10 h-4 w-4 rounded-full bg-white transition-transform duration-200 ${
              data.billing === "yearly" ? "translate-x-5" : "translate-x-0"
            }`}
          />
        </button>
        <span
          className={`text-sm font-semibold ${
            data.billing === "yearly" ? "text-slate-900" : "text-slate-400"
          }`}
        >
          Yearly
        </span>
      </div>
    </div>
  );
}
