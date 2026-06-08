import { MapContainer, TileLayer, Marker, Polyline, Popup, useMap } from 'react-leaflet'
import L from 'leaflet'
import { useEffect } from 'react'
import 'leaflet/dist/leaflet.css'

// Custom icon for airports
const airportIcon = new L.DivIcon({
  className: 'airport-marker',
  html: '<div class="marker-dot"></div>',
  iconSize: [14, 14],
  iconAnchor: [7, 7],
})

// Custom icon for live plane position
const planeIcon = new L.DivIcon({
  className: 'plane-marker',
  html: '<div class="marker-plane">^</div>',
  iconSize: [24, 24],
  iconAnchor: [12, 12],
})

// Component to fit map bounds
function FitBounds({ bounds }) {
  const map = useMap()
  useEffect(() => {
    if (bounds && bounds.length >= 2) {
      map.fitBounds(bounds, { padding: [50, 50] })
    }
  }, [map, bounds])
  return null
}

// Airport coordinate lookup (major airports)
const AIRPORT_COORDS = {
  JFK: [40.6413, -73.7781],
  LAX: [33.9425, -118.4081],
  ORD: [41.9742, -87.9073],
  ATL: [33.6407, -84.4277],
  DFW: [32.8998, -97.0403],
  DEN: [39.8561, -104.6737],
  SFO: [37.6213, -122.379],
  SEA: [47.4502, -122.3088],
  MIA: [25.7959, -80.287],
  BOS: [42.3656, -71.0096],
  LHR: [51.47, -0.4543],
  CDG: [49.0097, 2.5479],
  FRA: [50.0379, 8.5622],
  AMS: [52.3105, 4.7683],
  DXB: [25.2532, 55.3657],
  HND: [35.5494, 139.7798],
  NRT: [35.7647, 140.3864],
  SIN: [1.3644, 103.9915],
  HKG: [22.308, 113.9185],
  SYD: [-33.9461, 151.1772],
  MEL: [-37.6733, 144.8433],
  YYZ: [43.6777, -79.6248],
  YVR: [49.195, -123.1819],
  EWR: [40.6895, -74.1745],
  IAH: [29.9902, -95.3368],
  PHX: [33.4373, -112.0078],
  MCO: [28.4312, -81.308],
  MSP: [44.8848, -93.2223],
  DTW: [42.2162, -83.3554],
  CLT: [35.214, -80.9431],
  PHL: [39.8744, -75.2424],
  BWI: [39.1774, -76.6684],
  SLC: [40.7899, -111.9791],
  IAD: [38.9531, -77.4565],
  DCA: [38.8512, -77.0402],
  SAN: [32.7336, -117.1897],
  TPA: [27.9756, -82.5332],
  PDX: [45.5898, -122.5951],
  STL: [38.7487, -90.37],
  BNA: [36.1263, -86.6774],
  AUS: [30.1975, -97.6664],
  RDU: [35.8801, -78.7875],
  MCI: [39.2976, -94.7139],
  MDW: [41.786, -87.7524],
  FLL: [26.0742, -80.1506],
  HNL: [21.3187, -157.9224],
  OAK: [37.7213, -122.2208],
  SMF: [38.6954, -121.5908],
  CLE: [41.4058, -81.8539],
  PIT: [40.4919, -80.2329],
  IND: [39.7173, -86.2944],
  CMH: [39.998, -82.8919],
  MKE: [42.9472, -87.8966],
  SAT: [29.5337, -98.4698],
  RSW: [26.5362, -81.7552],
  BDL: [41.9389, -72.6831],
  JAX: [30.4941, -81.6879],
  OMA: [41.3032, -95.8941],
  ABQ: [35.0402, -106.6091],
  BUF: [42.9405, -78.7322],
  OKC: [35.3931, -97.6007],
  MEM: [35.0424, -89.9767],
  RIC: [37.5052, -77.3197],
  SJC: [37.3626, -121.929],
  PBI: [26.6832, -80.0956],
  ORF: [36.8946, -76.2012],
  TUL: [36.1984, -95.8881],
  BHM: [33.5629, -86.7535],
  GEG: [47.6199, -117.5338],
  MSY: [29.9934, -90.258],
  LGA: [40.7769, -73.874],
  // International
  FCO: [41.8003, 12.2389],
  MAD: [40.4936, -3.5668],
  BCN: [41.2974, 2.0833],
  MUC: [48.3538, 11.786],
  ZRH: [47.4647, 8.5492],
  IST: [41.2753, 28.7519],
  DOH: [25.2731, 51.6081],
  AUH: [24.433, 54.6511],
  BOM: [19.0896, 72.8656],
  DEL: [28.5562, 77.1],
  BKK: [13.6899, 100.7501],
  KUL: [2.7456, 101.7099],
  ICN: [37.4602, 126.4407],
  PEK: [40.0799, 116.6031],
  PVG: [31.1434, 121.8052],
  TPE: [25.0777, 121.2328],
  MNL: [14.5086, 121.0198],
  CGK: [-6.1256, 106.6559],
  JNB: [-26.1392, 28.246],
  CPT: [-33.9648, 18.6017],
  GRU: [-23.4356, -46.4731],
  MEX: [19.4363, -99.0721],
  EZE: [-34.8222, -58.5358],
  SCL: [-33.393, -70.7858],
  LIM: [-12.0219, -77.1143],
  BOG: [4.7016, -74.1469],
  CUN: [21.0365, -86.877],
  AKL: [-37.0082, 174.7917],
}

