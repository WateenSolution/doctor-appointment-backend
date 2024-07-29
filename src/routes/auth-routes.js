const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");
const validate = require("../validations");

const AuthController = require("../controllers/auth-controller");

router.put(
  "/update-user",
  validate("auth", "update-user"),
  AuthController.updateUser
);

router.get("/users", AuthController.getUsers);
router.get("/user/:id", AuthController.getUserById);

router.post("/login", validate("auth", "login"), AuthController.login);
router.post("/logout", AuthController.logout);
router.post(
  "/forget-password",
  validate("auth", "forget-password"),
  AuthController.forgetPassword
);

router.put(
  "/change-password",
  auth,
  validate("auth", "change-password"),
  AuthController.changePassword
);
router.post("/reset-password", AuthController.resetPassword);

module.exports = router;
