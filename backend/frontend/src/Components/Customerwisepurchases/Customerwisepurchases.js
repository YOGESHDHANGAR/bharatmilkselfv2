import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Customerwisepurchases.css";
import Customerwisepurchasescolumn from "./Customerwisepurchasescolumn";
import Customerwisepurchasesheader from "./Customerwisepurchasesheader";
import Cutomerwisepurchasesfilter from "./Customerwisepurchasesfilter";
import Loading from "../Loading/Loading";
import { useDispatch, useSelector } from "react-redux";
import Box from "@mui/material/Box";
import {
  clearErrors,
  customerWisePurchaseAction,
  customerWisePurchaseOutliersAction,
} from "../../Redux/actions/purchaseActions";
import ReactDOM from "react-dom";
import Purchaseentry from "../Purchaseentry/Purchaseentry";
import MetaData from "../MetaData/MetaData";

let needUpdate = false;

const ModalRoot = ({ children }) => {
  return ReactDOM.createPortal(
    <div className="modal-overlay">{children}</div>,
    document.body
  );
};

const Modal = ({ onClose, children }) => {
  return (
    <div className="modal">
      <button className="modal-close" onClick={onClose}>
        X
      </button>
      <div className="modal-content">{children}</div>
    </div>
  );
};
const Customerwisepurchases = React.memo(() => {
  const showErrorToast = (message) => {
    toast.error(message, {
      autoClose: 5000,
    });
  };
  const dispatch = useDispatch();
  const {
    customerwisepurchase,
    loading,
    error: customerwisepurchaseError,
  } = useSelector((state) => state.customerwisepurchase);

  const {
    updatepurchase,
    error: updatepurchaseError,
    fetchUpdatedEntryQueryResult,
    loading: updatepurchaseLoading,
  } = useSelector((state) => state.updatepurchase);

  const {
    deletepurchase,
    error: deletepurchaseError,
    loading: deletepurchaseLoading,
  } = useSelector((state) => state.deletepurchase);

  const {
    customerwisepurchaseoutliers,
    loading: customerwisepurchaseoutliersLoading,
    error: customerwisepurchaseoutliersError,
  } = useSelector((state) => state.customerwisepurchaseoutliers);

  const [customerWisePurchaseState, setCustomerWisePurchase] =
    useState(customerwisepurchase);

  const [showModal, setShowModal] = useState(false);

  const [selectedPurchaseSerial, setSelectedPurchaseSerial] = useState(null);

  const [storedArrayInParent, setStoredArrayInParent] = useState([]);

  const handleToggleFromParent = (customer_id) => {
    const containsOrNot = storedArrayInParent.includes(customer_id);
    const updatedArray = containsOrNot
      ? storedArrayInParent.filter((item) => item !== customer_id)
      : [...storedArrayInParent, customer_id];

    setStoredArrayInParent(updatedArray);
  };

  useEffect(() => {
    const storedArray = localStorage.getItem(
      "customerwisepurchase_markedEntriesArray"
    );
    if (storedArray) {
      setStoredArrayInParent(JSON.parse(storedArray));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "customerwisepurchase_markedEntriesArray",
      JSON.stringify(storedArrayInParent)
    );
  }, [storedArrayInParent]);

  const handleOpenModal = () => {
    setShowModal(true);
  };

  let counter = 0;
  let individualCounter = 0;

  const commonStyles = {
    bgcolor: "black",
    borderColor: "black",
    width: "100vw",
  };

  const handleDeleteEntryParent = (purchase_serial) => {
    setCustomerWisePurchase((prevComponents) =>
      prevComponents.filter(
        (component) => component.purchase_serial !== purchase_serial
      )
    );
  };

  const handleUpdateEntryParent = (purchase_serial) => {
    setSelectedPurchaseSerial(purchase_serial);
    handleOpenModal();
  };

  const handleUpdateEntryParentAfterResult = (
    fetchUpdatedEntryQueryResult2
  ) => {
    setCustomerWisePurchase((prevState) =>
      prevState.map((entry) => {
        if (
          entry.purchase_serial ===
          fetchUpdatedEntryQueryResult2[0].purchase_serial
        ) {
          return fetchUpdatedEntryQueryResult2[0];
        }
        return entry;
      })
    );
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  useEffect(() => {
    dispatch(customerWisePurchaseAction(1));
    dispatch(customerWisePurchaseOutliersAction(1));
  }, [dispatch]);

  useEffect(() => {
    setCustomerWisePurchase(customerwisepurchase);
  }, [customerwisepurchase]);

  useEffect(() => {
    if (customerwisepurchaseError) {
      showErrorToast(customerwisepurchaseError);
      dispatch(clearErrors());
    }
    if (deletepurchaseError) {
      showErrorToast(deletepurchaseError);
      dispatch(clearErrors());
    }
  }, [dispatch, customerwisepurchaseError, deletepurchaseError, alert]);

  useEffect(() => {
    if (updatepurchaseLoading === false && updatepurchase.affectedRows === 1) {
      handleUpdateEntryParentAfterResult(fetchUpdatedEntryQueryResult);
    }
  }, [updatepurchaseLoading]);

  return (
    <div>
      <MetaData title="Customer_Wise" />
      <Cutomerwisepurchasesfilter />
      <Customerwisepurchasesheader />
      <div>
        {showModal && (
          <ModalRoot>
            <Modal onClose={handleCloseModal}>
              <Purchaseentry modal_purchase_serial={selectedPurchaseSerial} />
            </Modal>
          </ModalRoot>
        )}
      </div>
      {loading === true ? (
        <Loading />
      ) : customerWisePurchaseState === undefined ||
        customerWisePurchaseState.length === 0 ? (
        <div className="no_result_found">
          <h1>No Result Found!</h1>
        </div>
      ) : (
        customerWisePurchaseState.map((elem, index) => {
          if (elem.milkTotalAmount) {
            individualCounter = 0;
            return (
              <div key={index}>
                <Box sx={{ ...commonStyles, border: 0.3 }} />
                <div className="totallingField">
                  <h3 className="totalMilkField">
                    {elem.milkTotalQuantity.toFixed(1)}L
                  </h3>
                  <h3 className="totalAmountField">
                    ₹{elem.milkTotalAmount.toFixed(2)}
                  </h3>
                </div>
                <Box sx={{ ...commonStyles, border: 1.6 }} />
              </div>
            );
          } else {
            needUpdate = false;
            for (let i = 0; i < customerwisepurchaseoutliers.length; i++) {
              if (
                customerwisepurchaseoutliers[i].purchase_serial ===
                elem.purchase_serial
              ) {
                needUpdate = true;
              }
            }
            return (
              <Customerwisepurchasescolumn
                key={index}
                count={index}
                counter={counter++}
                individualCounter={individualCounter++}
                purchase_serial={elem.purchase_serial}
                purchase_date={elem.purchase_date}
                customer_id={elem.customer_id}
                customer_name={elem.customer_name}
                purchase_shift={elem.purchase_shift}
                milk_type={elem.milk_type}
                milk_quantity={elem.milk_quantity}
                milk_fat={elem.milk_fat}
                milk_rate={elem.milk_rate}
                milk_clr={elem.milk_clr}
                milk_amount={elem.milk_amount}
                handleUpdateEntryParent={handleUpdateEntryParent}
                handleDeleteEntryParent={handleDeleteEntryParent}
                needUpdate={needUpdate}
                handleToggleFromParent={() => {
                  handleToggleFromParent(elem.purchase_serial);
                }}
                markedEntryOrNot={storedArrayInParent.includes(
                  elem.purchase_serial
                )}
              />
            );
          }
        })
      )}
      <ToastContainer />
    </div>
  );
});

export default Customerwisepurchases;
