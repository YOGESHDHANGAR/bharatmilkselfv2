import React from "react";
import "./Weekpaymentheader.css";

const Header = () => {
  return (
    <div className="header_container">
      <div className="header_sno_lable">
        <h3>SNo</h3>
      </div>
      <div className="header_id_lable">
        <h3>Id</h3>
      </div>
      <div className="header_name_lable">
        <h3>Name</h3>
      </div>
      <div className="header_quantity_lable">
        <h3>Quantity</h3>
      </div>
      <div className="header_amount_lable">
        <h3>Amount</h3>
      </div>
      <div className="header_last_week_amount_lable">
        <h3>Last_Week_Am.</h3>
      </div>
      <div className="header_last_week_signature_lable">
        <h3>Signature</h3>
      </div>
    </div>
  );
};

export default Header;
