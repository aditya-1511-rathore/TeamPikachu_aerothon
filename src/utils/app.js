import get_weather from './get_weather.js';

function toRadians(degrees) {
    return degrees * Math.PI / 180;
}

function calculateBearing(lat1, lon1, lat2, lon2) {
    const dLon = toRadians(lon2 - lon1);
    const y = Math.sin(dLon) * Math.cos(toRadians(lat2));
    const x = Math.cos(toRadians(lat1)) * Math.sin(toRadians(lat2)) -
              Math.sin(toRadians(lat1)) * Math.cos(toRadians(lat2)) * Math.cos(dLon);
    let bearing = Math.atan2(y, x);
    bearing = (bearing * 180 / Math.PI + 360) % 360; // Convert to degrees

    // Convert bearing to cardinal direction
    const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
    const index = Math.round(bearing / 45) % 8;
    const cardinalDirection = directions[index];
    
    return { bearing: bearing, cardinalDirection: cardinalDirection };
}

function windDegreeToDirection(degree) {
    const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
    const index = Math.round(degree / 45) % 8;
    return directions[index];
}

function calculateWeightForPoint(weatherDetail, departure, arrival) {
    const { bearing } = calculateBearing(departure.lat, departure.lon, arrival.lat, arrival.lon);
    const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
    const journeyDirection = directions[Math.round(bearing / 45) % 8];

    let weight = 0;

    // Temperature factor
    const temp = weatherDetail.temperature;
    if (temp < -10) {
        weight += (-10 - temp) * 2;
    } else if (temp > 30) {
        weight += (temp - 30) * 2;
    }

    // Visibility factor
    weight += (10000 - weatherDetail.visibility) / 10000 * 100;

    // Wind direction factor
    const windDirection = windDegreeToDirection(weatherDetail.wind_speed);
    if (windDirection === journeyDirection) {
        // Do nothing if wind is in the direction of the airplane
    } else if (Math.abs(directions.indexOf(windDirection) - directions.indexOf(journeyDirection)) === 4) {
        weight += 50; // Opposite direction
    } else {
        weight += 25; // Other directions
    }

    return weight;
}

class PriorityQueue {
    constructor() {
        this.elements = [];
    }

    enqueue(element, priority) {
        this.elements.push({ element, priority });
        this.sort();
    }

    dequeue() {
        return this.elements.shift().element;
    }

    isEmpty() {
        return this.elements.length === 0;
    }

    sort() {
        this.elements.sort((a, b) => a.priority - b.priority);
    }
}

function dijkstra(graph, start, end) {
    const distances = {};
    const previous = {};
    const pq = new PriorityQueue();

    // Initialize distances and priority queue
    for (const vertex in graph) {
        distances[vertex] = Infinity;
        previous[vertex] = null;
        pq.enqueue(vertex, Infinity);
    }
    distances[start] = 0;
    pq.enqueue(start, 0);

    while (!pq.isEmpty()) {
        const current = pq.dequeue();

        if (current === end) {
            const path = [];
            let vertex = end;
            while (vertex !== null) {
                path.unshift(vertex);
                vertex = previous[vertex];
            }
            return { path, distance: distances[end] };
        }

        if (!graph[current]) continue;

        for (const neighbor of Object.keys(graph[current])) {
            const weight = graph[current][neighbor];
            const alt = distances[current] + weight;
            if (alt < distances[neighbor]) {
                distances[neighbor] = alt;
                previous[neighbor] = current;
                pq.enqueue(neighbor, alt);
            }
        }
    }

    return { path: [], distance: Infinity };
}

async function fetchWeatherData(departureCity, arrivalCity) {
    const { weather_details, coordinates } = await get_weather(departureCity, arrivalCity);
    console.log("WEATHER", weather_details)
    const graph = {};
    coordinates.points.forEach((point, index) => {
        const pointKey = `(${point.lat},${point.lon})`;
        graph[pointKey] = {};

        // Calculate weight for the current point
        const weatherDetail = weather_details[index];
        const weight = calculateWeightForPoint(weatherDetail, coordinates.departure, coordinates.arrival);
        point.weight = weight;

        // Connect to the next point if it exists
        if (index < coordinates.points.length - 1) {
            const nextPoint = coordinates.points[index + 1];
            const nextPointKey = `(${nextPoint.lat},${nextPoint.lon})`;
            if (!graph[nextPointKey]) {
                graph[nextPointKey] = {};
            }
            graph[pointKey][nextPointKey] = weight;
            graph[nextPointKey][pointKey] = weight;
        }
    });

    const startKey = `(${coordinates.departure.lat},${coordinates.departure.lon})`;
    const endKey = `(${coordinates.arrival.lat},${coordinates.arrival.lon})`;

    const { path, distance } = dijkstra(graph, startKey, endKey);

    console.log("Optimal Path:", path);
    console.log("Total Weight:", distance);
    console.log("Coordinates:", coordinates);
    return path
}

