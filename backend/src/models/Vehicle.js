const mongoose = require("mongoose");

const vehicleSchema = new mongoose.Schema(
	{
		plateNumber: {
			type: String,
			required: true
		},

		type: {
			type: String,
			default: ""
		},

		capacity: {
			type: Number,
			default: 0
		},

		status: {
			type: String,
			enum: ["Active", "Inactive", "Maintenance"],
			default: "Active"
		}
	},
	{
		timestamps: true
	}
);

module.exports = mongoose.model(
	"Vehicle",
	vehicleSchema
);
