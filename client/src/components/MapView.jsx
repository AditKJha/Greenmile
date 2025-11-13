// import React, { useEffect, useRef } from 'react';
// import mapboxgl from 'mapbox-gl';
// import bbox from '@turf/bbox';
// mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN || '';

// export default function MapView({ route }){
//   const mapRef = useRef(null);
//   const containerRef = useRef(null);
//   useEffect(()=>{
//     if(!containerRef.current) return;
//     const map = new mapboxgl.Map({
//       container: containerRef.current,
//       style: 'mapbox://styles/mapbox/streets-v12',
//       center: [77.209, 28.6139],
//       zoom: 6
//     });
//     mapRef.current = map;
//     map.on('load', ()=>{
//       if(route?.geometry){
//         map.addSource('route', { type:'geojson', data: { type:'Feature', geometry: route.geometry }});
//         map.addLayer({ id:'route-line', type:'line', source:'route', paint:{ 'line-color':'#10b981','line-width':5 } });
//         const bb = bbox({ type:'Feature', geometry: route.geometry });
//         map.fitBounds(bb, { padding: 40, duration: 800 });
//       }
//     });
//     return ()=> map.remove();
//   },[route]);
//   return <div className="w-full h-full rounded-2xl overflow-hidden border" ref={containerRef} />
// }
import React, { useEffect } from "react";
import { MapContainer, TileLayer, Polyline, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});


function FitRoute({ route }) {
  const map = useMap();
  useEffect(() => {
    if (route?.geometry?.coordinates) {
      const latlngs = route.geometry.coordinates.map(([lng, lat]) => [lat, lng]);
      map.fitBounds(latlngs, { padding: [50, 50] });
    }
  }, [route, map]);
  return null;
}


export default function MapView({ route }) {
  const line = route?.geometry?.coordinates?.map(([lng, lat]) => [lat, lng]) || [];

  return (
    <MapContainer
      center={[20.5937, 78.9629]} // India center
      zoom={5}
      className="w-full h-full rounded-2xl border"
      scrollWheelZoom={true}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="© OpenStreetMap Contributors"
      />

      {line.length > 0 && (
        <>
          <FitRoute route={route} />
          <Polyline positions={line} color="green" weight={4} />
        </>
      )}
    </MapContainer>
  );
}
