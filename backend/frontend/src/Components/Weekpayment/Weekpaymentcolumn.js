import React from "react";
import "./Weekpaymentcolumn.css";

const Weekpaymentcolumn = (props) => {
  return (
    <div
      style={
        props.count % 2 == 0
          ? { backgroundColor: "#F7F7F7" }
          : { backgroundColor: "#fff" }
      }
      className="weekpayment_column_container"
    >
      <div className="weekpayment_column_sno_lable">
        <h3>{props.Sno + 1}</h3>
      </div>
      <div className="weekpayment_column_id_lable">
        <h3>{props.customer_id}</h3>
      </div>
      <div className="weekpayment_column_name_lable">
        <h3>{props.customer_name}</h3>
      </div>
      <div className="weekpayment_column_quantity_lable">
        <h3>{props.milkTotalQuantity}</h3>
      </div>
      <div className="weekpayment_column_amount_lable">
        <h3>₹{props.milkTotalAmount.toFixed(2)}</h3>
      </div>

      <div className="weekpayment_column_last_week_amount_lable">
        <h3>₹{props.LastWeekAmount.toFixed(2)}</h3>
      </div>
      <div className="weekpayment_column_last_week_signature_lable">
        <h3>{props.signatureSpace}</h3>
      </div>
    </div>
  );
};

export default Weekpaymentcolumn;
