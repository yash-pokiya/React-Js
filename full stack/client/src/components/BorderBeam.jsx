import React from 'react';

export const BorderBeam = ({
  colorFrom = '#F23F0C',
  colorTo = '#F23F0C',
  size = 50,
  duration = 6,
  borderThickness = 2,
  glowIntensity = 10,
  className = '',
}) => {
  return (
    <div
      className={`absolute inset-0 pointer-events-none rounded-[inherit] overflow-hidden ${className}`}
      style={{
        padding: `${borderThickness}px`,
        maskImage: 'linear-gradient(black, black)',
        maskClip: 'content-box',
        WebkitMaskImage: 'linear-gradient(black, black)',
        WebkitMaskClip: 'content-box',
      }}
    >
      <div
        className="absolute inset-0 rounded-[inherit] animate-[spin_6s_linear_infinite]"
        style={{
          background: `conic-gradient(from 0deg, ${colorFrom}, ${colorTo}, transparent 30%)`,
          animationDuration: `${duration}s`,
          transform: 'translate(-50%, -50%)',
          top: '50%',
          left: '50%',
          width: '200%',
          height: '200%',
          filter: glowIntensity > 0 ? `blur(${glowIntensity / 2}px)` : 'none',
        }}
      />
    </div>
  );
};

export default BorderBeam;
