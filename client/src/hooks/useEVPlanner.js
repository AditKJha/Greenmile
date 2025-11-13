import { useState } from 'react';
import { optimizeRoute, getBattery, getWeather } from '../lib/api';

export default function useEVPlanner(){
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [battery, setBattery] = useState(null);

  async function findRoute({ startLngLat, endLngLat, startLabel, endLabel }){
    setLoading(true);
    try{
      const [route, batt] = await Promise.all([
        optimizeRoute({ startLngLat, endLngLat, startLabel, endLabel }),
        getBattery()
      ]);
      setData(route); setBattery(batt);
    } finally { setLoading(false); }
  }

  async function fetchWeather(q){ return getWeather(q); }

  return { loading, data, battery, findRoute, fetchWeather };
}
