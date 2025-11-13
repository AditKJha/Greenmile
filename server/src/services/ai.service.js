// Lightweight heuristic scorer with weather adjustments.
function estimateEnergy(distanceMeters, durationSec, weather) {
  const distanceKm = distanceMeters / 1000;
  const baseKWhPer100km = 17;
  const tempC = weather?.main?.temp ?? 20;
  const wind = weather?.wind?.speed ?? 0;

  const tempPenalty = tempC < 10 ? 1.10 : tempC > 32 ? 1.08 : 1.0;
  const windPenalty = wind > 6 ? 1.05 : 1.0;

  const kwh = (distanceKm / 100) * baseKWhPer100km * tempPenalty * windPenalty;
  return { distanceKm, durationMin: Math.round(durationSec / 60), kwh: Number(kwh.toFixed(2)) };
}

function scoreEfficiency(standardKWh, optimizedKWh) {
  if (!standardKWh || !optimizedKWh) return { savedKWh: 0, efficiencyPct: 0 };
  const saved = Math.max(standardKWh - optimizedKWh, 0);
  const pct = (saved / standardKWh) * 100;
  return { savedKWh: Number(saved.toFixed(2)), efficiencyPct: Math.round(pct) };
}

function estimateCO2Reduction(savedKWh) {
  const lbs = savedKWh * 0.7;
  return Number(lbs.toFixed(2));
}

function estimateBatteryHealth(history = []) {
  const avg = history.length ? history.reduce((a, b) => a + (b.kwhUsed||0), 0) / history.length : 15;
  const projectedDegradationPct = Math.min(((avg - 15) / 15) * 5, 10);
  return { projectedDegradationPct: Number(projectedDegradationPct.toFixed(1)) };
}

module.exports = { estimateEnergy, scoreEfficiency, estimateCO2Reduction, estimateBatteryHealth };
