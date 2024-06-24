const asyncHandler = require("express-async-handler");
const UserStats = require("../models/userStatsModel");

// @desc    Get 
// @route   GET /api/stats
// @access  Private
const getStats = asyncHandler(async (req, res) => {
  const userStats = await UserStats.findOne({ userId: req.params.userId });
  if (!userStats) {
    res.status(404).send("User stats not found");
    return;
  }
  res.status(200).json(userStats);
});

const createStats = asyncHandler(async (req, res) => {
  const stats = await UserStats.create({
    userId: req.body.userId,
    solved: req.body.solved,
    attempted: req.body.attempted,
    fastestSolve: req.body.fastestSolve,
    slowestSolve: req.body.slowestSolve,
  });

  if (stats) res.status(200).json(stats);
});

// @desc    Update stats
// @route   PUT /api/stats/:id
// @access  Private
const updateStats = asyncHandler(async (req, res) => {
  try {
    const updatedStats = await UserStats.findOneAndUpdate(
      { userId: req.params.userId },
      req.body,
      { new: true }
    );

    if (!updatedStats) {
      res.status(404).send("User not found");
      return;
    }
    res.status(200).send(updatedStats);
  } catch (err) {
    console.error("Error updating user stats:", err);
    res.status(500).send("Cannot update the user stats");
  }
});

module.exports = {
  getStats,
  updateStats,
  createStats,
};
