// src/components/AirportDropdown.jsx
import React from 'react';

const AirportDropdown = ({ label, airports, selectedAirport, onAirportChange }) => {
  return (
    <div>
      <label>{label}</label>
      <select value={selectedAirport} onChange={e => onAirportChange(e.target.value)}>
        <option value="">Select a city</option>
        {airports.map(airport => (
          <option key={airport} value={airport}>
            {airport}
          </option>
        ))}
      </select>
    </div>
  );
};

export default AirportDropdown;
