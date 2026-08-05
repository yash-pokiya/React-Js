import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const FloatingInput = ({ id, label, type = 'text', value, onChange, error, ...rest }) => {
  return (
    <div className="w-full">
      <div className="relative w-full">
        {type === 'textarea' ? (
          <textarea
            id={id}
            value={value}
            onChange={onChange}
            placeholder=" "
            className={`
              peer w-full border bg-input-field px-4 pt-6 pb-2 text-sm text-primary
              focus:outline-none transition-all duration-700 rounded-xl resize-none
              placeholder:text-transparent focus:placeholder:text-muted
              ${error
                ? 'border-red-500/50 focus:border-red-500 focus:ring-1 focus:ring-red-500/20'
                : 'border-default focus:border-[#F23F0C] focus:ring-1 focus:ring-[#F23F0C]/20'
              }
            `}
            {...rest}
          />
        ) : (
          <input
            id={id}
            type={type}
            value={value}
            onChange={onChange}
            placeholder=" "
            className={`
              peer w-full border bg-input-field px-4 pt-6 pb-2 text-sm text-primary
              focus:outline-none transition-all duration-700 rounded-xl
              placeholder:text-transparent focus:placeholder:text-muted
              ${error
                ? 'border-red-500/50 focus:border-red-500 focus:ring-1 focus:ring-red-500/20'
                : 'border-default focus:border-[#F23F0C] focus:ring-1 focus:ring-[#F23F0C]/20'
              }
            `}
            {...rest}
          />
        )}
        <label
          htmlFor={id}
          className={`
            absolute left-4 top-2 text-[10px] font-bold uppercase tracking-widest
            transition-all duration-200 pointer-events-none
            peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm peer-placeholder-shown:font-medium
            peer-placeholder-shown:tracking-normal peer-placeholder-shown:normal-case
            peer-focus:top-2 peer-focus:text-[10px] peer-focus:font-bold
            peer-focus:uppercase peer-focus:tracking-widest
            ${error
              ? 'text-red-400 peer-placeholder-shown:text-red-400 peer-focus:text-red-400'
              : 'text-muted peer-placeholder-shown:text-secondary peer-focus:text-[#F23F0C]'
            }
          `}
        >
          {label}
        </label>
      </div>
      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.2 }}
            className="text-red-500 text-xs mt-1.5 ml-1"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FloatingInput;