export {fetchWeatherData}
// // const weatherDetails = [
// //     { latitude: 19.0887, longitude: 72.8679, temperature: 30, visibility: 3000, wind_speed: 3.09, rain_volume: 0 },
// //     { latitude: 19.0887, longitude: 72.8679, temperature: 30, visibility: 3000, wind_speed: 3.09, rain_volume: 0 },
// //     { latitude: 19.0887, longitude: 72.8679, temperature: 30, visibility: 3000, wind_speed: 3.09, rain_volume: 0 },
// //     { latitude: 19.0887, longitude: 72.8679, temperature: 30, visibility: 3000, wind_speed: 3.09, rain_volume: 0 },
// //     { latitude: 19.0958, longitude: 72.8647, temperature: 29.99, visibility: 3000, wind_speed: 3.09, rain_volume: 0 },
// //     { latitude: 19.0958, longitude: 72.8647, temperature: 29.99, visibility: 3000, wind_speed: 3.09, rain_volume: 0 },
// //     { latitude: 19.0958, longitude: 72.8647, temperature: 29.99, visibility: 3000, wind_speed: 3.09, rain_volume: 0 },
// //     { latitude: 19.0958, longitude: 72.8647, temperature: 29.99, visibility: 3000, wind_speed: 3.09, rain_volume: 0 },
// //     { latitude: 19.0958, longitude: 72.8647, temperature: 29.99, visibility: 3000, wind_speed: 3.09, rain_volume: 0 },
// //     { latitude: 19.0958, longitude: 72.8647, temperature: 29.99, visibility: 3000, wind_speed: 3.09, rain_volume: 0 },
// //     { latitude: 19.1065, longitude: 72.86, temperature: 29.91, visibility: 3000, wind_speed: 3.09, rain_volume: 0 },
// //     { latitude: 19.0887, longitude: 72.8679, temperature: 30, visibility: 3000, wind_speed: 3.09, rain_volume: 0 },
// //     { latitude: 19.0887, longitude: 72.8679, temperature: 30, visibility: 3000, wind_speed: 3.09, rain_volume: 0 },
// //     { latitude: 19.0887, longitude: 72.8679, temperature: 30, visibility: 3000, wind_speed: 3.09, rain_volume: 0 },
// //     { latitude: 19.0887, longitude: 72.8679, temperature: 30, visibility: 3000, wind_speed: 3.09, rain_volume: 0 },
// //     { latitude: 19.0871, longitude: 72.8643, temperature: 30, visibility: 3000, wind_speed: 3.09, rain_volume: 0 },
// //     { latitude: 19.0871, longitude: 72.8643, temperature: 30, visibility: 3000, wind_speed: 3.09, rain_volume: 0 },
// //     { latitude: 19.0871, longitude: 72.8643, temperature: 30, visibility: 3000, wind_speed: 3.09, rain_volume: 0 },
// //     { latitude: 19.0871, longitude: 72.8643, temperature: 30, visibility: 3000, wind_speed: 3.09, rain_volume: 0 },
// //     { latitude: 19.0871, longitude: 72.8643, temperature: 30, visibility: 3000, wind_speed: 3.09, rain_volume: 0 },
// //     { latitude: 19.0871, longitude: 72.8643, temperature: 30, visibility: 3000, wind_speed: 3.09, rain_volume: 0 },
// //     { latitude: 19.0848, longitude: 72.859, temperature: 29.97, visibility: 3000, wind_speed: 3.09, rain_volume: 0 }
// //   ];
  
// //   const coordinates = [
// //     { lat: 19.0887, lon: 72.8679 },
// //     { lat: 19.090483122471767, lon: 72.86711203102905 },
// //     { lat: 19.092266244943538, lon: 72.8663240620581 },
// //     { lat: 19.094049367415305, lon: 72.86553609308714 },
// //     { lat: 19.095832489887073, lon: 72.86474812411619 },
// //     { lat: 19.097615612358844, lon: 72.86396015514524 },
// //     { lat: 19.09939873483061, lon: 72.86317218617428 },
// //     { lat: 19.10118185730238, lon: 72.86238421720333 },
// //     { lat: 19.10296497977415, lon: 72.86159624823237 },
// //     { lat: 19.104748102245917, lon: 72.86080827926142 },
// //     { lat: 19.106531224717685, lon: 72.86002031029047 },
// //     { lat: 19.0887, lon: 72.8679 },
// //     { lat: 19.088306015514522, lon: 72.86700843876412 },
// //     { lat: 19.087912031029045, lon: 72.86611687752824 },
// //     { lat: 19.08751804654357, lon: 72.86522531629235 },
// //     { lat: 19.08712406205809, lon: 72.86433375505646 },
// //     { lat: 19.086730077572614, lon: 72.86344219382059 },
// //     { lat: 19.086336093087137, lon: 72.8625506325847 },
// //     { lat: 19.08594210860166, lon: 72.86165907134881 },
// //     { lat: 19.085548124116183, lon: 72.86076751011294 },
// //     { lat: 19.085154139630706, lon: 72.85987594887705 },
// //     { lat: 19.08476015514523, lon: 72.85898438764116 }
// //   ];
  
//   function toRadians(degrees) {
//       return degrees * Math.PI / 180;
//   }
  
