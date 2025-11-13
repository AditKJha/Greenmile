import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
export default function ChargePatternBar({ data=[] }){
  return (
    <div className="card p-4">
      <div className="text-sm text-slate-600">Charge Patterns</div>
      <div className="h-56">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ left: 10, right: 10, top: 10, bottom: 10 }}>
            <XAxis dataKey="day" />
            <YAxis width={30} />
            <Tooltip />
            <Bar dataKey="kwh" fill="var(--brand)" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
