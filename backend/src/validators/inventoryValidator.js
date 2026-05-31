const { body, param } = require(
	"express-validator"
);

const inventoryIdParam = [
	param("id").isMongoId()
];

const createItemValidation = [
	body("name").trim().notEmpty(),
	body("category")
		.optional()
		.isIn([
			"CoconutOil",
			"CoconutWater",
			"CoconutSugar",
			"Fertilizer",
			"Equipment",
			"Other"
		]),
	body("quantity").optional().isNumeric(),
	body("minThreshold").optional().isNumeric(),
	body("expiryDate").optional().isISO8601(),
	body("qrCode").optional().isString()
];

const adjustQuantityValidation = [
	body("quantity").isNumeric(),
	body("reason").optional().isString()
];

const scanValidation = [
	body("qrCode").trim().notEmpty(),
	body("delta").optional().isNumeric(),
	body("reason").optional().isString()
];

const stockMovementValidation = [
	body("inventoryId").isMongoId(),
	body("type").isIn(["IN", "OUT", "ADJUST"]),
	body("quantity").isNumeric(),
	body("reason").optional().isString()
];

module.exports = {
	inventoryIdParam,
	createItemValidation,
	adjustQuantityValidation,
	scanValidation,
	stockMovementValidation
};
