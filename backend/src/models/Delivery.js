const mongoose = require("mongoose");

const deliverySchema = new mongoose.Schema(
	{
		order: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Order"
		},

		trip: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Trip"
		},

		status: {
			type: String,
			enum: [
				"Pending",
				"InTransit",
				"Delivered",
				"Failed"
			],
			default: "Pending"
		},

		deliveredAt: {
			type: Date
		}
	},
	{
		timestamps: true
	}
);

module.exports = mongoose.model(
	"Delivery",
	deliverySchema
);
