const { body, param, query } = require(
	"express-validator"
);

const plantationIdParam = [
	param("id").isMongoId()
];

const createPlantationValidation = [
	body("name").trim().notEmpty(),
	body("totalArea").optional().isNumeric(),
	body("treeCount").optional().isInt({ min: 0 }),
	body("avgTreeAge").optional().isNumeric()
];

const issueValidation = [
	body("plantation").isMongoId(),
	body("type")
		.isIn(["Pest", "Disease", "Water", "Other"]),
	body("title").trim().notEmpty()
];

const fertilizerValidation = [
	body("plantation").isMongoId(),
	body("fertilizerName").trim().notEmpty(),
	body("quantity").optional().isNumeric()
];

const plantationQueryValidation = [
	query("plantationId").optional().isMongoId()
];

module.exports = {
	plantationIdParam,
	createPlantationValidation,
	issueValidation,
	fertilizerValidation,
	plantationQueryValidation
};
