const express = require("express");
const Appointment = require("../models/Appointment");
const router = express.Router();
const moment = require("moment");

// 📌 Add Appointment (Updated for Multiple Services)
router.post("/add", async (req, res) => {
  try {
    const { customerName, contactNumber, service, appointmentDate, appointmentTime } = req.body;

    if (!customerName || !contactNumber || !service || !appointmentDate || !appointmentTime) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const appointment = new Appointment({
      customerName,
      contactNumber,
      service, // Should be an array of service IDs
      appointmentDate,
      appointmentTime,
      status: "pending",
    });

    await appointment.save();
    res.status(201).json({ message: "Appointment booked successfully." });
  } catch (error) {
    console.error("Error booking appointment:", error);
    res.status(500).json({ message: "Server error" });
  }
});
// 📌 Fetch Today's Appointments (Updated for Multiple Services)
router.get("/today", async (req, res) => {
  try {
    const todayStart = moment().startOf("day").toDate(); // Start of today
    const todayEnd = moment().endOf("day").toDate(); // End of today

    const appointments = await Appointment.find({
      appointmentDate: { $gte: todayStart, $lte: todayEnd } // Match appointments within today
    })
    .populate("service", "name price")
    .select("customerName contactNumber appointmentTime service appointmentDate status");

    res.json(appointments);
  } catch (error) {
    console.error("Error fetching today's appointments:", error);
    res.status(500).json({ message: "Error fetching appointments" });
  }
});
router.put("/mark-done/:id", async (req, res) => {
  try {
    const { id } = req.params;
    
    const appointment = await Appointment.findByIdAndUpdate(
      id,
      { status: "completed" }, // ✅ Ensure this matches what frontend sends
      { new: true }
    );

    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    res.json({ message: "Appointment marked as done", appointment });
  } catch (error) {
    console.error("Error marking appointment as done:", error);
    res.status(500).json({ message: "Error updating appointment status" });
  }
});



// 📌 Fetch Appointments by Date (Updated for Multiple Services)
router.get("/by-date/:date", async (req, res) => {
  try {
    const { date } = req.params;

    if (!date) {
      return res.status(400).json({ message: "Date is required." });
    }

    const formattedDate = moment(date, "YYYY-MM-DD").format("YYYY-MM-DD");

    const appointments = await Appointment.find({ appointmentDate: formattedDate })
      .populate("service", "name price") // Populate multiple services
      .select("customerName contactNumber appointmentTime service appointmentDate status");

    res.json(appointments);
  } catch (error) {
    console.error("Error fetching appointments by date:", error);
    res.status(500).json({ message: "Error fetching appointments" });
  }
});


module.exports = router;