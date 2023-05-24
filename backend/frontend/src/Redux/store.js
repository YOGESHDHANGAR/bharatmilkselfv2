import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  createPurchaseReducer,
  customerWisePurchaseForSecondLastWeekReducer,
  customerWisePurchaseReducer,
  getAllPurchaseReducer,
  getLatestPurchaseSerialReducer,
  weekWisePurchaseForSecondLastWeekReducer,
  weekWisePurchaseReducer,
} from "./reducers/purchaseReducers";
import {
  singlePurchaseReducer,
  updatePurchaseReducer,
  deletePurchaseReducer,
} from "./reducers/purchaseReducers";
import {
  createCustomerReducer,
  deleteCustomerReducer,
  getAllCustomerReducer,
  singleCustomerReducer,
  updateCustomerReducer,
} from "./reducers/customerReducers";
import {
  getFatRateReducer,
  updateFatRateReducer,
} from "./reducers/fatRateReducers";

const reducer = combineReducers({
  createpurchase: createPurchaseReducer,
  getlatestpurchaseserial: getLatestPurchaseSerialReducer,
  allpurchases: getAllPurchaseReducer,
  weekwisepurchase: weekWisePurchaseReducer,
  weekwisepurchaseforsecondlastweek: weekWisePurchaseForSecondLastWeekReducer,
  customerwisepurchase: customerWisePurchaseReducer,
  customerwisepurchaseforsecondlastweek:
    customerWisePurchaseForSecondLastWeekReducer,
  singlepurchase: singlePurchaseReducer,
  updatepurchase: updatePurchaseReducer,
  deletepurchase: deletePurchaseReducer,
  createcustomer: createCustomerReducer,
  allcustomers: getAllCustomerReducer,
  singlecustomer: singleCustomerReducer,
  updatecustomer: updateCustomerReducer,
  deletecustomer: deleteCustomerReducer,
  getfatrate: getFatRateReducer,
  updatefatrate: updateFatRateReducer,
});
let initialState = {};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
