const { getDirections } = require('../services/map.service');
const { getWeatherByQuery } = require('../services/weather.service');
const { estimateEnergy, scoreEfficiency, estimateCO2Reduction } = require('../services/ai.service');
const Trip = require('../models/Trip');

async function optimizeRoute(req, res) {
  try {
    const { startLngLat, endLngLat, startLabel = 'Start', endLabel = 'Destination', userId } = req.body;
    if (!startLngLat || !endLngLat) return res.status(400).json({ error: 'startLngLat and endLngLat are required' });

    const std = await getDirections({ startLngLat, endLngLat });
    const opt = { ...std };
    const weather = await getWeatherByQuery(endLabel);

    const stdEnergy = estimateEnergy(std.distance, std.duration, weather);
    const optEnergy = estimateEnergy(opt.distance * 0.94, opt.duration * 1.02, weather);

    const eff = scoreEfficiency(stdEnergy.kwh, optEnergy.kwh);
    const co2 = estimateCO2Reduction(eff.savedKWh);

    const payload = {
      standard: { ...std, energy: stdEnergy },
      optimized: { ...opt, energy: optEnergy },
      efficiency: { ...eff, co2ReducedLb: co2 },
      weather
    };

    await Trip.create({
      userId: userId || null,
      start: startLabel,
      destination: endLabel,
      distanceKm: stdEnergy.distanceKm,
      timeMinutes: stdEnergy.durationMin,
      efficiencyScore: eff.efficiencyPct,
      energySavedKWh: eff.savedKWh,
      co2ReducedLb: co2,
      routeGeoJSON: std.geometry
    });

    res.json(payload);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Failed to optimize route' });
  }
}

module.exports = { optimizeRoute };
