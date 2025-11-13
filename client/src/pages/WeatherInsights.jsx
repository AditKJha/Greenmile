import React, { useState, useEffect } from 'react';
import WeatherCard from '../components/WeatherCard';
import { getWeather } from '../lib/api';

export default function WeatherInsights(){
  const [src, setSrc] = useState('Delhi');
  const [dst, setDst] = useState('Jaipur');
  const [s, setS] = useState(null);
  const [d, setD] = useState(null);
  useEffect(()=>{ getWeather(src).then(setS); getWeather(dst).then(setD); },[]);
  return (
    <div className="grid md:grid-cols-3 gap-4">
      <div className="md:col-span-3 flex gap-2">
        <input className="border rounded-xl px-3 py-2" value={src} onChange={e=>setSrc(e.target.value)} />
        <input className="border rounded-xl px-3 py-2" value={dst} onChange={e=>setDst(e.target.value)} />
        <button className="px-4 py-2 rounded-xl bg-emerald-600 text-white" onClick={()=>{getWeather(src).then(setS); getWeather(dst).then(setD);}}>Refresh</button>
      </div>
      <WeatherCard title="Start" temp={s?.main?.temp||20} humidity={s?.main?.humidity||50} wind={s?.wind?.speed||2} impact={s?.efficiencyImpactPct||-2} />
      <WeatherCard title="Midway" temp={(s?.main?.temp+d?.main?.temp)/2||22} humidity={Math.round(((s?.main?.humidity||50)+(d?.main?.humidity||50))/2)} wind={Math.round(((s?.wind?.speed||2)+(d?.wind?.speed||2))/2)} impact={Math.round(((s?.efficiencyImpactPct||-2)+(d?.efficiencyImpactPct||-2))/2)} />
      <WeatherCard title="Destination" temp={d?.main?.temp||22} humidity={d?.main?.humidity||55} wind={d?.wind?.speed||2} impact={d?.efficiencyImpactPct||-2} />
    </div>
  );
}
