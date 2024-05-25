// import Math from 'math'

const airportData = {
  Agartala: ["IXA", 23.886999, 91.24045],
  Agra: ["AGR", 27.155833, 77.960833],
  Ahmedabad: ["AMD", 23.0772, 72.6347],
  Aizawl: ["AJL", 23.8406, 92.6217],
  Akola: ["AKD", 20.6983, 77.0586],
  Allahabad: ["IXD", 25.4401, 81.7339],
  Amritsar: ["ATQ", 31.7096, 74.7973],
  Aurangabad: ["IXU", 19.8633, 75.3981],
  Bagdogra: ["IXB", 26.6812, 88.3286],
  Balurghat: ["RGH", 25.2605, 88.7956],
  Bangalore: ["BLR", 13.1986, 77.7066],
  Bareilly: ["BEK", 28.4221, 79.4513],
  Belgaum: ["IXG", 15.8593, 74.6183],
  Bhavnagar: ["BHU", 21.7522, 72.1852],
  Bhopal: ["BHO", 23.2875, 77.3375],
  Bhubaneswar: ["BBI", 20.2444, 85.8178],
  Bhuj: ["BHJ", 23.2875, 69.6702],
  Bikaner: ["BKB", 28.0704, 73.2075],
  Bilaspur: ["PAB", 21.9884, 82.1116],
  Calicut: ["CCJ", 11.1368, 75.9553],
  Chandigarh: ["IXC", 30.6735, 76.7885],
  Chennai: ["MAA", 12.9901, 80.1693],
  Coimbatore: ["CJB", 11.0303, 77.0434],
  "Cooch Behar": ["COH", 26.3305, 89.4671],
  Cuddapah: ["CDP", 14.5114, 78.7728],
  Daman: ["NMB", 20.4381, 72.8479],
  Dehradun: ["DED", 30.1897, 78.1803],
  Delhi: ["DEL", 28.5562, 77.1],
  Dharamshala: ["DHM", 32.1651, 76.2634],
  Dibrugarh: ["DIB", 27.4839, 95.0184],
  Dimapur: ["DMU", 25.8839, 93.7711],
  Diu: ["DIU", 20.7151, 70.9207],
  Durgapur: ["RDP", 23.6225, 87.2438],
  Gaya: ["GAY", 24.7443, 84.9512],
  Goa: ["GOI", 15.3808, 73.8314],
  Gorakhpur: ["GOP", 26.7397, 83.4497],
  Gwalior: ["GWL", 26.2933, 78.2278],
  Hubli: ["HBX", 15.3617, 75.0849],
  Hyderabad: ["HYD", 17.2403, 78.4298],
  Imphal: ["IMF", 24.76, 93.8967],
  Indore: ["IDR", 22.7217, 75.8011],
  Jabalpur: ["JLR", 23.1778, 80.052],
  Jaipur: ["JAI", 26.8242, 75.8122],
  Jaisalmer: ["JSA", 26.8887, 70.8641],
  Jammu: ["IXJ", 32.6784, 74.8374],
  Jamnagar: ["JGA", 22.4655, 70.0119],
  Jamshedpur: ["IXW", 22.8132, 86.1695],
  Jodhpur: ["JDH", 26.2511, 73.0485],
  Jorhat: ["JRH", 26.7315, 94.1756],
  Kailashahar: ["IXH", 24.308, 92.0072],
  Kamalpur: ["IXQ", 24.13, 91.8101],
  Kandla: ["IXY", 23.1127, 70.0994],
  Kanpur: ["KNU", 26.4043, 80.4101],
  Keshod: ["IXK", 21.3171, 70.2704],
  Khajuraho: ["HJR", 24.8172, 79.9186],
  Kochi: ["COK", 10.152, 76.4019],
  Kolhapur: ["KLH", 16.6647, 74.2884],
  Kolkata: ["CCU", 22.6547, 88.4467],
  Kota: ["KTU", 25.1602, 75.8456],
  Kozhikode: ["CCJ", 11.1368, 75.9553],
  Kulu: ["KUU", 31.8758, 77.1544],
  Leh: ["IXL", 34.1358, 77.5465],
  Lilabari: ["IXI", 27.2955, 94.0975],
  Lucknow: ["LKO", 26.7606, 80.8893],
  Ludhiana: ["LUH", 30.8547, 75.9526],
  Madurai: ["IXM", 9.8345, 78.0933],
  Malda: ["LDA", 25.0513, 88.1207],
  Mangalore: ["IXE", 12.9613, 74.8901],
  Mumbai: ["BOM", 19.0887, 72.8679],
  Muzaffarpur: ["MZU", 26.1191, 85.3137],
  Mysore: ["MYQ", 12.3072, 76.6536],
  Nagpur: ["NAG", 21.0922, 79.0472],
  Nanded: ["NDC", 19.1841, 77.3168],
  Nasik: ["ISK", 19.9637, 73.8076],
  Neyveli: ["NVY", 11.6105, 79.4857],
  Pakyong: ["PYG", 27.2509, 88.5937],
  Pantnagar: ["PGH", 29.0334, 79.4737],
  Pasighat: ["IXT", 28.0661, 95.3356],
  Patna: ["PAT", 25.5913, 85.087],
  Pathankot: ["IXP", 32.2336, 75.634],
  Pondicherry: ["PNY", 11.9687, 79.812],
  Porbandar: ["PBD", 21.6425, 69.6562],
  "Port Blair": ["IXZ", 11.641, 92.7297],
  Pune: ["PNQ", 18.5821, 73.9197],
  Raipur: ["RPR", 21.1806, 81.7394],
  Rajahmundry: ["RJA", 17.1104, 81.818],
  Rajkot: ["RAJ", 22.3091, 70.7794],
  Ranchi: ["IXR", 23.3167, 85.3194],
  Salem: ["SXV", 11.7833, 78.0655],
  Satna: ["TNI", 24.5665, 80.8541],
  Shillong: ["SHL", 25.7036, 91.9787],
  Shimla: ["SLV", 31.0818, 77.068],
  Silchar: ["IXS", 24.9129, 92.9787],
  Srinagar: ["SXR", 34.0022, 74.7624],
};

