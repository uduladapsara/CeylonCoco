const mongoose = require("mongoose");

const plantationSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true
		},

		location: {
			type: String,
			default: ""
		},

		blocks: [
			{
				name: {
					type: String,
					required: true
				},

				area: {
					type: Number,
					default: 0
				},

				plots: [
					{
						plotId: {
							type: String,
							default: ""
						},

						area: {
							type: Number,
							default: 0
						},

						treeCount: {
							type: Number,
							default: 0
						}
					}
				]
			}
		],

		totalArea: {
			type: Number,
			default: 0
		},

		treeCount: {
			type: Number,
			default: 0
		},

		avgTreeAge: {
			type: Number,
			default: 0
		},

		treeHealth: {
			type: String,
			enum: [
				"Excellent",
				"Good",
				"Fair",
				"Poor"
			],
			default: "Good"
		},

		status: {
			type: String,
			enum: ["Active", "Inactive"],
			default: "Active"
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
	"Plantation",
	plantationSchema
);
