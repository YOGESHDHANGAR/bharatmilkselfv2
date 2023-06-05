const con = require("../databases/database");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const ErrorHandler = require("../utils/errorhander");
const util = require("util");

const queryAsync = util.promisify(con.query).bind(con);

exports.getLockUnclockDate = catchAsyncErrors(async (req, res, next) => {
  let defaultQuerry = `select * from lockdatetable where locked_date_serial=${1}`;

  const getLockeDateResult = await queryAsync(defaultQuerry);
  res.send(getLockeDateResult);
});

exports.getUpdateLockedDate = catchAsyncErrors(async (req, res, next) => {
  const lock_state = req.query.lock_state;
  const new_locked_date = req.query.new_locked_date;

  let defaultQuerry = `update lockdatetable set locked_date = '${new_locked_date}', lock_status =${lock_state}  where locked_date_serial = ${1}`;

  const updateLockedDateResult = await queryAsync(defaultQuerry);

  res.send(updateLockedDateResult);
});

exports.getLockedState = catchAsyncErrors(async (req, res, next) => {
  let defaultQuerry = `select * from lockdatetable where locked_date_serial=${1}`;

  const getLockeStateResult = await queryAsync(defaultQuerry);

  res.send(getLockeStateResult);
});

exports.toggleLock = catchAsyncErrors(async (req, res, next) => {
  const lock_status = req.query.lock_status;

  let defaultQuerry = `update lockdatetable set lock_status = "${lock_status}" where locked_date_serial = ${1}`;

  const lockeStatusResult = await queryAsync(defaultQuerry);

  res.send(lockeStatusResult);
});
