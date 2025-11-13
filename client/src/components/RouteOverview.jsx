import React from 'react';
export default function RouteOverview({ distanceKm, timeMinutes, efficiencyPct }){
  return (
    <div className="card p-4">
      <div className="text-sm text-slate-600">Route Overview</div>
      <div className="grid grid-cols-3 gap-4 mt-3">
        <div>
          <div className="text-xl font-semibold">{distanceKm?.toFixed?.(1) ?? '--'} km</div>
          <div className="text-xs text-slate-500">Distance</div>
        </div>
        <div>
          <div className="text-xl font-semibold">{timeMinutes ?? '--'} min</div>
          <div className="text-xs text-slate-500">ETA</div>
        </div>
        <div>
          <div className="text-xl font-semibold">{efficiencyPct ?? 0}%</div>
          <div className="text-xs text-slate-500">Efficiency</div>
        </div>
      </div>
    </div>
  );
}
