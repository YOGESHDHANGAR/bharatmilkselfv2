import axios from "axios";
import {
  GET_FAT_RATE_REQUEST,
  GET_FAT_RATE_SUCCESS,
  UPDATE_FAT_RATE_REQUEST,
  UPDATE_FAT_RATE_SUCCESS,
  GET_FAT_RATE_FAIL,
  UPDATE_FAT_RATE_FAIL,
} from "../constants/fatRateConstants";
import { CLEAR_ERRORS } from "../constants/purchaseConstants";

//Get Fat Rate Details
export const getFatRateAction = () => async (dispatch) => {
  try {
    dispatch({
      type: GET_FAT_RATE_REQUEST,
    });

    let link = `http://localhost:5000/api/v1/getfatrate`;

    const { data } = await axios.get(link);

    dispatch({
      type: GET_FAT_RATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_FAT_RATE_FAIL,
      payload: error.response.data.message,
    });
  }
};

//Update Fat Rate
export const updateFatRateAction = (myForm) => async (dispatch) => {
  try {
    dispatch({
      type: UPDATE_FAT_RATE_REQUEST,
    });

    const config = {
      headers: { "Content-Type": "application/json" },
    };
    let link = `http://localhost:5000/api/v1/updatefatrate`;

    const { data } = await axios.put(link, myForm, config);

    dispatch({
      type: UPDATE_FAT_RATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_FAT_RATE_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Clearing Errors
export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
