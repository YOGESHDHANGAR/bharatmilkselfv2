const con = require("../databases/database");
const ErrorHandler = require("../utils/errorhander");

exports.getFatRate = (req, res, next) => {
  let defaultQuerry = `select * from fatratetable where fat_serial=1`;

  con.query(`${defaultQuerry}`, (err, getfatrate) => {
    if (err) {
      return next(new ErrorHandler(err.sqlMessage, 500));
    } else {
      res.send(getfatrate);
    }
  });
};

exports.updateFatRate = (req, res, next) => {
  let defaultQuerry = `UPDATE fatratetable SET fat_rate = "${
    req.body.fat_rate
  }" WHERE fat_serial = ${1} `;
  con.query(`${defaultQuerry}`, (err, updatefatrate) => {
    if (err) {
      return next(new ErrorHandler(err.sqlMessage, 500));
    } else {
      res.send(updatefatrate);
    }
  });
};
