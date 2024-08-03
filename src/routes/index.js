const express = require("express");
const router = express.Router();

const AuthRouter = require("./auth-routes");
const DashboardRouter = require("./dashboard-routes");
const AppointmentRouter = require("./appointment-routes");

router.use("/auth", AuthRouter);
router.use("/dashboard", DashboardRouter);
router.use("/appointment", AppointmentRouter);

module.exports = router;
