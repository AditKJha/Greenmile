const { http } = require('../utils/http');
const { OPENCHARGEMAP_API_KEY } = require('../config');

async function getNearbyStations({ lat, lon, distanceKm = 50 }) {
  const url = `https://api.openchargemap.io/v3/poi/?output=json&latitude=${lat}&longitude=${lon}&distance=${distanceKm}&distanceunit=KM`;
  const headers = OPENCHARGEMAP_API_KEY ? { 'X-API-Key': OPENCHARGEMAP_API_KEY } : {};
  const { data } = await http.get(url, { headers });
  return Array.isArray(data) ? data : [];
}

module.exports = { getNearbyStations };
