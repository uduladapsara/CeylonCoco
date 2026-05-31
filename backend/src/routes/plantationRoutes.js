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
	plantationIdParam,
	createPlantationValidation,
	issueValidation,
	fertilizerValidation,
	plantationQueryValidation
} = require(
	"../validators/plantationValidator"
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
	roleMiddleware(
		"Admin",
		"FarmManager",
		"FinanceManager",
		"WarehouseStaff"
	),
	getPlantations
);

router.post(
	"/",
	protect,
	roleMiddleware("Admin", "FarmManager"),
	validate(createPlantationValidation),
	createPlantation
);

router.get(
	"/:id",
	protect,
	roleMiddleware(
		"Admin",
		"FarmManager",
		"FinanceManager",
		"WarehouseStaff"
	),
	validate(plantationIdParam),
	getPlantationById
);

router.put(
	"/:id",
	protect,
	roleMiddleware("Admin", "FarmManager"),
	validate(plantationIdParam),
	updatePlantation
);

router.delete(
	"/:id",
	protect,
	roleMiddleware("Admin", "FarmManager"),
	validate(plantationIdParam),
	deletePlantation
);

router.get(
	"/issues",
	protect,
	roleMiddleware("Admin", "FarmManager"),
	validate(plantationQueryValidation),
	getIssues
);

router.post(
	"/issues",
	protect,
	roleMiddleware("Admin", "FarmManager"),
	validate(issueValidation),
	createIssue
);

router.put(
	"/issues/:id",
	protect,
	roleMiddleware("Admin", "FarmManager"),
	validate(plantationIdParam),
	updateIssue
);

router.delete(
	"/issues/:id",
	protect,
	roleMiddleware("Admin", "FarmManager"),
	validate(plantationIdParam),
	deleteIssue
);

router.get(
	"/fertilizers",
	protect,
	roleMiddleware("Admin", "FarmManager"),
	validate(plantationQueryValidation),
	getFertilizers
);

router.post(
	"/fertilizers",
	protect,
	roleMiddleware("Admin", "FarmManager"),
	validate(fertilizerValidation),
	createFertilizer
);

router.put(
	"/fertilizers/:id",
	protect,
	roleMiddleware("Admin", "FarmManager"),
	validate(plantationIdParam),
	updateFertilizer
);

router.delete(
	"/fertilizers/:id",
	protect,
	roleMiddleware("Admin", "FarmManager"),
	validate(plantationIdParam),
	deleteFertilizer
);

router.get(
	"/reports/performance",
	protect,
	roleMiddleware("Admin", "FarmManager", "FinanceManager"),
	getPlantationPerformanceReport
);

router.get(
	"/reports/fertilizer-usage",
	protect,
	roleMiddleware("Admin", "FarmManager", "FinanceManager"),
	getFertilizerUsageReport
);

router.get(
	"/reports/disease",
	protect,
	roleMiddleware("Admin", "FarmManager", "FinanceManager"),
	getDiseaseReport
);

router.get(
	"/reports/productivity",
	protect,
	roleMiddleware("Admin", "FarmManager", "FinanceManager"),
	getProductivityReport
);

module.exports = router;
