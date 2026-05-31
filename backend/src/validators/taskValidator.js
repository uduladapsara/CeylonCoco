const { body, param } = require(
  "express-validator"
);

const taskIdParam = [
  param("id").isMongoId()
];

const createTaskValidation = [
  body("title").trim().notEmpty(),
  body("priority")
    .optional()
    .isIn(["Low", "Medium", "High"]),
  body("status")
    .optional()
    .isIn([
      "Pending",
      "InProgress",
      "Completed",
      "OnHold"
    ])
];

const updateTaskValidation = [
  body("title").optional().isString(),
  body("priority")
    .optional()
    .isIn(["Low", "Medium", "High"]),
  body("status")
    .optional()
    .isIn([
      "Pending",
      "InProgress",
      "Completed",
      "OnHold"
    ])
];

module.exports = {
  taskIdParam,
  createTaskValidation,
  updateTaskValidation
};
