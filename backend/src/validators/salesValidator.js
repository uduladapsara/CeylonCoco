const { body, param, query } = require(
  "express-validator"
);

const productIdParam = [
  param("id").isMongoId()
];

const orderIdParam = [
  param("id").isMongoId()
];

const createProductValidation = [
  body("name").trim().notEmpty(),
  body("price").isNumeric(),
  body("stock").optional().isNumeric(),
  body("status")
    .optional()
    .isIn(["Active", "Inactive"])
];

const updateProductValidation = [
  body("name").optional().isString(),
  body("price").optional().isNumeric(),
  body("stock").optional().isNumeric(),
  body("status")
    .optional()
    .isIn(["Active", "Inactive"])
];

const createOrderValidation = [
  body("customer").isMongoId(),
  body("items").isArray({ min: 1 }),
  body("items.*.product").isMongoId(),
  body("items.*.quantity").isInt({ min: 1 }),
  body("items.*.price").optional().isNumeric()
];

const updateOrderValidation = [
  body("status")
    .optional()
    .isIn([
      "Pending",
      "Processing",
      "Shipped",
      "Delivered",
      "Completed",
      "Cancelled"
    ])
];

const cartValidation = [
  body("customerId").isMongoId(),
  body("items").isArray()
];

const checkoutValidation = [
  body("customerId").isMongoId(),
  body("shippingAddress").optional().isString()
];

const productsQueryValidation = [
  query("category").optional().isString(),
  query("search").optional().isString()
];

module.exports = {
  productIdParam,
  orderIdParam,
  createProductValidation,
  updateProductValidation,
  createOrderValidation,
  updateOrderValidation,
  cartValidation,
  checkoutValidation,
  productsQueryValidation
};
