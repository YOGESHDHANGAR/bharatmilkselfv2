const express = require("express");
const {
  getFatRate,
  updateFatRate,
} = require("../controllers/fatRateController");
const router = express.Router();

router.route("/getfatrate").get(getFatRate);

router.route("/updatefatrate").put(updateFatRate);

module.exports = router;
