const mongoose = require("mongoose");

const salarySchema = new mongoose.Schema(
	{
		worker: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Worker",
			required: true
		},

		periodStart: {
			type: Date,
			required: true
		},

		periodEnd: {
			type: Date,
			required: true
		},

		wageType: {
			type: String,
			enum: ["Daily", "Monthly"],
			default: "Monthly"
		},

		amount: {
			type: Number,
			required: true
		},

		paidDate: {
			type: Date
		},

		notes: {
			type: String,
			default: ""
		}
	},
	{
		timestamps: true
	}
);

module.exports = mongoose.model(
	"Salary",
	salarySchema
);
