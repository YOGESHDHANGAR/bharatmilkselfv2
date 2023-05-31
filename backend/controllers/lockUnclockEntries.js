const con = require("../databases/database");

exports.updateLockedDate = (req, res, next) => {
  const newLockedDate = req.query.newLockedDate;

  let defaultQuerry = `UPDATE lockdatetable set locked_date = "${newLockedDate}" where locked_date_serial = ${1} `;
  con.query(`${defaultQuerry}`, (err, updateLockedDateResutl) => {
    if (err) {
      return next(new ErrorHandler(err.sqlMessage, 500));
    } else {
      res.send(updateLockedDateResutl);
    }
  });
};

exports.getLockUnclockDate = (req, res, next) => {
  let defaultQuerry = `select * from `;
};
