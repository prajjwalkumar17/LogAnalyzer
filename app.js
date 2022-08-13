/** @format */

const AppError = require("./Utils/Apperror");
const express = require("express");
const app = express();
const GlobalError = require("./Utils/errorController");
const morgan = require("morgan");
app.use(morgan("dev"));
const statsRouter = require("./Routers/statsRouter");
const fileRouter = require("./Routers/fileRouter");
app.use(express.json({ limit: "10kb" }));
const multer = require("multer");
const upload = multer();
app.use(upload.array());
app.use("/api/v1/stats", statsRouter);
app.use("/api/v1/file", fileRouter);

//TODO ERROR
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
