/** @format */
const createCsvWriter = require("csv-writer").createObjectCsvWriter;
const fs = require("fs");

//MARK Report exports
exports.exportReportJSON = (obj, presentTime) => {
  let jsonOutputStream = fs
    .createWriteStream(`Dev-Data/JSONoutput/user-report-${presentTime}.json`)
    .on("error", function (err) {
      console.log(err.stack);
    });
  jsonOutputStream.write(JSON.stringify(obj), () => {});
  jsonOutputStream.close();
};
exports.exportReportCSV = (obj, presentTime) => {
  const keys = Object.keys(obj[0]);
  const csvWriter = createCsvWriter({
    path: `Dev-Data/CSVoutput/user-report-${presentTime}.csv`,
    header: keys.map((i) => ({ id: i, title: i })),
  });
  async function csvWrite() {
    try {
      await csvWriter.writeRecords(obj);
    } catch (error) {
      console.log(error);
    }
  }
  csvWrite();
};
