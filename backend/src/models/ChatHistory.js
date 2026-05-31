const mongoose = require("mongoose");

const chatHistorySchema = new mongoose.Schema(
	{
		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User"
		},

		question: {
			type: String,
			required: true
		},

		response: {
			type: String,
			required: true
		},

		source: {
			type: String,
			default: "AI"
		}
	},
	{
		timestamps: true
	}
);

module.exports = mongoose.model(
	"ChatHistory",
	chatHistorySchema
);
