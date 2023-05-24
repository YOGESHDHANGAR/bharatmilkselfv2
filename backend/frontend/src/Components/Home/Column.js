import React from "react";
import "./Column.css";

const Column = React.memo((props) => {
  return (
    <div
      style={
        props.count % 2 == 0
          ? { backgroundColor: "#F7F7F7" }
          : { backgroundColor: "#fff" }
      }
      className="home_column_container"
    >
      <div className="home_column_count_lable">
        <h3>{props.count + 1}</h3>
      </div>
      <div className="home_column_serial_lable">
        <h3>{props.purchase_serial}</h3>
      </div>

      <div className="home_column_date_lable">
        <h3>{props.purchase_date.slice(0, 10)}</h3>
      </div>

      <div className="home_column_id_lable">
        <h3>{props.customer_id}</h3>
      </div>

      <div className="home_column_name_lable">
        <h3>{props.customer_name}</h3>
      </div>
      <div className="home_column_shift_lable">
        <h3>{props.purchase_shift}</h3>
      </div>
      <div className="home_column_type_lable">
        <h3>{props.milk_type}</h3>
      </div>
      <div className="home_column_quantity_lable">
        <h3>{props.milk_quantity}</h3>
      </div>

      <div className="home_column_fat_lable">
        <h3>{props.milk_fat.toFixed(1)}</h3>
      </div>

      <div className="home_column_rate_lable">
        <h3>{props.milk_rate.toFixed(2)}</h3>
      </div>

      <div className="home_column_clr_lable">
        <h3>{props.milk_clr}</h3>
      </div>
      <div className="home_column_amount_lable">
        <h3>₹ {props.milk_amount.toFixed(2)}</h3>
      </div>
    </div>
  );
});

export default Column;
