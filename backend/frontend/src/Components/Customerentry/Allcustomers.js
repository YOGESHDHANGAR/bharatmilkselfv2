import React, { useEffect, useState } from "react";
import Allcustomerscolumn from "./Allcustomerscolumn";
import Allcustomersheader from "./Allcustomersheader";
import { clearErrors } from "../../Redux/actions/purchaseActions";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MetaData from "../MetaData/MetaData";

const Allcustomers = (props) => {
  const showErrorToast = (message) => {
    toast.error(message, {
      autoClose: 5000,
    });
  };
  const dispatch = useDispatch();

  const { allcustomersErorr } = useSelector((state) => state.allcustomers);

  // const handleSwitchChange = () => {
  //   const new_customer_active_or_not = customer_active_or_not === 1 ? 0 : 1;
  //   console.log("new_customer_active_or_not", new_customer_active_or_not);
  //   dispatch();
  // };

  useEffect(() => {}, []);

  useEffect(() => {
    if (allcustomersErorr) {
      showErrorToast(allcustomersErorr);
      dispatch(clearErrors());
    }
  }, [dispatch, alert, allcustomersErorr]);
  return (
    <div>
      <MetaData title="Customer_Entry" />
      <Allcustomersheader />
      {props.allcustomers.map((elem, index) => {
        return (
          <Allcustomerscolumn
            key={index}
            count={index}
            customer_id={elem.customer_id}
            customer_name={elem.customer_name}
            customer_active_or_not={elem.customer_active_or_not}
          />
        );
      })}
      <ToastContainer />
    </div>
  );
};

export default Allcustomers;
