const mongoose = require("mongoose");

const inventorySchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true
		},

		category: {
			type: String,
			enum: [
				"CoconutOil",
				"CoconutWater",
				"CoconutSugar",
				"Fertilizer",
				"Equipment",
				"Other"
			],
			default: "Other"
		},

		quantity: {
			type: Number,
			default: 0
		},

		unit: {
			type: String,
			default: "unit"
		},

		minThreshold: {
			type: Number,
			default: 0
		},

		expiryDate: {
			type: Date
		},

		location: {
			type: String,
			default: ""
		},

		qrCode: {
			type: String,
			default: ""
		},

		status: {
			type: String,
			enum: ["Active", "Inactive"],
			default: "Active"
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
	"Inventory",
	inventorySchema
);
