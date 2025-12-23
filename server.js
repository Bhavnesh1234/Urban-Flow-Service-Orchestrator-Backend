const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const errorHandler = require("./middleware/errorMiddleware");

const vehicleRoutes = require("./routes/vehicleRoutes");
const incidentRoutes = require("./routes/incidentRoutes");
const Vehicle = require("./models/vehicleModel");

const app = express();
app.use(cors());
app.use(express.json());

connectDB();

// Seed endpoint - creates test vehicles
app.post("/seed-vehicles", async (req, res) => {
  try {
    await Vehicle.deleteMany({});
    const vehicles = [
      { name: 'Bus 101', type: 'Bus', status: 'Active' },
      { name: 'Scooter 1', type: 'Scooter', status: 'Active' },
      { name: 'Train 1', type: 'Train', status: 'Active' }
    ];
    const created = await Vehicle.insertMany(vehicles);
    res.json({ message: "Vehicles created", count: created.length, vehicles: created });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.use("/vehicles", vehicleRoutes);
app.use("/incidents", incidentRoutes);

app.use(errorHandler);

app.listen(5000, () => console.log("Server running on port 5000"));
