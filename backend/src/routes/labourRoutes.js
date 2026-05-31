const express = require("express");

const router = express.Router();

const protect = require(
	"../middleware/authMiddleware"
);

const {
	createWorker,
	getWorkers,
	getWorkerById,
	updateWorker,
	deleteWorker,
	recordAttendance,
	getAttendance,
	recordSalary,
	getSalaries,
	getAttendanceReport,
	getSalaryReport,
	getWorkforceReport
} = require(
	"../controllers/labourController"
);

router.get(
	"/workers",
	protect,
	getWorkers
);

router.post(
	"/workers",
	protect,
	createWorker
);

router.get(
	"/workers/:id",
	protect,
	getWorkerById
);

router.put(
	"/workers/:id",
	protect,
	updateWorker
);

router.delete(
	"/workers/:id",
	protect,
	deleteWorker
);

router.get(
	"/attendance",
	protect,
	getAttendance
);

router.post(
	"/attendance",
	protect,
	recordAttendance
);

router.get(
	"/salaries",
	protect,
	getSalaries
);

router.post(
	"/salaries",
	protect,
	recordSalary
);

router.get(
	"/reports/attendance",
	protect,
	getAttendanceReport
);

router.get(
	"/reports/salary",
	protect,
	getSalaryReport
);

router.get(
	"/reports/workforce",
	protect,
	getWorkforceReport
);

module.exports = router;
