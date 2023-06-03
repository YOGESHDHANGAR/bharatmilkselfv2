import React, { useEffect, useState } from "react";
import "./Weekpaymentfilter.css";
import "react-datepicker/dist/react-datepicker.css";
import { useDispatch, useSelector } from "react-redux";
import { weekWisePurchaseAction } from "../../Redux/actions/purchaseActions";
import lastWeekDates from "../../utils/lastWeekDates";
import {
  getLockedStateAction,
  getUpdatedLockDateAction,
  toggleLockAction,
} from "../../Redux/actions/lockUnlockEntriesAction";
import Switch from "@mui/material/Switch";
const label = { inputProps: { "aria-label": "Switch demo" } };

const Filter = () => {
  const dispatch = useDispatch();
  const currentDate = new Date().toJSON().slice(0, 10);
  const { lastWeekStartDate, lastWeekEndDate } = lastWeekDates(currentDate, 1);

  const {
    loading: togglelockLoading,
    error: togglelockError,
    togglelock,
  } = useSelector((state) => state.togglelock);

  const {
    loading: getlockstateLoading,
    error: getlockstateError,
    getlockstate,
  } = useSelector((state) => state.getlockstate);

  const {
    loading: getlockeddateLoading,
    error: getlockeddateError,
    getlockeddate,
  } = useSelector((state) => state.getlockeddate);

  const [fromDate, setFromDate] = useState(lastWeekStartDate);
  const [toDate, setToDate] = useState(lastWeekEndDate);
  const [lockState, setLockState] = useState(0);

  const handleFromDate = (e) => {
    setFromDate(e.target.value);
  };

  const handleToDate = (e) => {
    setToDate(e.target.value);
  };

  const handleLockStateHandler = () => {
    const password = "12345";
    if (lockState === 1) {
      const userPassword = window.prompt("Enter the password:");
      if (userPassword === password) {
        alert("Correct! Proceeding...");
        dispatch(toggleLockAction(lockState === 1 ? 0 : 1));
        setLockState((prevState) => (prevState === 1 ? 0 : 1));
      } else {
        alert("Incorrect password. Stopping...");
      }
    } else {
      dispatch(toggleLockAction(lockState === 1 ? 0 : 1));
      setLockState((prevState) => (prevState === 1 ? 0 : 1));
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    dispatch(weekWisePurchaseAction(fromDate, toDate));
    dispatch(weekWisePurchaseForSecondLastWeekAction(fromDate, toDate));
  };

  const handlePrint = () => {
    console.log("lastweekenddate___", lastWeekEndDate);
    dispatch(getUpdatedLockDateAction(1, lastWeekEndDate));
    window.print();
  };

  const handleClearLocalStorage = () => {
    localStorage.removeItem("weekpayment_markedEntriesArray");
    window.location.reload();
  };

  useEffect(() => {
    if (getlockstateLoading === false) {
      setLockState(getlockstate[0].lock_status);
    }
  }, [getlockstateLoading, getlockeddateLoading]);

  useEffect(() => {
    dispatch(getLockedStateAction());
  }, [dispatch]);

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
      <input
        className="clear_input"
        type="button"
        value="Clear Marks"
        onClick={handleClearLocalStorage}
      />
      <div className="lock_unlock_switch">
        <Switch
          onChange={handleLockStateHandler}
          {...label}
          checked={lockState === 1 ? true : false}
        />
      </div>
    </form>
  );
};

export default Filter;
