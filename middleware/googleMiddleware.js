const passport = require("passport");
const express = require("express");
const GoogleStrategy = require("passport-google-oauth2").Strategy;
const dotenv = require("dotenv").config();
const router = express.Router();
passport.use(
  new GoogleStrategy(
    {
      clientID: 'process.env.GOOGLE_CLIENT_ID',
      clientSecret: 'process.env.GOOGLE_CLIENT_SECRET',
      callbackURL: "http://localhost:5000/auth/google/callback",
      passReqToCallback: true,
    },
    function (request, accessToken, refreshToken, profile, done) {
      console.log(request)
      return done(null, profile);
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

router.get(
  "/",
  (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header("Access-Control-Allow-Methods", "GET");
    res.header("Access-Control-Allow-Headers", "Content-Type");
    next();
  },
  passport.authenticate("google", { scope: ["email", "profile"] })
);

router.get(
  "/google/callback",
  (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header("Access-Control-Allow-Methods", "GET");
    res.header("Access-Control-Allow-Headers", "Content-Type");
    next();
  },
  passport.authenticate("google", {
    successRedirect: "http://localhost:3000/",
    failureRedirect: "http://localhost:3000/login",
  })
);

module.exports = router;
