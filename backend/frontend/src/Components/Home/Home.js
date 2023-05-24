import React, { useEffect } from "react";
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

const Home = () => {
  const dispatch = useDispatch();
  const {
    allpurchases,
    loading,
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
    if (allcustomersError) {
      alert.error(allcustomersError);
      dispatch(clearErrors());
    }
  }, [dispatch, allcustomersError, alert]);

  return (
    <div>
      <Filter allcustomers={allcustomers} loading={loading} />
      <Header />
      {loading === true ? (
        <Loading />
      ) : allpurchases.length === 0 ? (
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
        {loading === false && allpurchases.length !== 0 && (
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
        )}
      </>
    </div>
  );
};

export default Home;
