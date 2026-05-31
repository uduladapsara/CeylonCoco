const express = require("express");

const router = express.Router();

const protect = require(
	"../middleware/authMiddleware"
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
	getVehicles
);

router.post(
	"/vehicles",
	protect,
	createVehicle
);

router.put(
	"/vehicles/:id",
	protect,
	updateVehicle
);

router.delete(
	"/vehicles/:id",
	protect,
	deleteVehicle
);

router.get(
	"/trips",
	protect,
	getTrips
);

router.post(
	"/trips",
	protect,
	createTrip
);

router.put(
	"/trips/:id",
	protect,
	updateTrip
);

router.delete(
	"/trips/:id",
	protect,
	deleteTrip
);

router.get(
	"/deliveries",
	protect,
	getDeliveries
);

router.post(
	"/deliveries",
	protect,
	createDelivery
);

router.put(
	"/deliveries/:id",
	protect,
	updateDelivery
);

router.delete(
	"/deliveries/:id",
	protect,
	deleteDelivery
);

router.get(
	"/reports/vehicle-usage",
	protect,
	getVehicleUsageReport
);

router.get(
	"/reports/fuel",
	protect,
	getFuelReport
);

router.get(
	"/reports/delivery",
	protect,
	getDeliveryReport
);

module.exports = router;
