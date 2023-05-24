import {
  ALL_PURCHASE_REQUEST,
  ALL_PURCHASE_SUCCESS,
  CREATE_PURCHASE_REQUEST,
  CREATE_PURCHASE_SUCCESS,
  DELETE_PURCHASE_REQUEST,
  DELETE_PURCHASE_SUCCESS,
  UPDATE_PURCHASE_REQUEST,
  UPDATE_PURCHASE_SUCCESS,
  SINGLE_PURCHASE_REQUEST,
  SINGLE_PURCHASE_SUCCESS,
  CUSTOMER_WISE_PURCHASE_REQUEST,
  CUSTOMER_WISE_PURCHASE_SUCCESS,
  WEEK_WISE_PURCHASE_REQUEST,
  WEEK_WISE_PURCHASE_SUCCESS,
  WEEK_WISE_PURCHASE_FOR_SECOND_LAST_WEEK_REQUEST,
  WEEK_WISE_PURCHASE_FOR_SECOND_LAST_WEEK_SUCCESS,
  CUSTOMER_WISE_PURCHASE_FOR_SECOND_LAST_WEEK_REQUEST,
  CUSTOMER_WISE_PURCHASE_FOR_SECOND_LAST_WEEK_SUCCESS,
  WEEK_WISE_PURCHASE_FAIL,
  WEEK_WISE_PURCHASE_FOR_SECOND_LAST_WEEK_FAIL,
  CUSTOMER_WISE_PURCHASE_FAIL,
  CUSTOMER_WISE_PURCHASE_FOR_SECOND_LAST_WEEK_FAIL,
  CREATE_PURCHASE_FAIL,
  ALL_PURCHASE_FAIL,
  SINGLE_PURCHASE_FAIL,
  UPDATE_PURCHASE_FAIL,
  DELETE_PURCHASE_FAIL,
  CLEAR_ERRORS,
} from "../constants/purchaseConstants";

export const createPurchaseReducer = (
  state = { createpurchase: [] },
  action
) => {
  switch (action.type) {
    case CREATE_PURCHASE_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case CREATE_PURCHASE_SUCCESS:
      return {
        ...state,
        loading: false,
        createpurchase: action.payload,
      };
    case CREATE_PURCHASE_FAIL:
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

export const getAllPurchaseReducer = (state = { allpurchases: [] }, action) => {
  switch (action.type) {
    case ALL_PURCHASE_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case ALL_PURCHASE_SUCCESS:
      return {
        ...state,
        loading: false,
        allpurchases: action.payload.allpurchases,
        totalQuantityAmountQueryResultofallpurchases:
          action.payload.totalQuantityAmountQueryResultofallpurchases,
      };
    case ALL_PURCHASE_FAIL:
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

export const singlePurchaseReducer = (
  state = { singlepurchase: [] },
  action
) => {
  switch (action.type) {
    case SINGLE_PURCHASE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case SINGLE_PURCHASE_SUCCESS:
      return {
        ...state,
        loading: false,
        singlepurchase: action.payload,
      };

    case SINGLE_PURCHASE_FAIL:
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

export const updatePurchaseReducer = (
  state = { updatepurchase: [] },
  action
) => {
  switch (action.type) {
    case UPDATE_PURCHASE_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case UPDATE_PURCHASE_SUCCESS:
      return {
        ...state,
        loading: false,
        updatepurchase: action.payload.updatepurchase,
        fetchUpdatedEntryQueryResult:
          action.payload.fetchUpdatedEntryQueryResult,
      };

    case UPDATE_PURCHASE_FAIL:
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

export const deletePurchaseReducer = (
  state = { deletepurchase: [] },
  action
) => {
  switch (action.type) {
    case DELETE_PURCHASE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case DELETE_PURCHASE_SUCCESS:
      return {
        ...state,
        loading: false,
        deletepurchase: action.payload,
      };
    case DELETE_PURCHASE_FAIL:
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

export const weekWisePurchaseReducer = (
  state = { weekwisepurchase: [] },
  action
) => {
  switch (action.type) {
    case WEEK_WISE_PURCHASE_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case WEEK_WISE_PURCHASE_SUCCESS:
      return {
        ...state,
        loading: false,
        weekwisepurchase: action.payload.weekpayment,
        totalQuantityAmountQueryResult:
          action.payload.totalQuantityAmountQueryResult,
      };
    case WEEK_WISE_PURCHASE_FAIL:
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

export const weekWisePurchaseForSecondLastWeekReducer = (
  state = { weekwisepurchaseforsecondlastweek: [] },
  action
) => {
  switch (action.type) {
    case WEEK_WISE_PURCHASE_FOR_SECOND_LAST_WEEK_REQUEST:
      return {
        ...state,
        loadin: true,
      };

    case WEEK_WISE_PURCHASE_FOR_SECOND_LAST_WEEK_SUCCESS:
      return {
        ...state,
        loading: false,
        weekwisepurchaseforsecondlastweek: action.payload,
      };
    case WEEK_WISE_PURCHASE_FOR_SECOND_LAST_WEEK_FAIL:
      return {
        ...state,
        loadin: false,
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

export const customerWisePurchaseReducer = (
  state = { customerwisepurchase: [] },
  action
) => {
  switch (action.type) {
    case CUSTOMER_WISE_PURCHASE_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case CUSTOMER_WISE_PURCHASE_SUCCESS:
      return {
        ...state,
        loading: false,
        customerwisepurchase: action.payload,
      };
    case CUSTOMER_WISE_PURCHASE_FAIL:
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

export const customerWisePurchaseForSecondLastWeekReducer = (
  state = { customerwisepurchaseforsecondlastweek: [] },
  action
) => {
  switch (action.type) {
    case CUSTOMER_WISE_PURCHASE_FOR_SECOND_LAST_WEEK_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case CUSTOMER_WISE_PURCHASE_FOR_SECOND_LAST_WEEK_SUCCESS:
      return {
        ...state,
        loading: false,
        customerwisepurchaseforsecondlastweek: action.payload,
      };
    case CUSTOMER_WISE_PURCHASE_FOR_SECOND_LAST_WEEK_FAIL:
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