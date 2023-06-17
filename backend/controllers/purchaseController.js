const con = require("../databases/database");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const ErrorHandler = require("../utils/errorhander");
const lastWeekDates = require("../utils/lastWeekDates");
const util = require("util");

// Promisify the con.query function
const queryAsync = util.promisify(con.query).bind(con);

const handleLockedDate = async () => {
  try {
    let getLockedDateQuery = `select * from lockdatetable where locked_date_serial = 1`;

    const getLockedDateQueryResult = await queryAsync(getLockedDateQuery);
    return getLockedDateQueryResult;
  } catch (err) {
    return new Error(err);
  }
};

const handleCertainNumberOfEntriesOnDate = async (
  purchase_date,
  purchase_shift,
  customer_id
) => {
  try {
    let getEntryCountQuery = `select  count(*) as entryCount from purchase where purchase_date = "${purchase_date}" and purchase_shift="${purchase_shift}" and customer_id=${customer_id}`;
    const getEntryCountQueryResult = await queryAsync(getEntryCountQuery);

    if (getEntryCountQueryResult[0].entryCount >= 1) {
      return true;
    }

    return false;
  } catch (err) {
    return new Error(err);
  }
};

const handleRateAndAmount = async (milkQuantity, milkFat, milkClr) => {
  try {
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

exports.createPurchase = catchAsyncErrors(async (req, res, next) => {
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
  const allow_duplicate = req.body.allow_duplicate;

  const { checked_milk_rate, checked_milk_amount } = await handleRateAndAmount(
    milk_quantity,
    milk_fat,
    milk_clr
  );

  const getLockedDateQueryResult = await handleLockedDate();

  let got_locked_date = getLockedDateQueryResult[0].locked_date;
  let lock_status = getLockedDateQueryResult[0].lock_status;

  const new_purchase_date = new Date(purchase_date);

  if (lock_status === 1 && new_purchase_date <= got_locked_date) {
    return next(
      new ErrorHandler(
        `Not allowd below date ${purchase_date} first unlock it!`,
        401
      )
    );
  }

  milk_rate = checked_milk_rate;
  milk_amount = checked_milk_amount;

  if (allow_duplicate === "false") {
    const k = await handleCertainNumberOfEntriesOnDate(
      purchase_date,
      purchase_shift,
      customer_id
    );
    if (k === true) {
      return next(
        new ErrorHandler(
          `Customer:${customer_name}\nDate:${purchase_date}\nShift:${purchase_shift}\npar already entry ho rakhi h, agar customer do ya usse adhik baar dudh laya h to top left corner pr button ko active krdijiye!`,
          401
        )
      );
    }
  }

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

  const verifyNameAndIDQueryResult = await queryAsync(verifyNameAndIDQuery);

  if (
    Number(customer_id) !== Number(verifyNameAndIDQueryResult[0].customer_id)
  ) {
    return next(new ErrorHandler("Id of customer not matched!", 401));
  }

  const createpurchase = await queryAsync(defaultQuerry);

  res.send({ createpurchase, returnObject });
});

exports.getLatestPurchaseSerial = catchAsyncErrors(async (req, res, next) => {
  let defaultQuerry = `select max(purchase_serial) as lastEntry from purchase`;
  // let defaultQuerry = `select max(purchase_serial) as lastEntry from purchase_hub`;
  const getlatestpurchaseserialResult = await queryAsync(defaultQuerry);
  res.send(getlatestpurchaseserialResult);
});

exports.getAllPurchases = catchAsyncErrors(async (req, res, next) => {
  let defaultQuerry = `select * from purchase where purchase_active_or_not=1 order by purchase_serial desc limit 1000`;
  // let defaultQuerry = `select p.purchase_serial, p.purchase_date,  c.customer_id, c.customer_name , p.purchase_shift, p.milk_type, p.milk_fat, p.milk_clr, p.milk_rate, p.milk_quantity , p.milk_amount FROM customer c join purchase p on c.customer_id = p.customer_id order by p.purchase_serial desc limit 1000`;

  const customeridQuery = req.query.customer_id;
  const nameQuery = req.query.customer_name;
  const fromDateQuery = req.query.fromDate;
  const toDateQuery = req.query.toDate;
  const shiftQuery = req.query.purchase_shift;

  let customeQuerry = `select * from purchase where purchase_active_or_not=${1} and`;

  let totalAmountQuery = `select round(sum(milk_quantity),1) as requiredTotalMilkQuantity, round(sum(milk_amount),2) as requiredTotalMilkAmount from purchase where purchase_active_or_not=${1} and`;

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

  if (customeQuerry.length > 57) {
    defaultQuerry = customeQuerry.slice(0, -4);
  }

  totalAmountQuery = totalAmountQuery.slice(0, -4);

  const allpurchases = await queryAsync(defaultQuerry);

  const totalQuantityAmountQueryResultofallpurchases = await queryAsync(
    totalAmountQuery
  );

  res.send({
    allpurchases,
    totalQuantityAmountQueryResultofallpurchases,
  });
});

const calculaeWeekWisePurchase = async (weekNumber, currentDate1) => {
  try {
    const { lastWeekStartDate, lastWeekEndDate } = lastWeekDates(
      currentDate1,
      weekNumber
    );

    const fromDate = lastWeekStartDate;
    const toDate = lastWeekEndDate;

    let calculaeWeekWisePurchaseQuery;
    let calculaeWeekWisePurchaseTotalAmountQuery = `select sum(milk_quantity) as weekTotalQuantity, sum(milk_amount) as weekTotalAmount from purchase  where purchase_active_or_not=${1} and purchase_date between "${fromDate}" and "${toDate}"`;
    if (weekNumber === 1) {
      calculaeWeekWisePurchaseQuery = `select customer_id, customer_name, round(sum(milk_quantity),2) as milkTotalQuantity, round(sum(milk_amount),2) as milkTotalAmount from purchase where purchase_active_or_not=${1} and purchase_date between "${fromDate}" and "${toDate}"  group by customer_id, customer_name order by customer_name`;
    } else {
      const { lastWeekStartDate, lastWeekEndDate } = lastWeekDates(
        currentDate1,
        1
      );

      calculaeWeekWisePurchaseQuery = `
      SELECT
      c.customer_id,
      c.customer_name,
      ROUND(SUM(p.milk_quantity), 2) AS milkTotalQuantity,
      ROUND(SUM(p.milk_amount), 2) AS milkTotalAmount
      FROM
        customer AS c
      LEFT JOIN
        (
          SELECT
            customer_id,
            milk_quantity,
            milk_amount
          FROM
            purchase
          WHERE 
          purchase_active_or_not=${1} and
          purchase_date >= '${fromDate}' AND purchase_date <= '${toDate}'
        ) AS p ON c.customer_id = p.customer_id
      WHERE
        c.customer_id IN (
          SELECT DISTINCT customer_id
          FROM purchase
          WHERE purchase_active_or_not=${1} and purchase_date >= '${lastWeekStartDate}' AND purchase_date <= '${lastWeekEndDate}'
        )
      GROUP BY
        c.customer_id,
        c.customer_name
      ORDER BY
        c.customer_name;
      `;
    }
    const calculaeWeekWisePurchaseQueryResult = await queryAsync(
      calculaeWeekWisePurchaseQuery
    );

    const calculaeWeekWisePurchaseTotalAmountQueryResult = await queryAsync(
      calculaeWeekWisePurchaseTotalAmountQuery
    );

    return {
      calculaeWeekWisePurchaseQueryResult,
      calculaeWeekWisePurchaseTotalAmountQueryResult,
    };
  } catch (err) {
    return new Error(err);
  }
};

exports.weekWisePurchase = catchAsyncErrors(async (req, res, next) => {
  const todayDate = new Date().toJSON().slice(0, 10);
  const fromDateQuery = req.query.fromDate;
  const toDateQuery = req.query.toDate;

  let lastWeek1;
  let lastWeek2;
  let lastWeek3;
  let lastWeek4;

  if (fromDateQuery && toDateQuery) {
    fromDate = fromDateQuery;
    toDate = toDateQuery;
    lastWeek1 = await calculaeWeekWisePurchase(1, fromDate);
    lastWeek2 = await calculaeWeekWisePurchase(2, fromDate);
    lastWeek3 = await calculaeWeekWisePurchase(3, fromDate);
    lastWeek4 = await calculaeWeekWisePurchase(4, fromDate);
  } else {
    lastWeek1 = await calculaeWeekWisePurchase(1, todayDate);
    lastWeek2 = await calculaeWeekWisePurchase(2, todayDate);
    lastWeek3 = await calculaeWeekWisePurchase(3, todayDate);
    lastWeek4 = await calculaeWeekWisePurchase(4, todayDate);
  }

  res.send({ lastWeek1, lastWeek2, lastWeek3, lastWeek4 });
});

exports.customerWisePurchase = catchAsyncErrors(async (req, res, next) => {
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

  let defaultQuerry = `select * from purchase where purchase_active_or_not=${1} and purchase_date>="${fromDate}" and purchase_date<="${toDate}" order by customer_name asc, purchase_date asc, purchase_shift desc`;

  const customerwisepurchase = await queryAsync(defaultQuerry);
  res.send(customerwisepurchase);
});

exports.singlePurchase = catchAsyncErrors(async (req, res, next) => {
  const purchase_serial = req.query.purchase_serial;

  let defaultQuerry = `select * from purchase where purchase_serial=${purchase_serial}`;

  const singlepurchase = await queryAsync(defaultQuerry);
  res.send(singlepurchase);
});

exports.updatePurchase = catchAsyncErrors(async (req, res, next) => {
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
  const allow_duplicate = req.body.allow_duplicate;

  const getLockedDateQueryResult = await handleLockedDate();

  let got_locked_date = getLockedDateQueryResult[0].locked_date;
  let lock_status = getLockedDateQueryResult[0].lock_status;

  const new_purchase_date = new Date(purchase_date);

  if (lock_status === 1 && new_purchase_date <= got_locked_date) {
    return next(
      new ErrorHandler(
        `Not allowd below date ${purchase_date} first unlock it!`,
        401
      )
    );
  }

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

  let defaultQuerry = `update purchase set purchase_date = "${purchase_date}",customer_id = ${customer_id} , customer_name= "${customer_name}", purchase_shift="${purchase_shift}", milk_type="${milk_type}", milk_quantity=${milk_quantity}, milk_fat=${milk_fat}, milk_clr=${milk_clr}, milk_rate=${milk_rate}, milk_amount=${milk_amount}  WHERE purchase_serial = ${purchase_serial} `;
  let fetchUpdatedEntryQuery = `select * from purchase where purchase_serial = ${purchase_serial}`;

  const updatepurchase = await queryAsync(defaultQuerry);

  const fetchUpdatedEntryQueryResult = await queryAsync(fetchUpdatedEntryQuery);

  res.send({
    updatepurchase,
    returnObject,
    fetchUpdatedEntryQueryResult,
  });
});

exports.deletePurchase = catchAsyncErrors(async (req, res, next) => {
  let purchase_serial = req.query.purchase_serial;
  let purchase_date = req.query.purchase_date;

  const getLockedDateQueryResult = await handleLockedDate();

  let got_locked_date = getLockedDateQueryResult[0].locked_date;
  let lock_status = getLockedDateQueryResult[0].lock_status;

  const new_purchase_date = new Date(purchase_date);

  if (lock_status === 1 && new_purchase_date <= got_locked_date) {
    return next(
      new ErrorHandler(
        `Not allowd below date ${purchase_date} first unlock it!`,
        401
      )
    );
  }

  let defaultQuerry = `delete from purchase where purchase_serial=${purchase_serial}`;

  const deletepurchase = await queryAsync(defaultQuerry);

  res.send(deletepurchase);
});

const performOutlierDetectionForPython = () => {
  try {
    const { exec } = require("child_process");

    const pythonScriptPath =
      "D:\\YouTube\\SelfProject\\bharatmilkselfv2(plant)\\backend\\controllers\\outlier_detection.py";

    exec(`python ${pythonScriptPath}`, (error, stdout, stderr) => {
      if (error) {
        console.error(`Python script execution error: ${error}`);
      } else {
        console.log(`Python script executed successfully.`);
        console.log(`stdout: ${stdout}`);
        // console.error(`stderr: ${stderr}`);
      }
    });
  } catch (error) {}
};

const performOutlierDetection = (data) => {
  const stats = require("simple-statistics");

  // Extract the milk quantity and milk amount from the data
  const samples = data.map((row) => [row.milk_quantity, row.milk_amount]);

  // Calculate mean and standard deviation for each attribute
  const means = samples[0].map((_, i) =>
    stats.mean(samples.map((sample) => sample[i]))
  );

  const stdevs = samples[0].map((_, i) =>
    stats.standardDeviation(samples.map((sample) => sample[i]))
  );

  // Set a threshold to determine outliers (adjust as needed)
  const threshold = 2.3;

  // Filter the data to include outliers only
  const outliers = data.filter((row, index) => {
    const [milkQuantity, milkAmount] = samples[index];
    const zScore1 = (milkQuantity - means[0]) / stdevs[0];
    const zScore2 = (milkAmount - means[1]) / stdevs[1];
    return zScore1 > threshold || zScore2 > threshold;
  });

  // Return the detected outliers
  const insertQuery = `insert outliers_table(purchase_serial,purchase_date,customer_id,customer_name,purchase_shift,milk_type,milk_quantity,milk_fat,milk_clr,milk_rate,milk_amount,purchase_active_or_not,purchase_timestamp)VALUES ?`;
  const VALUES = outliers.map((outlier) => [
    outlier.purchase_serial,
    outlier.purchase_date,
    outlier.customer_id,
    outlier.customer_name,
    outlier.purchase_shift,
    outlier.milk_type,
    outlier.milk_quantity,
    outlier.milk_fat,
    outlier.milk_clr,
    outlier.milk_rate,
    outlier.milk_amount,
    outlier.purchase_active_or_not,
    outlier.purchase_timestamp,
  ]);

  con.query(`${insertQuery}`, [VALUES], (err, result) => {
    if (err) {
      // return next(new ErrorHandler(err.sqlMessage, 500));
    } else {
      // res.send(result);
    }
  });
  return outliers;
};

exports.customerWisePurchaseOutliers = catchAsyncErrors(
  async (req, res, next) => {
    // const currentDate = new Date().toJSON().slice(0, 10);
    // const { lastWeekStartDate, lastWeekEndDate } = lastWeekDates(
    //   currentDate,
    //   1
    // );
    // let fromDate = lastWeekStartDate;
    // let toDate = lastWeekEndDate;
    // const fromDateQuery = req.query.fromDate;
    // const toDateQuery = req.query.toDate;
    // if (fromDateQuery && toDateQuery) {
    //   fromDate = fromDateQuery;
    //   toDate = toDateQuery;
    // }
    // const queryForEmptyOutliersTable = `delete from outliers_table`;
    // const queryForEmptyOutliersTableResult = await queryAsync(
    //   queryForEmptyOutliersTable
    // );
    // const queryForFindingOutliers = `select * from purchase where purchase_active_or_not=${1} order by customer_id, purchase_shift`;
    // // const queryForFindingOutliers = `select * from purchase_hub where purchase_active_or_not=${1} and purchase_date>= "${fromDate}" and purchase_date<="${toDate}" order by customer_id, purchase_shift`;
    // const queryForFindingOutliersResult = await queryAsync(
    //   queryForFindingOutliers
    // );
    // const morningData = queryForFindingOutliersResult.filter(
    //   (row) => row.purchase_shift === "Morning"
    // );
    // const eveningData = queryForFindingOutliersResult.filter(
    //   (row) => row.purchase_shift === "Evening"
    // );
    // performOutlierDetection(morningData);
    // performOutlierDetection(eveningData);
    // // performOutlierDetectionForPython();
    // const defaultQuerry = `select * from outliers_table where purchase_date>= "${fromDate}" and purchase_date<="${toDate}"`;
    // const result = await queryAsync(defaultQuerry);
    // res.send(result);
  }
);
