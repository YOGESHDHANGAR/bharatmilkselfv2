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
    console.log(err.message);
  } else {
    console.log("Database Connected Successfully!");
  }
});

module.exports = con;
