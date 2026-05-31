const { param } = require(
  "express-validator"
);

const idParam = [
  param("id").isMongoId()
];

module.exports = {
  idParam
};
