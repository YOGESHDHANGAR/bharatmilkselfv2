import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  createPurchaseReducer,
  customerWisePurchaseForSecondLastWeekReducer,
  customerWisePurchaseOutliersActionReducer,
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
import {
  customDataSelectorReducer,
  getpreviousSelectedYearReducer,
} from "./reducers/customDataSelectorReducer";
import {
  getLockDateReducer,
  getLockStateReducer,
  getUpdatedLockDateReducer,
  toggleLockReducer,
} from "./reducers/lockUnlockEntriesReducer";

const reducer = combineReducers({
  getpreviousselectedyear: getpreviousSelectedYearReducer,
  customdataselector: customDataSelectorReducer,
  createpurchase: createPurchaseReducer,
  getlatestpurchaseserial: getLatestPurchaseSerialReducer,
  allpurchases: getAllPurchaseReducer,
  weekwisepurchase: weekWisePurchaseReducer,
  customerwisepurchase: customerWisePurchaseReducer,
  customerwisepurchaseoutliers: customerWisePurchaseOutliersActionReducer,
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
  getlockeddate: getLockDateReducer,
  getupdatedlockeddate: getUpdatedLockDateReducer,
  getlockstate: getLockStateReducer,
  togglelock: toggleLockReducer,
});
let initialState = {};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
