import React from 'react';
import { ChevronDown } from 'lucide-react';

const FloatingSelect = ({ id, label, value, onChange, options = [], error, ...rest }) => {
  const hasValue = value !== undefined && value !== null && value !== '';

  return (
    <div className="w-full">
      <div className="relative w-full">
        <select
          id={id}
          value={value}
          onChange={onChange}
          className={`
            peer w-full border bg-input-field px-4 pt-6 pb-2 text-sm text-primary
            focus:outline-none transition-all duration-200 rounded-xl appearance-none pr-10
            ${error
              ? 'border-red-500/50 focus:border-red-500 focus:ring-1 focus:ring-red-500/20'
              : 'border-default focus:border-[#F23F0C] focus:ring-1 focus:ring-[#F23F0C]/20'
            }
          `}
          {...rest}
        >
          <option value="" disabled hidden></option>
          {options.map((opt) => (
            <option key={opt.value} value={opt.value} className="bg-[var(--color-input)] text-primary">
              {opt.label}
            </option>
          ))}
        </select>
        <label
          htmlFor={id}
          className={`
            absolute left-4 transition-all duration-200 pointer-events-none
            ${hasValue
              ? 'top-2 text-[10px] font-bold uppercase tracking-widest'
              : 'top-4 text-sm font-medium tracking-normal peer-focus:top-2 peer-focus:text-[10px] peer-focus:font-bold peer-focus:uppercase peer-focus:tracking-widest'
            }
            ${error
              ? 'text-red-400 peer-focus:text-red-400'
              : 'text-muted peer-focus:text-[#F23F0C]'
            }
          `}
        >
          {label}
        </label>
        <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-zinc-500 peer-focus:text-[#F23F0C] transition-colors">
          <ChevronDown size={16} strokeWidth={1.5} />
        </div>
      </div>
      {error && (
        <p className="text-red-500 text-xs mt-1.5 ml-1">{error}</p>
      )}
    </div>
  );
};

export default FloatingSelect;
