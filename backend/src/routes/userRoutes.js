const express = require("express");

const router =
  express.Router();

const protect = require(
  "../middleware/authMiddleware"
);

const roleMiddleware =
  require(
    "../middleware/roleMiddleware"
  );

const { validate } = require(
  "../middleware/validationMiddleware"
);

const {
  userIdParam,
  createUserValidation,
  updateUserValidation
} = require(
  "../validators/userValidator"
);

const {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser
} = require(
  "../controllers/userController"
);

router.get(
  "/",
  protect,
  roleMiddleware("Admin"),
  getUsers
);

router.post(
  "/",
  protect,
  roleMiddleware("Admin"),
  validate(createUserValidation),
  createUser
);

router.get(
  "/:id",
  protect,
  roleMiddleware("Admin"),
  validate(userIdParam),
  getUserById
);

router.put(
  "/:id",
  protect,
  roleMiddleware("Admin"),
  validate([...userIdParam, ...updateUserValidation]),
  updateUser
);

router.delete(
  "/:id",
  protect,
  roleMiddleware("Admin"),
  validate(userIdParam),
  deleteUser
);

module.exports = router;