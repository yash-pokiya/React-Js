import React from 'react';
import { Star } from 'lucide-react';
import { motion } from 'framer-motion';

const StarRating = ({ rating, onChange = null, size = 20, className = '' }) => {
  const stars = [1, 2, 3, 4, 5];

  return (
    <div className={`flex items-center gap-0.5 ${className}`}>
      {stars.map((star) => {
        const isFilled = star <= rating;
        return (
          <motion.button
            key={star}
            type="button"
            disabled={!onChange}
            onClick={() => onChange && onChange(star)}
            whileHover={onChange ? { scale: 1.2 } : {}}
            whileTap={onChange ? { scale: 0.9 } : {}}
            transition={{ duration: 0.15 }}
            className={`transition-colors ${onChange ? 'cursor-pointer focus:outline-none' : 'cursor-default'}`}
          >
            <Star
              size={size}
              className={isFilled
                ? 'fill-amber-400 text-amber-400'
                : 'text-gray-300'
              }
            />
          </motion.button>
        );
      })}
    </div>
  );
};

export default StarRating;
