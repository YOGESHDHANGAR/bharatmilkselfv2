const mysql = require("mysql");
const ErrorHandler = require("../utils/errorhander");

const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "487215",
  database: "bharatmilk",
  timezone: "utc",
});

con.connect((err) => {
  if (err) {
    return next(new ErrorHandler("Problem connecting with database!", 500));
  }
});

module.exports = con;
