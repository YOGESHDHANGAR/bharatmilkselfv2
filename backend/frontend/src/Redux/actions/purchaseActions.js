import axios from "axios";
import {
  ALL_PURCHASE_FAIL,
  ALL_PURCHASE_REQUEST,
  ALL_PURCHASE_SUCCESS,
  DELETE_PURCHASE_FAIL,
  DELETE_PURCHASE_REQUEST,
  DELETE_PURCHASE_SUCCESS,
  SINGLE_PURCHASE_FAIL,
  SINGLE_PURCHASE_REQUEST,
  SINGLE_PURCHASE_SUCCESS,
  CREATE_PURCHASE_FAIL,
  CREATE_PURCHASE_REQUEST,
  CREATE_PURCHASE_SUCCESS,
  UPDATE_PURCHASE_FAIL,
  UPDATE_PURCHASE_REQUEST,
  UPDATE_PURCHASE_SUCCESS,
  CUSTOMER_WISE_PURCHASE_FAIL,
  CUSTOMER_WISE_PURCHASE_SUCCESS,
  CUSTOMER_WISE_PURCHASE_REQUEST,
  WEEK_WISE_PURCHASE_SUCCESS,
  WEEK_WISE_PURCHASE_REQUEST,
  WEEK_WISE_PURCHASE_FOR_SECOND_LAST_WEEK_REQUEST,
  WEEK_WISE_PURCHASE_FOR_SECOND_LAST_WEEK_SUCCESS,
  CUSTOMER_WISE_PURCHASE_FOR_SECOND_LAST_WEEK_REQUEST,
  CUSTOMER_WISE_PURCHASE_FOR_SECOND_LAST_WEEK_SUCCESS,
  CUSTOMER_WISE_PURCHASE_FOR_SECOND_LAST_WEEK_FAIL,
  WEEK_WISE_PURCHASE_FAIL,
  WEEK_WISE_PURCHASE_FOR_SECOND_LAST_WEEK_FAIL,
  CLEAR_ERRORS,
  GET_LATEST_PURCHASE_SERIAL_REQUEST,
  GET_LATEST_PURCHASE_SERIAL_SUCCESS,
  GET_LATEST_PURCHASE_SERIAL_FAIL,
} from "../constants/purchaseConstants";

//Create Purchase
export const createPurchaseAction = (myForm) => async (dispatch) => {
  try {
    dispatch({
      type: CREATE_PURCHASE_REQUEST,
    });

    const config = {
      headers: { "Content-Type": "application/json" },
    };
    let link = `http://localhost:5000/api/v1/createpurchase`;
    const { data } = await axios.post(link, myForm, config);

    dispatch({
      type: CREATE_PURCHASE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CREATE_PURCHASE_FAIL,
      payload: error.response.data.message,
    });
  }
};

//Get latest purchase serial
export const getLatestPurchaseSerialAction = () => async (dispatch) => {
  try {
    dispatch({
      type: GET_LATEST_PURCHASE_SERIAL_REQUEST,
    });

    let link = `http://localhost:5000/api/v1/getlatestpurchaseserial`;

    const { data } = await axios.get(link);

    dispatch({
      type: GET_LATEST_PURCHASE_SERIAL_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_LATEST_PURCHASE_SERIAL_FAIL,
      payload: error.response.data.message,
    });
  }
};

//Get All Purchase Details
export const getAllPurchaseAction =
  (customerId, customerName, fromDate, toDate, purchaseShift) =>
  async (dispatch) => {
    try {
      dispatch({
        type: ALL_PURCHASE_REQUEST,
      });

      let link = `http://localhost:5000/api/v1/allpurchases?`;
      if (customerId) {
        link = link + `customer_id=${customerId}&`;
      }
      if (customerName) {
        link = link + `customer_name=${customerName}&`;
      }
      if (fromDate) {
        link = link + `fromDate=${fromDate}&`;
      }
      if (toDate) {
        link = link + `toDate=${toDate}&`;
      }
      if (purchaseShift) {
        link = link + `purchase_shift=${purchaseShift}&`;
      }
      link = link.slice(0, -1);

      const { data } = await axios.get(link);

      dispatch({
        type: ALL_PURCHASE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: ALL_PURCHASE_FAIL,
        payload: error.response.data.message,
      });
    }
  };

//Get Single Purchase Details
export const singlePurchaseAction = (purchaseSerial) => async (dispatch) => {
  try {
    dispatch({
      type: SINGLE_PURCHASE_REQUEST,
    });

    let link = `http://localhost:5000/api/v1/singlepurchase?`;
    if (purchaseSerial) {
      link = link + `purchase_serial=${purchaseSerial}&`;
    }
    link = link.slice(0, -1);

    const { data } = await axios.get(link);

    dispatch({
      type: SINGLE_PURCHASE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: SINGLE_PURCHASE_FAIL,
      payload: error.response.data.message,
    });
  }
};

//Update Purchase
export const updatePurchaseAction =
  (purchaseSerial, myForm) => async (dispatch) => {
    try {
      dispatch({
        type: UPDATE_PURCHASE_REQUEST,
      });

      const config = {
        headers: { "Content-Type": "application/json" },
      };
      let link = `http://localhost:5000/api/v1/updatepurchase?purchase_serial=${purchaseSerial}`;
      const { data } = await axios.put(link, myForm, config);

      dispatch({
        type: UPDATE_PURCHASE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: UPDATE_PURCHASE_FAIL,
        payload: error.response.data.message,
      });
    }
  };

