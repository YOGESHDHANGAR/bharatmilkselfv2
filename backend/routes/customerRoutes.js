const express = require("express");
const {
  getAllCustomers,
  createCustomer,
  singleCustomer,
  updateCustomer,
  deleteCustomer,
} = require("../controllers/customerController");
const router = express.Router();

router.route("/createcustomer").post(createCustomer);

router.route("/allcustomers").get(getAllCustomers);

router.route("/singlecustomer").get(singleCustomer);

router.route("/updatecustomer").put(updateCustomer);

router.route("/deletecustomer").delete(deleteCustomer);

module.exports = router;
