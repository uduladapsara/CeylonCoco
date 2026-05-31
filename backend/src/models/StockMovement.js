const mongoose = require("mongoose");

const stockMovementSchema = new mongoose.Schema(
  {
    inventory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Inventory",
      required: true
    },

    type: {
      type: String,
      enum: ["IN", "OUT", "ADJUST"],
      required: true
    },

    quantity: {
      type: Number,
      required: true
    },

    reason: {
      type: String,
      default: ""
    },

    performedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model(
  "StockMovement",
  stockMovementSchema
);
