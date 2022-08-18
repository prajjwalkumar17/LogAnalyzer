/** @format */
const catchAsync = require("./../Utils/catchAsync");
const multer = require("multer");
const appError = require("./../Utils/Apperror");
const manipulations = require("./../Utils/normalManimulations");
const readline = require("readline");
const fs = require("fs");
const stream = require("stream");
const visualController = require("./visualsControllers");
const regexController = require("./regexController");
const reportController = require("./reportsController");
const presentTime = Date.now();
//TODO File upload/MULTER implementations
const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    //MARK supplying the destination to store our log file
    if (file.fieldname === "File") cb(null, "Dev-Data/UploadLogs");
  },
  filename: (req, file, cb) => {
    //MARK changing the file name according to extention
    req.logData = file;
    const extension = file.originalname.split(".")[1];
    const filename = `user-log-${presentTime}.${extension}`;
    req.logData.modifiedName = filename;
    cb(null, filename);
  },
});
const multerFilter = (req, file, cb) => {
  //MARK filtering our files according to the mimetypes
  if (
    file.mimetype === "text/plain" ||
    file.mimetype === "text/x-log" ||
    file.mimetype === "application/octet-stream"
  ) {
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
  fileManipulations([], req, res);
});

//TODO all Manipulations on file
function fileManipulations(arr, req, res) {
  let lines = [];
  const filenameModified = req.logData.modifiedName;
  const fileInput = fs.createReadStream(
    `Dev-Data/UploadLogs/${filenameModified}`
  );
  const fileOutStream = new stream();
  fileOutStream.readable = true;
  fileOutStream.writable = true;
  const record1 = readline.Interface(fileInput, fileOutStream);

  record1.on("line", (line) => {
    lines.push(line);
  });
  record1.on("close", () => {
    regexmanipulation(arr, lines, res);
  });
}
//MARK regex matching
let GlobalArray = [];
const regexmanipulation = (resultArray, line, res) => {
  //MARK regex Matched JSON
  resultArray = regexController.matchREGEX(resultArray, line);

  //MARK removing null or undefined entries
  resultArray = manipulations.removeduplicates(resultArray);

  //MARK data for our bargraph
  let bargraphdata = visualController.visualizeBar(resultArray, "date");

  //MARK Report Outputs
  reportController.exportReportJSON(resultArray, presentTime);
  reportController.exportReportCSV(resultArray, presentTime);

  const noofLines = line.length;

  GlobalArray = resultArray;
  return res.status(200).render("dashboard", {
    obj: resultArray,
    noofLines,
    barx: Object.keys(bargraphdata),
    bary: Object.values(bargraphdata),
    logid: presentTime,
  });
};

exports.visualize = async (req, res) => {
  mapData = await visualController.visualizeMap(GlobalArray, "IP");
  // arraydata = [["country", "No.Of Requests per day"], ...mapData];
  // console.log(arraydata);
  pieData = visualController.visualizePieBrowers(GlobalArray, "userAgent");
  doughnutData = visualController.visualizeDoughnutRequestTypes(
    GlobalArray,
    "requestType"
  );
  bar2Data = visualController.visualizeBarAPIUsed(GlobalArray, "apiUsed");
  webChartData = visualController.visualizeWebResponseTimes(
    GlobalArray,
    "responseTime"
  );
  res.render("visualize", {
    logid: presentTime,
    mapData,
    pieX: Object.keys(pieData),
    pieY: Object.values(pieData),
    bar2X: Object.keys(bar2Data),
    bar2Y: Object.values(bar2Data),
    doughnutX: Object.keys(doughnutData),
    doughnutY: Object.values(doughnutData),
    webChartX: Object.keys(webChartData),
    webChartY: Object.values(webChartData),
  });
};
