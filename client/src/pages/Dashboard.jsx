import React, { useState } from 'react';
import MapView from '../components/MapView';
import BatteryGauge from '../components/BatteryGauge';
import RouteOverview from '../components/RouteOverview';
import MetricCard from '../components/MetricCard';
import useEVPlanner from '../hooks/useEVPlanner';

export default function Dashboard(){
  const { loading, data, battery, findRoute } = useEVPlanner();
  const [start, setStart] = useState('77.5946,12.9716'); // BLR lon,lat
  const [end, setEnd] = useState('72.8777,19.0760'); // MUM lon,lat

  const parse = (s)=> s.split(',').map(n=>Number(n.trim()));

  const onFind = ()=>{
    const startLngLat = parse(start);
    const endLngLat = parse(end);
    findRoute({ startLngLat, endLngLat, startLabel:'Bengaluru', endLabel:'Mumbai' });
  };

  const metrics = data?.efficiency || { savedKWh: 0, efficiencyPct: 0, co2ReducedLb: 0 };

  return (
    <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
      <div className="xl:col-span-2 card p-4 h-[520px]">
        <div className="flex gap-2 mb-3">
          <input className="border rounded-xl px-3 py-2 w-1/2" value={start} onChange={e=>setStart(e.target.value)} placeholder="start lon,lat" />
          <input className="border rounded-xl px-3 py-2 w-1/2" value={end} onChange={e=>setEnd(e.target.value)} placeholder="dest lon,lat" />
          <button onClick={onFind} className="px-4 py-2 rounded-xl bg-emerald-600 text-white">{loading?'Finding…':'Find Route'}</button>
        </div>
        <div className="h-[440px]">
          <MapView route={data?.optimized || data?.standard} />
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <BatteryGauge soc={battery?.soc} rangeKm={battery?.estRangeKm} />
        <RouteOverview distanceKm={data?.standard?.energy?.distanceKm} timeMinutes={data?.standard?.energy?.durationMin} efficiencyPct={metrics.efficiencyPct} />
        <MetricCard title="Energy Saved" value={`${metrics.savedKWh || 0} kWh`} sub={`CO₂ reduced ${metrics.co2ReducedLb || 0} lbs`} />
      </div>
    </div>
  );
}
