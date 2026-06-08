function Favorites({ favorites, onSelect, onRemove }) {
  if (favorites.length === 0) return null

  const formatTime = (dateStr) => {
    if (!dateStr) return '--'
    const date = new Date(dateStr)
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
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

  return (
    <section className="favorites-section">
      <h2 className="favorites-title">Saved Flights</h2>
      <div className="favorites-list">
        {favorites.map((flight) => (
          <div key={flight.id} className="favorite-card">
            <div
              className="favorite-info"
              onClick={() => onSelect(flight)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && onSelect(flight)}
              aria-label={`View saved flight ${flight.flight?.iata || 'Unknown'}`}
            >
              <div className="favorite-top">
                <span className="favorite-flight-number">
                  {flight.flight?.iata || flight.flight?.icao || 'N/A'}
                </span>
                <span className={`flight-status ${getStatusClass(flight.flight_status)}`}>
                  {flight.flight_status || 'Unknown'}
                </span>
              </div>
              <div className="favorite-route">
                <span className="favorite-airport">{flight.departure?.iata || '--'}</span>
                <span className="favorite-arrow">-&gt;</span>
                <span className="favorite-airport">{flight.arrival?.iata || '--'}</span>
              </div>
              <div className="favorite-meta">
                <span>{flight.airline?.name || 'Unknown Airline'}</span>
                <span>{flight.flight_date || '--'}</span>
              </div>
            </div>
            <button
              className="btn-remove-favorite"
              onClick={() => onRemove(flight.id)}
              aria-label={`Remove ${flight.flight?.iata || 'flight'} from favorites`}
              title="Remove from favorites"
            >
              x
            </button>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Favorites
