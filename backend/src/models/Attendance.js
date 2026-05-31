const mongoose = require("mongoose");

const attendanceSchema = new mongoose.Schema(
	{
		worker: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Worker",
			required: true
		},

		date: {
			type: Date,
			required: true
		},

		status: {
			type: String,
			enum: ["Present", "Absent", "Leave"],
			default: "Present"
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

attendanceSchema.index(
	{ worker: 1, date: 1 },
	{ unique: true }
);

module.exports = mongoose.model(
	"Attendance",
	attendanceSchema
);
