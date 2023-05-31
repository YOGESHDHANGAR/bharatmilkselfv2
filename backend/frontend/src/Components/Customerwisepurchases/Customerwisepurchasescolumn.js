import React, { useState } from "react";
import "./Customerwisepurchasescolumn.css";
import { useDispatch } from "react-redux";
import { deletePurchaseAction } from "../../Redux/actions/purchaseActions";

const Customerwisepurchasescolumn = (props) => {
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
  const handleUpdateEntry = () => {
    props.handleUpdateEntryParent(props.purchase_serial);
  };

  return (
    <div
      style={
        props.count % 2 == 0
          ? { backgroundColor: "#F7F7F7" }
          : { backgroundColor: "#fff" }
      }
    >
      <div className="Customerwisepurchases_column_container">
        <div className="Customerwisepurchases_column_count_lable">
          <h3>{props.counter + 1}</h3>
        </div>

        <div className="Customerwisepurchases_column_entry_lable">
          <h3>{props.individualCounter + 1}</h3>
        </div>

        <div className="Customerwisepurchases_column_serial_lable">
          <h3>{props.purchase_serial}</h3>
        </div>

        <div className="Customerwisepurchases_column_id_lable">
          <h3>{props.customer_id}</h3>
        </div>

        <div className="Customerwisepurchases_column_name_lable">
          <h3>{props.customer_name}</h3>
        </div>

        <div className="Customerwisepurchases_column_date_lable">
          <h3>{props.purchase_date.slice(0, 10)}</h3>
        </div>

        <div className="Customerwisepurchases_column_shift_lable">
          <h3>{props.purchase_shift}</h3>
        </div>
        <div className="Customerwisepurchases_column_type_lable">
          <h3>{props.milk_type}</h3>
        </div>
        <div className="Customerwisepurchases_column_quantity_lable">
          <h3>{props.milk_quantity.toFixed(1)}</h3>
        </div>

        <div className="Customerwisepurchases_column_fat_lable">
          <h3>{props.milk_fat.toFixed(1)}</h3>
        </div>

        <div className="Customerwisepurchases_column_rate_lable">
          <h3>{props.milk_rate.toFixed(2)}</h3>
        </div>

        <div className="Customerwisepurchases_column_clr_lable">
          <h3>{props.milk_clr}</h3>
        </div>
        <div className="Customerwisepurchases_column_amount_lable">
          <h3>₹ {props.milk_amount}</h3>
        </div>
        <div className="Customerwisepurchases_column_delete_update_create_button">
          <input
            tabIndex={-1}
            className="customerwisepurchasescolumn_delete_input"
            type="button"
            onClick={handleDeleteEntry}
            value="Del"
          />
          {/* <input
            tabIndex={-1}
            className="customerwisepurchasescolumn_update_input"
            type="button"
            onClick={handleUpdateEntry}
            value="Upd"
          /> */}
        </div>
      </div>
    </div>
  );
};

export default Customerwisepurchasescolumn;
