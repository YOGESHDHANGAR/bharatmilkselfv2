import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./Purchaseentry.css";
import {
  clearErrors,
  createPurchaseAction,
  deletePurchaseAction,
  getLatestPurchaseSerialAction,
  singlePurchaseAction,
  updatePurchaseAction,
} from "../../Redux/actions/purchaseActions";
import { getAllCustomerAction } from "../../Redux/actions/customerActions";
import { getFatRateAction } from "../../Redux/actions/fatRateActions";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MetaData from "../MetaData/MetaData";

const Purchaseentry = ({ modal_purchase_serial }) => {
  const showErrorToast = (message) => {
    toast.error(message, {
      autoClose: 5000,
    });
  };
  const inputRef = useRef(null);
  const dispatch = useDispatch();

  const showDateOnceRightFormat = () => {
    const currentDate = new Date();
    const day = String(currentDate.getDate()).padStart(2, "0");
    const month = String(currentDate.getMonth() + 1).padStart(2, "0");
    const year = currentDate.getFullYear();
    const formattedDate = `${day}-${month}-${year}`;
    return formattedDate;
  };

  const {
    getlatestpurchaseserial,
    loading: getlatestpurchaseserialLoading,
    error: getlatestpurchaseserialError,
  } = useSelector((state) => state.getlatestpurchaseserial);

  const {
    allcustomers,
    error: allcustomersError,
    loading: allcustomersLoading,
  } = useSelector((state) => state.allcustomers);

  const {
    createpurchase,
    returnObject: createpurchaseReturnObject,
    error: createpurchaseError,
    loading: createpurchaseLoading,
  } = useSelector((state) => state.createpurchase);

  const {
    singlepurchase,
    error: singlepurchaseError,
    loading: singlepurchaseLoading,
  } = useSelector((state) => state.singlepurchase);

  const {
    updatepurchase,

    returnObject: updatepurchaseReturnObject,
    error: updatepurchaseError,
    loading: updatepurchaseLoading,
  } = useSelector((state) => state.updatepurchase);

  const {
    deletepurchase,
    error: deletepurchaseError,
    loading: deletepurchaseLoading,
  } = useSelector((state) => state.deletepurchase);

  const { getfatrate, error: getfatrateError } = useSelector(
    (state) => state.getfatrate
  );

  const [purchaseDate, setPurchaseDate] = useState(
    new Date().toJSON().slice(0, 10)
  );
  const [purchaseSerial, setPurchaseSerial] = useState(0);
  const [customerId, setCustomerId] = useState(0);
  const [customerName, setCustomerName] = useState("");
  const [purchaseShift, setPurchaseShift] = useState("Morning");
  const [milkType, setMilkType] = useState("Buffalo");
  const [milkQuantity, setMilkQuantity] = useState(0);
  const [milkFat, setMilkFat] = useState(0);
  const [milkClr, setMilkClr] = useState(0);
  const [milkRate, setMilkRate] = useState(0);
  const [milkAmount, setMilkAmount] = useState(0);
  const [successBlink, setSuccessBlink] = useState(false);
  const [showDateOnce, setShowDateOnce] = useState(true);
  const [returnObjectState, setReturnObjectState] = useState({});

  const handleSerialNumber = (e) => {
    setPurchaseSerial(e.target.value);
    dispatch(singlePurchaseAction(e.target.value));
  };

  const handleDate = (e) => {
    setPurchaseDate(e.target.value);
  };

  const handleCustomerID = (e) => {
    const value = e.target.value;
    setCustomerId(value);
    const selectedCustomer = allcustomers.find(
      (customer) => customer.customer_id === Number(value)
    );
    if (selectedCustomer) {
      setCustomerName(selectedCustomer.customer_name);
    } else {
      setCustomerName("");
    }
  };

  const handleCustomerName = (e) => {
    const value = e.target.value;
    setCustomerName(value);
    const selectedCustomer = allcustomers.find(
      (customer) => customer.customer_name === value
    );
    if (selectedCustomer) {
      setCustomerId(selectedCustomer.customer_id);
    } else {
      setCustomerId(0);
    }
  };

  const handleShift = (e) => {
    setPurchaseShift(e.target.value);
  };

  const handleType = (e) => {
    setMilkType(e.target.value);
  };

  const hadleBuffaloOrCow = (e) => {
    if (e.key === "Tab") {
      if (milkFat < 5) {
        setMilkType("Cow");
      }
    }
  };

  const handleQuantity = (e) => {
    setMilkQuantity(e.target.value);
  };

  const handleFat = (e) => {
    setMilkFat(e.target.value);
  };

  const handleClr = (e) => {
    setMilkClr(e.target.value);
  };

  const handleRate = (e) => {
    setMilkRate(e.target.value);
  };

  const handleAmount = (e) => {
    setMilkAmount(e.target.value);
  };

  const handleRateAndAmount = (e) => {
    if (e.key === "Tab") {
      let remainder = (milkFat * 10) % 3;
      let milkNewFat = milkFat;
      if (remainder === 0) {
        milkNewFat = Number(milkFat) + 0.1;
      } else if (remainder === 1) {
        milkNewFat = Number(milkFat);
      } else if (remainder === 2) {
        milkNewFat = Number(milkFat) - 0.1;
      }
      let milkPossibleRate = milkNewFat * getfatrate[0].fat_rate;

      let milkFinalRate =
        milkClr > 24 ? milkPossibleRate : milkPossibleRate - 1 * (25 - milkClr);
      setMilkRate(milkFinalRate.toFixed(2));
      setMilkAmount((milkFinalRate * milkQuantity).toFixed(2));
    }
  };

  const hardResetStates = () => {
    setPurchaseSerial(getlatestpurchaseserial + 1);
    setCustomerId(0);
    setCustomerName("");
    setMilkQuantity(0);
    setMilkFat(0);
    setMilkType("Buffalo");
    setMilkClr(0);
    setMilkRate(0);
    setMilkAmount(0);
  };

  const resetStates = () => {
    setCustomerId(0);
    setCustomerName("");
    setMilkQuantity(0);
    setMilkFat(0);
    setMilkType("Buffalo");
    setMilkClr(0);
    setMilkRate(0);
    setMilkAmount(0);
  };

  const handleSave = (event) => {
    event.preventDefault();
    const myForm = new FormData();
    myForm.set("purchase_serial", purchaseSerial);
    myForm.set("purchase_date", purchaseDate);
    myForm.set("customer_id", customerId);
    myForm.set("customer_name", customerName);
    myForm.set("purchase_shift", purchaseShift);
    myForm.set("milk_type", milkType);
    myForm.set("milk_quantity", milkQuantity);
    myForm.set("milk_fat", milkFat);
    myForm.set("milk_clr", milkClr);
    myForm.set("milk_rate", milkRate);
    myForm.set("milk_amount", milkAmount);

    if (!purchaseShift) {
      alert("Please Select Shift");
    } else if (!milkQuantity) {
      alert("Please Enter Quantity");
    } else if (!milkFat) {
      alert("Please Enter Fat");
    } else if (!milkClr) {
      alert("Please Clr");
    } else {
      dispatch(createPurchaseAction(myForm));
      resetStates();
    }
  };

  const handleUpdate = (event) => {
    event.preventDefault();
    const myForm = new FormData();

    myForm.set("purchase_serial", purchaseSerial);
    myForm.set("purchase_date", purchaseDate);
    myForm.set("customer_id", customerId);
    myForm.set("customer_name", customerName);
    myForm.set("purchase_shift", purchaseShift);
    myForm.set("milk_type", milkType);
    myForm.set("milk_quantity", milkQuantity);
    myForm.set("milk_fat", milkFat);
    myForm.set("milk_clr", milkClr);
    myForm.set("milk_rate", milkRate);
    myForm.set("milk_amount", milkAmount);

    dispatch(updatePurchaseAction(purchaseSerial, myForm));
    hardResetStates();
  };

  const handleDelete = () => {
    dispatch(deletePurchaseAction(purchaseSerial));
    hardResetStates();
  };

  const hadleTabAfterSave = (e) => {
    if (e.key === "Tab" || e.key === "Enter") {
      inputRef.current.focus();
    }
  };

  useEffect(() => {
    if (modal_purchase_serial) {
      dispatch(singlePurchaseAction(modal_purchase_serial));
      setPurchaseSerial(modal_purchase_serial);
    }
  }, [singlepurchaseLoading, singlepurchase]);

  useEffect(() => {
    dispatch(getLatestPurchaseSerialAction());
    dispatch(getAllCustomerAction());
    dispatch(getFatRateAction());
  }, [dispatch]);

  useEffect(() => {
    if (!modal_purchase_serial) {
      getlatestpurchaseserialLoading === false
        ? setPurchaseSerial(getlatestpurchaseserial + 1)
        : 0;
    }
  }, [getlatestpurchaseserialLoading]);

  useEffect(() => {
    if (
      createpurchaseLoading === false &&
      createpurchase &&
      createpurchase.affectedRows === 1
    ) {
      setSuccessBlink(true);
      setPurchaseSerial(Number(createpurchase.insertId) + 1);
      setReturnObjectState(createpurchaseReturnObject);
    }
  }, [createpurchaseLoading, createpurchase]);

  useEffect(() => {
    if (
      updatepurchaseLoading === false &&
      updatepurchase &&
      updatepurchase.affectedRows === 1
    ) {
      setSuccessBlink(true);
      setReturnObjectState(updatepurchaseReturnObject);
      setPurchaseSerial(getlatestpurchaseserial + 1);
    }
  }, [updatepurchaseLoading, getlatestpurchaseserialLoading, updatepurchase]);

  useEffect(() => {
    if (
      deletepurchaseLoading === false &&
      deletepurchase &&
      deletepurchase.affectedRows === 1
    ) {
      setSuccessBlink(true);
      setReturnObjectState({});
    }
  }, [deletepurchaseLoading, deletepurchase]);

  useEffect(() => {
    setTimeout(() => {
      setSuccessBlink(false);
    }, 800);
  });

  useEffect(() => {
    setTimeout(() => {
      setShowDateOnce(false);
    }, 3000);
  }, [showDateOnce]);

  useEffect(() => {
    if (singlepurchaseLoading === false && singlepurchase.length > 0) {
      setCustomerId(singlepurchase[0].customer_id);
      setPurchaseDate(singlepurchase[0].purchase_date.slice(0, 10));
      setCustomerName(singlepurchase[0].customer_name);
      setPurchaseShift(singlepurchase[0].purchase_shift);
      setMilkType(singlepurchase[0].milk_type);
      setMilkQuantity(singlepurchase[0].milk_quantity);
      setMilkFat(singlepurchase[0].milk_fat);
      setMilkClr(singlepurchase[0].milk_clr);
      setMilkRate(singlepurchase[0].milk_rate);
      setMilkAmount(singlepurchase[0].milk_amount);
    }
  }, [singlepurchase, singlepurchaseLoading]);

  useEffect(() => {
    if (getlatestpurchaseserialError) {
      showErrorToast(getlatestpurchaseserialError);
      dispatch(clearErrors());
    }

    if (allcustomersError) {
      showErrorToast(allcustomersError);
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
    getlatestpurchaseserialError,
    allcustomersError,
    createpurchaseError,
    singlepurchaseError,
    updatepurchaseError,
    deletepurchaseError,
    getfatrateError,
  ]);

  return (
    <div>
      <MetaData title="Purchase_Entry" />
      {showDateOnce === true && (
        <div className="show_date_once">
          <h1>Selected Date: {showDateOnceRightFormat()}</h1>
        </div>
      )}
      {createpurchase.affectedRows === 1 && createpurchaseLoading === false && (
        <div className="purchaseentry_showlastentry">
          <div className="purchaseentry_showlastentry_topic">
            <h3>Last Created Entry :</h3>
          </div>
          <div className="purchaseentry_showlastentry_content">
            <h3>{returnObjectState.purchase_serial}</h3>
            <h3>{returnObjectState.purchase_date}</h3>
            <h3>{returnObjectState.customer_id}</h3>
            <h3>{returnObjectState.customer_name}</h3>
            <h3>{returnObjectState.purchase_shift}</h3>
            <h3>{returnObjectState.milk_type}</h3>
            <h3>{returnObjectState.milk_quantity}</h3>
            <h3>{returnObjectState.milk_fat}</h3>
            <h3>{returnObjectState.milk_clr}</h3>
            <h3>{returnObjectState.milk_rate}</h3>
            <h3>{returnObjectState.milk_amount}</h3>
          </div>
        </div>
      )}
      {updatepurchase.affectedRows === 1 && updatepurchaseLoading === false && (
        <div className="purchaseentry_showlastentry">
          <div className="purchaseentry_showlastentry_topic">
            <h3>Last Updated Entry :</h3>
          </div>
          <div className="purchaseentry_showlastentry_content">
            <h3>{returnObjectState.purchase_serial}</h3>
            <h3>{returnObjectState.purchase_date}</h3>
            <h3>{returnObjectState.customer_id}</h3>
            <h3>{returnObjectState.customer_name}</h3>
            <h3>{returnObjectState.purchase_shift}</h3>
            <h3>{returnObjectState.milk_type}</h3>
            <h3>{returnObjectState.milk_quantity}</h3>
            <h3>{returnObjectState.milk_fat}</h3>
            <h3>{returnObjectState.milk_clr}</h3>
            <h3>{returnObjectState.milk_rate}</h3>
            <h3>{returnObjectState.milk_amount}</h3>
          </div>
        </div>
      )}

      <form className="purchaseentry_container" onSubmit={handleSave}>
        <div className="purchaseentry_serial_date_container">
          <label className="purchaseentry_serialno_lable">
            Serial No.:
            <input
              ref={inputRef}
              tabIndex={1}
              autoFocus
              type="number"
              value={purchaseSerial}
              onChange={(e) => handleSerialNumber(e)}
            />
          </label>
          <label className="purchaseentry_date_lable">
            Date:
            <input
              tabIndex={-1}
              type="date"
              value={purchaseDate}
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
              {allcustomersLoading === false &&
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
              {allcustomersLoading === false &&
                allcustomers.map((elem, index) => {
                  return <Customename key={index} elem={elem} />;
                })}
            </select>
          </label>

          <label className="purchaseentry_shift_lable">
            Shift:
            <select
              className={`customer_shift_select ${
                purchaseShift === "Morning" ? "morning" : "evening"
              }`}
              tabIndex={5}
              name="select_shift"
              value={purchaseShift}
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
              value={milkType}
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
              value={milkQuantity}
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
              value={milkFat}
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
              value={milkClr}
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
              value={milkRate}
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
              value={milkAmount}
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
            tabIndex={-1}
            className="update_input"
            type="button"
            value="Update"
            onClick={handleUpdate}
          />
          <input
            tabIndex={-1}
            className="refresh_input"
            type="button"
            onClick={hardResetStates}
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
  return <option value={props.elem.name}>{props.elem.customer_name}</option>;
};

const Customecustomerid = (props) => {
  return <option value={props.elem.id}>{props.elem.customer_id}</option>;
};

export default Purchaseentry;
