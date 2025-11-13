import React from 'react';
export default function MetricCard({ title, value, sub }){
  return (
    <div className="card p-4">
      <div className="text-xs uppercase text-slate-500">{title}</div>
      <div className="text-2xl font-semibold mt-1">{value}</div>
      {sub && <div className="text-slate-500 text-sm mt-1">{sub}</div>}
    </div>
  );
}
