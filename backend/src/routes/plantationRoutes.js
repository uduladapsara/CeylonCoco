const express = require("express");

const router = express.Router();

const protect = require(
	"../middleware/authMiddleware"
);

const {
	createPlantation,
	getPlantations,
	getPlantationById,
	updatePlantation,
	deletePlantation,
	createIssue,
	getIssues,
	updateIssue,
	deleteIssue,
	createFertilizer,
	getFertilizers,
	updateFertilizer,
	deleteFertilizer,
	getPlantationPerformanceReport,
	getFertilizerUsageReport,
	getDiseaseReport,
	getProductivityReport
} = require(
	"../controllers/plantationController"
);

router.get(
	"/",
	protect,
	getPlantations
);

router.post(
	"/",
	protect,
	createPlantation
);

router.get(
	"/:id",
	protect,
	getPlantationById
);

router.put(
	"/:id",
	protect,
	updatePlantation
);

router.delete(
	"/:id",
	protect,
	deletePlantation
);

router.get(
	"/issues",
	protect,
	getIssues
);

router.post(
	"/issues",
	protect,
	createIssue
);

router.put(
	"/issues/:id",
	protect,
	updateIssue
);

router.delete(
	"/issues/:id",
	protect,
	deleteIssue
);

router.get(
	"/fertilizers",
	protect,
	getFertilizers
);

router.post(
	"/fertilizers",
	protect,
	createFertilizer
);

router.put(
	"/fertilizers/:id",
	protect,
	updateFertilizer
);

router.delete(
	"/fertilizers/:id",
	protect,
	deleteFertilizer
);

router.get(
	"/reports/performance",
	protect,
	getPlantationPerformanceReport
);

router.get(
	"/reports/fertilizer-usage",
	protect,
	getFertilizerUsageReport
);

router.get(
	"/reports/disease",
	protect,
	getDiseaseReport
);

router.get(
	"/reports/productivity",
	protect,
	getProductivityReport
);

module.exports = router;
