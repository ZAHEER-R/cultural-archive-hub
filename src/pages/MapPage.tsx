import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Link } from "react-router-dom";
import { MapPin } from "lucide-react";
import { cities, continentColors, getContinentForRegion } from "@/data/cities";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix default marker icons
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
});

const colorMarkers: Record<string, L.Icon> = {};
const markerColors: Record<string, string> = {
  "Asia": "red",
  "Europe": "blue",
  "Africa": "orange",
  "North America": "green",
  "South America": "violet",
  "Oceania": "gold",
};

Object.entries(markerColors).forEach(([continent, color]) => {
  colorMarkers[continent] = new L.Icon({
    iconUrl: `https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-${color}.png`,
    shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  });
});

function getMarkerIcon(region: string): L.Icon {
  const continent = getContinentForRegion(region);
  return colorMarkers[continent] || colorMarkers["Asia"];
}

export default function MapPage() {
  return (
    <div className="h-[calc(100vh-4rem)] md:h-[calc(100vh-4rem)] pb-16 md:pb-0">
      {/* Legend */}
      <div className="absolute top-20 right-4 z-[1000] bg-card/90 backdrop-blur-sm rounded-xl border p-3 shadow-lg">
        <p className="text-xs font-medium mb-2">Continents</p>
        {Object.entries(markerColors).map(([continent, color]) => (
          <div key={continent} className="flex items-center gap-2 text-xs mb-1">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: continentColors[continent] }} />
            <span>{continent}</span>
          </div>
        ))}
      </div>

      <MapContainer
        center={[20, 0]}
        zoom={2}
        scrollWheelZoom={true}
        className="h-full w-full rounded-none"
        style={{ background: "hsl(215 50% 12%)" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        />
        {cities.map(city => (
          <Marker key={city.id} position={[city.lat, city.lng]} icon={getMarkerIcon(city.region)}>
            <Popup>
              <div className="font-body text-center min-w-[150px]">
                <p className="font-heading font-bold text-base mb-1">{city.name}</p>
                <p className="text-xs text-gray-500 mb-2">{city.country} | {city.cultures.length} traditions</p>
                <Link
                  to={`/city/${city.id}`}
                  className="inline-block px-3 py-1 rounded-full text-xs font-medium"
                  style={{ background: "hsl(40 55% 55%)", color: "hsl(20 25% 10%)" }}
                >
                  Explore
                </Link>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
