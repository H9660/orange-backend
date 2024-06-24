const asyncHandler = require("express-async-handler");
const passport = require("passport");
const User = require("../models/userModel");

// @desc    Register new user
// @route   POST /api/users
// @access  Public

// @desc    Authenticate a user
// @route   POST /api/users/login
// @access  Public
const getLoggedIn = asyncHandler(async (req, res) => {
  //   const { email, password } = req.body;

  //   // Check for user email
  //   const user = await User.findOne({ email });

  //   if (user && (await bcrypt.compare(password, user.password))) {
  //     res.json({
  //       _id: user.id,
  //       name: user.name,
  //       email: user.email,
  //       isAdmin: user.isAdmin,
  //       token: generateToken(user._id),
  //     });
  //   } else {
  //     res.status(400);
  //     throw new Error("Invalid credentials");
  console.log("Login successful");
  //   }
});

const showFailure = asyncHandler(async (req, res) => {
  //   const { email, password } = req.body;
  console.log("Login failed");
  //   // Check for user email
  //   const user = await User.findOne({ email });

  //   if (user && (await bcrypt.compare(password, user.password))) {
  //     res.json({
  //       _id: user.id,
  //       name: user.name,
  //       email: user.email,
  //       isAdmin: user.isAdmin,
  //       token: generateToken(user._id),
  //     });
  //   } else {
  //     res.status(400);
  //     throw new Error("Invalid credentials");
  //   }
});

const Authenticate = asyncHandler(async (req, res) => {
  //   const { email, password } = req.body;
//   console.log(req.user.displayName())
  passport.authenticate("google", { scope: ["email", "profile"] });
});

const checkAuth = asyncHandler(async (req, res) => {
  //   const { email, password } = req.body;
  passport.authenticate("google", {
    successRedirect: "/auth/google/success",
    failureRedirect: "/auth/google/failure",
  });
});

module.exports = {
  getLoggedIn,
  showFailure,
  checkAuth,
  Authenticate,
};
