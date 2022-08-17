/** @format */
const iplocate = require("node-iplocate");
// iplocate("17.253.0.0").then((result) => {
//   console.log(result);
// });
exports.visualizeBar = (dataSet) => {
  let bargraphdata = {};
  Object.keys(dataSet).forEach((i) => {
    const date = dataSet[i].date;
    if (bargraphdata.hasOwnProperty(date)) bargraphdata[date]++;
    else bargraphdata[date] = 1;
  });
  return bargraphdata;
};

exports.visualizePieBrowers = (dataSet) => {
  let piedata = {};
  Object.keys(dataSet).forEach((i) => {
    const browser = dataSet[i].userAgent;
    if (piedata.hasOwnProperty(browser)) piedata[browser]++;
    else piedata[browser] = 1;
  });
  return piedata;
};

exports.visualizeDoughnutRequestTypes = (dataSet) => {
  let doughnut = {};
  Object.keys(dataSet).forEach((i) => {
    const requestType = dataSet[i].requestType;
    if (doughnut.hasOwnProperty(requestType)) doughnut[requestType]++;
    else doughnut[requestType] = 1;
  });
  return doughnut;
};

exports.visualizeWebResponseTimes = (dataSet) => {
  let webChart = {};
  Object.keys(dataSet).forEach((i) => {
    const responseTime = dataSet[i].responseTime;
    if (webChart.hasOwnProperty(responseTime)) webChart[responseTime]++;
    else webChart[responseTime] = 1;
  });
  return webChart;
};

exports.visualizeMap = (array) => {
  return array;
};
