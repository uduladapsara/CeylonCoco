const { body, param } = require(
	"express-validator"
);

const userIdParam = [
	param("id").isMongoId()
];

const createUserValidation = [
	body("name").trim().notEmpty(),
	body("email").isEmail(),
	body("password").isLength({ min: 6 }),
	body("role")
		.optional()
		.isIn([
			"Admin",
			"FarmManager",
			"FinanceManager",
			"WarehouseStaff",
			"Driver",
			"Customer",
			"Farmer"
		]),
	body("phone").optional().isString(),
	body("status").optional().isBoolean(),
	body("profileImage").optional().isString()
];

const updateUserValidation = [
	body("name").optional().isString(),
	body("email").optional().isEmail(),
	body("role")
		.optional()
		.isIn([
			"Admin",
			"FarmManager",
			"FinanceManager",
			"WarehouseStaff",
			"Driver",
			"Customer",
			"Farmer"
		]),
	body("phone").optional().isString(),
	body("status").optional().isBoolean(),
	body("profileImage").optional().isString()
];

module.exports = {
	userIdParam,
	createUserValidation,
	updateUserValidation
};
