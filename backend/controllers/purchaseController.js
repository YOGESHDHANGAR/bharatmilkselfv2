const con = require("../databases/database");
const ErrorHandler = require("../utils/errorhander");
const lastWeekDates = require("../utils/lastWeekDates");
const util = require("util");

// Promisify the con.query function
const queryAsync = util.promisify(con.query).bind(con);

const handleRateAndAmount = async (milkQuantity, milkFat, milkClr) => {
  let remainder = (milkFat * 10) % 3;
  let milkNewFat = milkFat;
  if (remainder === 0) {
    milkNewFat = Number(milkFat) + 0.1;
  } else if (remainder === 1) {
    milkNewFat = Number(milkFat);
  } else if (remainder === 2) {
    milkNewFat = Number(milkFat) - 0.1;
  }

  let getFatRateQuery = `select * from fatratetable where fat_serial = 1`;

  try {
    // Execute the query and wait for the result using async/await
    const getFatRateQueryResult = await queryAsync(getFatRateQuery);

    const fat_rate = getFatRateQueryResult[0].fat_rate;

    let milkPossibleRate = milkNewFat * fat_rate;

    let milkFinalRate =
      milkClr > 24 ? milkPossibleRate : milkPossibleRate - 1 * (25 - milkClr);

    let checked_milk_rate = milkFinalRate.toFixed(2);

    let checked_milk_amount = (milkFinalRate * milkQuantity).toFixed(2);

    return {
      checked_milk_rate,
      checked_milk_amount,
    };
  } catch (err) {
    return new Error(err);
  }
};

exports.createPurchase = async (req, res, next) => {
  const purchase_serial = req.body.purchase_serial;
  const purchase_date = req.body.purchase_date;
  const customer_id = req.body.customer_id;
  const customer_name = req.body.customer_name;
  const purchase_shift = req.body.purchase_shift;
  const milk_type = req.body.milk_type;
  const milk_quantity = req.body.milk_quantity;
  const milk_fat = req.body.milk_fat;
  const milk_clr = req.body.milk_clr;
  let milk_rate = req.body.milk_rate;
  let milk_amount = req.body.milk_amount;

  const { checked_milk_rate, checked_milk_amount } = await handleRateAndAmount(
    milk_quantity,
    milk_fat,
    milk_clr
  );

  milk_rate = checked_milk_rate;
  milk_amount = checked_milk_amount;

  let defaultQuerry = `insert into purchase(purchase_serial, purchase_date,customer_id ,customer_name, purchase_shift, milk_type, milk_quantity, milk_fat, milk_clr, milk_rate, milk_amount) values( ${purchase_serial},"${purchase_date}",${customer_id}, "${customer_name}", "${purchase_shift}", "${milk_type}", ${milk_quantity}, ${milk_fat}, ${milk_clr}, ${milk_rate}, ${milk_amount})`;

  let verifyNameAndIDQuery = `select customer_id from customer where customer_name = "${customer_name}"`;

  const returnObject = {
    purchase_serial,
    purchase_date,
    customer_id,
    customer_name,
    purchase_shift,
    milk_type,
    milk_quantity,
    milk_fat,
    milk_clr,
    milk_rate,
    milk_amount,
  };
  con.query(`${verifyNameAndIDQuery}`, (err, verifyNameAndIDQueryResult) => {
    if (err) {
      return next(new ErrorHandler(err.sqlMessage, 500));
    } else {
      if (
        Number(customer_id) !==
        Number(verifyNameAndIDQueryResult[0].customer_id)
      ) {
        return next(new ErrorHandler("Id of customer not matched!", 401));
      } else {
        con.query(`${defaultQuerry}`, (err, createpurchase) => {
          if (err) {
            return next(new ErrorHandler(err.sqlMessage, 500));
          } else {
            res.send({ createpurchase, returnObject });
          }
        });
      }
    }
  });
};

exports.getLatestPurchaseSerial = (req, res, next) => {
  let defaultQuerry = `select max(purchase_serial) as lastEntry from purchase`;

  con.query(`${defaultQuerry}`, (err, getlatestpurchaseserialResult) => {
    if (err) {
      return next(new ErrorHandler(err.sqlMessage, 500));
    } else {
      res.send(getlatestpurchaseserialResult);
    }
  });
};

