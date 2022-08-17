/** @format */
const iplocate = require("node-iplocate");
// iplocate("17.253.0.0").then((result) => {
//   console.log(result);
// });
exports.visualizeBar = (dataSet, askedData) => {
  return graphDataExtractor(dataSet, askedData);
};

exports.visualizePieBrowers = (dataSet, askedData) => {
  return graphDataExtractor(dataSet, askedData);
};

exports.visualizeDoughnutRequestTypes = (dataSet, askedData) => {
  return graphDataExtractor(dataSet, askedData);
};

exports.visualizeWebResponseTimes = (dataSet, askedData) => {
  return graphDataExtractor(dataSet, askedData);
};

exports.visualizeMap = (array) => {
  return array;
};

const graphDataExtractor = (dataSet, askedValue) => {
  let garphData = {};
  Object.keys(dataSet).forEach((i) => {
    const data = dataSet[i][askedValue];
    if (garphData.hasOwnProperty(data)) garphData[data]++;
    else garphData[data] = 1;
  });
  return garphData;
};
