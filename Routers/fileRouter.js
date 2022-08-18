/** @format */

const express = require("express");
const router = express.Router();
const fileController = require("../Controller/fileController");

router.route("/").post(fileController.uploads, fileController.postfile);
router.route("/visualize").get(fileController.visualize);
module.exports = router;
