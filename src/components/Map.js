import React from 'react';
import { MapContainer, TileLayer, Polyline } from 'react-leaflet';

const Map = ({ path }) => {
  return (
    <MapContainer center={[20.5937, 78.9629]} zoom={5} style={{ height: "500px", width: "100%" }}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <Polyline positions={path} color="blue" />
    </MapContainer>
  );
};

export default Map;
