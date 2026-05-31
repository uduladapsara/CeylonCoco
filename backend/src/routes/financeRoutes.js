const express = require("express");

const router = express.Router();

const protect = require(
	"../middleware/authMiddleware"
);

const {
	createIncome,
	getIncome,
	updateIncome,
	deleteIncome,
	createExpense,
	getExpenses,
	updateExpense,
	deleteExpense,
	getTransactions,
	getProfitLossReport,
	getExpenseReport,
	getRevenueReport
} = require(
	"../controllers/financeController"
);

router.get(
	"/income",
	protect,
	getIncome
);

router.post(
	"/income",
	protect,
	createIncome
);

router.put(
	"/income/:id",
	protect,
	updateIncome
);

router.delete(
	"/income/:id",
	protect,
	deleteIncome
);

router.get(
	"/expenses",
	protect,
	getExpenses
);

router.post(
	"/expenses",
	protect,
	createExpense
);

router.put(
	"/expenses/:id",
	protect,
	updateExpense
);

router.delete(
	"/expenses/:id",
	protect,
	deleteExpense
);

router.get(
	"/transactions",
	protect,
	getTransactions
);

router.get(
	"/reports/profit-loss",
	protect,
	getProfitLossReport
);

router.get(
	"/reports/expense",
	protect,
	getExpenseReport
);

router.get(
	"/reports/revenue",
	protect,
	getRevenueReport
);

module.exports = router;
