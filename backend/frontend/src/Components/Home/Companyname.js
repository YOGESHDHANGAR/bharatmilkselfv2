import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Companyname.css";
import { useDispatch, useSelector } from "react-redux";
import {
  customDataSelectorAction,
  getpreviousSelectedYearAction,
} from "../../Redux/actions/customDataSelectorAction";
import { clearErrors } from "../../Redux/actions/purchaseActions";

const Companyname = () => {
  const location = useLocation(); // Get the current location
  const showErrorToast = (message) => {
    toast.error(message, {
      autoClose: 5000,
    });
  };
  const dispatch = useDispatch();

  const {
    getpreviousselectedyear,
    loading: getpreviousselectedyearLoading,
    error: getpreviousselectedyearError,
  } = useSelector((state) => state.getpreviousselectedyear);

  const [currentlyCustomDataInUse, setCurrentlyCustomDataInUse] = useState("");

  const handleCustomDataSelector = (e) => {
    setCurrentlyCustomDataInUse(e.target.value);
    dispatch(customDataSelectorAction(e.target.value));
  };

  useEffect(() => {
    dispatch(getpreviousSelectedYearAction());
  }, [dispatch]);

  useEffect(() => {
    setCurrentlyCustomDataInUse(
      `${Number(getpreviousselectedyear.previousSelectedStartYear)}-${Number(
        getpreviousselectedyear.previousSelectedEndYear
      )}`
    );
  }, [getpreviousselectedyearLoading]);

  useEffect(() => {
    if (getpreviousselectedyearError) {
      showErrorToast(getpreviousselectedyearError);
      dispatch(clearErrors());
    }
  }, [getpreviousselectedyearError]);

  return (
    <div className="companyname_container">
      <div className="companyname_and_data_selector">
        <Link tabIndex={-1} className="companyname" to="/">
          Bharat Dairy Anjad
        </Link>
        <div className="data_selector">
          <select
            tabIndex={-1}
            name="select_custom_data"
            onChange={handleCustomDataSelector}
          >
            <option
              value={"2020-2021"}
              selected={currentlyCustomDataInUse === "2020-2021"}
            >
              2020-2021
            </option>
            <option
              value={"2021-2022"}
              selected={currentlyCustomDataInUse === "2021-2022"}
            >
              2021-2022
            </option>
            <option
              value={"2022-2023"}
              selected={currentlyCustomDataInUse === "2022-2023"}
            >
              2022-2023
            </option>
            <option
              value={"2023-2024"}
              selected={currentlyCustomDataInUse === "2023-2024"}
            >
              2023-2024
            </option>
          </select>
        </div>
      </div>

      <div className="navlinks">
        <Link
          tabIndex={-1}
          className={`home_navlink ${
            location.pathname === "/" ? "active" : ""
          }`}
          to="/"
        >
          Home
        </Link>
        <Link
          tabIndex={-1}
          className={`customerwise_navlink ${
            location.pathname === "/customerwisepurchases" ? "active" : ""
          }`}
          to="/customerwisepurchases"
        >
          Customer_Wise
        </Link>

        <Link
          tabIndex={-1}
          className={`customerwise_navlink ${
            location.pathname === "/purchaseentry" ? "active" : ""
          }`}
          to="/purchaseentry"
        >
          Purchase_Entry
        </Link>
        <Link
          tabIndex={-1}
          className={`weekpayment_navlink ${
            location.pathname === "/weekpayment" ? "active" : ""
          }`}
          to="/weekpayment"
        >
          Week_Payment
        </Link>
        <Link
          tabIndex={-1}
          className={`cutomerentry_navlink ${
            location.pathname === "/customerentry" ? "active" : ""
          }`}
          to="/customerentry"
        >
          Customer_Entry
        </Link>
      </div>
    </div>
  );
};

export default Companyname;