function FlightMap({ flight }) {
  const depIata = flight.departure?.iata
  const arrIata = flight.arrival?.iata

  // Get coordinates from lookup or from API live data
  const depCoords = AIRPORT_COORDS[depIata] || (
    flight.departure?.latitude && flight.departure?.longitude
      ? [flight.departure.latitude, flight.departure.longitude]
      : null
  )

  const arrCoords = AIRPORT_COORDS[arrIata] || (
    flight.arrival?.latitude && flight.arrival?.longitude
      ? [flight.arrival.latitude, flight.arrival.longitude]
      : null
  )

  const liveCoords = flight.live?.latitude && flight.live?.longitude
    ? [flight.live.latitude, flight.live.longitude]
    : null

  // If we don't have both endpoints, show a message
  if (!depCoords && !arrCoords) {
    return (
      <div className="map-unavailable">
        <p>Map unavailable — airport coordinates not found for {depIata || 'departure'} and {arrIata || 'arrival'}.</p>
      </div>
    )
  }

  // Build path points
  const pathPoints = []
  if (depCoords) pathPoints.push(depCoords)
  if (liveCoords) pathPoints.push(liveCoords)
  if (arrCoords) pathPoints.push(arrCoords)

  // Bounds for fitting the map
  const bounds = []
  if (depCoords) bounds.push(depCoords)
  if (arrCoords) bounds.push(arrCoords)
  if (liveCoords) bounds.push(liveCoords)

  // Default center if only one point
  const center = bounds.length > 0 ? bounds[0] : [20, 0]

  return (
    <div className="flight-map-container">
      <h3>Flight Path</h3>
      <div className="flight-map">
        <MapContainer
          center={center}
          zoom={4}
          scrollWheelZoom={true}
          style={{ height: '100%', width: '100%', borderRadius: '8px' }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {bounds.length >= 2 && <FitBounds bounds={bounds} />}

          {/* Flight path line */}
          {pathPoints.length >= 2 && (
            <Polyline
              positions={pathPoints}
              color="#1a73e8"
              weight={3}
              opacity={0.8}
              dashArray="8 4"
            />
          )}

          {/* Departure marker */}
          {depCoords && (
            <Marker position={depCoords} icon={airportIcon}>
              <Popup>
                <strong>{depIata}</strong><br />
                {flight.departure?.airport || 'Departure'}
              </Popup>
            </Marker>
          )}

          {/* Arrival marker */}
          {arrCoords && (
            <Marker position={arrCoords} icon={airportIcon}>
              <Popup>
                <strong>{arrIata}</strong><br />
                {flight.arrival?.airport || 'Arrival'}
              </Popup>
            </Marker>
          )}

          {/* Live position marker */}
          {liveCoords && (
            <Marker position={liveCoords} icon={planeIcon}>
              <Popup>
                <strong>Current Position</strong><br />
                Alt: {flight.live?.altitude || '—'} m<br />
                Speed: {flight.live?.speed_horizontal || '—'} km/h
              </Popup>
            </Marker>
          )}
        </MapContainer>
      </div>
    </div>
  )
}

export default FlightMap
