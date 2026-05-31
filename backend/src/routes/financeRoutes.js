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
	incomeIdParam,
	expenseIdParam,
	createIncomeValidation,
	updateIncomeValidation,
	createExpenseValidation,
	updateExpenseValidation
} = require(
	"../validators/financeValidator"
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
	roleMiddleware("Admin", "FinanceManager"),
	getIncome
);

router.post(
	"/income",
	protect,
	roleMiddleware("Admin", "FinanceManager"),
	validate(createIncomeValidation),
	createIncome
);

router.put(
	"/income/:id",
	protect,
	roleMiddleware("Admin", "FinanceManager"),
	validate([...incomeIdParam, ...updateIncomeValidation]),
	updateIncome
);

router.delete(
	"/income/:id",
	protect,
	roleMiddleware("Admin", "FinanceManager"),
	validate(incomeIdParam),
	deleteIncome
);

router.get(
	"/expenses",
	protect,
	roleMiddleware("Admin", "FinanceManager"),
	getExpenses
);

router.post(
	"/expenses",
	protect,
	roleMiddleware("Admin", "FinanceManager"),
	validate(createExpenseValidation),
	createExpense
);

router.put(
	"/expenses/:id",
	protect,
	roleMiddleware("Admin", "FinanceManager"),
	validate([...expenseIdParam, ...updateExpenseValidation]),
	updateExpense
);

router.delete(
	"/expenses/:id",
	protect,
	roleMiddleware("Admin", "FinanceManager"),
	validate(expenseIdParam),
	deleteExpense
);

router.get(
	"/transactions",
	protect,
	roleMiddleware("Admin", "FinanceManager"),
	getTransactions
);

router.get(
	"/reports/profit-loss",
	protect,
	roleMiddleware("Admin", "FinanceManager"),
	getProfitLossReport
);

router.get(
	"/reports/expense",
	protect,
	roleMiddleware("Admin", "FinanceManager"),
	getExpenseReport
);

router.get(
	"/reports/revenue",
	protect,
	roleMiddleware("Admin", "FinanceManager"),
	getRevenueReport
);

module.exports = router;
