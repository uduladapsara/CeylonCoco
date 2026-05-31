const mongoose = require("mongoose");

const expenseSchema = new mongoose.Schema(
	{
		category: {
			type: String,
			enum: [
				"Fertilizers",
				"LabourCosts",
				"FuelCosts",
				"EquipmentCosts",
				"Other"
			],
			default: "Other"
		},

		amount: {
			type: Number,
			required: true
		},

		date: {
			type: Date,
			default: Date.now
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
	"Expense",
	expenseSchema
);
