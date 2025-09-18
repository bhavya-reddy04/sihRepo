const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const path = require("path");

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

let vehicles = {}; // store latest positions

// API endpoint for telemetry
app.post("/api/telemetry", (req, res) => {
  const { vehicle_id, lat, lon, speed, heading } = req.body;
  if (!vehicle_id || !lat || !lon) {
    return res.status(400).json({ error: "Invalid telemetry" });
  }

  vehicles[vehicle_id] = { lat, lon, speed, heading, ts: Date.now() };

  // broadcast update to all clients
  io.emit("vehicle_update", { vehicle_id, lat, lon, speed, heading });
  res.json({ status: "ok" });
});

io.on("connection", (socket) => {
  console.log("✅ Client connected");
  // send existing vehicles when a new client connects
  socket.emit("init", vehicles);
});

server.listen(3000, () => console.log("🚀 Server running on http://localhost:3000"));

