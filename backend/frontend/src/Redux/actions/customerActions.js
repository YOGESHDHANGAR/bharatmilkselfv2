import axios from "axios";
import {
  CREATE_CUSTOMER_FAIL,
  CREATE_CUSTOMER_REQUEST,
  CREATE_CUSTOMER_SUCCESS,
  DELETE_CUSTOMER_FAIL,
  DELETE_CUSTOMER_REQUEST,
  DELETE_CUSTOMER_SUCCESS,
  GET_ALL_CUSTOMER_FAIL,
  GET_ALL_CUSTOMER_REQUEST,
  GET_ALL_CUSTOMER_SUCCESS,
  SET_CUSTOMER_ACTIVE_OR_INACTIVE_FAIL,
  SET_CUSTOMER_ACTIVE_OR_INACTIVE_REQUEST,
  SET_CUSTOMER_ACTIVE_OR_INACTIVE_SUCESS,
  SINGLE_CUSTOMER_FAIL,
  SINGLE_CUSTOMER_REQUEST,
  SINGLE_CUSTOMER_SUCCESS,
  UPDATE_CUSTOMER_FAIL,
  UPDATE_CUSTOMER_REQUEST,
  UPDATE_CUSTOMER_SUCCESS,
} from "../constants/customerConstants";
import { CLEAR_ERRORS } from "../constants/purchaseConstants";

//Create Customer
export const createCustomerAction = (myForm) => async (dispatch) => {
  try {
    dispatch({
      type: CREATE_CUSTOMER_REQUEST,
    });

    const config = {
      headers: { "Content-Type": "application/json" },
    };
    let link = `http://localhost:5000/api/v1/createcustomer`;
    const { data } = await axios.post(link, myForm, config);

    dispatch({
      type: CREATE_CUSTOMER_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CREATE_CUSTOMER_FAIL,
      payload: error.response.data.message,
    });
  }
};

//Get All Customer
export const getAllCustomerAction = (unfiltered) => async (dispatch) => {
  try {
    dispatch({
      type: GET_ALL_CUSTOMER_REQUEST,
    });

    let link = `http://localhost:5000/api/v1/allcustomers?`;

    if (unfiltered) {
      link = link + `unfiltered=${unfiltered}&`;
    }

    link = link.slice(0, -1);

    const { data } = await axios.get(link);

    dispatch({
      type: GET_ALL_CUSTOMER_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_ALL_CUSTOMER_FAIL,
      payload: error.response.data.message,
    });
  }
};

//Get Single Customer Details
export const singleCustomerAction = (customerId) => async (dispatch) => {
  try {
    dispatch({
      type: SINGLE_CUSTOMER_REQUEST,
    });

    let link = `http://localhost:5000/api/v1/singlecustomer?`;
    if (customerId) {
      link = link + `customer_id=${customerId}&`;
    }
    link = link.slice(0, -1);

    const { data } = await axios.get(link);

    dispatch({
      type: SINGLE_CUSTOMER_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: SINGLE_CUSTOMER_FAIL,
      payload: error.response.data.message,
    });
  }
};

//Update Customer Details
export const updateCustomerAction =
  (customer_id, myForm) => async (dispatch) => {
    try {
      dispatch({
        type: UPDATE_CUSTOMER_REQUEST,
      });

      const config = {
        headers: { "Content-Type": "application/json" },
      };
      let link = `http://localhost:5000/api/v1/updatecustomer?customer_id=${customer_id}`;
      const { data } = await axios.put(link, myForm, config);

      dispatch({
        type: UPDATE_CUSTOMER_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: UPDATE_CUSTOMER_FAIL,
        payload: error.response.data.message,
      });
    }
  };

//Delete Purchase
export const deleteCustomerAction = (customer_id) => async (dispatch) => {
  try {
    dispatch({
      type: DELETE_CUSTOMER_REQUEST,
    });

    let link = `http://localhost:5000/api/v1/deletecustomer?`;
    if (customer_id) {
      link = link + `customer_id=${customer_id}&`;
    }
    link = link.slice(0, -1);

    const { data } = await axios.delete(link);

    dispatch({
      type: DELETE_CUSTOMER_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: DELETE_CUSTOMER_FAIL,
      payload: error.response.data.message,
    });
  }
};

//set customer active and inactive
export const customerActiceOrInactiveAction =
  (customer_id, new_customer_active_or_not) => async (dispatch) => {
    try {
      dispatch({
        type: SET_CUSTOMER_ACTIVE_OR_INACTIVE_REQUEST,
      });

      let link = `http://localhost:5000/api/v1/customeractiveorinactive?`;

      if (customer_id) {
        link = link + `customer_id=${customer_id}&`;
      }
      if (
        new_customer_active_or_not === 0 ||
        new_customer_active_or_not === 1
      ) {
        link =
          link + `new_customer_active_or_not=${new_customer_active_or_not}&`;
      }

      link = link.slice(0, -1);
      const { data } = await axios.get(link);

      dispatch({
        type: SET_CUSTOMER_ACTIVE_OR_INACTIVE_SUCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: SET_CUSTOMER_ACTIVE_OR_INACTIVE_FAIL,
        payload: error.response.data.message,
      });
    }
  };

// Clearing Errors
export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
