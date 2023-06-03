import React from "react";
import "./Weekpaymentcolumn.css";

const Weekpaymentcolumn = (props) => {
  const backgroundColor = props.markedEntryOrNot
    ? "#e490e8"
    : props.count % 2 === 0
    ? "#fff"
    : "#F7F7F7";

  return (
    <div style={{ backgroundColor }} className="weekpayment_column_container">
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
      <input
        type="checkbox"
        onChange={props.handleToggleFromParent}
        checked={props.markedEntryOrNot}
      />
    </div>
  );
};

export default Weekpaymentcolumn;
