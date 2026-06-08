function FlightResults({ flights, onSelect, searched }) {
  if (!searched) {
    return (
      <div className="results-placeholder">
        <div className="placeholder-icon">departures</div>
        <h2>Search for Flights</h2>
        <p>Enter a flight number, airline code, or airport code to get started.</p>
      </div>
    )
  }

  if (flights.length === 0) {
    return (
      <div className="results-placeholder">
        <div className="placeholder-icon">search</div>
        <h2>No Flights Found</h2>
        <p>No flights match your search for today. Try searching by:</p>
        <ul className="suggestions-list">
          <li>Airport code (e.g. JFK, LAX, ORD, ATL)</li>
          <li>Airline code (e.g. AA, UA, DL, BA)</li>
          <li>Exact flight number with no spaces (e.g. AA8933)</li>
        </ul>
      </div>
    )
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

  const formatTime = (dateStr) => {
    if (!dateStr) return '—'
    const date = new Date(dateStr)
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  }

  const formatDate = (dateStr) => {
    if (!dateStr) return '—'
    const date = new Date(dateStr)
    return date.toLocaleDateString([], { month: 'short', day: 'numeric', year: 'numeric' })
  }

  return (
    <div className="flight-results">
      <h2 className="results-title">{flights.length} Flight{flights.length !== 1 ? 's' : ''} Found</h2>
      <div className="results-grid">
        {flights.map((flight, index) => (
          <div
            key={index}
            className="flight-card"
            onClick={() => onSelect(flight)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && onSelect(flight)}
            aria-label={`Flight ${flight.flight?.iata || 'Unknown'} from ${flight.departure?.airport || 'Unknown'} to ${flight.arrival?.airport || 'Unknown'}`}
          >
            <div className="card-header">
              <span className="flight-number">{flight.flight?.iata || flight.flight?.icao || 'N/A'}</span>
              <span className={`flight-status ${getStatusClass(flight.flight_status)}`}>
                {flight.flight_status || 'Unknown'}
              </span>
            </div>

            <div className="card-route">
              <div className="route-point">
                <span className="airport-code">{flight.departure?.iata || '—'}</span>
                <span className="airport-name">{flight.departure?.airport || 'Unknown'}</span>
                <span className="route-time">{formatTime(flight.departure?.estimated || flight.departure?.scheduled)}</span>
              </div>

              <div className="route-line">
                <div className="route-arrow">→</div>
              </div>

              <div className="route-point">
                <span className="airport-code">{flight.arrival?.iata || '—'}</span>
                <span className="airport-name">{flight.arrival?.airport || 'Unknown'}</span>
                <span className="route-time">{formatTime(flight.arrival?.estimated || flight.arrival?.scheduled)}</span>
              </div>
            </div>

            <div className="card-footer">
              <span className="airline-name">{flight.airline?.name || 'Unknown Airline'}</span>
              <span className="flight-date">{formatDate(flight.flight_date)}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default FlightResults
