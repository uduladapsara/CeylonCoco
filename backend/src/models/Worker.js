const mongoose = require("mongoose");

const workerSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true
		},

		phone: {
			type: String,
			default: ""
		},

		email: {
			type: String,
			default: ""
		},

		skills: {
			type: [String],
			default: []
		},

		availability: {
			type: String,
			enum: ["Available", "Unavailable"],
			default: "Available"
		},

		status: {
			type: String,
			enum: ["Active", "Inactive"],
			default: "Active"
		}
	},
	{
		timestamps: true
	}
);

module.exports = mongoose.model(
	"Worker",
	workerSchema
);
