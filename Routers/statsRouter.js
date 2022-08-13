/** @format */

const express = require("express");
const router = express.Router();
const mainController = require("./../Controller/mainController");
// const AppError = require("./../Utils/Apperror");

router.route("/stats").get(mainController.getallstats);

module.exports = router;
