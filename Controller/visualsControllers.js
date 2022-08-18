/** @format */

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
exports.visualizeBarAPIUsed = (dataSet, askedData) => {
  return graphDataExtractor(dataSet, askedData);
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
