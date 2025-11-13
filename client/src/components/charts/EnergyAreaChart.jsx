import React from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
export default function EnergyAreaChart({ data=[] }){
  return (
    <div className="card p-4">
      <div className="text-sm text-slate-600">Energy Usage (kWh)</div>
      <div className="h-56">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ left: 10, right: 10, top: 10, bottom: 10 }}>
            <XAxis dataKey="t" hide />
            <YAxis width={30} />
            <Tooltip />
            <Area type="monotone" dataKey="kwh" fill="var(--brand)" stroke="var(--brand)" fillOpacity={0.2} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
