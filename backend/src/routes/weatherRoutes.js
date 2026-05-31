const express = require("express");

const router = express.Router();

const protect = require(
	"../middleware/authMiddleware"
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
	createWeatherCache
);

router.get(
	"/current",
	protect,
	getCurrentWeather
);

router.get(
	"/forecast",
	protect,
	getForecast
);

router.get(
	"/reports/weekly",
	protect,
	getWeeklyReport
);

router.get(
	"/reports/risk",
	protect,
	getRiskReport
);

module.exports = router;
