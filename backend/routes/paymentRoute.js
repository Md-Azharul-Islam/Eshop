const express = require("express");
const { Payment, sendStripeApiKey } = require("../controller/paymentController");
const router = express.Router();
const {isAuthinticatedUser} = require("../middleware/auth");

router.route("/payment/process").post(isAuthinticatedUser, Payment);

router.route("/stripeapikey").get(isAuthinticatedUser, sendStripeApiKey);


module.exports = router;