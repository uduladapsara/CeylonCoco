const { body, query } = require(
  "express-validator"
);

const locationQueryValidation = [
  query("location").trim().notEmpty()
];

const weatherCacheValidation = [
  body("location").trim().notEmpty()
];

module.exports = {
  locationQueryValidation,
  weatherCacheValidation
};
