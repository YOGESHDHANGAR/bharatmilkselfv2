import React, { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Weekpayment.css";
import Weekpaymentcolumn from "./Weekpaymentcolumn";
import Weekpaymentfilter from "./Weekpaymentfilter";
import Weekpaymentheader from "./Weekpaymentheader";
import { useSelector, useDispatch } from "react-redux";
import {
  clearErrors,
  customerWisePurchaseOutliersAction,
  weekWisePurchaseAction,
} from "../../Redux/actions/purchaseActions";
import Box from "@mui/material/Box";
import Loading from "../Loading/Loading";
import MetaData from "../MetaData/MetaData";
import "./Weekpaymentcolumn2.css";
import Weekpaymentcolumn2 from "./Weekpaymentcolumn2";

const commonStyles = {
  bgcolor: "black",
  borderColor: "black",
  width: "65vw",
};

const Weekpayment = () => {
  const showErrorToast = (message) => {
    toast.error(message, {
      autoClose: 5000,
    });
  };
  const dispatch = useDispatch();
  const {
    lastWeek1,
    lastWeek2,
    lastWeek3,
    lastWeek4,
    loading: weekwisepurchaseLoading,
    error: weekwisepurchaseError,
  } = useSelector((state) => state.weekwisepurchase);

  useEffect(() => {
    dispatch(weekWisePurchaseAction());
  }, [dispatch]);

  useEffect(() => {
    if (weekwisepurchaseError) {
      showErrorToast(weekwisepurchaseError);
      dispatch(clearErrors());
    }
  }, [weekwisepurchaseError]);

  return (
    <>
      <MetaData title="Week_Payment" />
      <Weekpaymentfilter />
      <Weekpaymentheader />
      <div className="Week_Payment">
        {weekwisepurchaseLoading === true ? (
          <Loading />
        ) : lastWeek1 === undefined || lastWeek1.length === 0 ? (
          <div className="no_result_found">
            <h1>
              No Result Found! <br /> Select Different Dates!
            </h1>
          </div>
        ) : (
          <div className="Week_Payment_container">
            <div className="Week_Payment_name_container">
              <div>
                {lastWeek1 &&
                  lastWeek1.calculaeWeekWisePurchaseQueryResult.map(
                    (elem, index) => {
                      return (
                        <Weekpaymentcolumn
                          key={index}
                          count={index}
                          Sno={index}
                          customer_id={elem.customer_id}
                          customer_name={elem.customer_name}
                          purchase_shift={elem.purchase_shift}
                          milkTotalQuantity={elem.milkTotalQuantity}
                          milkTotalAmount={elem.milkTotalAmount}
                        />
                      );
                    }
                  )}
              </div>
              <div>
                <Box sx={{ ...commonStyles, border: 0.3 }} />
                <div className="weekpayment_totalling_Field">
                  <h3 className="weekpayment_totalMilk_Field">
                    {lastWeek1.calculaeWeekWisePurchaseTotalAmountQueryResult[0].weekTotalQuantity.toFixed(
                      1
                    )}
                    L
                  </h3>
                  <h3 className="weekpayment_total_Amount_Field">
                    ₹
                    {lastWeek1.calculaeWeekWisePurchaseTotalAmountQueryResult[0].weekTotalAmount.toFixed(
                      2
                    )}
                  </h3>
                </div>
                <Box sx={{ ...commonStyles, border: 1.6 }} />
              </div>
            </div>

            <div className="week_divider">
              <div className="week_divider2">
                {lastWeek2 &&
                  lastWeek2.calculaeWeekWisePurchaseQueryResult.map(
                    (elem, index) => {
                      return (
                        <Weekpaymentcolumn2
                          key={index}
                          count={index}
                          milkTotalAmount={elem.milkTotalAmount}
                        />
                      );
                    }
                  )}
              </div>

              <div className="week_divider3">
                {lastWeek3 &&
                  lastWeek3.calculaeWeekWisePurchaseQueryResult.map(
                    (elem, index) => {
                      return (
                        <Weekpaymentcolumn2
                          key={index}
                          count={index}
                          milkTotalAmount={elem.milkTotalAmount}
                        />
                      );
                    }
                  )}
              </div>
              <div className="week_divider3">
                {lastWeek4 &&
                  lastWeek4.calculaeWeekWisePurchaseQueryResult.map(
                    (elem, index) => {
                      return (
                        <Weekpaymentcolumn2
                          key={index}
                          count={index}
                          milkTotalAmount={elem.milkTotalAmount}
                        />
                      );
                    }
                  )}
              </div>
            </div>
          </div>
        )}
      </div>
      <ToastContainer />
    </>
  );
};

export default Weekpayment;
