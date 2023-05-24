import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./Companyname.css";

const Companyname = () => {
  const location = useLocation(); // Get the current location

  return (
    <div className="companyname_container">
      <Link tabIndex={-1} className="companyname" to="/">
        Bharat Dairy Anjad
      </Link>
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
          className={`weekpayment_navlink ${
            location.pathname === "/weekpayment" ? "active" : ""
          }`}
          to="/weekpayment"
        >
          Week_Payment
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
