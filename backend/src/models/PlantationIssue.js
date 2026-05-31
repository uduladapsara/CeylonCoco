const mongoose = require("mongoose");

const plantationIssueSchema = new mongoose.Schema(
	{
		plantation: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Plantation",
			required: true
		},

		type: {
			type: String,
			enum: ["Pest", "Disease", "Water", "Other"],
			required: true
		},

		title: {
			type: String,
			required: true
		},

		description: {
			type: String,
			default: ""
		},

		severity: {
			type: String,
			enum: ["Low", "Medium", "High", "Critical"],
			default: "Medium"
		},

		status: {
			type: String,
			enum: [
				"Open",
				"InProgress",
				"Resolved",
				"Closed"
			],
			default: "Open"
		},

		reportedAt: {
			type: Date,
			default: Date.now
		},

		resolvedAt: {
			type: Date
		},

		createdBy: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User"
		}
	},
	{
		timestamps: true
	}
);

module.exports = mongoose.model(
	"PlantationIssue",
	plantationIssueSchema
);
