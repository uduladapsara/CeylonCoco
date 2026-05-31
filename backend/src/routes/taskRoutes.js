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
	taskIdParam,
	createTaskValidation,
	updateTaskValidation
} = require(
	"../validators/taskValidator"
);

const {
	createTask,
	getTasks,
	getTaskById,
	updateTask,
	deleteTask,
	getTaskCompletionReport,
	getWorkerPerformanceReport
} = require(
	"../controllers/taskController"
);

router.get(
	"/",
	protect,
	roleMiddleware(
		"Admin",
		"FarmManager",
		"Driver",
		"Farmer"
	),
	getTasks
);

router.post(
	"/",
	protect,
	roleMiddleware("Admin", "FarmManager"),
	validate(createTaskValidation),
	createTask
);

router.get(
	"/:id",
	protect,
	roleMiddleware(
		"Admin",
		"FarmManager",
		"Driver",
		"Farmer"
	),
	validate(taskIdParam),
	getTaskById
);

router.put(
	"/:id",
	protect,
	roleMiddleware("Admin", "FarmManager"),
	validate([...taskIdParam, ...updateTaskValidation]),
	updateTask
);

router.delete(
	"/:id",
	protect,
	roleMiddleware("Admin", "FarmManager"),
	validate(taskIdParam),
	deleteTask
);

router.get(
	"/reports/completion",
	protect,
	roleMiddleware("Admin", "FarmManager"),
	getTaskCompletionReport
);

router.get(
	"/reports/worker-performance",
	protect,
	roleMiddleware("Admin", "FarmManager"),
	getWorkerPerformanceReport
);

module.exports = router;
