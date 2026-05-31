const Income = require("../models/Income");
const Expense = require("../models/Expense");
const Transaction = require(
	"../models/Transaction"
);

const handleError = (res, error) => {
	res.status(500).json({
		message: error.message
	});
};

exports.createIncome = async (req, res) => {
	try {
		const income = await Income.create({
			...req.body,
			createdBy: req.user?._id
		});

		await Transaction.create({
			type: "Income",
			referenceId: income._id,
			amount: income.amount,
			date: income.date
		});

		res.status(201).json(income);
	} catch (error) {
		handleError(res, error);
	}
};

exports.getIncome = async (req, res) => {
	try {
		const income = await Income.find();

		res.json(income);
	} catch (error) {
		handleError(res, error);
	}
};

exports.updateIncome = async (req, res) => {
	try {
		const income = await Income.findById(
			req.params.id
		);

		if (!income) {
			return res.status(404).json({
				message: "Income not found"
			});
		}

		Object.assign(income, req.body);

		const updated = await income.save();

		res.json(updated);
	} catch (error) {
		handleError(res, error);
	}
};

exports.deleteIncome = async (req, res) => {
	try {
		const income = await Income.findById(
			req.params.id
		);

		if (!income) {
			return res.status(404).json({
				message: "Income not found"
			});
		}

		await income.deleteOne();

		res.json({
			message: "Income deleted"
		});
	} catch (error) {
		handleError(res, error);
	}
};

exports.createExpense = async (req, res) => {
	try {
		const expense = await Expense.create({
			...req.body,
			createdBy: req.user?._id
		});

		await Transaction.create({
			type: "Expense",
			referenceId: expense._id,
			amount: expense.amount,
			date: expense.date
		});

		res.status(201).json(expense);
	} catch (error) {
		handleError(res, error);
	}
};

exports.getExpenses = async (req, res) => {
	try {
		const expenses = await Expense.find();

		res.json(expenses);
	} catch (error) {
		handleError(res, error);
	}
};

exports.updateExpense = async (req, res) => {
	try {
		const expense = await Expense.findById(
			req.params.id
		);

		if (!expense) {
			return res.status(404).json({
				message: "Expense not found"
			});
		}

		Object.assign(expense, req.body);

		const updated = await expense.save();

		res.json(updated);
	} catch (error) {
		handleError(res, error);
	}
};

exports.deleteExpense = async (req, res) => {
	try {
		const expense = await Expense.findById(
			req.params.id
		);

		if (!expense) {
			return res.status(404).json({
				message: "Expense not found"
			});
		}

		await expense.deleteOne();

		res.json({
			message: "Expense deleted"
		});
	} catch (error) {
		handleError(res, error);
	}
};

exports.getTransactions = async (req, res) => {
	try {
		const transactions = await Transaction.find()
			.sort({ date: -1 });

		res.json(transactions);
	} catch (error) {
		handleError(res, error);
	}
};

exports.getProfitLossReport = async (req, res) => {
	try {
		const totalIncome = await Income.aggregate([
			{
				$group: {
					_id: null,
					total: { $sum: "$amount" }
				}
			}
		]);

		const totalExpense = await Expense.aggregate([
			{
				$group: {
					_id: null,
					total: { $sum: "$amount" }
				}
			}
		]);

		const incomeValue = totalIncome[0]?.total || 0;
		const expenseValue = totalExpense[0]?.total || 0;

		res.json({
			totalIncome: incomeValue,
			totalExpense: expenseValue,
			profit: incomeValue - expenseValue
		});
	} catch (error) {
		handleError(res, error);
	}
};

exports.getExpenseReport = async (req, res) => {
	try {
		const report = await Expense.aggregate([
			{
				$group: {
					_id: "$category",
					total: { $sum: "$amount" }
				}
			},
			{
				$project: {
					_id: 0,
					category: "$_id",
					total: 1
				}
			}
		]);

		res.json(report);
	} catch (error) {
		handleError(res, error);
	}
};

exports.getRevenueReport = async (req, res) => {
	try {
		const report = await Income.aggregate([
			{
				$group: {
					_id: "$source",
					total: { $sum: "$amount" }
				}
			},
			{
				$project: {
					_id: 0,
					source: "$_id",
					total: 1
				}
			}
		]);

		res.json(report);
	} catch (error) {
		handleError(res, error);
	}
};
