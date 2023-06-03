import React, { useState } from "react";
import "./Customerwisepurchasesfilter.css";
import "react-datepicker/dist/react-datepicker.css";
import { useDispatch } from "react-redux";
import {
  customerWisePurchaseAction,
  customerWisePurchaseOutliersAction,
} from "../../Redux/actions/purchaseActions";
import lastWeekDates from "../../utils/lastWeekDates";

const Customerwisepurchasesfilter = () => {
  const dispatch = useDispatch();
  const currentDate = new Date().toJSON().slice(0, 10);
  const { lastWeekStartDate, lastWeekEndDate } = lastWeekDates(currentDate, 1);
  const [fromDate, setFromDate] = useState(lastWeekStartDate);
  const [toDate, setToDate] = useState(lastWeekEndDate);

  const [fromDateformat, setFromdateformat] = useState("");
  const [toDateformat, setToDateformat] = useState("");

  const handleFromDate = (e) => {
    const getfromdatevalue = e.target.value;
    const setfromformat = getfromdatevalue.split("-");
    const setfromyear = setfromformat[0];
    const setfrommonth = setfromformat[1];
    const setfromdate = setfromformat[2];
    const setfromformatdate =
      setfromyear + "" + setfrommonth + "" + setfromdate;
    setFromDate(getfromdatevalue);
    setFromdateformat(setfromformatdate);
  };

  const handleToDate = (e) => {
    const gettodatevalue = e.target.value;
    const setdateformat = gettodatevalue.split("-");
    const settoyear = setdateformat[0];
    const settomonth = setdateformat[1];
    const settodate = setdateformat[2];
    const settodateformat = settoyear + "" + settomonth + "" + settodate;
    setToDate(gettodatevalue);
    setToDateformat(settodateformat);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (fromDateformat > toDateformat) {
      alert("Please select valid date");
    }
    dispatch(customerWisePurchaseAction(1, fromDate, toDate));
    dispatch(customerWisePurchaseOutliersAction(1, fromDate, toDate));
  };

  const handleClearLocalStorage = () => {
    localStorage.removeItem("customerwisepurchase_markedEntriesArray");
    window.location.reload();
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
          value={toDate}
          className="todate_datepicker"
          onChange={(e) => handleToDate(e)}
        />
      </label>
      <input className="submit_input" type="submit" value="Submit" />
      <input
        className="clear_input"
        type="button"
        value="Clear Marks"
        onClick={handleClearLocalStorage}
      />
    </form>
  );
};

export default Customerwisepurchasesfilter;
