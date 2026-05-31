const express = require("express");

const router = express.Router();

const protect = require(
	"../middleware/authMiddleware"
);

const roleMiddleware = require(
	"../middleware/roleMiddleware"
);

const { validate } = require(
	"../middleware/validationMiddleware"
);

const {
	vehicleIdParam,
	tripIdParam,
	deliveryIdParam,
	vehicleValidation,
	tripValidation,
	deliveryValidation
} = require(
	"../validators/transportValidator"
);

const {
	createVehicle,
	getVehicles,
	updateVehicle,
	deleteVehicle,
	createTrip,
	getTrips,
	updateTrip,
	deleteTrip,
	createDelivery,
	getDeliveries,
	updateDelivery,
	deleteDelivery,
	getVehicleUsageReport,
	getFuelReport,
	getDeliveryReport
} = require(
	"../controllers/transportController"
);

router.get(
	"/vehicles",
	protect,
	roleMiddleware("Admin", "FarmManager", "Driver"),
	getVehicles
);

router.post(
	"/vehicles",
	protect,
	roleMiddleware("Admin", "FarmManager"),
	validate(vehicleValidation),
	createVehicle
);

router.put(
	"/vehicles/:id",
	protect,
	roleMiddleware("Admin", "FarmManager"),
	validate(vehicleIdParam),
	updateVehicle
);

router.delete(
	"/vehicles/:id",
	protect,
	roleMiddleware("Admin", "FarmManager"),
	validate(vehicleIdParam),
	deleteVehicle
);

router.get(
	"/trips",
	protect,
	roleMiddleware("Admin", "FarmManager", "Driver"),
	getTrips
);

router.post(
	"/trips",
	protect,
	roleMiddleware("Admin", "FarmManager"),
	validate(tripValidation),
	createTrip
);

router.put(
	"/trips/:id",
	protect,
	roleMiddleware("Admin", "FarmManager"),
	validate(tripIdParam),
	updateTrip
);

router.delete(
	"/trips/:id",
	protect,
	roleMiddleware("Admin", "FarmManager"),
	validate(tripIdParam),
	deleteTrip
);

router.get(
	"/deliveries",
	protect,
	roleMiddleware("Admin", "FarmManager", "Driver"),
	getDeliveries
);

router.post(
	"/deliveries",
	protect,
	roleMiddleware("Admin", "FarmManager"),
	validate(deliveryValidation),
	createDelivery
);

router.put(
	"/deliveries/:id",
	protect,
	roleMiddleware("Admin", "FarmManager"),
	validate(deliveryIdParam),
	updateDelivery
);

router.delete(
	"/deliveries/:id",
	protect,
	roleMiddleware("Admin", "FarmManager"),
	validate(deliveryIdParam),
	deleteDelivery
);

router.get(
	"/reports/vehicle-usage",
	protect,
	roleMiddleware("Admin", "FarmManager", "FinanceManager"),
	getVehicleUsageReport
);

router.get(
	"/reports/fuel",
	protect,
	roleMiddleware("Admin", "FarmManager", "FinanceManager"),
	getFuelReport
);

router.get(
	"/reports/delivery",
	protect,
	roleMiddleware("Admin", "FarmManager", "FinanceManager"),
	getDeliveryReport
);

module.exports = router;
