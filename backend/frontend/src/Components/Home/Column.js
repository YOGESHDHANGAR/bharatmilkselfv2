import React from "react";
import "./Column.css";
import { useDispatch } from "react-redux";
import { deletePurchaseAction } from "../../Redux/actions/purchaseActions";

const Column = React.memo((props) => {
  const dispatch = useDispatch();
  const handleDeleteEntry = () => {
    let result = window.confirm("Are you sure wants to delete?");
    if (result) {
      props.handleDeleteEntryParent(props.purchase_serial);
      dispatch(
        deletePurchaseAction(
          props.purchase_serial,
          props.purchase_date.slice(0, 10)
        )
      );
    }
  };

  const backgroundColor = props.markedEntryOrNot
    ? "#e490e8"
    : props.count % 2 === 0
    ? "#fff"
    : "#F7F7F7";
  return (
    <div style={{ backgroundColor }} className="home_column_container">
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
      <input
        className="home_column_delete_button"
        tabIndex={-1}
        type="button"
        onClick={handleDeleteEntry}
        value="Del"
      />
      <input
        type="checkbox"
        onChange={props.handleToggleFromParent}
        checked={props.markedEntryOrNot}
        className="home_column_checkbox"
      />
    </div>
  );
});

export default Column;
