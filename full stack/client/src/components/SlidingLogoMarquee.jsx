import React from 'react';

const SlidingLogoMarquee = ({
  items = [],
  speed = 40,
  height = '80px',
  blurIntensity = 0.5,
  showControls = false,
  enableBlur = true,
  backgroundColor = 'transparent',
  className = '',
}) => {
  // Duplicate items to ensure a seamless infinite scroll loop
  const list = [...items, ...items, ...items];

  return (
    <div
      className={`overflow-hidden relative w-full flex items-center ${className}`}
      style={{ height, backgroundColor }}
    >
      {enableBlur && (
        <>
          {/* Fade gradient masks on left & right */}
          <div
            className="absolute inset-y-0 left-0 w-24 z-10 pointer-events-none"
            style={{
              background: `linear-gradient(to right, rgba(0,0,0,${blurIntensity * 2 || 1}) 0%, transparent 100%)`
            }}
          />
          <div
            className="absolute inset-y-0 right-0 w-24 z-10 pointer-events-none"
            style={{
              background: `linear-gradient(to left, rgba(0,0,0,${blurIntensity * 2 || 1}) 0%, transparent 100%)`
            }}
          />
        </>
      )}

      <div
        className="flex gap-16 items-center whitespace-nowrap animate-marquee"
        style={{
          '--marquee-duration': `${speed}s`,
        }}
      >
        {list.map((item, idx) => (
          <div
            key={`${item.id}-${idx}`}
            className="flex-shrink-0 flex items-center justify-center opacity-50 hover:opacity-100 transition-opacity duration-300"
          >
            {item.content}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SlidingLogoMarquee;
