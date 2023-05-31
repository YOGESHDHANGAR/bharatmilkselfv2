import axios from "axios";
import {
  GET_LOCKED_DATE_FAIL,
  GET_LOCKED_DATE_REQUEST,
  GET_LOCKED_DATE_SUCCESS,
  GET_LOCK_STATE_FAIL,
  GET_LOCK_STATE_REQUEST,
  GET_LOCK_STATE_SUCCESS,
  GET_UPDATED_LOCKED_DATE_FAIL,
  GET_UPDATED_LOCKED_DATE_REQUEST,
  GET_UPDATED_LOCKED_DATE_SUCCESS,
  TOGGLE_LOCK_FAIL,
  TOGGLE_LOCK_REQUEST,
  TOGGLE_LOCK_SUCCESS,
} from "../constants/lockUnlockEntriesReducer";

//get locked date
export const getLockDateAction = () => async (dispatch) => {
  try {
    dispatch({
      type: GET_UPDATED_LOCKED_DATE_REQUEST,
    });

    let link = `http://localhost:5000/api/v1/getlockeddate`;

    const { data } = await axios.get(link);

    dispatch({
      type: GET_UPDATED_LOCKED_DATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_UPDATED_LOCKED_DATE_FAIL,
      payload: error.response.data.message,
    });
  }
};

//get updated locked date
export const getUpdatedLockDateAction =
  (lockState, newLockedDate) => async (dispatch) => {
    try {
      dispatch({
        type: GET_LOCKED_DATE_REQUEST,
      });

      let link = `http://localhost:5000/api/v1/getupdatedlockeddate?`;

      if (lockState === 0 || lockState === 1) {
        link = link + `lock_state=${lockState}&`;
      }

      if (newLockedDate) {
        link = link + `new_locked_date=${newLockedDate}&`;
      }

      link = link.slice(0, -1);

      const { data } = await axios.get(link);

      dispatch({
        type: GET_LOCKED_DATE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: GET_LOCKED_DATE_FAIL,
        payload: error.response.data.message,
      });
    }
  };

//get lock state
export const getLockedStateAction = (lockState) => async (dispatch) => {
  try {
    dispatch({
      type: GET_LOCK_STATE_REQUEST,
    });

    let link = `http://localhost:5000/api/v1/getlockstate?`;

    if (lockState === 0 || lockState === 1) {
      link = link + `lock_state=${lockState}&`;
    }

    link = link.slice(0, -1);

    const { data } = await axios.get(link);

    dispatch({
      type: GET_LOCK_STATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_LOCK_STATE_FAIL,
      payload: error.response.data.message,
    });
  }
};

//toggle lock
export const toggleLockAction = (lockState) => async (dispatch) => {
  try {
    dispatch({
      type: TOGGLE_LOCK_REQUEST,
    });

    let link = `http://localhost:5000/api/v1/togglelock?`;

    if (lockState === 0 || lockState === 1) {
      link = link + `lock_status=${lockState}&`;
    }

    link = link.slice(0, -1);

    const { data } = await axios.get(link);

    dispatch({
      type: TOGGLE_LOCK_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: TOGGLE_LOCK_FAIL,
      payload: error.response.data.message,
    });
  }
};
