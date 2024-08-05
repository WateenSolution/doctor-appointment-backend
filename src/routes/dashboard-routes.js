const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");
const validate = require("../validations");

const DashboardController = require("../controllers/dashboard-controller");

router.get("/get-person-info", auth, DashboardController.getPerInfo);
router.post("/filter-Or-All-Doc", auth, DashboardController.getFilterOrAllDoc);
router.get("/get-booked-patient", auth, DashboardController.getBookedPatient);

module.exports = router;
