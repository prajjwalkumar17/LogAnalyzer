/** @format */
const catchAsync = require("./../Utils/catchAsync");
const multer = require("multer");

const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file.fieldname === "File") cb(null, "Dev-Data");
  },
  filename: (req, file, cb) => {
    req.logData = file;
    const extension = file.mimetype.split("/")[1];
    const filename = `user-log-${Date.now()}.${extension}`;
    req.logData.modifiedName = filename;
    cb(null, filename);
  },
});
const multerFilter = (req, file, cb) => {
  if (file.mimetype === "text/plain" || file.mimetype === "text/x-log") {
    //TODO checking for acceptance of only txt and log files
    cb(null, true);
  } else {
    cb("Should only select a .txt or .log format file", false);
  }
};

const uploadResources = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

exports.uploads = uploadResources.single("File");

exports.postfile = catchAsync(async (req, res) => {
  console.log(req.logData);
  return res.status(200).json({
    status: "sucess",
    results: "hello baby",
  });
});
