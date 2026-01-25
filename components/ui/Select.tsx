import React from "react";

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: {
    value: string | number;
    label: string;
    disabled?: boolean;
    className?: string;
  }[];
}

export const Select = ({
  label,
  options,
  className = "",
  ...props
}: SelectProps) => {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
          {label}
        </label>
      )}
      <select
        className={`w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white! outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all appearance-none ${className}`}
        {...props}
      >
        {options.map((opt, idx) => (
          <option
            key={idx}
            value={opt.value}
            disabled={opt.disabled}
            className="bg-white dark:bg-slate-800"
          >
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
};
