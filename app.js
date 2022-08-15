/** @format */

const AppError = require("./Utils/Apperror");
const cors = require("cors");
const express = require("express");
const GlobalError = require("./Utils/errorController");
const morgan = require("morgan");
const statsRouter = require("./Routers/statsRouter");
const fileRouter = require("./Routers/fileRouter");

//
const app = express();
app.use(cors());
app.use(morgan("dev"));
app.use(express.json({ limit: "10kb" }));

//MARK Routes classification
app.use("/api/v1/stats", statsRouter);
app.use("/api/v1/file", fileRouter);

//MARK ERROR on other routes than the defined
app.use("*", (req, res, next) => {
  next(
    new AppError(
      `This ${req.originalUrl} url is currently not defined on this server`,
      404
    )
  );
});
app.use(GlobalError);
module.exports = app;
