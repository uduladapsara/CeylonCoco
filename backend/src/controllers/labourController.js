const Worker = require("../models/Worker");
const Attendance = require(
	"../models/Attendance"
);
const Salary = require("../models/Salary");

const handleError = (res, error) => {
	res.status(500).json({
		message: error.message
	});
};

exports.createWorker = async (req, res) => {
	try {
		const worker = await Worker.create(
			req.body
		);

		res.status(201).json(worker);
	} catch (error) {
		handleError(res, error);
	}
};

exports.getWorkers = async (req, res) => {
	try {
		const workers = await Worker.find();

		res.json(workers);
	} catch (error) {
		handleError(res, error);
	}
};

exports.getWorkerById = async (req, res) => {
	try {
		const worker = await Worker.findById(
			req.params.id
		);

		if (!worker) {
			return res.status(404).json({
				message: "Worker not found"
			});
		}

		res.json(worker);
	} catch (error) {
		handleError(res, error);
	}
};

exports.updateWorker = async (req, res) => {
	try {
		const worker = await Worker.findById(
			req.params.id
		);

		if (!worker) {
			return res.status(404).json({
				message: "Worker not found"
			});
		}

		Object.assign(worker, req.body);

		const updated = await worker.save();

		res.json(updated);
	} catch (error) {
		handleError(res, error);
	}
};

exports.deleteWorker = async (req, res) => {
	try {
		const worker = await Worker.findById(
			req.params.id
		);

		if (!worker) {
			return res.status(404).json({
				message: "Worker not found"
			});
		}

		await worker.deleteOne();

		res.json({
			message: "Worker deleted"
		});
	} catch (error) {
		handleError(res, error);
	}
};

exports.recordAttendance = async (req, res) => {
	try {
		const attendance = await Attendance.create(
			req.body
		);

		res.status(201).json(attendance);
	} catch (error) {
		handleError(res, error);
	}
};

exports.getAttendance = async (req, res) => {
	try {
		const filter = {};

		if (req.query.workerId) {
			filter.worker = req.query.workerId;
		}

		const attendance = await Attendance.find(
			filter
		).sort({ date: -1 });

		res.json(attendance);
	} catch (error) {
		handleError(res, error);
	}
};

exports.recordSalary = async (req, res) => {
	try {
		const salary = await Salary.create(req.body);

		res.status(201).json(salary);
	} catch (error) {
		handleError(res, error);
	}
};

exports.getSalaries = async (req, res) => {
	try {
		const filter = {};

		if (req.query.workerId) {
			filter.worker = req.query.workerId;
		}

		const salaries = await Salary.find(filter);

		res.json(salaries);
	} catch (error) {
		handleError(res, error);
	}
};

exports.getAttendanceReport = async (req, res) => {
	try {
		const report = await Attendance.aggregate([
			{
				$group: {
					_id: "$worker",
					totalDays: { $sum: 1 },
					presentDays: {
						$sum: {
							$cond: [
								{ $eq: ["$status", "Present"] },
								1,
								0
							]
						}
					}
				}
			},
			{
				$project: {
					_id: 0,
					worker: "$_id",
					totalDays: 1,
					presentDays: 1
				}
			}
		]);

		res.json(report);
	} catch (error) {
		handleError(res, error);
	}
};

exports.getSalaryReport = async (req, res) => {
	try {
		const report = await Salary.aggregate([
			{
				$group: {
					_id: "$worker",
					totalPaid: { $sum: "$amount" }
				}
			},
			{
				$project: {
					_id: 0,
					worker: "$_id",
					totalPaid: 1
				}
			}
		]);

		res.json(report);
	} catch (error) {
		handleError(res, error);
	}
};

exports.getWorkforceReport = async (req, res) => {
	try {
		const totalWorkers = await Worker.countDocuments(
			{ status: "Active" }
		);

		const attendanceToday = await Attendance.countDocuments(
			{
				date: {
					$gte: new Date(
						new Date().setHours(0, 0, 0, 0)
					),
					$lte: new Date(
						new Date().setHours(23, 59, 59, 999)
					)
				},
				status: "Present"
			}
		);

		res.json({
			totalWorkers,
			attendanceToday
		});
	} catch (error) {
		handleError(res, error);
	}
};
