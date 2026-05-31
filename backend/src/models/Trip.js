const mongoose = require("mongoose");

const tripSchema = new mongoose.Schema(
	{
		vehicle: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Vehicle",
			required: true
		},

		driver: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User"
		},

		origin: {
			type: String,
			default: ""
		},

		destination: {
			type: String,
			default: ""
		},

		distanceKm: {
			type: Number,
			default: 0
		},

		fuelCost: {
			type: Number,
			default: 0
		},

		status: {
			type: String,
			enum: [
				"Planned",
				"InProgress",
				"Completed",
				"Cancelled"
			],
			default: "Planned"
		},

		tripDate: {
			type: Date,
			default: Date.now
		}
	},
	{
		timestamps: true
	}
);

module.exports = mongoose.model("Trip", tripSchema);
