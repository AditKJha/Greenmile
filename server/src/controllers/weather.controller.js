const { getWeatherByQuery } = require('../services/weather.service');

async function getWeather(req, res) {
  try {
    const { location } = req.params;
    const data = await getWeatherByQuery(location);
    const temp = data?.main?.temp ?? 20;
    const impact = temp < 10 ? -8 : temp > 32 ? -6 : -2;
    res.json({ ...data, efficiencyImpactPct: impact });
  } catch (e) {
    res.status(500).json({ error: 'Failed to fetch weather' });
  }
}

module.exports = { getWeather };
