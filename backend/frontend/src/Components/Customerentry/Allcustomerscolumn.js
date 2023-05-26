import React, { useEffect, useState } from "react";
import "./Allcustomerscolumn.css";
import Switch from "@mui/material/Switch";
import { customerActiceOrInactiveAction } from "../../Redux/actions/customerActions";
import { useDispatch } from "react-redux";
const label = { inputProps: { "aria-label": "Switch demo" } };

const Allcustomerscolumn = (props) => {
  const dispatch = useDispatch();

  const [checked, setChecked] = useState(props.customer_active_or_not);

  const handleSwitchChangeLocal = () => {
    dispatch(
      customerActiceOrInactiveAction(props.customer_id, checked === 1 ? 0 : 1)
    );
    setChecked((prevState) => (prevState === 1 ? 0 : 1));
  };

  return (
    <div
      style={
        props.count % 2 == 0
          ? { backgroundColor: "#F7F7F7" }
          : { backgroundColor: "#fff" }
      }
      className="allcustomers_column_container"
    >
      <div className="allcustomers_column_count_lable">
        <h3>{props.count + 1}</h3>
      </div>
      <div className="allcustomers_column_id_lable">
        <h3>{props.customer_id}</h3>
      </div>

      <div className="allcustomers_column_name_lable">
        <h3>{props.customer_name}</h3>
      </div>

      <div className="allcustomers_column_active_or_not_lable">
        <Switch
          onChange={handleSwitchChangeLocal}
          {...label}
          checked={checked === 1 ? true : false}
        />
      </div>
    </div>
  );
};

export default Allcustomerscolumn;
