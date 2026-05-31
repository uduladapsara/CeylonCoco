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
	locationQueryValidation,
	weatherCacheValidation
} = require(
	"../validators/weatherValidator"
);

const {
	createWeatherCache,
	getCurrentWeather,
	getForecast,
	getWeeklyReport,
	getRiskReport
} = require(
	"../controllers/weatherController"
);

router.post(
	"/cache",
	protect,
	roleMiddleware("Admin", "FarmManager"),
	validate(weatherCacheValidation),
	createWeatherCache
);

router.get(
	"/current",
	protect,
	validate(locationQueryValidation),
	getCurrentWeather
);

router.get(
	"/forecast",
	protect,
	validate(locationQueryValidation),
	getForecast
);

router.get(
	"/reports/weekly",
	protect,
	roleMiddleware("Admin", "FarmManager"),
	validate(locationQueryValidation),
	getWeeklyReport
);

router.get(
	"/reports/risk",
	protect,
	roleMiddleware("Admin", "FarmManager"),
	validate(locationQueryValidation),
	getRiskReport
);

module.exports = router;
