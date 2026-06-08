# Flight Tracker

A real-time flight tracking web application that lets you search for flights, view detailed information, see flight paths on an interactive map, and save flights to a favorites list.
https://youtu.be/cY92VmP7Agw
## Technologies Used

- **React 19** — UI framework
- **Vite 8** — Build tool and dev server
- **Aviationstack API** — Real-time flight data (free tier, 100 requests/month)
- **Leaflet / React-Leaflet** — Interactive map for displaying flight paths
- **OpenStreetMap** — Map tiles (free, no API key needed)
- **localStorage** — Client-side persistence for saved favorites

## Features

- Search flights by departure airport, arrival airport, airline code, or exact flight number
- Filter results by flight status (scheduled, active, landed, cancelled, diverted)
- View detailed flight information including terminals, gates, delays, and aircraft data
- Interactive map showing the flight path between departure and arrival airports
- Live aircraft position displayed on the map when available from the API
- Save flights to a favorites list that persists across sessions
- Fully responsive design for desktop and mobile

## Installation

1. Clone or download this project

2. Install dependencies:

```bash
cd flight-tracker
npm install
```

3. Get a free API key from [aviationstack.com/signup/free](https://aviationstack.com/signup/free)

4. Create a `.env` file in the project root (or edit the existing one):

```
VITE_AVIATIONSTACK_API_KEY=your_api_key_here
```

5. Start the development server:

```bash
npm run dev
```

6. Open the URL shown in the terminal (usually http://localhost:5173)

## Build for Production

```bash
npm run build
```

The output will be in the `dist/` folder, ready to deploy to any static hosting service.

## Usage Tips

- Search by airport code (JFK, LAX, ORD) or airline code (AA, UA, DL) for the most results
- Flight numbers must be the exact IATA format with no spaces (e.g. AA8933, not AA 100)
- The free Aviationstack tier uses HTTP (not HTTPS) and allows 100 API calls per month
- Click any flight card to see full details and the flight path map
- Use the "Save to Favorites" button on the detail view to bookmark flights

## Project Structure

```
flight-tracker/
├── src/
│   ├── components/
│   │   ├── SearchForm.jsx      # Search input with filters
│   │   ├── FlightResults.jsx   # Grid of flight result cards
│   │   ├── FlightDetail.jsx    # Full flight info detail view
│   │   ├── FlightMap.jsx       # Leaflet map with flight path
│   │   └── Favorites.jsx       # Saved flights section
│   ├── App.jsx                 # Main app with state and API logic
│   ├── App.css                 # All styles
│   ├── index.css
│   └── main.jsx                # Entry point
├── .env                        # API key (not committed to git)
├── .env.example                # Template for API key setup
├── index.html
├── package.json
└── vite.config.js
```
