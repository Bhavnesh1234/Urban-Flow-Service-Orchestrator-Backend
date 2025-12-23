const express = require("express");
const { createIncident, getIncidents, getIncidentById, closeIncident, deleteIncident } = require("../controllers/incidentController");
const router = express.Router();

router.post("/", createIncident);
router.get("/", getIncidents);
router.get("/:id", getIncidentById);
router.put("/:id/close", closeIncident);
router.delete("/:id", deleteIncident);

module.exports = router;
