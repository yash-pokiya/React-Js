import React from 'react';

const Spinner = ({ size = 'md' }) => {
  const sizeClass = size === 'lg' ? 'w-8 h-8 border-[3px]' : 'w-5 h-5 border-2';

  return (
    <div className="flex justify-center items-center py-16">
      <div
        className={`${sizeClass} border-amber-100 border-t-[#E85D04] rounded-full animate-spin`}
        role="status"
      >
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
};

export default Spinner;
