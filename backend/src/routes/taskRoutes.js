const express = require("express");

const router = express.Router();

const protect = require(
	"../middleware/authMiddleware"
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
	getTasks
);

router.post(
	"/",
	protect,
	createTask
);

router.get(
	"/:id",
	protect,
	getTaskById
);

router.put(
	"/:id",
	protect,
	updateTask
);

router.delete(
	"/:id",
	protect,
	deleteTask
);

router.get(
	"/reports/completion",
	protect,
	getTaskCompletionReport
);

router.get(
	"/reports/worker-performance",
	protect,
	getWorkerPerformanceReport
);

module.exports = router;
