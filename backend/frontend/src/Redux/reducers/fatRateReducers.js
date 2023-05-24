import {
  GET_FAT_RATE_FAIL,
  GET_FAT_RATE_REQUEST,
  GET_FAT_RATE_SUCCESS,
  UPDATE_FAT_RATE_FAIL,
  UPDATE_FAT_RATE_REQUEST,
  UPDATE_FAT_RATE_SUCCESS,
} from "../constants/fatRateConstants";
import { CLEAR_ERRORS } from "../constants/purchaseConstants";

export const getFatRateReducer = (state = { getfatrate: [] }, action) => {
  switch (action.type) {
    case GET_FAT_RATE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_FAT_RATE_SUCCESS:
      return {
        loading: false,
        getfatrate: action.payload,
      };
    case GET_FAT_RATE_FAIL:
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

export const updateFatRateReducer = (state = { updatefatrate: [] }, action) => {
  switch (action.type) {
    case UPDATE_FAT_RATE_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case UPDATE_FAT_RATE_SUCCESS:
      return {
        ...state,
        loading: false,
        updatefatrate: action.payload,
      };
    case UPDATE_FAT_RATE_FAIL:
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
