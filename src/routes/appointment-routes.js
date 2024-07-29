const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");
const validate = require("../validations");

const AppointmentController = require("../controllers/appointment-controller");

router.post("/generate-report", AppointmentController.getDocsFromDepts);

module.exports = router;
