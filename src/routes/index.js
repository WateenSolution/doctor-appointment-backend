const express = require("express");
const router = express.Router();

const AuthRouter = require("./auth-routes");
const DashboardRouter = require("./dashboard-routes");

router.use("/auth", AuthRouter);
router.use("/dashboard", DashboardRouter);
router.use("/appointment", DashboardRouter);

module.exports = router;
