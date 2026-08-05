import React from 'react';

const statusConfig = {
  pending: {
    bg: 'bg-amber-50',
    text: 'text-amber-700',
    border: 'border-amber-200',
    dot: 'bg-amber-500',
    label: 'Pending',
  },
  shipped: {
    bg: 'bg-blue-50',
    text: 'text-blue-700',
    border: 'border-blue-200',
    dot: 'bg-blue-500',
    label: 'Shipped',
  },
  delivered: {
    bg: 'bg-emerald-50',
    text: 'text-emerald-700',
    border: 'border-emerald-200',
    dot: 'bg-emerald-500',
    label: 'Delivered',
  },
  cancelled: {
    bg: 'bg-red-50',
    text: 'text-red-700',
    border: 'border-red-200',
    dot: 'bg-red-500',
    label: 'Cancelled',
  },
};

const StatusBadge = ({ status }) => {
  const normalizedStatus = (status || '').toLowerCase();
  const config = statusConfig[normalizedStatus] || statusConfig.pending;

  return (
    <span className={`inline-flex items-center gap-1.5 ${config.bg} ${config.text} ${config.border} border text-[11px] font-medium px-3 py-1 rounded-full`}>
      <span className={`w-1.5 h-1.5 rounded-full ${config.dot}`} />
      {config.label}
    </span>
  );
};

export default StatusBadge;