//Delete Purchase
export const deletePurchaseAction =
  (purchaseSerial, purchaseDate) => async (dispatch) => {
    try {
      dispatch({
        type: DELETE_PURCHASE_REQUEST,
      });

      let link = `http://localhost:5000/api/v1/deletepurchase?`;
      if (purchaseSerial) {
        link = link + `purchase_serial=${purchaseSerial}&`;
      }
      if (purchaseDate) {
        link = link + `purchase_date=${purchaseDate}&`;
      }
      link = link.slice(0, -1);

      const { data } = await axios.delete(link);

      dispatch({
        type: DELETE_PURCHASE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: DELETE_PURCHASE_FAIL,
        payload: error.response.data.message,
      });
    }
  };

//Week Payment
export const weekWisePurchaseAction =
  (fromDate, toDate) => async (dispatch) => {
    try {
      dispatch({ type: WEEK_WISE_PURCHASE_REQUEST });

      let link = `http://localhost:5000/api/v1/weekwisepurchase?`;
      if (fromDate) {
        link = link + `fromDate=${fromDate}&`;
      }
      if (toDate) {
        link = link + `toDate=${toDate}&`;
      }
      link = link.slice(0, -1);

      const { data } = await axios.get(link);

      dispatch({
        type: WEEK_WISE_PURCHASE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: WEEK_WISE_PURCHASE_FAIL,
        payload: error.response.data.message,
      });
    }
  };

//weekwise purchase for second last week
export const weekWisePurchaseForSecondLastWeekAction =
  (fromDate, toDate) => async (dispatch) => {
    try {
      dispatch({ type: WEEK_WISE_PURCHASE_FOR_SECOND_LAST_WEEK_REQUEST });

      let link = `http://localhost:5000/api/v1/weekwisepurchaseforsecondlastweek?`;
      if (fromDate) {
        link = link + `fromDate=${fromDate}&`;
      }
      if (toDate) {
        link = link + `toDate=${toDate}&`;
      }
      link = link.slice(0, -1);

      const { data } = await axios.get(link);

      dispatch({
        type: WEEK_WISE_PURCHASE_FOR_SECOND_LAST_WEEK_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: WEEK_WISE_PURCHASE_FOR_SECOND_LAST_WEEK_FAIL,
        payload: error.response.data.message,
      });
    }
  };

//Customerwise Purchase
export const customerWisePurchaseAction =
  (noOfWeeks, fromDate, toDate) => async (dispatch) => {
    try {
      dispatch({
        type: CUSTOMER_WISE_PURCHASE_REQUEST,
      });

      let link = `http://localhost:5000/api/v1/customerwisepurchase?`;
      if (fromDate) {
        link = link + `fromDate=${fromDate}&`;
      }
      if (toDate) {
        link = link + `toDate=${toDate}&`;
      }
      link = link.slice(0, -1);

      const { data } = await axios.get(link);

      let milkTotalAmount = 0;
      let milkTotalQuantity = 0;
      let newData = [];
      for (let i = 0; i < data.length - 1; i++) {
        milkTotalAmount = milkTotalAmount + data[i].milk_amount;
        milkTotalQuantity = milkTotalQuantity + data[i].milk_quantity;

        newData.push(data[i]);
        if (data[i + 1].customer_id !== data[i].customer_id) {
          newData.push({
            customer_id: data[i].customer_id,
            milkTotalQuantity,
            milkTotalAmount,
          });
          milkTotalAmount = 0;
          milkTotalQuantity = 0;
        }
      }
      newData.push(data[data.length - 1]);
      milkTotalAmount = milkTotalAmount + data[data.length - 1].milk_amount;
      milkTotalQuantity =
        milkTotalQuantity + data[data.length - 1].milk_quantity;
      newData.push({
        id: data[data.length - 1].id,
        milkTotalQuantity,
        milkTotalAmount,
      });

      dispatch({
        type: CUSTOMER_WISE_PURCHASE_SUCCESS,
        payload: newData,
      });
    } catch (error) {
      dispatch({
        type: CUSTOMER_WISE_PURCHASE_FAIL,
        payload: error.response.data.message,
      });
    }
  };

//customerwise purchse for second last week
export const customerWisePurchaseForSecondLastWeekAction =
  (noOfWeeks, fromDate, toDate) => async (dispatch) => {
    try {
      dispatch({
        type: CUSTOMER_WISE_PURCHASE_FOR_SECOND_LAST_WEEK_REQUEST,
      });

      let link = `http://localhost:5000/api/v1/customerwisepurchaseforsecondlastweek?`;
      if (fromDate) {
        link = link + `fromDate=${fromDate}&`;
      }
      if (toDate) {
        link = link + `toDate=${toDate}&`;
      }
      link = link.slice(0, -1);

      const { data } = await axios.get(link);

      dispatch({
        type: CUSTOMER_WISE_PURCHASE_FOR_SECOND_LAST_WEEK_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: CUSTOMER_WISE_PURCHASE_FOR_SECOND_LAST_WEEK_FAIL,
        payload: error.response.purchase.message,
      });
    }
  };

// Clearing Errors
export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
