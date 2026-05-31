const Task = require("../models/Task");

const handleError = (res, error) => {
	res.status(500).json({
		message: error.message
	});
};

exports.createTask = async (req, res) => {
	try {
		const task = await Task.create({
			...req.body,
			assignedBy: req.user?._id
		});

		res.status(201).json(task);
	} catch (error) {
		handleError(res, error);
	}
};

exports.getTasks = async (req, res) => {
	try {
		const filter = {};

		if (req.query.assignedTo) {
			filter.assignedTo = req.query.assignedTo;
		}

		if (req.query.status) {
			filter.status = req.query.status;
		}

		const tasks = await Task.find(filter);

		res.json(tasks);
	} catch (error) {
		handleError(res, error);
	}
};

exports.getTaskById = async (req, res) => {
	try {
		const task = await Task.findById(
			req.params.id
		);

		if (!task) {
			return res.status(404).json({
				message: "Task not found"
			});
		}

		res.json(task);
	} catch (error) {
		handleError(res, error);
	}
};

exports.updateTask = async (req, res) => {
	try {
		const task = await Task.findById(
			req.params.id
		);

		if (!task) {
			return res.status(404).json({
				message: "Task not found"
			});
		}

		Object.assign(task, req.body);

		const updated = await task.save();

		res.json(updated);
	} catch (error) {
		handleError(res, error);
	}
};

exports.deleteTask = async (req, res) => {
	try {
		const task = await Task.findById(
			req.params.id
		);

		if (!task) {
			return res.status(404).json({
				message: "Task not found"
			});
		}

		await task.deleteOne();

		res.json({
			message: "Task deleted"
		});
	} catch (error) {
		handleError(res, error);
	}
};

exports.getTaskCompletionReport = async (
	req,
	res
) => {
	try {
		const report = await Task.aggregate([
			{
				$group: {
					_id: "$status",
					count: { $sum: 1 }
				}
			},
			{
				$project: {
					_id: 0,
					status: "$_id",
					count: 1
				}
			}
		]);

		res.json(report);
	} catch (error) {
		handleError(res, error);
	}
};

exports.getWorkerPerformanceReport = async (
	req,
	res
) => {
	try {
		const report = await Task.aggregate([
			{
				$match: { status: "Completed" }
			},
			{
				$group: {
					_id: "$assignedTo",
					completedTasks: { $sum: 1 }
				}
			},
			{
				$project: {
					_id: 0,
					worker: "$_id",
					completedTasks: 1
				}
			}
		]);

		res.json(report);
	} catch (error) {
		handleError(res, error);
	}
};
