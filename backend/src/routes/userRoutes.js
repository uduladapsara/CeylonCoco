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

const {
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

router.get(
  "/:id",
  protect,
  roleMiddleware("Admin"),
  getUserById
);

router.put(
  "/:id",
  protect,
  roleMiddleware("Admin"),
  updateUser
);

router.delete(
  "/:id",
  protect,
  roleMiddleware("Admin"),
  deleteUser
);

module.exports = router;