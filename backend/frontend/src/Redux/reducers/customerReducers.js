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

export const createCustomerReducer = (
  state = { createcustomer: [] },
  action
) => {
  switch (action.type) {
    case CREATE_CUSTOMER_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case CREATE_CUSTOMER_SUCCESS:
      return {
        loading: false,
        createcustomer: action.payload,
      };

    case CREATE_CUSTOMER_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

export const getAllCustomerReducer = (state = { allcustomers: [] }, action) => {
  switch (action.type) {
    case GET_ALL_CUSTOMER_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case GET_ALL_CUSTOMER_SUCCESS:
      return {
        ...state,
        loading: false,
        allcustomers: action.payload,
      };
    case GET_ALL_CUSTOMER_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

export const singleCustomerReducer = (
  state = { singlecustomer: [] },
  action
) => {
  switch (action.type) {
    case SINGLE_CUSTOMER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case SINGLE_CUSTOMER_SUCCESS:
      return {
        ...state,
        loading: false,
        singlecustomer: action.payload,
      };
    case SINGLE_CUSTOMER_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

export const updateCustomerReducer = (
  state = { updatecustomer: [] },
  action
) => {
  switch (action.type) {
    case UPDATE_CUSTOMER_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case UPDATE_CUSTOMER_SUCCESS:
      return {
        ...state,
        loading: false,
        updatecustomer: action.payload,
      };
    case UPDATE_CUSTOMER_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

export const deleteCustomerReducer = (
  state = { deletecustomer: [] },
  action
) => {
  switch (action.type) {
    case DELETE_CUSTOMER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case DELETE_CUSTOMER_SUCCESS:
      return {
        ...state,
        loading: false,
        deletecustomer: action.payload,
      };
    case DELETE_CUSTOMER_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

export const setCustomerActiceOrInactiveReducer = (
  state = { setCustomeracticeorinactive: [] },
  action
) => {
  switch (action.type) {
    case SET_CUSTOMER_ACTIVE_OR_INACTIVE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case SET_CUSTOMER_ACTIVE_OR_INACTIVE_SUCESS:
      return {
        ...state,
        loading: false,
        setCustomeracticeorinactive: action.payload,
      };
    case SET_CUSTOMER_ACTIVE_OR_INACTIVE_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};
