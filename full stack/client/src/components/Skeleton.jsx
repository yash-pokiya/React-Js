import React from 'react';

// Reusable skeleton building block
const SkeletonBlock = ({ className = '' }) => (
  <div className={`shimmer-bg rounded-xl ${className}`} />
);

// Product card skeleton
export const ProductCardSkeleton = () => (
  <div className="bg-card rounded-2xl p-4 space-y-4 shadow-sm border border-default">
    <SkeletonBlock className="w-full aspect-square rounded-2xl" />
    <SkeletonBlock className="h-3 w-2/5" />
    <SkeletonBlock className="h-4 w-4/5" />
    <SkeletonBlock className="h-5 w-1/4" />
  </div>
);

// Table row skeleton
export const TableRowSkeleton = ({ cols = 5 }) => (
  <tr>
    {Array.from({ length: cols }).map((_, i) => (
      <td key={i} className="p-4">
        <SkeletonBlock className="h-4 w-full" />
      </td>
    ))}
  </tr>
);

// Profile / generic card skeleton
export const CardSkeleton = () => (
  <div className="bg-card rounded-2xl p-6 shadow-sm border border-default space-y-4">
    <SkeletonBlock className="h-5 w-1/3" />
    <SkeletonBlock className="h-4 w-full" />
    <SkeletonBlock className="h-4 w-2/3" />
    <SkeletonBlock className="h-10 w-1/3 mt-2" />
  </div>
);

// Full-page loading skeleton grid (for product listings)
export const ProductGridSkeleton = ({ count = 8 }) => (
  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
    {Array.from({ length: count }).map((_, i) => (
      <ProductCardSkeleton key={i} />
    ))}
  </div>
);

// Default export as a generic block
export default SkeletonBlock;