//   function calculateBearing(lat1, lon1, lat2, lon2) {
//       const dLon = toRadians(lon2 - lon1);
//       const y = Math.sin(dLon) * Math.cos(toRadians(lat2));
//       const x = Math.cos(toRadians(lat1)) * Math.sin(toRadians(lat2)) -
//                 Math.sin(toRadians(lat1)) * Math.cos(toRadians(lat2)) * Math.cos(dLon);
//       let bearing = Math.atan2(y, x);
//       bearing = (bearing * 180 / Math.PI + 360) % 360; // Convert to degrees
  
//       // Convert bearing to cardinal direction
//       const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
//       const index = Math.round(bearing / 45) % 8;
//       const cardinalDirection = directions[index];
      
//       return { bearing: bearing, cardinalDirection: cardinalDirection };
//   }
  
//   function windDegreeToDirection(degree) {
//       const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
//       const index = Math.round(degree / 45) % 8;
//       return directions[index];
//   }
  
//   function calculateWeightForPoint(weatherDetail, departure, arrival) {
//       const { bearing } = calculateBearing(departure.lat, departure.lon, arrival.lat, arrival.lon);
//       const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
//       const journeyDirection = directions[Math.round(bearing / 45) % 8];
  
//       let weight = 0;
  
//       // Temperature factor
//       const temp = weatherDetail.temperature;
//       if (temp < -10) {
//           weight += (-10 - temp) * 2;
//       } else if (temp > 30) {
//           weight += (temp - 30) * 2;
//       }
  
//       // Visibility factor
//       weight += (10000 - weatherDetail.visibility) / 10000 * 100;
  
//       // Wind direction factor
//       const windDirection = windDegreeToDirection(weatherDetail.wind_speed);
//       if (windDirection === journeyDirection) {
//           // Do nothing if wind is in the direction of the airplane
//       } else if (Math.abs(directions.indexOf(windDirection) - directions.indexOf(journeyDirection)) === 4) {
//           weight += 50; // Opposite direction
//       } else {
//           weight += 25; // Other directions
//       }
  
//       return weight;
//   }
  
//   class PriorityQueue {
//       constructor() {
//           this.elements = [];
//       }
  
//       enqueue(element, priority) {
//           this.elements.push({ element, priority });
//           this.sort();
//       }
  
//       dequeue() {
//           return this.elements.shift().element;
//       }
  
//       isEmpty() {
//           return this.elements.length === 0;
//       }
  
//       sort() {
//           this.elements.sort((a, b) => a.priority - b.priority);
//       }
//   }
  
//   function dijkstra(graph, start, end) {
//       const distances = {};
//       const previous = {};
//       const pq = new PriorityQueue();
  
//       // Initialize distances and priority queue
//       for (const vertex in graph) {
//           distances[vertex] = Infinity;
//           previous[vertex] = null;
//           pq.enqueue(vertex, Infinity);
//       }
//       distances[start] = 0;
//       pq.enqueue(start, 0);
  
//       while (!pq.isEmpty()) {
//           const current = pq.dequeue();
  
//           if (current === end) {
//               const path = [];
//               let vertex = end;
//               while (vertex !== null) {
//                   path.unshift(vertex);
//                   vertex = previous[vertex];
//               }
//               return { path, distance: distances[end] };
//           }
  
//           if (!graph[current]) continue;
  
//           for (const neighbor of Object.keys(graph[current])) {
//               const weight = graph[current][neighbor];
//               const alt = distances[current] + weight;
//               if (alt < distances[neighbor]) {
//                   distances[neighbor] = alt;
//                   previous[neighbor] = current;
//                   pq.enqueue(neighbor, alt);
//               }
//           }
//       }
  
//       return { path: [], distance: Infinity };
//   }
  
//   async function processWeatherData(weatherDetails, coordinates) {
//       const graph = {};
  
//       coordinates.forEach((point, index) => {
//           const pointKey = `(${point.lat},${point.lon})`;
//           graph[pointKey] = {};
  
//           // Calculate weight for the current point
//           const weatherDetail = weatherDetails[index];
//           const weight = calculateWeightForPoint(weatherDetail, coordinates[0], coordinates[coordinates.length - 1]);
//           point.weight = weight;
  
//           // Connect to the next point if it exists
//           if (index < coordinates.length - 1) {
//               const nextPoint = coordinates[index + 1];
//               const nextPointKey = `(${nextPoint.lat},${nextPoint.lon})`;
//               if (!graph[nextPointKey]) {
//                   graph[nextPointKey] = {};
//               }
//               graph[pointKey][nextPointKey] = weight;
//               graph[nextPointKey][pointKey] = weight;
//           }
//       });
  
//       const startKey = `(${coordinates[0].lat},${coordinates[0].lon})`;
//       const endKey = `(${coordinates[coordinates.length - 1].lat},${coordinates[coordinates.length - 1].lon})`;
  
//       const { path, distance } = dijkstra(graph, startKey, endKey);
  
//       console.log("Optimal Path:", path);
//       console.log("Total Weight:", distance);
//       console.log("Coordinates:", coordinates);
//   }
  
//   processWeatherData(weatherDetails, coordinates);
  