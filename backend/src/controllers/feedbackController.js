const Feedback = require("../models/Feedback");

const handleError = (res, error) => {
	res.status(500).json({
		message: error.message
	});
};

exports.createFeedback = async (req, res) => {
	try {
		const feedback = await Feedback.create({
			...req.body,
			user: req.user?._id
		});

		res.status(201).json(feedback);
	} catch (error) {
		handleError(res, error);
	}
};

exports.getFeedback = async (req, res) => {
	try {
		const feedback = await Feedback.find();

		res.json(feedback);
	} catch (error) {
		handleError(res, error);
	}
};

exports.updateFeedback = async (req, res) => {
	try {
		const feedback = await Feedback.findById(
			req.params.id
		);

		if (!feedback) {
			return res.status(404).json({
				message: "Feedback not found"
			});
		}

		Object.assign(feedback, req.body);

		const updated = await feedback.save();

		res.json(updated);
	} catch (error) {
		handleError(res, error);
	}
};

exports.deleteFeedback = async (req, res) => {
	try {
		const feedback = await Feedback.findById(
			req.params.id
		);

		if (!feedback) {
			return res.status(404).json({
				message: "Feedback not found"
			});
		}

		await feedback.deleteOne();

		res.json({
			message: "Feedback deleted"
		});
	} catch (error) {
		handleError(res, error);
	}
};

exports.getCustomerSatisfactionReport = async (
	req,
	res
) => {
	try {
		const report = await Feedback.aggregate([
			{
				$group: {
					_id: null,
					avgRating: { $avg: "$rating" },
					total: { $sum: 1 }
				}
			}
		]);

		res.json({
			avgRating: report[0]?.avgRating || 0,
			total: report[0]?.total || 0
		});
	} catch (error) {
		handleError(res, error);
	}
};
