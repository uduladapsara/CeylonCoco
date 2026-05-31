const mongoose = require("mongoose");

const weatherSchema = new mongoose.Schema(
	{
		location: {
			type: String,
			required: true
		},

		current: {
			temperature: Number,
			humidity: Number,
			windSpeed: Number,
			condition: String,
			rainChance: Number
		},

		forecast: {
			type: [
				{
					date: Date,
					temperature: Number,
					humidity: Number,
					windSpeed: Number,
					condition: String,
					rainChance: Number
				}
			],
			default: []
		},

		source: {
			type: String,
			default: ""
		},

		fetchedAt: {
			type: Date,
			default: Date.now
		}
	},
	{
		timestamps: true
	}
);

module.exports = mongoose.model(
	"Weather",
	weatherSchema
);
