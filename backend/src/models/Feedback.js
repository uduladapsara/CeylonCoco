const mongoose = require("mongoose");

const feedbackSchema = new mongoose.Schema(
	{
		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User"
		},

		rating: {
			type: Number,
			min: 1,
			max: 5,
			required: true
		},

		comment: {
			type: String,
			default: ""
		},

		status: {
			type: String,
			enum: ["Open", "Reviewed", "Resolved"],
			default: "Open"
		}
	},
	{
		timestamps: true
	}
);

module.exports = mongoose.model(
	"Feedback",
	feedbackSchema
);
