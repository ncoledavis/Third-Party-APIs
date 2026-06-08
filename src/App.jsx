import { useState, useEffect } from 'react'
import SearchForm from './components/SearchForm'
import FlightResults from './components/FlightResults'
import FlightDetail from './components/FlightDetail'
import Favorites from './components/Favorites'
import './App.css'

function App() {
  const [flights, setFlights] = useState([])
  const [selectedFlight, setSelectedFlight] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [searched, setSearched] = useState(false)
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem('flight-favorites')
    return saved ? JSON.parse(saved) : []
  })

  const API_KEY = import.meta.env.VITE_AVIATIONSTACK_API_KEY || 'YOUR_API_KEY'

  useEffect(() => {
    localStorage.setItem('flight-favorites', JSON.stringify(favorites))
  }, [favorites])

  const searchFlights = async (params) => {
    setLoading(true)
    setError(null)
    setSelectedFlight(null)
    setSearched(true)

    const queryParams = new URLSearchParams({
      access_key: API_KEY,
      ...params,
    })

    try {
      const response = await fetch(
        `http://api.aviationstack.com/v1/flights?${queryParams}`
      )
      const data = await response.json()

      if (data.error) {
        setError(data.error.message || 'An error occurred while fetching flight data.')
        setFlights([])
      } else {
        setFlights(data.data || [])
      }
    } catch (err) {
      setError('Failed to connect to the API. Please check your connection and API key.')
      setFlights([])
    } finally {
      setLoading(false)
    }
  }

  const addFavorite = (flight) => {
    const id = `${flight.flight?.iata || flight.flight?.icao || ''}-${flight.flight_date}`
    const alreadyExists = favorites.some((f) => f.id === id)
    if (!alreadyExists) {
      setFavorites([...favorites, { ...flight, id }])
    }
  }

  const removeFavorite = (id) => {
    setFavorites(favorites.filter((f) => f.id !== id))
  }

  const isFavorite = (flight) => {
    const id = `${flight.flight?.iata || flight.flight?.icao || ''}-${flight.flight_date}`
    return favorites.some((f) => f.id === id)
  }

  return (
    <div className="app">
      <header className="app-header">
        <div className="header-content">
          <h1>Flight Tracker</h1>
          <p>Real-time flight information powered by Aviationstack</p>
        </div>
      </header>

      <main className="app-main">
        <SearchForm onSearch={searchFlights} loading={loading} />

        {error && (
          <div className="error-message">
            <span className="error-icon">!</span>
            <p>{error}</p>
          </div>
        )}

        {loading && (
          <div className="loading">
            <div className="spinner"></div>
            <p>Searching flights...</p>
          </div>
        )}

        {selectedFlight ? (
          <FlightDetail
            flight={selectedFlight}
            onBack={() => setSelectedFlight(null)}
            onFavorite={addFavorite}
            isFavorite={isFavorite(selectedFlight)}
          />
        ) : (
          !loading && (
            <FlightResults
              flights={flights}
              onSelect={setSelectedFlight}
              searched={searched}
              onFavorite={addFavorite}
              isFavorite={isFavorite}
            />
          )
        )}

        <Favorites
          favorites={favorites}
          onSelect={setSelectedFlight}
          onRemove={removeFavorite}
        />
      </main>

      <footer className="app-footer">
        <p>Data provided by <a href="https://aviationstack.com" target="_blank" rel="noopener noreferrer">Aviationstack</a></p>
      </footer>
    </div>
  )
}

export default App