function haversineDistance(lat1, lon1, lat2, lon2) {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;
  return distance;
}

async function get_coordinates(departureCity, arrivalCity) {
  const depLat = airportData[departureCity][1];
  const depLon = airportData[departureCity][2];
  const arrLat = airportData[arrivalCity][1];
  const arrLon = airportData[arrivalCity][2];

  const distance = haversineDistance(depLat, depLon, arrLat, arrLon);
  const width = distance / 2;

  const deltaLon = arrLon - depLon;
  let initialBearing = Math.atan2(
    Math.sin(deltaLon) * Math.cos(arrLat),
    Math.cos(depLat) * Math.sin(arrLat) -
      Math.sin(depLat) * Math.cos(arrLat) * Math.cos(deltaLon)
  );
  initialBearing = (initialBearing + 2 * Math.PI) % (2 * Math.PI);
  const initialBearingDegrees = (initialBearing * 180) / Math.PI;

  const points = [];
  for (let i = 0; i <= 10; i++) {
    const distanceAlongLine = distance * (i / 10);
    const lat = depLat + (distanceAlongLine / 6371) * Math.sin(initialBearing);
    const lon = depLon + (distanceAlongLine / 6371) * Math.cos(initialBearing);
    points.push({ lat, lon });
  }

  const perpendicularBearing = initialBearing + Math.PI / 2; // Add 90 degrees in radians
  for (let i = 0; i <= 10; i++) {
    const distanceAlongLine = width * (i / 10);
    const lat =
      points[0].lat +
      (distanceAlongLine / 6371) * Math.sin(perpendicularBearing);
    const lon =
      points[0].lon +
      (distanceAlongLine / 6371) * Math.cos(perpendicularBearing);
    points.push({ lat, lon });
  }
  // console.log("POINTS",points)
  points.push({ lat: depLat, lon: depLon });
  points.push({ lat: arrLat, lon: arrLon });
  // console.log("AFTER", points)
  return {
    departure: { lat: depLat, lon: depLon },
    arrival: { lat: arrLat, lon: arrLon },
    points: points,
  };
}

export default get_coordinates;
