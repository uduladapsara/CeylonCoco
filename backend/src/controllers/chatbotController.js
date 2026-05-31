const ChatHistory = require(
	"../models/ChatHistory"
);
const { getAiResponse } = require(
	"../services/aiService"
);

const handleError = (res, error) => {
	res.status(500).json({
		message: error.message
	});
};

exports.askQuestion = async (req, res) => {
	try {
		const { question } = req.body;

		const response = await getAiResponse(
			question
		);

		const history = await ChatHistory.create({
			user: req.user?._id,
			question,
			response,
			source: "AI"
		});

		res.json({
			response,
			historyId: history._id
		});
	} catch (error) {
		handleError(res, error);
	}
};

exports.getChatHistory = async (req, res) => {
	try {
		const history = await ChatHistory.find({
			user: req.user?._id
		}).sort({ createdAt: -1 });

		res.json(history);
	} catch (error) {
		handleError(res, error);
	}
};
