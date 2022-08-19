/** @format */

const AppError = require("./Utils/Apperror");
const cors = require("cors");
const express = require("express");
const GlobalError = require("./Utils/errorController");
const morgan = require("morgan");
const fileRouter = require("./Routers/fileRouter");
const path = require("path");

//
const app = express();
app.use(cors());
app.use(morgan("dev"));
app.use(express.json({ limit: "10kb" }));
//MARK
// app.use("/public", express.static(path.join(__dirname, "static")));
app.use(express.static("public"));
app.use(express.static("Dev-Data"));
app.set("view engine", "ejs");
app.get("/", (req, res) => {
  res.render("welcome");
});
app.get("/filepicker", (req, res) => {
  res.render("dumplogs");
});
// app.get("/dashboard", (req, res) => {
//   res.render("dashboard");
// });

//MARK Routes classification
app.use("/api/v1/log", fileRouter);

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
