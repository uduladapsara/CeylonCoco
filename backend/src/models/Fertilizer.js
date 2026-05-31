const mongoose = require("mongoose");

const fertilizerSchema = new mongoose.Schema(
	{
		plantation: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Plantation",
			required: true
		},

		fertilizerName: {
			type: String,
			required: true
		},

		quantity: {
			type: Number,
			default: 0
		},

		unit: {
			type: String,
			default: "kg"
		},

		requestDate: {
			type: Date,
			default: Date.now
		},

		scheduleDate: {
			type: Date
		},

		applicationDate: {
			type: Date
		},

		status: {
			type: String,
			enum: [
				"Requested",
				"Scheduled",
				"Applied",
				"Cancelled"
			],
			default: "Requested"
		},

		notes: {
			type: String,
			default: ""
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
	"Fertilizer",
	fertilizerSchema
);
