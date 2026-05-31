const { body, param } = require(
  "express-validator"
);

const feedbackIdParam = [
  param("id").isMongoId()
];

const createFeedbackValidation = [
  body("rating").isInt({ min: 1, max: 5 }),
  body("comment").optional().isString(),
  body("status")
    .optional()
    .isIn(["Open", "Reviewed", "Resolved"])
];

const updateFeedbackValidation = [
  body("rating").optional().isInt({ min: 1, max: 5 }),
  body("comment").optional().isString(),
  body("status")
    .optional()
    .isIn(["Open", "Reviewed", "Resolved"])
];

module.exports = {
  feedbackIdParam,
  createFeedbackValidation,
  updateFeedbackValidation
};
