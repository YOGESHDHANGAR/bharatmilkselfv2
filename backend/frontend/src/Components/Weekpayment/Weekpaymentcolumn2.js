import React from "react";
import "./Weekpaymentcolumn2.css";

const Weekpaymentcolumn2 = (props) => {
  return (
    <div
      style={
        props.count % 2 == 0
          ? { backgroundColor: "#F7F7F7" }
          : { backgroundColor: "#fff" }
      }
      className="weekpayment2_column_container"
    >
      <div className="weekpayment2_column_amount_lable">
        <h3>₹{props.milkTotalAmount}</h3>
      </div>
    </div>
  );
};

export default Weekpaymentcolumn2;
