const { body, param } = require(
  "express-validator"
);

const vehicleIdParam = [
  param("id").isMongoId()
];

const tripIdParam = [
  param("id").isMongoId()
];

const deliveryIdParam = [
  param("id").isMongoId()
];

const vehicleValidation = [
  body("plateNumber").trim().notEmpty()
];

const tripValidation = [
  body("vehicle").isMongoId(),
  body("status")
    .optional()
    .isIn([
      "Planned",
      "InProgress",
      "Completed",
      "Cancelled"
    ])
];

const deliveryValidation = [
  body("status")
    .optional()
    .isIn([
      "Pending",
      "InTransit",
      "Delivered",
      "Failed"
    ])
];

module.exports = {
  vehicleIdParam,
  tripIdParam,
  deliveryIdParam,
  vehicleValidation,
  tripValidation,
  deliveryValidation
};
