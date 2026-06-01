const { body } = require("express-validator");

const registerValidation = [
	body("firstName").trim().notEmpty(),
	body("lastName").trim().notEmpty(),
	body("email").isEmail(),
	body("password").isLength({ min: 6 }),
	body("confirmPassword")
		.custom((value, { req }) => value === req.body.password)
		.withMessage("Passwords do not match"),
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
	body("location").optional().isObject(),
	body("location.province").optional().isString(),
	body("location.district").optional().isString(),
	body("location.mapLocation").optional().isObject(),
	body("location.mapLocation.address").optional().isString(),
	body("location.mapLocation.lat").optional().isNumeric(),
	body("location.mapLocation.lng").optional().isNumeric()
];

const loginValidation = [
	body("email").isEmail(),
	body("password").notEmpty()
];

module.exports = {
	registerValidation,
	loginValidation
};
