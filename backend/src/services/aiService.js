const axios = require("axios");

const getAiResponse = async (question) => {
	if (!question) {
		return "Please provide a question.";
	}

	const apiKey = process.env.OPENAI_API_KEY;
	const model = process.env.OPENAI_MODEL || "gpt-4o-mini";

	if (!apiKey) {
		return "AI provider is not configured.";
	}

	const response = await axios.post(
		"https://api.openai.com/v1/chat/completions",
		{
			model,
			messages: [
				{
					role: "user",
					content: question
				}
			],
			temperature: 0.4
		},
		{
			headers: {
				Authorization: `Bearer ${apiKey}`,
				"Content-Type": "application/json"
			}
		}
	);

	return (
		response.data?.choices?.[0]?.message?.content ||
		"No response from AI provider."
	);
};

module.exports = {
	getAiResponse
};
