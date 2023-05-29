const express = require("express");
const {
  customDataSelector,
  getpreviousSelectedYear,
} = require("../controllers/customDataSelectorController");

const router = express.Router();

router.route("/customdataselector").get(customDataSelector);

router.route("/getpreviousselectedyear").get(getpreviousSelectedYear);

module.exports = router;
