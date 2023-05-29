const con = require("../databases/database");
const ErrorHandler = require("../utils/errorhander");

exports.createCustomer = (req, res, next) => {
  const customer_name = req.body.customer_name;
  const trimmedName = customer_name.trim();
  const formattedName = trimmedName.replace(/\s+/g, " ");

  if (formattedName.length < 1) {
    return next(new ErrorHandler("Please Select Valid Customer Name", 500));
  }

  let defaultQuerry = `insert into customer(customer_name) values("${formattedName}")`;
  con.query(`${defaultQuerry}`, (err, createcustomer) => {
    if (err) {
      return next(new ErrorHandler(err.sqlMessage, 500));
    } else {
      res.send(createcustomer);
    }
  });
};

exports.getAllCustomers = (req, res, next) => {
  const unfiltered = req.query.unfiltered;
  let defaultQuerry = unfiltered
    ? `select * from customer order by customer_name`
    : `select * from customer where customer_active_or_not=${1} order by customer_name`;
  con.query(`${defaultQuerry}`, (err, allcustomers) => {
    if (err) {
      return next(new ErrorHandler(err.sqlMessage, 500));
    } else {
      res.send(allcustomers);
    }
  });
};

exports.singleCustomer = (req, res, next) => {
  const customer_id = req.query.customer_id;

  let defaultQuerry = `select * from customer where customer_id=${customer_id} `;

  con.query(`${defaultQuerry}`, (err, singlecustomer) => {
    if (err) {
      return next(new ErrorHandler(err.sqlMessage, 500));
    } else {
      res.send(singlecustomer);
    }
  });
};

exports.updateCustomer = (req, res, next) => {
  const customer_id = req.body.customer_id;
  const customer_name = req.body.customer_name;
  const trimmedName = customer_name.trim();
  const formattedName = trimmedName.replace(/\s+/g, " ");

  if (formattedName.length < 1) {
    return next(new ErrorHandler("Please Select Valid Customer Name", 500));
  }
  let defaultQuerry = `update customer SET  customer_name= "${formattedName}" where customer_id = ${customer_id} `;

  let updateCustomerNameInPurchase = `update purchase SET customer_name = "${formattedName}" where customer_id = ${customer_id}`;

  con.query(`${defaultQuerry}`, (err, updatecustomer) => {
    if (err) {
      return next(new ErrorHandler(err.sqlMessage, 500));
    } else {
      con.query(
        `${updateCustomerNameInPurchase}`,
        (err, updateCustomerNameInPurchaseResult) => {
          if (err) {
            return next(new ErrorHandler(err.sqlMessage, 500));
          }
        }
      );
      res.send(updatecustomer);
    }
  });
};

exports.deleteCustomer = (req, res, next) => {
  const customer_id = req.query.customer_id;

  let defaultQuerry = `Delete from customer where customer_id=${customer_id}`;

  con.query(`${defaultQuerry}`, (err, deletecustomer) => {
    if (err) {
      return next(new ErrorHandler(err.sqlMessage, 500));
    } else {
      res.send(deletecustomer);
    }
  });
};

exports.customerActiceOrInactive = (req, res, next) => {
  const customer_id = req.query.customer_id;
  const new_customer_active_or_not = req.query.new_customer_active_or_not;
  let defaultQuerry = `update customer set customer_active_or_not= "${new_customer_active_or_not}" where customer_id = ${customer_id} `;

  let updatePurchaseActiveOrInactiveQuery = `update purchase set purchase_active_or_not= "${new_customer_active_or_not}" where customer_id = ${customer_id}`;

  con.query(`${defaultQuerry}`, (err, customerActiceOrInactiveResult) => {
    if (err) {
      return next(new ErrorHandler(err.sqlMessage, 500));
    } else {
      con.query(
        `${updatePurchaseActiveOrInactiveQuery}`,
        (err, updatePurchaseActiveOrInactiveResut) => {
          if (err) {
            return next(new ErrorHandler(err.sqlMessage, 500));
          } else {
            res.send(customerActiceOrInactiveResult);
          }
        }
      );
    }
  });
};
