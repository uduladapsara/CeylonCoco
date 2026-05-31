const { body, param, query } = require(
  "express-validator"
);

const workerIdParam = [
  param("id").isMongoId()
];

const createWorkerValidation = [
  body("name").trim().notEmpty(),
  body("phone").optional().isString(),
  body("email").optional().isEmail(),
  body("skills").optional().isArray(),
  body("availability")
    .optional()
    .isIn(["Available", "Unavailable"])
];

const attendanceValidation = [
  body("worker").isMongoId(),
  body("date").isISO8601(),
  body("status")
    .optional()
    .isIn(["Present", "Absent", "Leave"])
];

const salaryValidation = [
  body("worker").isMongoId(),
  body("periodStart").isISO8601(),
  body("periodEnd").isISO8601(),
  body("amount").isNumeric(),
  body("wageType")
    .optional()
    .isIn(["Daily", "Monthly"])
];

const workerQueryValidation = [
  query("workerId").optional().isMongoId()
];

module.exports = {
  workerIdParam,
  createWorkerValidation,
  attendanceValidation,
  salaryValidation,
  workerQueryValidation
};
