import React, { useState } from "react";
import Sidebar from "./components/Sidebar";
import MobileStepHeader from "./components/MobileStepHeader";
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
      <div className="min-h-screen overflow-x-auto bg-slate-100 sm:flex sm:items-center sm:justify-center sm:px-4 sm:py-10">
        <div className="mx-auto w-full min-w-[320px] sm:max-w-4xl sm:min-w-0 sm:grid sm:grid-cols-[300px_1fr] sm:gap-0 sm:overflow-hidden sm:rounded-2xl sm:bg-white sm:shadow-xl sm:p-4">
          <MobileStepHeader currentStep={step} />

          <div className="hidden sm:block sm:h-full">
            <Sidebar currentStep={step} />
          </div>

          <div className="relative z-10 mx-4 -mt-20 flex flex-1 flex-col items-center justify-center rounded-xl bg-white px-6 py-10 text-center shadow-xl sm:static sm:mx-0 sm:mt-0 sm:rounded-none sm:px-10 sm:py-16 sm:shadow-none">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-b from-rose-400 to-rose-500">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                className="h-8 w-8 text-white"
                aria-hidden="true"
              >
                <path
                  d="M5 13l4 4L19 7"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>

            <h1 className="mt-6 font-mono text-2xl font-bold text-slate-900">
              Thank you!
            </h1>
            <p className="mt-3 max-w-sm text-sm text-slate-500">
              Thanks for confirming your subscription! We hope you have fun
              using our platform. If you ever need support, please feel free
              to email us at{" "}
              <span className="font-semibold text-slate-600">
                support@lorumgaming.com
              </span>
              .
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen overflow-x-auto bg-slate-100 sm:flex sm:items-center sm:justify-center sm:px-4 sm:py-10">
      <div className="mx-auto w-full min-w-[320px] sm:max-w-4xl sm:min-w-0 sm:grid sm:grid-cols-[300px_1fr] sm:gap-0 sm:overflow-hidden sm:rounded-2xl sm:bg-white sm:shadow-xl sm:p-4">
        <MobileStepHeader currentStep={step} />

        <div className="hidden sm:block sm:h-full">
          <Sidebar currentStep={step} />
        </div>

        <div className="relative z-10 mx-4 -mt-20 flex flex-col rounded-xl bg-white p-6 pb-8 shadow-xl sm:static sm:mx-0 sm:mt-0 sm:rounded-none sm:p-10 sm:shadow-none">
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
                className="whitespace-nowrap text-sm font-semibold text-slate-500 hover:text-slate-900"
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
                className="whitespace-nowrap rounded-lg bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-indigo-600"
              >
                Next Step
              </button>
            ) : (
              <button
                type="button"
                onClick={handleConfirm}
                className="whitespace-nowrap rounded-lg bg-indigo-600 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-indigo-700"
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
