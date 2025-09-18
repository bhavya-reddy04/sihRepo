const axios = require("axios");

let lat = 19.0760, lon = 72.8777; // Start in Mumbai

setInterval(() => {
  // Random walk
  lat += (Math.random() - 0.5) * 0.002;
  lon += (Math.random() - 0.5) * 0.002;

  const data = {
    vehicle_id: "bus_101",
    lat,
    lon,
    speed: Math.floor(Math.random() * 40) + 20,
    heading: Math.floor(Math.random() * 360)
  };

  console.log("Posting:", data);

  axios.post("http://localhost:3000/api/telemetry", data)
    .catch(err => console.error("Error posting telemetry:", err.message));
}, 2000);

