import React from "react";
import "./Allcustomersheader.css";

const Allcustomersheader = () => {
  return (
    <div className="allcustomers_header_container">
      <div className="allcustomers_header_count_lable">
        <h3>Count</h3>
      </div>
      <div className="allcustomers_header_id_lable">
        <h3>Id</h3>
      </div>
      <div className="allcustomers_header_name_lable">
        <h3>Name</h3>
      </div>
    </div>
  );
};

export default Allcustomersheader;
