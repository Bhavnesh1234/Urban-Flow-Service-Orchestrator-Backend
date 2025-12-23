const Incident = require("../models/incidentModel");
const Vehicle = require("../models/vehicleModel");

exports.createIncident = async (req, res) => {
  try {
    const incident = await Incident.create(req.body);

    await Vehicle.findByIdAndUpdate(req.body.vehicleId, {
      status: "Inactive",
    });

    res.json({
      message: "Incident Created & Vehicle Set Inactive",
      incident,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getIncidents = async (req, res) => {
  try {
    const incidents = await Incident.find().populate("vehicleId");
    res.json(incidents);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getIncidentById = async (req, res) => {
  try {
    const incident = await Incident.findById(req.params.id).populate("vehicleId");
    if (!incident) {
      return res.status(404).json({ message: "Incident not found" });
    }
    res.json(incident);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.closeIncident = async (req, res) => {
  try {
    const incident = await Incident.findById(req.params.id);

    if (!incident)
      return res.status(404).json({ message: "Incident Not Found" });

    incident.status = "Closed";
    await incident.save();

    await Vehicle.findByIdAndUpdate(incident.vehicleId, { status: "Active" });

    res.json({
      message: "Incident Closed & Vehicle Activated",
      incident,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deleteIncident = async (req, res) => {
  try {
    const incident = await Incident.findByIdAndDelete(req.params.id);
    if (!incident) {
      return res.status(404).json({ message: "Incident not found" });
    }
    res.json({ message: "Incident deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
