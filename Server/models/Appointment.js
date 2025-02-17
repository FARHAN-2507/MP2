const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema({
  customerName: {
    type: String,
    required: true,
  },
  contactNumber: {
    type: String,
    required: true,
  },
  service: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Service",
      required: true,
    }
  ], // Changed from single ObjectId to an array of ObjectIds
  appointmentDate: {
    type: Date,
    required: true,
  },
  appointmentTime: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["pending", "completed", "cancelled"],
    default: "pending",
  },
});

module.exports = mongoose.model("Appointment", appointmentSchema);
