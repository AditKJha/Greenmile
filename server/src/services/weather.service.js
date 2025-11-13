const { http } = require('../utils/http');
const { OPENWEATHER_API_KEY } = require('../config');

async function getWeatherByQuery(q) {
  if (!OPENWEATHER_API_KEY) {
    return { name: q, main: { temp: 20, humidity: 55 }, wind: { speed: 2 }, weather: [{ main: 'Clouds' }] };
  }
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(q)}&appid=${OPENWEATHER_API_KEY}&units=metric`;
  const { data } = await http.get(url);
  return data;
}

module.exports = { getWeatherByQuery };
