import React from "react";

export default function FormField({
  label,
  name,
  value,
  onChange,
  placeholder,
  error,
  type = "text",
}) {
  return (
    <div>
      <div className="flex items-center justify-between">
        <label
          htmlFor={name}
          className="text-xs font-semibold uppercase tracking-wide text-slate-900"
        >
          {label}
        </label>
        {error && (
          <span className="text-xs font-semibold text-red-500">{error}</span>
        )}
      </div>
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`mt-1.5 w-full rounded-lg border px-4 py-2.5 text-sm font-medium text-slate-900 outline-none transition-colors placeholder:text-slate-300 focus:border-indigo-600 ${
          error ? "border-red-500" : "border-slate-300"
        }`}
      />
    </div>
  );
}
