import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createCustomerAction,
  deleteCustomerAction,
  getAllCustomerAction,
  singleCustomerAction,
  updateCustomerAction,
} from "../../Redux/actions/customerActions";
import {
  getFatRateAction,
  updateFatRateAction,
} from "../../Redux/actions/fatRateActions";
import Loading from "../Loading/Loading";
import Allcustomers from "./Allcustomers";
import "./Customerentry.css";
import { clearErrors } from "../../Redux/actions/purchaseActions";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const unfiltered = true;

const Customerentry = () => {
  const showErrorToast = (message) => {
    toast.error(message, {
      autoClose: 5000,
    });
  };
  const dispatch = useDispatch();
  const {
    allcustomers,
    loading,
    error: allcustomersError,
  } = useSelector((state) => state.allcustomers);
  const { singlecustomer, error: singlecustomerError } = useSelector(
    (state) => state.singlecustomer
  );
  const { createcustomer, error: createcustomerError } = useSelector(
    (state) => state.createcustomer
  );
  const { updatecustomer, error: updatecustomerError } = useSelector(
    (state) => state.updatecustomer
  );
  const { deletecustomer, error: deletecustomerError } = useSelector(
    (state) => state.deletecustomer
  );
  const {
    getfatrate,
    error: getfatrateError,
    loading: getfatrateLoading,
  } = useSelector((state) => state.getfatrate);
  const { updatefatrate, error: updatefatrateError } = useSelector(
    (state) => state.updatefatrate
  );

  const [customerId, setCustomerId] = useState(0);
  const [customerName, setCustomerName] = useState("");
  const [successBlink, setSuccessBlink] = useState(false);
  const [milkFatState, setMilkFatState] = useState(0);

  const handleCustomerId = (e) => {
    resetStates();
    setCustomerId(e.target.value);
    dispatch(singleCustomerAction(e.target.value));
  };

  const handleCustomerName = (e) => {
    setCustomerName(e.target.value);
  };

  const resetStates = () => {
    setCustomerId(
      loading === false
        ? Math.max(...allcustomers.map((o) => o.customer_id)) + 1
        : 0
    );
    setCustomerName("");
  };

  const handleRegisterCustomer = (event) => {
    event.preventDefault();
    const myForm = new FormData();

    myForm.set("customer_id", customerId);
    myForm.set("customer_name", customerName);

    dispatch(createCustomerAction(myForm));
    resetStates();
    dispatch(getAllCustomerAction());
  };

  const handleUpdate = (event) => {
    event.preventDefault();
    const myForm = new FormData();

    myForm.set("customer_id", customerId);
    myForm.set("customer_name", customerName);

    dispatch(updateCustomerAction(customerId, myForm));
    resetStates();
    dispatch(getAllCustomerAction());
  };

  const handleDelete = () => {
    dispatch(deleteCustomerAction(customerId));
    resetStates();
    dispatch(getAllCustomerAction());
  };

  const handleFatRate = (e) => {
    setMilkFatState(e.target.value);
  };

  const submitFatRate = () => {
    const myForm = new FormData();

    myForm.set("fat_rate", milkFatState);
    dispatch(updateFatRateAction(myForm));
  };

  useEffect(() => {
    dispatch(getAllCustomerAction(unfiltered));
    dispatch(getFatRateAction());
  }, [dispatch]);

  useEffect(() => {
    resetStates();
    setCustomerId(
      loading === false
        ? Math.max(...allcustomers.map((o) => o.customer_id)) + 1
        : 0
    );
  }, [allcustomers]);

  useEffect(() => {
    setMilkFatState(
      getfatrateLoading === false && getfatrate[0].fat_rate.toFixed(2)
    );
  }, [getfatrate, getfatrateLoading]);

  useEffect(() => {
    if (loading === false && singlecustomer.length > 0) {
      setCustomerId(singlecustomer[0].customer_id);
      setCustomerName(singlecustomer[0].customer_name);
    }
  }, [singlecustomer]);

  useEffect(() => {
    if (
      loading === false &&
      createcustomer &&
      createcustomer.affectedRows === 1
    ) {
      alert("Successful");
    }
  }, [loading, createcustomer]);

  useEffect(() => {
    if (
      loading === false &&
      updatecustomer &&
      updatecustomer.affectedRows === 1
    ) {
      alert("Successful");
    }
  }, [loading, updatecustomer]);

  useEffect(() => {
    if (
      loading === false &&
      deletecustomer &&
      deletecustomer.affectedRows === 1
    ) {
      alert("Successful");
    }
  }, [loading, deletecustomer]);

  useEffect(() => {
    if (
      loading === false &&
      updatefatrate &&
      updatefatrate.affectedRows === 1
    ) {
      alert("Successful");
    }
  }, [loading, updatefatrate]);

  useEffect(() => {
    setTimeout(() => {
      setSuccessBlink(false);
    }, 800);
  }, [successBlink]);

  useEffect(() => {
    if (allcustomersError) {
      showErrorToast(allcustomersError);
      dispatch(clearErrors());
    }
    if (singlecustomerError) {
      showErrorToast(singlecustomerError);
      dispatch(clearErrors());
    }
    if (createcustomerError) {
      showErrorToast(createcustomerError);
      dispatch(clearErrors());
    }
    if (updatecustomerError) {
      showErrorToast(updatecustomerError);
      dispatch(clearErrors());
    }
    if (deletecustomerError) {
      showErrorToast(deletecustomerError);
      dispatch(clearErrors());
    }
    if (getfatrateError) {
      showErrorToast(getfatrateError);
      dispatch(clearErrors());
    }
    if (updatefatrateError) {
      showErrorToast(updatefatrateError);
      dispatch(clearErrors());
    }
  }, [
    dispatch,
    alert,
    allcustomersError,
    singlecustomerError,
    createcustomerError,
    updatecustomerError,
    deletecustomerError,
    getfatrateError,
    updatefatrateError,
  ]);

  return (
    <>
      <div className="heading_and_form_container">
        <form
          className="customer_entry_container"
          onSubmit={handleRegisterCustomer}
        >
          <label className="customerentry_id_lable">
            Customer Id:
            <input
              autoFocus
              type="number"
              value={customerId}
              onChange={(e) => handleCustomerId(e)}
            />
          </label>

          <label className="createcustomer_name_lable">
            Customer Name:
            <input
              type="text"
              value={customerName}
              onChange={(e) => handleCustomerName(e)}
            />
          </label>
          <div className="buttons_input_container">
            <input className="register_input" type="submit" value="Register" />
            <input
              className="update_input"
              type="button"
              value="Update"
              onClick={handleUpdate}
            />
            <input
              className="refresh_input"
              type="button"
              onClick={resetStates}
              value="Refresh"
            />
            <input
              className="delete_input"
              type="button"
              onClick={handleDelete}
              value="Delete"
            />
          </div>
        </form>
        <form className="fat_rate_entry_container" onSubmit={submitFatRate}>
          <label className="fate_rate_lable">
            Fat Rate
            <input
              className="fat_rate_input"
              type="number"
              step={0.01}
              onChange={(e) => {
                handleFatRate(e);
              }}
              value={milkFatState}
            />
          </label>

          <input
            className="submit_fat_rate_input"
            type="button"
            onClick={submitFatRate}
            value="Update"
          />
        </form>
      </div>
      {loading === true ? (
        <Loading />
      ) : (
        <Allcustomers allcustomers={allcustomers} />
      )}
      <div aria-disabled={true} className="success_fail_check">
        {successBlink && <h1 className="success_check">✔ Successfull</h1>}
      </div>
      <ToastContainer />
    </>
  );
};

export default Customerentry;
