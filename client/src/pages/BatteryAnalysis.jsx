import React, { useEffect, useState } from 'react';
import { getBattery } from '../lib/api';
import EnergyAreaChart from '../components/charts/EnergyAreaChart';
import ChargePatternBar from '../components/charts/ChargePatternBar';

export default function BatteryAnalysis(){
  const [data, setData] = useState(null);
  useEffect(()=>{ getBattery().then(setData); },[]);
  const history = (data?.history||[]).map((h,i)=>({ t: i+1, kwh: h.kwhUsed||Math.random()*2+10 }));
  const week = ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"].map((d)=>({ day:d, kwh: Math.round(Math.random()*12+8) }));
  return (
    <div className="grid md:grid-cols-2 gap-4">
      <EnergyAreaChart data={history} />
      <ChargePatternBar data={week} />
    </div>
  );
}
