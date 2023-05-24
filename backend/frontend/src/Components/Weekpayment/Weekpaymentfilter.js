import React, { useState, useEffect } from "react";
import "./Weekpaymentfilter.css";
import "react-datepicker/dist/react-datepicker.css";
import { useDispatch } from "react-redux";
import { weekWisePurchaseAction } from "../../Redux/actions/purchaseActions";
import lastWeekDates from "../../utils/lastWeekDates";

const Filter = () => {
  const dispatch = useDispatch();
  const currentDate = new Date().toJSON().slice(0, 10);
  const { lastWeekStartDate, lastWeekEndDate } = lastWeekDates(currentDate, 1);

  const [fromDate, setFromDate] = useState(lastWeekStartDate);
  const [toDate, setToDate] = useState(lastWeekEndDate);

  const [fromDateformat, setFromdateformat] = useState("");
  const [toDateformat, setToDateformat] = useState("");

  const handleFromDate = (e) => {
    const getFromDateValue = e.target.value;
    const setFromFormat = getFromDateValue.split("-");
    const setFromYear = setFromFormat[0];
    const setFromMonth = setFromFormat[1];
    const setFromDate = setFromFormat[2];
    const setFromFormatDate =
      setFromYear + "" + setFromMonth + "" + setFromDate;
    setFromDate(getFromDateValue);
    setFromdateformat(setFromFormatDate);
  };

  const handleToDate = (e) => {
    const getToDateValue = e.target.value;
    const setDateFormat = getToDateValue.split("-");
    const setToYear = setDateFormat[0];
    const setToMonth = setDateFormat[1];
    const setToDate = setDateFormat[2];
    const setToDateFormat = setToYear + "" + setToMonth + "" + setToDate;
    setToDate(getToDateValue);
    setToDateformat(setToDateFormat);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (fromDateformat > toDateformat) {
      alert("Please select valid date");
    }
    dispatch(weekWisePurchaseAction(1, fromDate, toDate));
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
