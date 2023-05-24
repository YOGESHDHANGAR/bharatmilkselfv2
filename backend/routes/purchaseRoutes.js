const express = require("express");
const {
  getAllPurchases,
  createPurchase,
  weekWisePurchase,
  singlePurchase,
  updatePurchase,
  deletePurchase,
  weekWisePurchaseForSecondLastWeek,
  customerWisePurchaseForSecondLastWeek,
  customerWisePurchase,
} = require("../controllers/purchaseController");

const router = express.Router();

router.route("/createpurchase").post(createPurchase);

router.route("/allpurchases").get(getAllPurchases);

router.route("/weekwisepurchase").get(weekWisePurchase);

router
  .route("/weekwisepurchaseforsecondlastweek")
  .get(weekWisePurchaseForSecondLastWeek);

router.route("/singlepurchase").get(singlePurchase);

router.route("/customerwisepurchase").get(customerWisePurchase);

router
  .route("/customerwisepurchaseforsecondlastweek")
  .get(customerWisePurchaseForSecondLastWeek);

router.route("/updatepurchase").put(updatePurchase);

router.route("/deletepurchase").delete(deletePurchase);

module.exports = router;
