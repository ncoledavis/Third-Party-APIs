import { useState } from 'react'

function SearchForm({ onSearch, loading }) {
  const [searchType, setSearchType] = useState('dep_iata')
  const [searchValue, setSearchValue] = useState('')
  const [flightStatus, setFlightStatus] = useState('')

  const searchOptions = [
    { value: 'dep_iata', label: 'Departure Airport', placeholder: 'e.g. JFK, LAX, ORD' },
    { value: 'arr_iata', label: 'Arrival Airport', placeholder: 'e.g. LAX, LHR, SFO' },
    { value: 'airline_iata', label: 'Airline Code', placeholder: 'e.g. AA, UA, DL, BA' },
    { value: 'flight_iata', label: 'Flight Number', placeholder: 'e.g. AA8933, UA2145' },
  ]

  const statusOptions = [
    { value: '', label: 'All Statuses' },
    { value: 'scheduled', label: 'Scheduled' },
    { value: 'active', label: 'Active (In Air)' },
    { value: 'landed', label: 'Landed' },
    { value: 'cancelled', label: 'Cancelled' },
    { value: 'incident', label: 'Incident' },
    { value: 'diverted', label: 'Diverted' },
  ]

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!searchValue.trim()) return

    const value = searchValue.trim().toUpperCase().replace(/\s+/g, '')
    const params = { [searchType]: value }

    if (flightStatus) {
      params.flight_status = flightStatus
    }

    onSearch(params)
  }

  const currentOption = searchOptions.find((opt) => opt.value === searchType)

  return (
    <form className="search-form" onSubmit={handleSubmit}>
      <div className="search-row">
        <div className="form-group">
          <label htmlFor="search-type">Search By</label>
          <select
            id="search-type"
            value={searchType}
            onChange={(e) => setSearchType(e.target.value)}
          >
            {searchOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group form-group-grow">
          <label htmlFor="search-value">Value</label>
          <input
            id="search-value"
            type="text"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder={currentOption?.placeholder}
            autoComplete="off"
          />
        </div>

        <div className="form-group">
          <label htmlFor="flight-status">Status</label>
          <select
            id="flight-status"
            value={flightStatus}
            onChange={(e) => setFlightStatus(e.target.value)}
          >
            {statusOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        <button type="submit" className="btn-search" disabled={loading || !searchValue.trim()}>
          {loading ? 'Searching...' : 'Search'}
        </button>
      </div>

      <div className="search-tips">
        <p>Tip: Search by airport code (JFK, LAX, ORD) or airline code (AA, UA, DL) for best results. Flight numbers must be exact (e.g. AA8933, not AA 100).</p>
      </div>
    </form>
  )
}

export default SearchForm
