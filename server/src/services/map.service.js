// const { http } = require('../utils/http');
// const { MAPBOX_TOKEN } = require('../config');

// async function getDirections({ startLngLat, endLngLat }) {
//   if (!MAPBOX_TOKEN) {
//     return {
//       distance: 125000,
//       duration: 7200,
//       geometry: {
//         type: 'LineString',
//         coordinates: [startLngLat, endLngLat]
//       }
//     };
//   }
//   const url = `https://api.mapbox.com/directions/v5/mapbox/driving-traffic/${startLngLat[0]},${startLngLat[1]};${endLngLat[0]},${endLngLat[1]}?geometries=geojson&overview=full&annotations=distance,duration&access_token=${MAPBOX_TOKEN}`;
//   const { data } = await http.get(url);
//   const route = data.routes?.[0];
//   return {
//     distance: route.distance,
//     duration: route.duration,
//     geometry: route.geometry
//   };
// }

// module.exports = { getDirections };
const { http } = require('../utils/http');

async function getDirections({ startLngLat, endLngLat }) {
  const url = `https://router.project-osrm.org/route/v1/driving/${startLngLat[0]},${startLngLat[1]};${endLngLat[0]},${endLngLat[1]}?overview=full&geometries=geojson`;
  const { data } = await http.get(url);
  const route = data.routes[0];

  return {
    distance: route.distance,
    duration: route.duration,
    geometry: route.geometry
  };
}

module.exports = { getDirections };
