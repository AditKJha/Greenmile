const BatteryStat = require('../models/BatteryStat');
const { estimateBatteryHealth } = require('../services/ai.service');

async function getStatus(_, res) {
  const latest = await BatteryStat.findOne().sort({ createdAt: -1 });
  const soc = latest?.soc ?? 72;
  const estRangeKm = latest?.estRangeKm ?? 285;
  const kwhUsed = latest?.kwhUsed ?? 0.0;
  const history = await BatteryStat.find().sort({ createdAt: -1 }).limit(30).lean();
  const health = estimateBatteryHealth(history);
  res.json({ soc, estRangeKm, kwhUsed, health, history });
}

module.exports = { getStatus };
