import React from "react";
import "./Allcustomerscolumn.css";

const Allcustomerscolumn = (props) => {
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
    </div>
  );
};

export default Allcustomerscolumn;
