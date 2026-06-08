import FlightMap from './FlightMap'

function FlightDetail({ flight, onBack, onFavorite, isFavorite }) {
  const formatDateTime = (dateStr) => {
    if (!dateStr) return '—'
    const date = new Date(dateStr)
    return date.toLocaleString([], {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  const getStatusClass = (status) => {
    switch (status) {
      case 'active': return 'status-active'
      case 'landed': return 'status-landed'
      case 'scheduled': return 'status-scheduled'
      case 'cancelled': return 'status-cancelled'
      case 'diverted': return 'status-diverted'
      case 'incident': return 'status-incident'
      default: return 'status-unknown'
    }
  }

  const getDelayText = (delay) => {
    if (!delay || delay === 0) return null
    return `${delay} min delay`
  }

  return (
    <div className="flight-detail">
      <div className="detail-actions">
        <button className="btn-back" onClick={onBack}>
          ← Back to Results
        </button>
        <button
          className={`btn-favorite ${isFavorite ? 'btn-favorite-saved' : ''}`}
          onClick={() => onFavorite(flight)}
          disabled={isFavorite}
        >
          {isFavorite ? 'Saved' : 'Save to Favorites'}
        </button>
      </div>

      <div className="detail-header">
        <div className="detail-title">
          <h2>
            {flight.airline?.name || 'Unknown Airline'} — {flight.flight?.iata || flight.flight?.icao || 'N/A'}
          </h2>
          <span className={`flight-status flight-status-lg ${getStatusClass(flight.flight_status)}`}>
            {flight.flight_status || 'Unknown'}
          </span>
        </div>
        <p className="detail-date">Flight Date: {flight.flight_date || '—'}</p>
      </div>

      <div className="detail-route-visual">
        <div className="route-endpoint">
          <div className="endpoint-code">{flight.departure?.iata || '—'}</div>
          <div className="endpoint-city">{flight.departure?.airport || 'Unknown Airport'}</div>
        </div>
        <div className="route-connector">
          <div className="connector-line"></div>
          <div className="connector-plane">—</div>
          <div className="connector-line"></div>
        </div>
        <div className="route-endpoint">
          <div className="endpoint-code">{flight.arrival?.iata || '—'}</div>
          <div className="endpoint-city">{flight.arrival?.airport || 'Unknown Airport'}</div>
        </div>
      </div>

      <FlightMap flight={flight} />

      <div className="detail-sections">
        <div className="detail-section">
          <h3>Departure</h3>
          <div className="info-grid">
            <InfoRow label="Airport" value={flight.departure?.airport} />
            <InfoRow label="IATA / ICAO" value={`${flight.departure?.iata || '—'} / ${flight.departure?.icao || '—'}`} />
            <InfoRow label="Terminal" value={flight.departure?.terminal} />
            <InfoRow label="Gate" value={flight.departure?.gate} />
            <InfoRow label="Scheduled" value={formatDateTime(flight.departure?.scheduled)} />
            <InfoRow label="Estimated" value={formatDateTime(flight.departure?.estimated)} />
            <InfoRow label="Actual" value={formatDateTime(flight.departure?.actual)} />
            {flight.departure?.delay && (
              <InfoRow label="Delay" value={getDelayText(flight.departure.delay)} highlight="warning" />
            )}
            <InfoRow label="Timezone" value={flight.departure?.timezone} />
          </div>
        </div>

        <div className="detail-section">
          <h3>Arrival</h3>
          <div className="info-grid">
            <InfoRow label="Airport" value={flight.arrival?.airport} />
            <InfoRow label="IATA / ICAO" value={`${flight.arrival?.iata || '—'} / ${flight.arrival?.icao || '—'}`} />
            <InfoRow label="Terminal" value={flight.arrival?.terminal} />
            <InfoRow label="Gate" value={flight.arrival?.gate} />
            <InfoRow label="Baggage" value={flight.arrival?.baggage} />
            <InfoRow label="Scheduled" value={formatDateTime(flight.arrival?.scheduled)} />
            <InfoRow label="Estimated" value={formatDateTime(flight.arrival?.estimated)} />
            <InfoRow label="Actual" value={formatDateTime(flight.arrival?.actual)} />
            {flight.arrival?.delay && (
              <InfoRow label="Delay" value={getDelayText(flight.arrival.delay)} highlight="warning" />
            )}
            <InfoRow label="Timezone" value={flight.arrival?.timezone} />
          </div>
        </div>

        <div className="detail-section">
          <h3>Airline & Flight Info</h3>
          <div className="info-grid">
            <InfoRow label="Airline" value={flight.airline?.name} />
            <InfoRow label="Airline IATA" value={flight.airline?.iata} />
            <InfoRow label="Airline ICAO" value={flight.airline?.icao} />
            <InfoRow label="Flight IATA" value={flight.flight?.iata} />
            <InfoRow label="Flight ICAO" value={flight.flight?.icao} />
            <InfoRow label="Flight Number" value={flight.flight?.number} />
          </div>
        </div>

        {flight.aircraft && (
          <div className="detail-section">
            <h3>Aircraft</h3>
            <div className="info-grid">
              <InfoRow label="Registration" value={flight.aircraft?.registration} />
              <InfoRow label="IATA Code" value={flight.aircraft?.iata} />
              <InfoRow label="ICAO Code" value={flight.aircraft?.icao} />
              <InfoRow label="ICAO24" value={flight.aircraft?.icao24} />
            </div>
          </div>
        )}

        {flight.live && (
          <div className="detail-section live-section">
            <h3>Live Tracking</h3>
            <div className="info-grid">
              <InfoRow label="Latitude" value={flight.live?.latitude} />
              <InfoRow label="Longitude" value={flight.live?.longitude} />
              <InfoRow label="Altitude" value={flight.live?.altitude ? `${flight.live.altitude} m` : null} />
              <InfoRow label="Direction" value={flight.live?.direction ? `${flight.live.direction}°` : null} />
              <InfoRow label="Speed (Horizontal)" value={flight.live?.speed_horizontal ? `${flight.live.speed_horizontal} km/h` : null} />
              <InfoRow label="Speed (Vertical)" value={flight.live?.speed_vertical ? `${flight.live.speed_vertical} km/h` : null} />
              <InfoRow label="Ground" value={flight.live?.is_ground ? 'Yes' : 'No'} />
              <InfoRow label="Last Updated" value={formatDateTime(flight.live?.updated)} />
            </div>
          </div>
        )}

        {flight.codeshared && (
          <div className="detail-section">
            <h3>Codeshare</h3>
            <div className="info-grid">
              <InfoRow label="Airline" value={flight.codeshared?.airline_name} />
              <InfoRow label="Flight IATA" value={flight.codeshared?.flight_iata} />
              <InfoRow label="Flight Number" value={flight.codeshared?.flight_number} />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

function InfoRow({ label, value, highlight }) {
  if (!value && value !== 0) return null

  return (
    <div className={`info-row ${highlight ? `info-${highlight}` : ''}`}>
      <span className="info-label">{label}</span>
      <span className="info-value">{value}</span>
    </div>
  )
}

export default FlightDetail
