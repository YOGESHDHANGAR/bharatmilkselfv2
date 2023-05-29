import axios from "axios";
import {
  CUSTOM_DATA_SELECTOR_FAIL,
  CUSTOM_DATA_SELECTOR_REQUEST,
  CUSTOM_DATA_SELECTOR_SUCCESS,
  GET_PREVIOUS_SELECTED_YEAR_FAIL,
  GET_PREVIOUS_SELECTED_YEAR_REQUEST,
  GET_PREVIOUS_SELECTED_YEAR_SUCCESS,
} from "../constants/customDataSelectorConstants";

export const getpreviousSelectedYearAction = () => async (dispatch) => {
  try {
    dispatch({
      type: GET_PREVIOUS_SELECTED_YEAR_REQUEST,
    });

    const config = {
      headers: { "Content-Type": "application/json" },
    };
    let link = `http://localhost:5000/api/v1/getpreviousselectedyear?`;

    const { data } = await axios.get(link, config);

    dispatch({
      type: GET_PREVIOUS_SELECTED_YEAR_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_PREVIOUS_SELECTED_YEAR_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const customDataSelectorAction =
  (financialYearSelected) => async (dispatch) => {
    try {
      dispatch({
        type: CUSTOM_DATA_SELECTOR_REQUEST,
      });

      const config = {
        headers: { "Content-Type": "application/json" },
      };
      let link = `http://localhost:5000/api/v1/customdataselector?`;

      if (financialYearSelected) {
        link = link + `financialYearSelected=${financialYearSelected}&`;
      }
      link = link.slice(0, -1);

      const { data } = await axios.get(link, config);

      dispatch({
        type: CUSTOM_DATA_SELECTOR_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: CUSTOM_DATA_SELECTOR_FAIL,
        payload: error.response.data.message,
      });
    }
  };
