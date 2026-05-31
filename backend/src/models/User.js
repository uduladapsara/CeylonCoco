const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },

    email: {
      type: String,
      required: true,
      unique: true
    },

    password: {
      type: String,
      required: true
    },

    role: {
      type: String,
      enum: [
        "Admin",
        "FarmManager",
        "FinanceManager",
        "WarehouseStaff",
        "Driver",
        "Customer",
        "Farmer"
      ],
      default: "Customer"
    },

    phone: {
      type: String
    },

    status: {
      type: Boolean,
      default: true
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("User", userSchema);