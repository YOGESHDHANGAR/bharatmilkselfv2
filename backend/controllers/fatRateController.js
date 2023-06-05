const con = require("../databases/database");
const ErrorHandler = require("../utils/errorhander");

const util = require("util");

const queryAsync = util.promisify(con.query).bind(con);

exports.getFatRate = async (req, res, next) => {
  try {
    let defaultQuerry = `select * from fatratetable where fat_serial=1`;

    const getfatrate = await queryAsync(defaultQuerry);

    res.send(getfatrate);
  } catch (error) {
    return next(new ErrorHandler(err.sqlMessage, 500));
  }
};

exports.updateFatRate = async (req, res, next) => {
  try {
    let defaultQuerry = `UPDATE fatratetable SET fat_rate = "${
      req.body.fat_rate
    }" WHERE fat_serial = ${1} `;

    const updatefatrate = await queryAsync(defaultQuerry);

    res.send(updatefatrate);
  } catch (error) {
    return next(new ErrorHandler(err.sqlMessage, 500));
  }
};
