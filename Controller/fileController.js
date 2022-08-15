/** @format */
const catchAsync = require("./../Utils/catchAsync");
const multer = require("multer");
const appError = require("./../Utils/Apperror");
const readline = require("readline");
const fs = require("fs");
const stream = require("stream");

const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    //MARK supplying the destination to store our log file
    if (file.fieldname === "File") cb(null, "Dev-Data");
  },
  filename: (req, file, cb) => {
    //MARK changing the file name according to extention
    req.logData = file;
    const extension = file.originalname.split(".")[1];
    const filename = `user-log-${Date.now()}.${extension}`;
    req.logData.modifiedName = filename;
    cb(null, filename);
  },
});
const multerFilter = (req, file, cb) => {
  //MARK filtering our files according to the mimetypes
  if (file.mimetype === "text/plain" || file.mimetype === "text/x-log") {
    //MARK checking for acceptance of only txt and log files
    cb(null, true);
  } else {
    cb(new appError("Invalid file type select only .txt or .log", 404));
  }
};

const uploadResources = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

exports.uploads = uploadResources.single("File");

exports.postfile = catchAsync(async (req, res) => {
  fileManipulations(req);
  return res.status(200).json({
    status: "sucess",
    results: "File uploaded and is now under process",
  });
});

//TODO all Manipulations on file
var lines = [];
const fileManipulations = (req) => {
  const filenameModified = req.logData.modifiedName;
  const fileInput = fs.createReadStream(`Dev-Data/${filenameModified}`);
  const fileOutStream = new stream();
  const record1 = readline.Interface(fileInput, fileOutStream);

  record1.on("line", (line) => {
    // console.log(line);
    lines.push(line);
  });
  record1.on("close", () => {});

  // console.log(req.logData);
};
