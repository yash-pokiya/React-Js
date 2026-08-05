import React from 'react';

export default function ProductImage({ imageUrl, productName, isDetail = false }) {
  const initial = productName?.trim().charAt(0).toUpperCase() || '?';
  const sizeClass = isDetail
    ? 'text-[6rem] font-semibold text-zinc-700 select-none tracking-tight'
    : 'text-4xl font-semibold text-zinc-700 select-none tracking-tight';

  const handleImageError = (e) => {
    e.target.style.display = 'none';
    const fallbackDiv = e.target.nextSibling;
    if (fallbackDiv) {
      fallbackDiv.style.display = 'flex';
    }
  };

  return (
    <div className="relative w-full h-full">
      {imageUrl ? (
        <>
          <img
            src={imageUrl}
            alt={productName}
            className="object-contain w-full h-full block mx-auto"
            onError={handleImageError}
          />
          <div className="absolute inset-0 bg-neutral-900 flex items-center justify-center" style={{ display: 'none' }}>
            <span className={sizeClass}>
              {initial}
            </span>
          </div>
        </>
      ) : (
        <div className="w-full h-full bg-neutral-900 flex items-center justify-center">
          <span className={sizeClass}>
            {initial}
          </span>
        </div>
      )}
    </div>
  );
}
