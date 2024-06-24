const mongoose = require("mongoose");

const userStatsSchema = mongoose.Schema(
  {
    userId: {
      type: String,
      required: [true, "Please enter the userId"],
      unique: true,
    },
    solved: {
      type: Number,
      default: 0,
    },
    attempted: {
      type: Number,
      default: 0,
    },

    fastestSolve: {
      type: Number,
      default: 0,
    },

    slowestSolve: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("UserStats", userStatsSchema);
