const express = require("express");
const {
  getUpdateLockedDate,
  getLockUnclockDate,
  toggleLock,
  getLockedState,
} = require("../controllers/lockUnclockEntries");

const router = express.Router();

router.route("/getlockeddate").get(getLockUnclockDate);

router.route("/getupdatedlockeddate").get(getUpdateLockedDate);

router.route("/togglelock").get(toggleLock);

router.route("/getlockstate").get(getLockedState);

module.exports = router;
