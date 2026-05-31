const getAiResponse = async (question) => {
	if (!question) {
		return "Please provide a question.";
	}

	return "Thanks for your question. A specialist response will be available soon.";
};

module.exports = {
	getAiResponse
};
