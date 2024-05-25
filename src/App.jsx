import React, { useState } from 'react';
import AirportDropdown from './components/AirportDropdown';
import Map from './components/Map';
import { fetchWeatherData } from './utils/app.js'; // Import the fetchWeatherData function
import { airports } from './airports.js';

const App = () => {
  const [departureCity, setDepartureCity] = useState('');
  const [arrivalCity, setArrivalCity] = useState('');
  const [path, setPath] = useState([]);

  const findRoute = async () => {
    try {
      // Check if departure and arrival cities are the same
      if (departureCity === arrivalCity) {
        console.error("Departure and arrival cities cannot be the same.");
        return;
      }

      const newPath = await fetchWeatherData(departureCity, arrivalCity);
      function stringToFloatArray(s) {
        s = s.replace("(", "").replace(")", "");
        return s.split(",").map(Number);
      }
      const path = newPath.map(stringToFloatArray);
      console.log(path)
      setPath(path);
    } catch (error) {
      console.error("Error fetching weather data:", error);
      setPath([]);
    }
  };

  return (
    <div>
      <h1>Find Best Route</h1>
      <AirportDropdown
        label="Departure City"
        airports={airports} // Assuming you have a list of airports
        selectedAirport={departureCity}
        onAirportChange={setDepartureCity}
      />
      <AirportDropdown
        label="Arrival City"
        airports={airports} // Assuming you have a list of airports
        selectedAirport={arrivalCity}
        onAirportChange={setArrivalCity}
      />
      <button onClick={findRoute}>Find Route</button>
      <Map path={path} />
    </div>
  );
};

export default App;
