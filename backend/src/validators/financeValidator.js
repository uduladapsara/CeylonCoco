const { body, param } = require(
  "express-validator"
);

const incomeIdParam = [
  param("id").isMongoId()
];

const expenseIdParam = [
  param("id").isMongoId()
];

const createIncomeValidation = [
  body("source").trim().notEmpty(),
  body("amount").isNumeric(),
  body("date").optional().isISO8601()
];

const updateIncomeValidation = [
  body("source").optional().isString(),
  body("amount").optional().isNumeric(),
  body("date").optional().isISO8601()
];

const createExpenseValidation = [
  body("amount").isNumeric(),
  body("category")
    .optional()
    .isIn([
      "Fertilizers",
      "LabourCosts",
      "FuelCosts",
      "EquipmentCosts",
      "Other"
    ]),
  body("date").optional().isISO8601()
];

const updateExpenseValidation = [
  body("amount").optional().isNumeric(),
  body("category")
    .optional()
    .isIn([
      "Fertilizers",
      "LabourCosts",
      "FuelCosts",
      "EquipmentCosts",
      "Other"
    ]),
  body("date").optional().isISO8601()
];

module.exports = {
  incomeIdParam,
  expenseIdParam,
  createIncomeValidation,
  updateIncomeValidation,
  createExpenseValidation,
  updateExpenseValidation
};
