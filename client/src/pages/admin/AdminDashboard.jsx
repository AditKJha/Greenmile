import React, { useEffect, useState } from 'react';
import { adminGetMetrics } from '../../lib/api';
import MetricCard from '../../components/MetricCard';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, LineChart, Line } from 'recharts';

export default function AdminDashboard(){
  const [m, setM] = useState(null);
  useEffect(()=>{ adminGetMetrics().then(setM).catch(()=>setM(null)); },[]);
  const weekly = m?.weekly || [];
  return (
    <div className="flex flex-col gap-4">
      <div className="grid md:grid-cols-4 gap-4">
        <MetricCard title="Users" value={m?.usersCount || 0} />
        <MetricCard title="Trips" value={m?.tripsCount || 0} />
        <MetricCard title="Energy Saved" value={`${m?.totalEnergySavedKWh || 0} kWh`} />
        <MetricCard title="CO₂ Reduced" value={`${m?.totalCO2Lb || 0} lbs`} />
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="card p-4">
          <div className="text-sm text-slate-600 mb-2">Users Growth (weekly)</div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={weekly}>
                <XAxis dataKey="label" />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="trips" fill="var(--brand)" stroke="var(--brand)" fillOpacity={0.2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="card p-4">
          <div className="text-sm text-slate-600 mb-2">Energy Saved (kWh) weekly</div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={weekly}>
                <XAxis dataKey="label" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="kwh" stroke="var(--brand)" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
