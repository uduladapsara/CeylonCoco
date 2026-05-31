const mongoose = require("mongoose");

const incomeSchema = new mongoose.Schema(
	{
		source: {
			type: String,
			required: true
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
	"Income",
	incomeSchema
);
