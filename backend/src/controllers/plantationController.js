const Plantation = require("../models/Plantation");
const PlantationIssue = require(
	"../models/PlantationIssue"
);
const Fertilizer = require("../models/Fertilizer");

const handleError = (res, error) => {
	res.status(500).json({
		message: error.message
	});
};

exports.createPlantation = async (req, res) => {
	try {
		const plantation = await Plantation.create({
			...req.body,
			createdBy: req.user?._id
		});

		res.status(201).json(plantation);
	} catch (error) {
		handleError(res, error);
	}
};

exports.getPlantations = async (req, res) => {
	try {
		const plantations = await Plantation.find();

		res.json(plantations);
	} catch (error) {
		handleError(res, error);
	}
};

exports.getPlantationById = async (req, res) => {
	try {
		const plantation = await Plantation.findById(
			req.params.id
		);

		if (!plantation) {
			return res.status(404).json({
				message: "Plantation not found"
			});
		}

		res.json(plantation);
	} catch (error) {
		handleError(res, error);
	}
};

exports.updatePlantation = async (req, res) => {
	try {
		const plantation = await Plantation.findById(
			req.params.id
		);

		if (!plantation) {
			return res.status(404).json({
				message: "Plantation not found"
			});
		}

		Object.assign(plantation, req.body);

		const updated = await plantation.save();

		res.json(updated);
	} catch (error) {
		handleError(res, error);
	}
};

exports.deletePlantation = async (req, res) => {
	try {
		const plantation = await Plantation.findById(
			req.params.id
		);

		if (!plantation) {
			return res.status(404).json({
				message: "Plantation not found"
			});
		}

		await plantation.deleteOne();

		res.json({
			message: "Plantation deleted"
		});
	} catch (error) {
		handleError(res, error);
	}
};

exports.createIssue = async (req, res) => {
	try {
		const issue = await PlantationIssue.create({
			...req.body,
			createdBy: req.user?._id
		});

		res.status(201).json(issue);
	} catch (error) {
		handleError(res, error);
	}
};

exports.getIssues = async (req, res) => {
	try {
		const filter = {};

		if (req.query.plantationId) {
			filter.plantation = req.query.plantationId;
		}

		const issues = await PlantationIssue.find(filter);

		res.json(issues);
	} catch (error) {
		handleError(res, error);
	}
};

exports.updateIssue = async (req, res) => {
	try {
		const issue = await PlantationIssue.findById(
			req.params.id
		);

		if (!issue) {
			return res.status(404).json({
				message: "Issue not found"
			});
		}

		Object.assign(issue, req.body);

		const updated = await issue.save();

		res.json(updated);
	} catch (error) {
		handleError(res, error);
	}
};

exports.deleteIssue = async (req, res) => {
	try {
		const issue = await PlantationIssue.findById(
			req.params.id
		);

		if (!issue) {
			return res.status(404).json({
				message: "Issue not found"
			});
		}

		await issue.deleteOne();

		res.json({
			message: "Issue deleted"
		});
	} catch (error) {
		handleError(res, error);
	}
};

exports.createFertilizer = async (req, res) => {
	try {
		const fertilizer = await Fertilizer.create({
			...req.body,
			createdBy: req.user?._id
		});

		res.status(201).json(fertilizer);
	} catch (error) {
		handleError(res, error);
	}
};

exports.getFertilizers = async (req, res) => {
	try {
		const filter = {};

		if (req.query.plantationId) {
			filter.plantation = req.query.plantationId;
		}

		const fertilizers = await Fertilizer.find(filter);

		res.json(fertilizers);
	} catch (error) {
		handleError(res, error);
	}
};

exports.updateFertilizer = async (req, res) => {
	try {
		const fertilizer = await Fertilizer.findById(
			req.params.id
		);

		if (!fertilizer) {
			return res.status(404).json({
				message: "Fertilizer record not found"
			});
		}

		Object.assign(fertilizer, req.body);

		const updated = await fertilizer.save();

		res.json(updated);
	} catch (error) {
		handleError(res, error);
	}
};

exports.deleteFertilizer = async (req, res) => {
	try {
		const fertilizer = await Fertilizer.findById(
			req.params.id
		);

		if (!fertilizer) {
			return res.status(404).json({
				message: "Fertilizer record not found"
			});
		}

		await fertilizer.deleteOne();

		res.json({
			message: "Fertilizer record deleted"
		});
	} catch (error) {
		handleError(res, error);
	}
};

exports.getPlantationPerformanceReport = async (
	req,
	res
) => {
	try {
		const summary = await Plantation.aggregate([
			{
				$group: {
					_id: null,
					totalPlantations: {
						$sum: 1
					},
					totalArea: {
						$sum: "$totalArea"
					},
					totalTrees: {
						$sum: "$treeCount"
					},
					avgTreeAge: {
						$avg: "$avgTreeAge"
					}
				}
			}
		]);

		res.json(summary[0] || {
			totalPlantations: 0,
			totalArea: 0,
			totalTrees: 0,
			avgTreeAge: 0
		});
	} catch (error) {
		handleError(res, error);
	}
};

exports.getFertilizerUsageReport = async (
	req,
	res
) => {
	try {
		const usage = await Fertilizer.aggregate([
			{
				$group: {
					_id: "$fertilizerName",
					totalQuantity: {
						$sum: "$quantity"
					},
					count: {
						$sum: 1
					}
				}
			},
			{
				$project: {
					_id: 0,
					fertilizerName: "$_id",
					totalQuantity: 1,
					count: 1
				}
			}
		]);

		res.json(usage);
	} catch (error) {
		handleError(res, error);
	}
};

exports.getDiseaseReport = async (req, res) => {
	try {
		const diseaseStats = await PlantationIssue.aggregate([
			{
				$match: { type: "Disease" }
			},
			{
				$group: {
					_id: "$status",
					count: {
						$sum: 1
					}
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

		res.json(diseaseStats);
	} catch (error) {
		handleError(res, error);
	}
};

exports.getProductivityReport = async (
	req,
	res
) => {
	try {
		const healthStats = await Plantation.aggregate([
			{
				$group: {
					_id: "$treeHealth",
					count: { $sum: 1 },
					totalTrees: {
						$sum: "$treeCount"
					}
				}
			},
			{
				$project: {
					_id: 0,
					treeHealth: "$_id",
					count: 1,
					totalTrees: 1
				}
			}
		]);

		res.json(healthStats);
	} catch (error) {
		handleError(res, error);
	}
};
