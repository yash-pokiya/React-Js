import React, { useRef, useState, useLayoutEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * SliderNav — a smooth sliding-pill navigation component.
 * Replaces the old GooeyNav which used mix-blend-mode: lighten
 * (that approach made active text invisible on white pill backgrounds).
 *
 * Each item can be a <Link> (has `to`) or a <button> (no `to`).
 */
const GooeyNav = ({
  items,
  activeIndex = 0,
  onItemClick,
}) => {
  const listRef = useRef(null);
  const [pillStyle, setPillStyle] = useState({ left: 0, width: 0, opacity: 0 });

  // Measure the active li and position the sliding pill
  useLayoutEffect(() => {
    if (!listRef.current) return;
    const lis = listRef.current.querySelectorAll('li');
    if (activeIndex < 0 || activeIndex >= lis.length) {
      setPillStyle(prev => ({ ...prev, opacity: 0 }));
      return;
    }
    const activeLi = lis[activeIndex];
    const parentRect = listRef.current.getBoundingClientRect();
    const liRect = activeLi.getBoundingClientRect();
    setPillStyle({
      left: liRect.left - parentRect.left,
      width: liRect.width,
      opacity: 1,
    });
  }, [activeIndex, items]);

  return (
    <div className="relative flex items-center select-none">
      {/* Sliding white pill — rendered BEHIND the text via z-index */}
      <AnimatePresence>
        {activeIndex >= 0 && pillStyle.opacity === 1 && (
          <motion.span
            key="pill"
            layoutId="nav-pill"
            className="absolute inset-y-0 rounded-full bg-white pointer-events-none"
            style={{ zIndex: 0 }}
            initial={false}
            animate={{
              left: pillStyle.left,
              width: pillStyle.width,
              opacity: 1,
            }}
            transition={{
              type: 'spring',
              stiffness: 400,
              damping: 35,
            }}
          />
        )}
      </AnimatePresence>

      <ul ref={listRef} className="relative flex items-center gap-0 list-none p-0 m-0" style={{ zIndex: 1 }}>
        {items.map((item, index) => {
          const isActive = activeIndex === index;

          const label = (
            <span
              className="flex items-center gap-1.5 font-bold uppercase tracking-wider text-[10px] whitespace-nowrap"
              style={{
                color: isActive ? '#000000' : '#a1a1aa',
                transition: 'color 0.25s ease',
                position: 'relative',
                zIndex: 2,
              }}
            >
              {item.label}
              {item.icon}
            </span>
          );

          const commonClass =
            'nav-link-item relative flex items-center px-4 py-2 rounded-full cursor-pointer bg-transparent border-0 outline-none transition-colors duration-200';

          return (
            <li key={index} className="relative" style={{ zIndex: 2 }}>
              {item.to ? (
                <Link
                  to={item.to}
                  className={commonClass}
                  onClick={() => onItemClick && onItemClick(index)}
                >
                  {label}
                </Link>
              ) : (
                <button
                  type="button"
                  className={commonClass}
                  onClick={() => onItemClick && onItemClick(index)}
                >
                  {label}
                </button>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default GooeyNav;