exports.getAllPurchases = (req, res, next) => {
  let defaultQuerry = `select * from purchase order by purchase_serial desc limit 1000 `;
  const customeridQuery = req.query.customer_id;
  const nameQuery = req.query.customer_name;
  const fromDateQuery = req.query.fromDate;
  const toDateQuery = req.query.toDate;
  const shiftQuery = req.query.purchase_shift;

  let customeQuerry = "select * from purchase where";
  let totalAmountQuery =
    "select sum(milk_quantity) as requiredTotalMilkQuantity, sum(milk_amount) as requiredTotalMilkAmount from purchase where";

  if (customeridQuery) {
    customeQuerry = customeQuerry + ` customer_id=${customeridQuery} and `;
    totalAmountQuery =
      totalAmountQuery + ` customer_id=${customeridQuery} and `;
  }
  if (nameQuery) {
    customeQuerry = customeQuerry + ` customer_name="${nameQuery}" and`;
    totalAmountQuery = totalAmountQuery + ` customer_name="${nameQuery}" and`;
  }
  if (fromDateQuery && toDateQuery) {
    customeQuerry =
      customeQuerry +
      ` purchase_date>="${fromDateQuery}" and purchase_date<="${toDateQuery}" and`;

    totalAmountQuery =
      totalAmountQuery +
      ` purchase_date>="${fromDateQuery}" and purchase_date<="${toDateQuery}" and`;
  }
  if (shiftQuery && shiftQuery != "Both") {
    customeQuerry = customeQuerry + ` purchase_shift="${shiftQuery}" and`;
    totalAmountQuery = totalAmountQuery + ` purchase_shift="${shiftQuery}" and`;
  }

  if (customeQuerry.length > 28) {
    defaultQuerry = customeQuerry.slice(0, -4);
  }

  if (totalAmountQuery.length >= 101) {
    totalAmountQuery = totalAmountQuery.slice(0, -4);
  }

  con.query(`${defaultQuerry}`, (err, allpurchases) => {
    if (err) {
      res.send(err);
    } else {
      con.query(
        `${totalAmountQuery}`,
        (err, totalQuantityAmountQueryResultofallpurchases) => {
          if (err) {
            return next(new ErrorHandler(err.sqlMessage, 500));
          } else {
            res.send({
              allpurchases,
              totalQuantityAmountQueryResultofallpurchases,
            });
          }
        }
      );
    }
  });
};

exports.weekWisePurchase = (req, res, next) => {
  const noOfWeeks = req.query.noOfWeeks;

  const currentDate = new Date().toJSON().slice(0, 10);

  const { lastWeekStartDate, lastWeekEndDate } = lastWeekDates(
    currentDate,
    noOfWeeks
  );
  let fromDate = lastWeekStartDate;
  let toDate = lastWeekEndDate;
  const fromDateQuery = req.query.fromDate;
  const toDateQuery = req.query.toDate;

  if (fromDateQuery && toDateQuery) {
    fromDate = fromDateQuery;
    toDate = toDateQuery;
  }

  let defaultQuerry = `select customer_id, customer_name, round(sum(milk_quantity),2) as milkTotalQuantity, ROUND(SUM(milk_amount),2) as milkTotalAmount from purchase where purchase_date between "${fromDate}" and "${toDate}"  group by customer_id, customer_name order by customer_name`;
  let totalAmountQuery = `select sum(milk_quantity) as weekTotalQuantity, sum(milk_amount) as weekTotalAmount from purchase  where purchase_date between "${fromDate}" and "${toDate}"`;
  con.query(`${defaultQuerry}`, (err, weekpayment) => {
    if (err) {
      return next(new ErrorHandler(err.sqlMessage, 500));
    } else {
      con.query(
        `${totalAmountQuery}`,
        (err, totalQuantityAmountQueryResult) => {
          if (err) {
            return next(new ErrorHandler(err.sqlMessage, 500));
          } else {
            res.send({ weekpayment, totalQuantityAmountQueryResult });
          }
        }
      );
    }
  });
};

exports.weekWisePurchaseForSecondLastWeek = (req, res, next) => {
  const currentDate = new Date().toJSON().slice(0, 10);
  const { lastWeekStartDate, lastWeekEndDate } = lastWeekDates(currentDate, 2);
  let secondLastWeekStartDate = lastWeekStartDate;
  let secondLastWeekEndDate = lastWeekEndDate;

  let fromDate = secondLastWeekStartDate;
  let toDate = secondLastWeekEndDate;
  let purchase_shift = "Both";
  const fromDateQuery = req.query.fromDate;
  const toDateQuery = req.query.toDate;
  const shiftQuery = req.query.purchase_shift;

  if (fromDateQuery && toDateQuery) {
    fromDate = fromDateQuery;
    toDate = toDateQuery;
  }
  if (shiftQuery && shiftQuery != "Both") {
    purchase_shift = shiftQuery;
  }

  let defaultQuerryfrosecondlastweek = `select customer_name, ROUND(SUM(milk_quantity),2) AS TotalQuantity, ROUND(AVG(milk_fat),2) AS Fat, ROUND(AVG(milk_rate),2) AS RATE, ROUND(SUM(milk_amount),2) AS TotalAmount FROM purchase WHERE purchase_date>="${fromDate}" AND purchase_date<="${toDate}" GROUP BY customer_name ORDER BY customer_name`;

  con.query(
    `${defaultQuerryfrosecondlastweek}`,
    (err, weekpaymentpurchaseforsecondlastweek) => {
      if (err) {
        return next(new ErrorHandler(err.sqlMessage, 500));
      } else {
        res.send(weekpaymentpurchaseforsecondlastweek);
      }
    }
  );
};

