/** @format */
const catchAsync = require("./../Utils/catchAsync");
const multer = require("multer");
const appError = require("./../Utils/Apperror");
const readline = require("readline");
const fs = require("fs");
const stream = require("stream");
const e = require("cors");

const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    //MARK supplying the destination to store our log file
    if (file.fieldname === "File") cb(null, "Dev-Data/UploadLogs");
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
    // console.log(line);
    lines.push(line);
  });
  record1.on("close", () => {
    regexmanipulation(arr, lines, filenameModified, res);
  });
}
const regexmanipulation = (resultArray, line, name, res) => {
  let dateTime = /(\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2},\d{3})/;
  let date = /(\\d{4}-[01]\\d-[0-3]\\d)/;
  let time = /([0-1]?\d|2[0-3]):([0-5]?\d):([0-5]?\d)/;
  let IPaddr = /(\d+.\d+\.\d+\.\d+)/;
  let status = /(INFO|ERROR|WARN|TRACE|DEBUG|FATAL)/;
  let requestType = /(?<=!Request-Type\=).*?[^#]*/;
  let userAgent = /(?<=!User-Agent\=).*?[^#]*/;
  let apiUsed = /(?<=!API\=).*?[^#]*/;
  let user = /(?<=!User-Name\=).*?[^#]*/;
  let userLogin = /(?<=!User-Login\=).*?[^#]*/;
  let enterpriseName = /(?<=!EnterpriseName\=).*?[^#]*/;
  let enterpriseId = /(?<=!EnterpriseId\=).*?[^#]*/;
  let requestBody = /(?<=!Request-Body\=).*?[^#]*/;
  let responseTime = /(?<=!Response-Time\=).*?[^#]*/;
  let statusCode = /(?<=!Status-Code\=).*?[^#]*/;
  let authStatus = /(?<=!Auth-Status\=).*?[^#]*/;

  let json = {};
  for (i = 0; i < line.length; i++) {
    if (!line[i] == "") {
      if (line[i].match(IPaddr)) json["IP"] = line[i].match(IPaddr)[0];
      if (line[i].match(dateTime))
        json["TimeStamp"] = line[i].match(dateTime)[0];
      if (line[i].match(date)) json["date"] = line[i].match(date)[0];
      if (line[i].match(time)) json["time"] = line[i].match(time)[0];
      if (line[i].match(status)) json["status"] = line[i].match(status)[0];
      if (line[i].match(requestType))
        json["requestType"] = line[i].match(requestType)[0];
      if (line[i].match(userAgent))
        json["userAgent"] = line[i].match(userAgent)[0];
      if (line[i].match(apiUsed)) json["apiUsed"] = line[i].match(apiUsed)[0];
      if (line[i].match(user)) json["user"] = line[i].match(user)[0];
      if (line[i].match(userLogin))
        json["userLogin"] = line[i].match(userLogin)[0];
      if (line[i].match(enterpriseName))
        json["enterpriseName"] = line[i].match(enterpriseName)[0];
      if (line[i].match(enterpriseId))
        json["enterpriseId"] = line[i].match(enterpriseId)[0];
      if (line[i].match(requestBody))
        json["requestBody"] = line[i].match(requestBody)[0];
      if (line[i].match(responseTime))
        json["responseTime"] = line[i].match(responseTime)[0];
      if (line[i].match(statusCode))
        json["statusCode"] = line[i].match(statusCode)[0];
      if (line[i].match(authStatus))
        json["authStatus"] = line[i].match(authStatus)[0];
    } else {
      resultArray.push(json);
      json = {};
    }
  }
  console.log(resultArray);
  return res.status(200).render("dashboard", { obj: resultArray });
};
