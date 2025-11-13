import React, { useEffect, useState } from 'react';
import { adminGetTrips } from '../../lib/api';

export default function AdminTrips(){
  const [trips, setTrips] = useState([]);
  useEffect(()=>{ adminGetTrips().then(r=>setTrips(r.items)); },[]);
  return (
    <div className="card p-4">
      <div className="text-sm text-slate-600 font-medium mb-2">Trips</div>
      <div className="overflow-auto">
        <table className="w-full text-sm">
          <thead><tr className="text-left text-slate-500"><th className="py-2">From → To</th><th>Distance (km)</th><th>ETA (min)</th><th>Efficiency %</th><th>Energy Saved (kWh)</th><th>CO₂ Reduced (lb)</th><th>When</th></tr></thead>
          <tbody>
            {trips.map(t=> (
              <tr key={t._id} className="border-t">
                <td className="py-2">{t.start} → {t.destination}</td>
                <td>{t.distanceKm?.toFixed?.(1) || '-'}</td>
                <td>{t.timeMinutes || '-'}</td>
                <td>{t.efficiencyScore || 0}</td>
                <td>{t.energySavedKWh || 0}</td>
                <td>{t.co2ReducedLb || 0}</td>
                <td>{new Date(t.createdAt).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
