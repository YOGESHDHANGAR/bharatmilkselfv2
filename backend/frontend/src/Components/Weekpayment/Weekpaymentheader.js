import React from "react";
import "./Weekpaymentheader.css";

const Header = () => {
  return (
    <div className="header_container">
      <div className="header_part1">
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
      </div>
      <div className="header_part2">
        <div className="header_Last_Week_lable">
          <h3>Last_Week</h3>
        </div>
        <div className="header_Second_Last_lable">
          <h3>Second_Last</h3>
        </div>
        <div className="header_Third_Last_lable">
          <h3>Third_Last</h3>
        </div>
      </div>
    </div>
  );
};

export default Header;
