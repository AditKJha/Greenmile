import React from 'react';
export default function WeatherCard({ title, temp, humidity, wind, impact }){
  return (
    <div className="card p-4">
      <div className="flex items-center justify-between">
        <div className="text-sm text-slate-600">{title}</div>
        <div className={`text-xs ${impact<0?'text-amber-600':'text-emerald-600'}`}>Impact: {impact}%</div>
      </div>
      <div className="mt-2 grid grid-cols-3 gap-2 text-slate-700">
        <div><div className="text-xl font-semibold">{Math.round(temp)}°C</div><div className="text-xs">Temp</div></div>
        <div><div className="text-xl font-semibold">{humidity}%</div><div className="text-xs">Humidity</div></div>
        <div><div className="text-xl font-semibold">{wind} m/s</div><div className="text-xs">Wind</div></div>
      </div>
    </div>
  );
}
