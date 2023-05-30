import React, { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Filter from "./Filter";
import { useSelector, useDispatch } from "react-redux";
import {
  clearErrors,
  getAllPurchaseAction,
} from "../../Redux/actions/purchaseActions";
import "./Home.css";
import Column from "./Column";
import Loading from "../Loading/Loading";
import { getAllCustomerAction } from "../../Redux/actions/customerActions";
import Header from "./Header";
import Box from "@mui/material/Box";
import MetaData from "../MetaData/MetaData";

const Home = () => {
  const showErrorToast = (message) => {
    toast.error(message, {
      autoClose: 5000,
    });
  };
  const dispatch = useDispatch();
  const {
    allpurchases,
    error: allpurchasesError,
    loading: allpurchasesLoadig,
    totalQuantityAmountQueryResultofallpurchases,
  } = useSelector((state) => state.allpurchases);

  const { allcustomers, error: allcustomersError } = useSelector(
    (state) => state.allcustomers
  );

  const commonStyles = {
    bgcolor: "black",
    borderColor: "black",
    width: "100vw",
  };

  useEffect(() => {
    dispatch(getAllPurchaseAction());
    dispatch(getAllCustomerAction());
  }, [dispatch]);

  useEffect(() => {
    if (allpurchasesError) {
      showErrorToast(allpurchasesError);
      dispatch(clearErrors());
    }
    if (allcustomersError) {
      showErrorToast(allcustomersError);
      dispatch(clearErrors());
    }
  }, [allcustomersError, allpurchasesError]);

  return (
    <div>
      <MetaData title="Home" />
      <Filter allcustomers={allcustomers} loading={allpurchasesLoadig} />
      <Header />
      {allpurchasesLoadig === true ? (
        <Loading />
      ) : allpurchases === undefined || allpurchases.length === 0 ? (
        <div className="no_result_found">
          <h1>No Result Found!</h1>
        </div>
      ) : (
        allpurchases.map((elem, index) => {
          return (
            <Column
              key={index}
              count={index}
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
            />
          );
        })
      )}
      <>
        {(allpurchasesLoadig === false && allpurchases !== undefined) ||
          (allpurchases.length !== 0 && (
            <div>
              <Box sx={{ ...commonStyles, border: 0.3 }} />
              <div className="home_totalling_Field">
                <h3 className="home_totalMilk_Field">
                  {totalQuantityAmountQueryResultofallpurchases[0].requiredTotalMilkQuantity.toFixed(
                    1
                  )}
                  L
                </h3>
                <h3 className="home_total_Amount_Field">
                  ₹
                  {totalQuantityAmountQueryResultofallpurchases[0].requiredTotalMilkAmount.toFixed(
                    2
                  )}
                </h3>
              </div>
              <Box sx={{ ...commonStyles, border: 1.6 }} />
            </div>
          ))}
      </>
      <ToastContainer />
    </div>
  );
};

export default Home;
