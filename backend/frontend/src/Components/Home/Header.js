import React, { useState } from "react";
import "./Header.css";

const Header = () => {
  return (
    <div className="home_header_column_container">
      <div className="home_header_count_lable">
        <h3>Count</h3>
      </div>
      <div className="home_header_serial_lable">
        <h3>Serial</h3>
      </div>
      <div className="home_header_date_lable">
        <h3>Date</h3>
      </div>
      <div className="home_header_id_lable">
        <h3>Id</h3>
      </div>
      <div className="home_header_name_lable">
        <h3>Name</h3>
      </div>
      <div className="home_header_shift_lable">
        <h3>Shift</h3>
      </div>
      <div className="home_header_type_lable">
        <h3>Type</h3>
      </div>
      <div className="home_header_quantity_lable">
        <h3>Quantity</h3>
      </div>
      <div className="home_header_fat_lable">
        <h3>Fat</h3>
      </div>
      <div className="home_header_rate_lable">
        <h3>Rate</h3>
      </div>
      <div className="home_header_clr_lable">
        <h3>CLR</h3>
      </div>
      <div className="home_header_amount_lable">
        <h3>Amount</h3>
      </div>
      <div className="home_header_delete_button">
        <h3>Delete</h3>
      </div>
      <div className="home_header_checkbox"></div>
      <div className="home_header_colorTikcker"></div>
      <div className="home_header_removeTikcker"></div>
    </div>
  );
};

export default Header;
