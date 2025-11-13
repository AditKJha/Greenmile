import React from 'react';
export default function BatteryGauge({ soc=70, rangeKm=280 }){
  const pct = Math.max(0, Math.min(100, soc));
  return (
    <div className="card p-4">
      <div className="flex items-center justify-between">
        <div className="text-sm text-slate-600">Battery</div>
        <div className="text-sm text-slate-500">Est. Range: {Math.round(rangeKm)} km</div>
      </div>
      <div className="mt-3 h-4 bg-slate-100 rounded-xl overflow-hidden">
        <div className="h-full bg-emerald-500" style={{ width: pct + '%'}} />
      </div>
      <div className="mt-2 text-slate-700 font-medium">{pct}%</div>
    </div>
  );
}
