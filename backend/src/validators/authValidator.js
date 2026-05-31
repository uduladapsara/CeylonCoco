const { body } = require("express-validator");

const registerValidation = [
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
		])
];

const loginValidation = [
	body("email").isEmail(),
	body("password").notEmpty()
];

module.exports = {
	registerValidation,
	loginValidation
};
