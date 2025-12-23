const mongoose = require("mongoose");

const incidentSchema = new mongoose.Schema({
  type: { type: String, enum: ["Traffic", "Breakdown", "Weather"], required: true },
  description: String,
  status: { type: String, enum: ["Open", "Closed"], default: "Open" },
  vehicleId: { type: mongoose.Schema.Types.ObjectId, ref: "Vehicle", required: true }
}, { timestamps: true });

module.exports = mongoose.model("Incident", incidentSchema);
