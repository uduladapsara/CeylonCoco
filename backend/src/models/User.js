const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true
    },

    lastName: {
      type: String,
      required: true
    },

    name: {
      type: String
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

    location: {
      province: {
        type: String
      },
      district: {
        type: String
      },
      mapLocation: {
        address: {
          type: String
        },
        lat: {
          type: Number
        },
        lng: {
          type: Number
        }
      }
    },

    phone: {
      type: String
    },

    profileImage: {
      type: String,
      default: ""
    },

    status: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("User", userSchema);