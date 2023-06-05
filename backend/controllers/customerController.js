const con = require("../databases/database");
const ErrorHandler = require("../utils/errorhander");

const util = require("util");

const queryAsync = util.promisify(con.query).bind(con);

exports.createCustomer = async (req, res, next) => {
  try {
    const customer_name = req.body.customer_name;
    const trimmedName = customer_name.trim();
    const formattedName = trimmedName.replace(/\s+/g, " ");

    if (formattedName.length < 1) {
      return next(new ErrorHandler("Please Select Valid Customer Name", 500));
    }

    let defaultQuerry = `insert into customer(customer_name) values("${formattedName}")`;

    const createcustomer = await queryAsync(defaultQuerry);

    res.send(createcustomer);
  } catch (error) {
    return next(new ErrorHandler(error.sqlMessage, 500));
  }
};

exports.getAllCustomers = async (req, res, next) => {
  try {
    const unfiltered = req.query.unfiltered;
    let defaultQuerry = unfiltered
      ? `select * from customer order by customer_name`
      : `select * from customer where customer_active_or_not=${1} order by customer_name`;

    const allcustomers = await queryAsync(defaultQuerry);

    res.send(allcustomers);
  } catch (error) {
    return next(new ErrorHandler(error.sqlMessage, 500));
  }
};

exports.singleCustomer = async (req, res, next) => {
  try {
    const customer_id = req.query.customer_id;

    let defaultQuerry = `select * from customer where customer_id=${customer_id} `;

    const singlecustomer = await queryAsync(defaultQuerry);

    res.send(singlecustomer);
  } catch (error) {
    return next(new ErrorHandler(error.sqlMessage, 500));
  }
};

exports.updateCustomer = async (req, res, next) => {
  try {
    const customer_id = req.body.customer_id;
    const customer_name = req.body.customer_name;
    const trimmedName = customer_name.trim();
    const formattedName = trimmedName.replace(/\s+/g, " ");

    if (formattedName.length < 1) {
      return next(new ErrorHandler("Please Select Valid Customer Name", 500));
    }
    let defaultQuerry = `update customer SET  customer_name= "${formattedName}" where customer_id = ${customer_id} `;

    let updateCustomerNameInPurchase = `update purchase SET customer_name = "${formattedName}" where customer_id = ${customer_id}`;

    let updateCustomerNameInPurchase_hub = `update purchase_hub SET customer_name = "${formattedName}" where customer_id = ${customer_id}`;

    const updatecustomer = await queryAsync(defaultQuerry);

    const updateCustomerNameInPurchaseResult = await queryAsync(
      updateCustomerNameInPurchase
    );

    const updateCustomerNameInPurchase_hubResult = await queryAsync(
      updateCustomerNameInPurchase_hub
    );

    res.send(updatecustomer);
  } catch (error) {
    return next(new ErrorHandler(error.sqlMessage, 500));
  }
};

exports.deleteCustomer = async (req, res, next) => {
  try {
    const customer_id = req.query.customer_id;

    let defaultQuerry = `Delete from customer where customer_id=${customer_id}`;

    const deletecustomer = await queryAsync(defaultQuerry);

    res.send(deletecustomer);
  } catch (error) {
    return next(new ErrorHandler(error.sqlMessage, 500));
  }
};

exports.customerActiceOrInactive = async (req, res, next) => {
  try {
    const customer_id = req.query.customer_id;
    const new_customer_active_or_not = req.query.new_customer_active_or_not;
    let defaultQuerry = `update customer set customer_active_or_not= "${new_customer_active_or_not}" where customer_id = ${customer_id} `;

    let updatePurchaseActiveOrInactiveQuery = `update purchase set purchase_active_or_not= "${new_customer_active_or_not}" where customer_id = ${customer_id}`;

    const customerActiceOrInactiveResult = await queryAsync(defaultQuerry);

    const updatePurchaseActiveOrInactiveResut = await queryAsync(
      updatePurchaseActiveOrInactiveQuery
    );

    res.send(customerActiceOrInactiveResult);
  } catch (error) {
    return next(new ErrorHandler(error.sqlMessage, 500));
  }
};
