const con = require("../databases/database");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const ErrorHandler = require("../utils/errorhander");

const util = require("util");

const queryAsync = util.promisify(con.query).bind(con);

exports.getFatRate = catchAsyncErrors(async (req, res, next) => {
  let defaultQuerry = `select * from fatratetable where fat_serial=1`;

  const getfatrate = await queryAsync(defaultQuerry);

  res.send(getfatrate);
});

exports.updateFatRate = catchAsyncErrors(async (req, res, next) => {
  let defaultQuerry = `update fatratetable set fat_rate = "${
    req.body.fat_rate
  }" where fat_serial = ${1} `;

  const updatefatrate = await queryAsync(defaultQuerry);

  res.send(updatefatrate);
});
