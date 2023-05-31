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
import { CLEAR_ERRORS } from "../constants/purchaseConstants";

export const getLockDateReducer = (state = { getlockeddate: [] }, action) => {
  switch (action.type) {
    case GET_LOCKED_DATE_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case GET_LOCKED_DATE_SUCCESS:
      return {
        ...state,
        loading: false,
        getlockeddate: action.payload,
      };
    case GET_LOCKED_DATE_FAIL:
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

export const getUpdatedLockDateReducer = (
  state = { getupdatedlockeddate: [] },
  action
) => {
  switch (action.type) {
    case GET_UPDATED_LOCKED_DATE_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case GET_UPDATED_LOCKED_DATE_SUCCESS:
      return {
        ...state,
        loading: false,
        getupdatedlockeddate: action.payload,
      };
    case GET_UPDATED_LOCKED_DATE_FAIL:
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

export const getLockStateReducer = (state = { getlockstate: [] }, action) => {
  switch (action.type) {
    case GET_LOCK_STATE_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case GET_LOCK_STATE_SUCCESS:
      return {
        ...state,
        loading: false,
        getlockstate: action.payload,
      };
    case GET_LOCK_STATE_FAIL:
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

export const toggleLockReducer = (state = { togglelock: [] }, action) => {
  switch (action.type) {
    case TOGGLE_LOCK_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case TOGGLE_LOCK_SUCCESS:
      return {
        ...state,
        loading: false,
        togglelock: action.payload,
      };
    case TOGGLE_LOCK_FAIL:
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