exports.customerWisePurchase = (req, res, next) => {
  const currentDate = new Date().toJSON().slice(0, 10);
  const { lastWeekStartDate, lastWeekEndDate } = lastWeekDates(currentDate, 1);

  let fromDate = lastWeekStartDate;
  let toDate = lastWeekEndDate;
  const fromDateQuery = req.query.fromDate;
  const toDateQuery = req.query.toDate;

  if (fromDateQuery && toDateQuery) {
    fromDate = fromDateQuery;
    toDate = toDateQuery;
  }

  let defaultQuerry = `select * from purchase where purchase_date>="${fromDate}" and purchase_date<="${toDate}" order by customer_name asc, purchase_date asc, purchase_shift desc`;
  // let defaultQuerry = `SELECT  * FROM ( SELECT * FROM purchase WHERE purchase_date BETWEEN "${fromDate}" AND "${toDate}" ORDER BY customer_id, name, Date, Shift ) AS subquery_alias order by name, Date, Shift`;
  con.query(`${defaultQuerry}`, (err, customerwisepurchase) => {
    if (err) {
      return next(new ErrorHandler(err.sqlMessage, 500));
    } else {
      res.send(customerwisepurchase);
    }
  });
};

exports.customerWisePurchaseForSecondLastWeek = (req, res, next) => {
  const currentDate = new Date().toJSON().slice(0, 10);
  const { lastWeekStartDate, lastWeekEndDate } = lastWeekDates(currentDate, 2);
  let secondLastWeekStartDate = lastWeekStartDate;
  let secondLastWeekEndDate = lastWeekEndDate;

  let fromDate = secondLastWeekStartDate;
  let toDate = secondLastWeekEndDate;
  const fromDateQuery = req.query.fromDate;
  const toDateQuery = req.query.toDate;

  if (fromDateQuery && toDateQuery) {
    fromDate = fromDateQuery;
    toDate = toDateQuery;
  }
  let defaultQuerryfrosecondlastweek = `select * from purchase where purchase_date>="${fromDate}" and purchase_Date<="${toDate}" order by customer_id, customer_name, purchase_date, purchase_shift`;

  con.query(
    `${defaultQuerryfrosecondlastweek}`,
    (err, customerwisepurchaseforsecondlastweek) => {
      if (err) {
        return next(new ErrorHandler(err.sqlMessage, 500));
      } else {
        res.send(customerwisepurchaseforsecondlastweek);
      }
    }
  );
};

exports.singlePurchase = (req, res, next) => {
  const purchase_serial = req.query.purchase_serial;

  let defaultQuerry = `select * from purchase where purchase_serial=${purchase_serial} `;

  con.query(`${defaultQuerry}`, (err, singlepurchase) => {
    if (err) {
      return next(new ErrorHandler(err.sqlMessage, 500));
    } else {
      res.send(singlepurchase);
    }
  });
};

exports.updatePurchase = async (req, res, next) => {
  const purchase_serial = req.query.purchase_serial;
  const purchase_date = req.body.purchase_date;
  const customer_id = req.body.customer_id;
  const customer_name = req.body.customer_name;
  const purchase_shift = req.body.purchase_shift;
  const milk_type = req.body.milk_type;
  const milk_quantity = req.body.milk_quantity;
  const milk_fat = req.body.milk_fat;
  const milk_clr = req.body.milk_clr;
  let milk_rate = req.body.milk_rate;
  let milk_amount = req.body.milk_amount;

  const { checked_milk_rate, checked_milk_amount } = await handleRateAndAmount(
    milk_quantity,
    milk_fat,
    milk_clr
  );

  milk_rate = checked_milk_rate;
  milk_amount = checked_milk_amount;

  const returnObject = {
    purchase_serial,
    purchase_date,
    customer_id,
    customer_name,
    purchase_shift,
    milk_type,
    milk_quantity,
    milk_fat,
    milk_clr,
    milk_rate,
    milk_amount,
  };

  let defaultQuerry = `update purchase SET purchase_date = "${purchase_date}",customer_id = ${customer_id} , customer_name= "${customer_name}", purchase_shift="${purchase_shift}", milk_type="${milk_type}", milk_quantity=${milk_quantity}, milk_fat=${milk_fat}, milk_clr=${milk_clr}, milk_rate=${milk_rate}, milk_amount=${milk_amount}  WHERE purchase_serial = ${purchase_serial} `;
  let fetchUpdatedEntryQuery = `select * from purchase where purchase_serial = ${purchase_serial}`;

  con.query(`${defaultQuerry}`, (err, updatepurchase) => {
    if (err) {
      return next(new ErrorHandler(err.sqlMessage, 500));
    } else {
      con.query(
        `${fetchUpdatedEntryQuery}`,
        (err, fetchUpdatedEntryQueryResult) => {
          if (err) {
            return next(new ErrorHandler(err.sqlMessage, 500));
          } else {
            res.send({
              updatepurchase,
              returnObject,
              fetchUpdatedEntryQueryResult,
            });
          }
        }
      );
    }
  });
};

exports.deletePurchase = (req, res, next) => {
  const purchase_serial = req.query.purchase_serial;

  let defaultQuerry = `Delete from purchase where purchase_serial=${purchase_serial}`;

  con.query(`${defaultQuerry}`, (err, deletepurchase) => {
    if (err) {
      return next(new ErrorHandler(err.sqlMessage, 500));
    } else {
      res.send(deletepurchase);
    }
  });
};
