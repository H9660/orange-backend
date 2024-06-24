const express = require("express");
const router = express.Router();
const {
  getLoggedIn,
  showFailure,
  checkAuth,
  Authenticate,
} = require("../controllers/googleAuthController");
function isLoggedIn(req, res, next) {
  req.user ? next() : res.sendStatus(401).send("Not authorised`");
}
// we need to protect the middle ware thats why we are adding the middel ware here
// const { protect } = requ ire('../middleware/authMiddleware')
router.route("/").get(Authenticate);
router.route("/callback").get(checkAuth);
router.route("/success").get(isLoggedIn, getLoggedIn);
router.route("/failure").get(showFailure);
module.exports = router;
