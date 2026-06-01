const { body, param } = require(
	"express-validator"
);

const userIdParam = [
	param("id").isMongoId()
];

const createUserValidation = [
	body("firstName").trim().notEmpty(),
	body("lastName").trim().notEmpty(),
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
	body("location").optional().isObject(),
	body("location.province").optional().isString(),
	body("location.district").optional().isString(),
	body("location.mapLocation").optional().isObject(),
	body("location.mapLocation.address").optional().isString(),
	body("location.mapLocation.lat").optional().isNumeric(),
	body("location.mapLocation.lng").optional().isNumeric(),
	body("phone").optional().isString(),
	body("status").optional().isBoolean(),
	body("profileImage").optional().isString()
];

const updateUserValidation = [
	body("firstName").optional().isString(),
	body("lastName").optional().isString(),
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
	body("location").optional().isObject(),
	body("location.province").optional().isString(),
	body("location.district").optional().isString(),
	body("location.mapLocation").optional().isObject(),
	body("location.mapLocation.address").optional().isString(),
	body("location.mapLocation.lat").optional().isNumeric(),
	body("location.mapLocation.lng").optional().isNumeric(),
	body("phone").optional().isString(),
	body("status").optional().isBoolean(),
	body("profileImage").optional().isString()
];

module.exports = {
	userIdParam,
	createUserValidation,
	updateUserValidation
};
