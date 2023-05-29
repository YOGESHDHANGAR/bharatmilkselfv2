const express = require("express");
const app = express();
const path = require("path");

const errorMiddleware = require("./middlewares/error");

const bodyParser = require("body-parser");
const cors = require("cors");

app.use(cors());
app.use(bodyParser());

//Route Imports
const purchaseRouter = require("./routes/purchaseRoutes");
const customerRouter = require("./routes/customerRoutes");
const fatRateRouter = require("./routes/fatRateRoutes");
const customDataSelectorRouter = require("./routes/customDataSelectorRouter");

app.use("/api/v1", purchaseRouter);
app.use("/api/v1", customerRouter);
app.use("/api/v1", fatRateRouter);
app.use("/api/v1", customDataSelectorRouter);

app.use(express.static(path.join(__dirname, "./frontend/build")));

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "./frontend/build/index.html"));
});

// Middleware for Errors
app.use(errorMiddleware);

module.exports = app;
