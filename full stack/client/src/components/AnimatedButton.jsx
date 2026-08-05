import React from 'react';
import { motion } from 'framer-motion';

const prefersReduced = typeof window !== 'undefined' ? window.matchMedia('(prefers-reduced-motion: reduce)').matches : false;

export default function AnimatedButton({ children, className = '', onClick, type = 'button', disabled, variant, ...rest }) {
  // Determine variant from className if not explicitly set
  const resolvedVariant = variant || (() => {
    if (className.includes('btn-gradient') || className.includes('from-indigo') || className.includes('from-red')) return 'primary';
    if (className.includes('underline') || className.includes('bg-transparent')) return 'ghost';
    return null;
  })();

  const scaleValue = resolvedVariant === 'ghost' ? 0.98 : 0.97;

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={className}
      whileHover={prefersReduced || disabled ? {} : { scale: 1.03 }}
      whileTap={prefersReduced || disabled ? {} : { scale: scaleValue }}
      transition={{ duration: 0.15, ease: 'easeOut' }}
      {...rest}
    >
      {children}
    </motion.button>
  );
}
