import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./Purchaseentry.css";
import {
  clearErrors,
  createPurchaseAction,
  deletePurchaseAction,
  getAllPurchaseAction,
  singlePurchaseAction,
  updatePurchaseAction,
} from "../../Redux/actions/purchaseActions";
import { getAllCustomerAction } from "../../Redux/actions/customerActions";
import { getFatRateAction } from "../../Redux/actions/fatRateActions";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Purchaseentry = () => {
  const showErrorToast = (message) => {
    toast.error(message, {
      autoClose: 5000,
    });
  };
  const inputRef = useRef(null);
  const dispatch = useDispatch();
  const {
    allpurchases,
    loading,
    error: allpurchasesError,
  } = useSelector((state) => state.allpurchases);
  const { allcustomers, error: allcustomersError } = useSelector(
    (state) => state.allcustomers
  );
  const { createpurchase, error: createpurchaseError } = useSelector(
    (state) => state.createpurchase
  );
  const { singlepurchase, error: singlepurchaseError } = useSelector(
    (state) => state.singlepurchase
  );
  const { updatepurchase, error: updatepurchaseError } = useSelector(
    (state) => state.updatepurchase
  );
  const { deletepurchase, error: deletepurchaseError } = useSelector(
    (state) => state.deletepurchase
  );
  const { getfatrate, error: getfatrateError } = useSelector(
    (state) => state.getfatrate
  );

  const [date, setDate] = useState(new Date().toJSON().slice(0, 10));
  const [serialNumber, setSerialNumber] = useState(0);
  const [customerId, setCustomerId] = useState(0);
  const [customerName, setCustomerName] = useState("");
  const [shift, setShift] = useState("Morning");
  const [type, setType] = useState("Buffalo");
  const [quantity, setQuantity] = useState(0);
  const [fat, setFat] = useState(0);
  const [clr, setClr] = useState(0);
  const [rate, setRate] = useState(0);
  const [amount, setAmount] = useState(0);
  const [successBlink, setSuccessBlink] = useState(false);

  const handleSerialNumber = (e) => {
    setSerialNumber(e.target.value);
    dispatch(singlePurchaseAction(e.target.value));
  };

  const handleDate = (e) => {
    setDate(e.target.value);
  };

  const handleCustomerID = (e) => {
    const value = e.target.value;
    setCustomerId(Number(value));
    const selectedCustomer = allcustomers.find(
      (customer) => customer.ID === Number(value)
    );
    if (selectedCustomer) {
      setCustomerName(selectedCustomer.Name);
    } else {
      setCustomerName("");
    }
  };

  const handleCustomerName = (e) => {
    const value = e.target.value;
    setCustomerName(value);
    const selectedCustomer = allcustomers.find(
      (customer) => customer.Name === value
    );
    if (selectedCustomer) {
      setCustomerId(selectedCustomer.ID || 0);
    } else {
      setCustomerId(0);
    }
  };

  const handleShift = (e) => {
    setShift(e.target.value);
  };

  const handleType = (e) => {
    setType(e.target.value);
  };

  const hadleBuffaloOrCow = (e) => {
    if (e.key === "Tab") {
      if (fat < 5) {
        setType("Cow");
      }
    }
  };

  const handleQuantity = (e) => {
    setQuantity(e.target.value);
  };

  const handleFat = (e) => {
    setFat(e.target.value);
  };

  const handleClr = (e) => {
    setClr(e.target.value);
  };

  const handleRate = (e) => {
    setRate(e.target.value);
  };

  const handleAmount = (e) => {
    setAmount(e.target.value);
  };

  const handleRateAndAmount = (e) => {
    if (e.key === "Tab") {
      let remainder = (fat * 10) % 3;
      let newFat = fat;
      if (remainder === 0) {
        newFat = Number(fat) + 0.1;
      } else if (remainder === 1) {
        newFat = Number(fat);
      } else if (remainder === 2) {
        newFat = Number(fat) - 0.1;
      }
      let possibleRate = newFat * getfatrate[0].fatrate;
      let finalRate = clr > 24 ? possibleRate : possibleRate - 1 * (25 - clr);
      setRate(finalRate.toFixed(2));
      setAmount((finalRate * quantity).toFixed(2));
    }
  };

  const resetStates = () => {
    setSerialNumber(loading === false ? allpurchases[0].Serial + 1 : 0);
    setCustomerId({});
    setCustomerName({});
    setQuantity({});
    setFat({});
    setClr({});
    setRate({});
    setAmount({});
  };

  const handleSave = (event) => {
    event.preventDefault();
    const myForm = new FormData();

    myForm.set("Serial", serialNumber);
    myForm.set("Date", date);
    myForm.set("id", customerId);
    myForm.set("name", customerName);
    myForm.set("Shift", shift);
    myForm.set("Type", type);
    myForm.set("quantity", quantity);
    myForm.set("Fat", fat);
    myForm.set("CLR", clr);
    myForm.set("Rate", rate);
    myForm.set("Amount", amount);

    if (!shift) {
      showErrorToast("Please Select Shift");
    }

    dispatch(createPurchaseAction(myForm));
    resetStates();
    dispatch(getAllPurchaseAction());
  };

  const handleUpdate = (event) => {
    event.preventDefault();
    const myForm = new FormData();

    myForm.set("Date", date);
    myForm.set("id", customerId);
    myForm.set("name", customerName);
    myForm.set("Shift", shift);
    myForm.set("Type", type);
    myForm.set("quantity", quantity);
    myForm.set("Fat", fat);
    myForm.set("CLR", clr);
    myForm.set("Rate", rate);
    myForm.set("Amount", amount);

    dispatch(updatePurchaseAction(serialNumber, myForm));
    resetStates();
  };

  const handleDelete = () => {
    dispatch(deletePurchaseAction(serialNumber));
    resetStates();
    setSerialNumber(loading === false ? allpurchases[0].Serial : 0);
  };

  const hadleTabAfterSave = (e) => {
    if (e.key === "Tab" || e.key === "Enter") {
      inputRef.current.focus();
    }
  };

  useEffect(() => {
    dispatch(getAllPurchaseAction());
    dispatch(getAllCustomerAction());
    dispatch(getFatRateAction());
  }, [dispatch]);

  useEffect(() => {
    resetStates();
    setSerialNumber(loading === false ? allpurchases[0].Serial + 1 : 0);
  }, [dispatch, allpurchases]);

  useEffect(() => {
    if (
      loading === false &&
      createpurchase &&
      createpurchase.affectedRows === 1
    ) {
      setSuccessBlink(true);
    }
  }, [loading, createpurchase]);

  useEffect(() => {
    if (
      loading === false &&
      updatepurchase &&
      updatepurchase.affectedRows === 1
    ) {
      setSuccessBlink(true);
    }
  }, [loading, updatepurchase]);

  useEffect(() => {
    if (
      loading === false &&
      deletepurchase &&
      deletepurchase.affectedRows === 1
    ) {
      setSuccessBlink(true);
    }
  }, [loading, deletepurchase]);

  useEffect(() => {
    setTimeout(() => {
      setSuccessBlink(false);
    }, 800);
  }, [successBlink]);

  useEffect(() => {
    if (loading === false && singlepurchase.length > 0) {
      setCustomerId(singlepurchase[0].id);
      setDate(singlepurchase[0].Date.slice(0, 10));
      setCustomerName(singlepurchase[0].name);
      setShift(singlepurchase[0].Shift);
      setType(singlepurchase[0].Type);
      setQuantity(singlepurchase[0].quantity);
      setFat(singlepurchase[0].Fat);
      setClr(singlepurchase[0].CLR);
      setRate(singlepurchase[0].Rate);
      setAmount(singlepurchase[0].Amount);
    }
  }, [singlepurchase]);

  useEffect(() => {
    if (allcustomersError) {
      showErrorToast(allcustomersError);
      dispatch(clearErrors());
    }
    if (allpurchasesError) {
      showErrorToast(allpurchasesError);
      dispatch(clearErrors());
    }
    if (createpurchaseError) {
      showErrorToast(createpurchaseError);
      dispatch(clearErrors());
    }
    if (singlepurchaseError) {
      showErrorToast(singlepurchaseError);
      dispatch(clearErrors());
    }
    if (updatepurchaseError) {
      showErrorToast(updatepurchaseError);
      dispatch(clearErrors());
    }
    if (deletepurchaseError) {
      showErrorToast(deletepurchaseError);
      dispatch(clearErrors());
    }
    if (getfatrateError) {
      showErrorToast(getfatrateError);
      dispatch(clearErrors());
    }
  }, [
    dispatch,
    allcustomersError,
    allpurchasesError,
    createpurchaseError,
    singlepurchaseError,
    updatepurchaseError,
    deletepurchaseError,
    getfatrateError,
  ]);

  return (
    <div>
      <form className="purchaseentry_container" onSubmit={handleSave}>
        <div className="purchaseentry_serial_date_container">
          <label className="purchaseentry_serialno_lable">
            Serial No.:
            <input
              ref={inputRef}
              tabIndex={1}
              autoFocus
              type="number"
              value={serialNumber}
              onChange={(e) => handleSerialNumber(e)}
            />
          </label>
          <label className="purchaseentry_date_lable">
            Date:
            <input
              tabIndex={-1}
              type="date"
              value={date}
              onChange={(e) => handleDate(e)}
            />
          </label>
        </div>
        <div className="purchaseentry_cutomerid_name_shift_container">
          <label className="purchaseentry_customerid_lable">
            Customer ID:
            <select
              className="customerid_name_select"
              tabIndex={3}
              name="select_customerid"
              value={customerId}
              onChange={(e) => handleCustomerID(e)}
            >
              {loading === false &&
                allcustomers.map((elem, index) => {
                  return <Customecustomerid key={index} elem={elem} />;
                })}
            </select>
          </label>
          <label className="purchaseentry_customername_lable">
            Customer Name:
            <select
              className="customer_name_select"
              tabIndex={4}
              name="select_name"
              value={customerName}
              onChange={(e) => handleCustomerName(e)}
            >
              {loading === false &&
                allcustomers.map((elem, index) => {
                  return <Customename key={index} elem={elem} />;
                })}
            </select>
          </label>

          <label className="purchaseentry_shift_lable">
            Shift:
            <select
              className={`customer_shift_select ${
                shift === "Morning" ? "morning" : "evening"
              }`}
              tabIndex={5}
              name="select_shift"
              value={shift}
              onChange={(e) => handleShift(e)}
            >
              <option value="Morning">Morning</option>
              <option value="Evening">Evening</option>
            </select>
          </label>
        </div>
        <div className="purchaseentry_type_quantity_fat_container">
          <label className="purchaseentry_type_lable">
            Type:
            <select
              className="customer_type_select"
              tabIndex={-1}
              name="select_type"
              value={type}
              onChange={(e) => {
                handleType(e);
              }}
            >
              <option value="Buffalo">Buffalo</option>
              <option value="Cow">Cow</option>
            </select>
          </label>

          <label className="purchaseentry_quantity_lable">
            Quantity:
            <input
              tabIndex={7}
              type="number"
              step={0.1}
              value={quantity}
              onChange={(e) => handleQuantity(e)}
              min="0"
              max="150"
            />
          </label>

          <label className="purchaseentry_fat_lable">
            Fat:
            <input
              tabIndex={8}
              type="number"
              step={0.1}
              value={fat}
              onChange={(e) => handleFat(e)}
              onKeyDown={(e) => hadleBuffaloOrCow(e)}
              min="0"
              max="13"
            />
          </label>
        </div>
        <div className="purchaseentry_number_rate_amount_container">
          <label className="purchaseentry_clr_lable">
            CLR:
            <input
              tabIndex={9}
              type="number"
              value={clr}
              onChange={(e) => handleClr(e)}
              onKeyDown={(e) => handleRateAndAmount(e)}
              min="0"
              max="32"
            />
          </label>

          <label className="purchaseentry_rate_lable">
            Rate:
            <input
              tabIndex={-1}
              type="number"
              step={0.001}
              value={rate}
              onChange={(e) => handleRate(e)}
              min="0"
              max="120"
            />
          </label>

          <label className="purchaseentry_amount_lable">
            Amount:
            <input
              tabIndex={-1}
              type="number"
              step={0.001}
              value={amount}
              onChange={(e) => handleAmount(e)}
              min="0"
              max="35000"
            />
          </label>
        </div>

        <div className="purchaseentry_save_update_refresh_delete">
          <input
            tabIndex={12}
            onKeyDown={hadleTabAfterSave}
            className="save_input"
            type="submit"
            value="Save"
          />
          <input
            tabIndex={13}
            className="update_input"
            type="button"
            value="Update"
            onClick={handleUpdate}
          />
          <input
            tabIndex={14}
            className="refresh_input"
            type="button"
            onClick={resetStates}
            value="Refresh"
          />
          <input
            tabIndex={-1}
            className="delete_input"
            type="button"
            onClick={handleDelete}
            value="Delete"
          />
        </div>
      </form>
      <div tabIndex={-1} aria-disabled={true} className="success_fail_check">
        {successBlink && <h1 className="success_check">✔ Successfull</h1>}
      </div>
      <ToastContainer />
    </div>
  );
};

const Customename = (props) => {
  return <option value={props.elem.name}>{props.elem.Name}</option>;
};

const Customecustomerid = (props) => {
  return <option value={props.elem.id}>{props.elem.ID}</option>;
};

export default Purchaseentry;
