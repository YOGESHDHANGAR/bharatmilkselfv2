const con = require("../databases/database");
const ErrorHandler = require("../utils/errorhander");

exports.getLockUnclockDate = (req, res, next) => {
  let defaultQuerry = `select * from lockdatetable where locked_date_serial=${1}`;
  con.query(`${defaultQuerry}`, (err, getLockeDateResult) => {
    if (err) {
      return next(new ErrorHandler(err.sqlMessage, 500));
    } else {
      res.send(getLockeDateResult);
    }
  });
};

exports.getUpdateLockedDate = (req, res, next) => {
  const lock_state = req.query.lock_state;
  const new_locked_date = req.query.new_locked_date;
  console.log(new_locked_date);

  let defaultQuerry = `update lockdatetable set locked_date = '${new_locked_date}', lock_status =${lock_state}  where locked_date_serial = ${1}`;

  con.query(`${defaultQuerry}`, (err, updateLockedDateResutl) => {
    if (err) {
      return next(new ErrorHandler(err.sqlMessage, 500));
    } else {
      res.send(updateLockedDateResutl);
    }
  });
};

exports.getLockedState = (req, res, next) => {
  let defaultQuerry = `select * from lockdatetable where locked_date_serial=${1}`;

  con.query(`${defaultQuerry}`, (err, getLockeStateResult) => {
    if (err) {
      return next(new ErrorHandler(err.sqlMessage, 500));
    } else {
      res.send(getLockeStateResult);
    }
  });
};

exports.toggleLock = (req, res, next) => {
  const lock_status = req.query.lock_status;
  let defaultQuerry = `update lockdatetable set lock_status = "${lock_status}" where locked_date_serial = ${1}`;

  con.query(`${defaultQuerry}`, (err, lockeStatusResult) => {
    if (err) {
      return next(new ErrorHandler(err.sqlMessage, 500));
    } else {
      res.send(lockeStatusResult);
    }
  });
};
