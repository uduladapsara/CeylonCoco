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
	workerIdParam,
	createWorkerValidation,
	attendanceValidation,
	salaryValidation,
	workerQueryValidation
} = require(
	"../validators/labourValidator"
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
	roleMiddleware("Admin", "FarmManager"),
	getWorkers
);

router.post(
	"/workers",
	protect,
	roleMiddleware("Admin", "FarmManager"),
	validate(createWorkerValidation),
	createWorker
);

router.get(
	"/workers/:id",
	protect,
	roleMiddleware("Admin", "FarmManager"),
	validate(workerIdParam),
	getWorkerById
);

router.put(
	"/workers/:id",
	protect,
	roleMiddleware("Admin", "FarmManager"),
	validate(workerIdParam),
	updateWorker
);

router.delete(
	"/workers/:id",
	protect,
	roleMiddleware("Admin", "FarmManager"),
	validate(workerIdParam),
	deleteWorker
);

router.get(
	"/attendance",
	protect,
	roleMiddleware(
		"Admin",
		"FarmManager",
		"FinanceManager"
	),
	validate(workerQueryValidation),
	getAttendance
);

router.post(
	"/attendance",
	protect,
	roleMiddleware("Admin", "FarmManager"),
	validate(attendanceValidation),
	recordAttendance
);

router.get(
	"/salaries",
	protect,
	roleMiddleware(
		"Admin",
		"FarmManager",
		"FinanceManager"
	),
	validate(workerQueryValidation),
	getSalaries
);

router.post(
	"/salaries",
	protect,
	roleMiddleware("Admin", "FarmManager"),
	validate(salaryValidation),
	recordSalary
);

router.get(
	"/reports/attendance",
	protect,
	roleMiddleware(
		"Admin",
		"FarmManager",
		"FinanceManager"
	),
	getAttendanceReport
);

router.get(
	"/reports/salary",
	protect,
	roleMiddleware(
		"Admin",
		"FarmManager",
		"FinanceManager"
	),
	getSalaryReport
);

router.get(
	"/reports/workforce",
	protect,
	roleMiddleware(
		"Admin",
		"FarmManager",
		"FinanceManager"
	),
	getWorkforceReport
);

module.exports = router;
