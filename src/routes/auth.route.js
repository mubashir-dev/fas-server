const express = require("express");
const router = express.Router();
const AuthController = require("../controllers/auth.controller");
const { authValidator } = require("../validations/auth.validation");
const { validate } = require("../middlewares/validation.middleware");
const { auth } = require("../middlewares/auth.middleware");

router.post("/login", validate(authValidator.login), AuthController.login);
router.post(
  "/refresh-token",
  validate(authValidator.refreshToken),
  AuthController.refreshToken
);
router.get("/me", auth, AuthController.currentUser);

module.exports = router;
