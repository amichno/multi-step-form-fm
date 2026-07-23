import React from "react";
import FormField from "../ui/FormField";

export default function StepYourInfo({ data, errors, onChange }) {
  return (
    <div>
      <h1 className="font-mono text-3xl font-bold text-slate-900">
        Personal info
      </h1>
      <p className="mt-2 text-sm text-slate-500">
        Please provide your name, email address, and phone number.
      </p>

      <div className="mt-8 space-y-5">
        <FormField
          label="Name"
          name="name"
          value={data.name}
          onChange={onChange}
          placeholder="e.g. Stephen King"
          error={errors.name}
        />
        <FormField
          label="Email Address"
          name="email"
          value={data.email}
          onChange={onChange}
          placeholder="e.g. stephenking@lorem.com"
          error={errors.email}
        />
        <FormField
          label="Phone Number"
          name="phone"
          value={data.phone}
          onChange={onChange}
          placeholder="e.g. +1 234 567 890"
          error={errors.phone}
        />
      </div>
    </div>
  );
}
