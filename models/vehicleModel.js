const mongoose = require("mongoose");

const vehicleSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, enum: ["Bus", "Scooter", "Train"], required: true },
  status: { type: String, enum: ["Active", "Inactive"], default: "Active" }
});

module.exports = mongoose.model("Vehicle", vehicleSchema);
