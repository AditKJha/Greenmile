import React from 'react';
export default function Settings(){
  return (
    <div className="card p-4 max-w-xl">
      <div className="text-sm text-slate-600 mb-3">Preferences</div>
      <label className="flex items-center justify-between py-2">
        <span>Units</span>
        <select className="border rounded-xl px-3 py-2"><option>metric</option><option>imperial</option></select>
      </label>
      <label className="flex items-center justify-between py-2">
        <span>Eco Priority</span>
        <input type="range" min="0" max="1" step="0.05" defaultValue="0.6" />
      </label>
    </div>
  );
}
