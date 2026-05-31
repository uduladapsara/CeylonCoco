const { body } = require(
  "express-validator"
);

const askValidation = [
  body("question").trim().notEmpty()
];

module.exports = {
  askValidation
};
