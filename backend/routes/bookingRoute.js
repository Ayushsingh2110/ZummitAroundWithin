const express = require("express");
const router = express.Router();
const {
  getIndividualBooking,
  getTherapistDetails,
  getPatientDetails,
  HandleAppointments,
} = require("../controllers/Booking/BookingSlotsController");

router.get("/getAvailableSlotsByTherapist/:id", getIndividualBooking);
router.get("/getTherapistDetails/:id", getTherapistDetails);
router.get("/getPatientDetails/:id", getPatientDetails);
router.post("/appointmentDetails", HandleAppointments);

module.exports = router;
