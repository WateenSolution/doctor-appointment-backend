const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");
const validate = require("../validations");

const AppointmentController = require("../controllers/appointment-controller");

router.get("/get-user/:id", AppointmentController.getUserById);
router.get("/get-user", AppointmentController.getUserById);
router.post("/status-available-time", AppointmentController.appAvailableTime);
router.post("/get-appoint-time", AppointmentController.getAppointTime);
router.post(
  "/add-patient-form",
  auth,
  validate("appointment", "add-patient-form"),
  AppointmentController.addPatientForm
);
router.get("/get-pat-app-list", auth, AppointmentController.getPatAppList);

module.exports = router;
