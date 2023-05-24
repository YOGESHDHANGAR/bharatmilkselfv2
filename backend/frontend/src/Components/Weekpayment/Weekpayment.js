import React, { useEffect } from "react";
import "./Weekpayment.css";
import Weekpaymentcolumn from "./Weekpaymentcolumn";
import Weekpaymentfilter from "./Weekpaymentfilter";
import Weekpaymentheader from "./Weekpaymentheader";
import { useSelector, useDispatch } from "react-redux";
import {
  clearErrors,
  weekWisePurchaseAction,
  weekWisePurchaseForSecondLastWeekAction,
} from "../../Redux/actions/purchaseActions";
import Box from "@mui/material/Box";
import Loading from "../Loading/Loading";

const Weekpayment = () => {
  const dispatch = useDispatch();
  const {
    weekwisepurchase,
    totalQuantityAmountQueryResult,
    loading,
    error: weekwisepurchasError,
  } = useSelector((state) => state.weekwisepurchase);

  const {
    weekwisepurchaseforsecondlastweek,
    error: weekwisepurchaseforsecondlastweekError,
  } = useSelector((state) => state.weekwisepurchaseforsecondlastweek);

  const commonStyles = {
    bgcolor: "black",
    borderColor: "black",
    width: "100vw",
  };
  useEffect(() => {
    dispatch(weekWisePurchaseAction(1));
    dispatch(weekWisePurchaseForSecondLastWeekAction(2));
  }, [dispatch]);

  useEffect(() => {
    if (weekwisepurchasError) {
      alert.error(weekwisepurchasError);
      dispatch(clearErrors());
    }
    if (weekwisepurchaseforsecondlastweekError) {
      alert.error(weekwisepurchaseforsecondlastweekError);
      dispatch(clearErrors());
    }
  }, [
    dispatch,
    weekwisepurchasError,
    weekwisepurchaseforsecondlastweekError,
    alert,
  ]);

  return (
    <div>
      <Weekpaymentfilter />
      <Weekpaymentheader />
      {loading === true ? (
        <Loading />
      ) : weekwisepurchase.length === 0 ? (
        <div className="no_result_found">
          <h1>No Result Found!</h1>
        </div>
      ) : (
        weekwisepurchase.map((elem, index) => {
          let lastWeekElem = { TotalAmount: 0 };

          for (let i = 0; i < weekwisepurchaseforsecondlastweek.length; i++) {
            if (
              elem.customer_name ===
              weekwisepurchaseforsecondlastweek[i].customer_name
            ) {
              lastWeekElem = weekwisepurchaseforsecondlastweek[i];
            }
          }

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
              LastWeekAmount={lastWeekElem.TotalAmount}
              signaturespace={"signaturesignature"}
            />
          );
        })
      )}
      {loading === false && weekwisepurchase.length !== 0 && (
        <div>
          <Box sx={{ ...commonStyles, border: 0.3 }} />
          <div className="weekpayment_totalling_Field">
            <h3 className="weekpayment_totalMilk_Field">
              {totalQuantityAmountQueryResult[0].weekTotalQuantity.toFixed(1)}L
            </h3>
            <h3 className="weekpayment_total_Amount_Field">
              ₹{totalQuantityAmountQueryResult[0].weekTotalAmount.toFixed(2)}
            </h3>
          </div>
          <Box sx={{ ...commonStyles, border: 1.6 }} />
        </div>
      )}
    </div>
  );
};

export default Weekpayment;
