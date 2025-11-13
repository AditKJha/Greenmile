const { getNearbyStations } = require('../services/stations.service');

async function listStations(req, res) {
  try {
    const { lat, lon, distanceKm } = req.query;
    if (!lat || !lon) return res.status(400).json({ error: 'lat & lon required' });
    const data = await getNearbyStations({ lat, lon, distanceKm: Number(distanceKm) || 50 });
    res.json({ count: data.length, items: data });
  } catch (e) {
    res.status(500).json({ error: 'Failed to fetch stations' });
  }
}

module.exports = { listStations };
