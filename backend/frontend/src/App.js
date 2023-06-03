import { BrowserRouter, Routes, Route } from "react-router-dom";
import Companyname from "./Components/Home/Companyname";
import Home from "./Components/Home/Home";
import Weekpayment from "./Components/Weekpayment/Weekpayment";
import Purchaseentry from "./Components/Purchaseentry/Purchaseentry";
import Customerentry from "./Components/Customerentry/Customerentry";
import Customerwisepurchases from "./Components/Customerwisepurchases/Customerwisepurchases";
import { useSelector } from "react-redux";
import { useEffect } from "react";

function App() {
  const showErrorToast = (message) => {
    toast.error(message, {
      autoClose: 5000,
    });
  };
  const {
    customdataselector,
    loading: customdataselectorLoading,
    error: customdataselectorError,
  } = useSelector((state) => state.customdataselector);

  useEffect(() => {
    if (customdataselectorLoading === false) {
      console.log("customdataselectorhome", customdataselector);
      window.location.reload();
    }
  }, [customdataselectorLoading]);

  useEffect(() => {
    if (customdataselectorError) {
      showErrorToast(customdataselectorError);
      dispatch(clearErrors());
    }
  }, [customdataselectorError]);

  return (
    <BrowserRouter className="App">
      <Companyname />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route
          exact
          path="/customerwisepurchases"
          element={<Customerwisepurchases />}
        />
        <Route exact path="/weekpayment" element={<Weekpayment />} />
        <Route exact path="/purchaseentry" element={<Purchaseentry />} />
        <Route exact path="/customerentry" element={<Customerentry />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
