/** @format */
const iplocate = require("node-iplocate");
// iplocate("17.253.0.0").then((result) => {
//   console.log(result);
// });
let bargraphdata = {};
exports.visualizeBar = (dataSet) => {
  Object.keys(dataSet).forEach((i) => {
    const date = dataSet[i].date;
    if (bargraphdata.hasOwnProperty(date)) bargraphdata[date]++;
    else bargraphdata[date] = 1;
  });
  return bargraphdata;
};
exports.visualizeMap = (array) => {
  return array;
};
