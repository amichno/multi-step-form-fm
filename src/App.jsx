import React, { useState } from "react";
import Sidebar from "./components/Sidebar";
import StepYourInfo from "./components/steps/StepYourInfo";
import StepSelectPlan from "./components/steps/StepSelectPlan";
import StepAddOns from "./components/steps/StepAddOns";
import StepSummary from "./components/steps/StepSummary";

const INITIAL_DATA = {
  name: "",
  email: "",
  phone: "",
  plan: "",
  billing: "monthly",
  addons: [],
};

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_REGEX = /^[+\d][\d\s-]{7,}$/;

export default function App() {
  const [step, setStep] = useState(1);
  const [data, setData] = useState(INITIAL_DATA);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  }

  function handleSelectPlan(planId) {
    setData((prev) => ({ ...prev, plan: planId }));
    setErrors((prev) => ({ ...prev, plan: undefined }));
  }

  function handleToggleBilling() {
    setData((prev) => ({
      ...prev,
      billing: prev.billing === "monthly" ? "yearly" : "monthly",
    }));
  }

  function handleToggleAddon(addonId) {
    setData((prev) => {
      const has = prev.addons.includes(addonId);
      return {
        ...prev,
        addons: has
          ? prev.addons.filter((id) => id !== addonId)
          : [...prev.addons, addonId],
      };
    });
  }

  /**
   * Waliduje bieżący krok. Zwraca true jeśli można przejść dalej,
   * w przeciwnym razie ustawia komunikaty błędów i zwraca false.
   */
  function validateStep(currentStep) {
    const newErrors = {};

    if (currentStep === 1) {
      if (!data.name.trim()) newErrors.name = "This field is required";
      if (!data.email.trim()) {
        newErrors.email = "This field is required";
      } else if (!EMAIL_REGEX.test(data.email)) {
        newErrors.email = "Enter a valid email";
      }
      if (!data.phone.trim()) {
        newErrors.phone = "This field is required";
      } else if (!PHONE_REGEX.test(data.phone)) {
        newErrors.phone = "Enter a valid phone number";
      }
    }

    if (currentStep === 2) {
      if (!data.plan) newErrors.plan = "Please select a plan to continue";
    }

    // Krok 3 (Add-ons) jest opcjonalny — brak walidacji.

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  function goNext() {
    if (!validateStep(step)) return;
    setStep((s) => Math.min(s + 1, 4));
  }

  function goBack() {
    setErrors({});
    setStep((s) => Math.max(s - 1, 1));
  }

  function goToStep(targetStep) {
    setErrors({});
    setStep(targetStep);
  }

  function handleConfirm() {
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-100 px-4">
        <div className="w-full max-w-md rounded-xl bg-white p-10 text-center shadow-xl">
          <h1 className="font-mono text-2xl font-bold text-slate-900">
            Thank you!
          </h1>
          <p className="mt-3 text-sm text-slate-500">
            Thanks for confirming your subscription, {data.name || "friend"}!
            We hope you have fun using our platform. If you ever need to
            change your plan, you can do so at any time from your account.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100 px-4 py-10">
      <div className="grid w-full max-w-4xl gap-0 overflow-hidden rounded-2xl bg-white shadow-xl sm:grid-cols-[300px_1fr] sm:p-4">
        <div className="sm:h-full">
          <Sidebar currentStep={step} />
        </div>

        <div className="flex flex-col p-6 sm:p-10">
          <div className="flex-1">
            {step === 1 && (
              <StepYourInfo data={data} errors={errors} onChange={handleChange} />
            )}
            {step === 2 && (
              <StepSelectPlan
                data={data}
                errors={errors}
                onSelectPlan={handleSelectPlan}
                onToggleBilling={handleToggleBilling}
              />
            )}
            {step === 3 && (
              <StepAddOns data={data} onToggleAddon={handleToggleAddon} />
            )}
            {step === 4 && (
              <StepSummary data={data} onChangePlanStep={() => goToStep(2)} />
            )}
          </div>

          <div className="mt-8 flex items-center justify-between">
            {step > 1 ? (
              <button
                type="button"
                onClick={goBack}
                className="text-sm font-semibold text-slate-500 hover:text-slate-900"
              >
                Go Back
              </button>
            ) : (
              <span />
            )}

            {step < 4 ? (
              <button
                type="button"
                onClick={goNext}
                className="rounded-lg bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-indigo-600"
              >
                Next Step
              </button>
            ) : (
              <button
                type="button"
                onClick={handleConfirm}
                className="rounded-lg bg-indigo-600 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-indigo-700"
              >
                Confirm
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
