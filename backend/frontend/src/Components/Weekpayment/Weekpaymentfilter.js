import React, { useState } from "react";
import "./Weekpaymentfilter.css";
import "react-datepicker/dist/react-datepicker.css";
import { useDispatch } from "react-redux";
import {
  weekWisePurchaseAction,
  weekWisePurchaseForSecondLastWeekAction,
} from "../../Redux/actions/purchaseActions";
import lastWeekDates from "../../utils/lastWeekDates";

const Filter = () => {
  const dispatch = useDispatch();
  const currentDate = new Date().toJSON().slice(0, 10);
  const { lastWeekStartDate, lastWeekEndDate } = lastWeekDates(currentDate, 1);

  const [fromDate, setFromDate] = useState(lastWeekStartDate);
  const [toDate, setToDate] = useState(lastWeekEndDate);

  const handleFromDate = (e) => {
    setFromDate(e.target.value);
  };

  const handleToDate = (e) => {
    setToDate(e.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    dispatch(weekWisePurchaseAction(fromDate, toDate));
    dispatch(weekWisePurchaseForSecondLastWeekAction(fromDate, toDate));
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <form className="filter_container" onSubmit={handleSubmit}>
      <label className="fromdate_lable">
        From_Date:
        <input
          type="date"
          className="fromdate_datepicker"
          value={fromDate}
          onChange={(e) => handleFromDate(e)}
        />
      </label>
      <label className="todate_lable">
        To_Date:
        <input
          type="date"
          className="todate_datepicker"
          value={toDate}
          onChange={(e) => handleToDate(e)}
        />
      </label>
      <input className="submit_input" type="submit" value="Submit" />
      <input
        className="submit_input"
        type="button"
        value="Print"
        onClick={handlePrint}
      />
    </form>
  );
};

export default Filter;
