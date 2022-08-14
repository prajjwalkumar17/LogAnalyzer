/** @format */

const express = require("express");
const router = express.Router();
const fileController = require("../Controller/fileController");

router.route("/").post(fileController.uploads, fileController.postfile);

module.exports = router;
