const con = require("../databases/database");
const ErrorHandler = require("../utils/errorhander");

exports.createCustomer = (req, res, next) => {
  const customer_id = req.body.customer_id;
  const customer_name = req.body.customer_name;
  const trimmedName = customer_name.trim();
  const formattedName = trimmedName.replace(/\s+/g, " ");

  let defaultQuerry = `insert into customer(customer_id, customer_name) values( ${customer_id},"${formattedName}")`;
  con.query(`${defaultQuerry}`, (err, createcustomer) => {
    if (err) {
      return next(new ErrorHandler(err.sqlMessage, 500));
    } else {
      res.send(createcustomer);
    }
  });
};

exports.getAllCustomers = (req, res, next) => {
  let defaultQuerry = `select * from customer order by customer_name`;
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
  let defaultQuerry = `UPDATE customer SET  customer_name= "${customer_name}" WHERE customer_id = ${customer_id} `;

  let updateCustomerNameInPurchase = `UPDATE purchase SET Name = "${customer_name}" WHERE customer_id = ${customer_id}`;

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
