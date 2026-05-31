const express = require("express");

const router =
  express.Router();

const {
  registerUser,
  loginUser,
  getProfile
} = require(
  "../controllers/authController"
);

const protect = require(
  "../middleware/authMiddleware"
);

const { validate } = require(
  "../middleware/validationMiddleware"
);

const {
  registerValidation,
  loginValidation
} = require(
  "../validators/authValidator"
);

router.post(
  "/register",
  validate(registerValidation),
  registerUser
);

router.post(
  "/login",
  validate(loginValidation),
  loginUser
);

router.get(
  "/profile",
  protect,
  getProfile
);

module.exports = router;