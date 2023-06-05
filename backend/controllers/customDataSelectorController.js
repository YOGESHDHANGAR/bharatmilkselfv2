const con = require("../databases/database");
const ErrorHandler = require("../utils/errorhander");
const util = require("util");

const queryAsync = util.promisify(con.query).bind(con);

const handlePreviousSelectedCustomData = async () => {
  let handlePreviousSelectedCustomDataQuery1 = `(select * from purchase where purchase_date = (select min(purchase_date) from purchase) limit 1)`;

  let handlePreviousSelectedCustomDataQuery2 = `(select * from purchase where purchase_date = (select max(purchase_date) from purchase) limit 1)`;

  try {
    const handlePreviousSelectedCustomDataQueryResult1 = await queryAsync(
      handlePreviousSelectedCustomDataQuery1
    );

    const handlePreviousSelectedCustomDataQueryResult2 = await queryAsync(
      handlePreviousSelectedCustomDataQuery2
    );

    const previousSelectedStartYear =
      handlePreviousSelectedCustomDataQueryResult1[0].purchase_date;

    const previousSelectedEndYear =
      handlePreviousSelectedCustomDataQueryResult2[0].purchase_date;

    return { previousSelectedStartYear, previousSelectedEndYear };
  } catch (err) {
    return new Error(err);
  }
};

exports.getpreviousSelectedYear = async (req, res, next) => {
  try {
    let { previousSelectedStartYear, previousSelectedEndYear } =
      await handlePreviousSelectedCustomData();

    previousSelectedStartYear = String(previousSelectedStartYear);
    previousSelectedEndYear = String(previousSelectedEndYear);

    previousSelectedStartYear = previousSelectedStartYear.split(" ")[3];
    previousSelectedEndYear = previousSelectedEndYear.split(" ")[3];

    if (previousSelectedStartYear === previousSelectedEndYear) {
      previousSelectedEndYear = Number(previousSelectedEndYear) + 1;
    }

    previousSelectedEndYear = String(previousSelectedEndYear);

    res.send({ previousSelectedStartYear, previousSelectedEndYear });
  } catch (error) {}
};

exports.customDataSelector = async (req, res, next) => {
  try {
    const financialYearSelected = req.query.financialYearSelected;

    let startYear = Number(financialYearSelected.split("-")[0]) || 2023;
    let endYear = Number(financialYearSelected.split("-")[1]) || 2024;

    let { previousSelectedStartYear, previousSelectedEndYear } =
      await handlePreviousSelectedCustomData();

    previousSelectedStartYear = String(previousSelectedStartYear);
    previousSelectedEndYear = String(previousSelectedEndYear);

    previousSelectedStartYear = previousSelectedStartYear.split(" ")[3];
    previousSelectedEndYear = previousSelectedEndYear.split(" ")[3];

    if (previousSelectedStartYear === previousSelectedEndYear) {
      previousSelectedEndYear = Number(previousSelectedEndYear) + 1;
    }

    previousSelectedEndYear = String(previousSelectedEndYear);

    let defaultQuerry1 = `UPDATE purchase_hub AS ph
  INNER JOIN purchase AS p ON p.purchase_serial = ph.purchase_serial
  SET
    ph.purchase_date = p.purchase_date,
    ph.customer_id = p.customer_id,
    ph.customer_name = p.customer_name,
    ph.purchase_shift = p.purchase_shift,
    ph.milk_type = p.milk_type,
    ph.milk_quantity = p.milk_quantity,
    ph.milk_fat = p.milk_fat,
    ph.milk_clr = p.milk_clr,
    ph.milk_rate = p.milk_rate,
    ph.milk_amount = p.milk_amount,
    ph.purchase_active_or_not = p.purchase_active_or_not,
    ph.purchase_timestamp = p.purchase_timestamp
    WHERE ph.purchase_date >= '${previousSelectedStartYear}-04-01' AND ph.purchase_date <= '${previousSelectedEndYear}-03-31'
  `;

    let defaultQuerry2 = `INSERT IGNORE INTO purchase_hub (purchase_serial, purchase_date, customer_id, customer_name, purchase_shift, milk_type, milk_quantity, milk_fat, milk_clr, milk_rate, milk_amount, purchase_active_or_not, purchase_timestamp)
  SELECT purchase_serial, purchase_date, customer_id, customer_name, purchase_shift, milk_type, milk_quantity, milk_fat, milk_clr, milk_rate, milk_amount, purchase_active_or_not, purchase_timestamp
  FROM purchase
  `;

    let defaultQuerry3 = `DELETE ph
  FROM purchase_hub AS ph
  WHERE ph.purchase_date >= '${previousSelectedStartYear}-04-01' AND ph.purchase_date <= '${previousSelectedEndYear}-03-31'
  AND NOT EXISTS (
      SELECT 1
      FROM purchase AS p
      WHERE p.purchase_serial = ph.purchase_serial
  )  
  `;

    let defaultQuerry4 = `DELETE FROM purchase`;

    let defaultQuerry5 = `INSERT INTO purchase (purchase_serial, purchase_date, customer_id, customer_name, purchase_shift, milk_type, milk_quantity, milk_fat, milk_clr, milk_rate, milk_amount, purchase_active_or_not, purchase_timestamp)
  SELECT ph.purchase_serial, ph.purchase_date, ph.customer_id, ph.customer_name, ph.purchase_shift, ph.milk_type, ph.milk_quantity, ph.milk_fat, ph.milk_clr, ph.milk_rate, ph.milk_amount, ph.purchase_active_or_not, ph.purchase_timestamp
  FROM purchase_hub AS ph
  WHERE ph.purchase_date >='${startYear}-04-01' and  ph.purchase_date <= '${endYear}-03-31'
  `;

    const result1 = await queryAsync(defaultQuerry1);

    const result2 = await queryAsync(defaultQuerry2);

    const result3 = await queryAsync(defaultQuerry3);

    const result4 = await queryAsync(defaultQuerry4);

    const customDataSelectorResult = await queryAsync(defaultQuerry5);

    res.send(customDataSelectorResult);
  } catch (error) {
    return next(new ErrorHandler(error.sqlMessage, 500));
  }
};
