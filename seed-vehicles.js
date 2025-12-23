const mongoose = require('mongoose');
require('dotenv').config();

const vehicleSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, enum: ["Bus", "Scooter", "Train"], required: true },
  status: { type: String, enum: ["Active", "Inactive"], default: "Active" }
});

const Vehicle = mongoose.model("Vehicle", vehicleSchema);

async function createVehicles() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected');

    // Delete existing vehicles
    await Vehicle.deleteMany({});
    console.log('Cleared existing vehicles');

    const vehicles = [
      { name: 'Bus 101', type: 'Bus', status: 'Active' },
      { name: 'Scooter 1', type: 'Scooter', status: 'Active' },
      { name: 'Train 1', type: 'Train', status: 'Active' }
    ];

    const created = await Vehicle.insertMany(vehicles);
    console.log('✓ Created vehicles:');
    created.forEach(v => console.log(`  - ${v.name} (${v.type})`));

    process.exit(0);
  } catch (error) {
    console.error('✗ Error:', error.message);
    process.exit(1);
  }
}

createVehicles();
