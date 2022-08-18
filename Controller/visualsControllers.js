/** @format */
const locFinder = require("node-iplocate");

async function getloc(ip) {
  let resultObjs = {};
  const data = await locFinder(ip);
  // console.log(data);
  resultObjs = data;
  return resultObjs;
}

const visualizeMap = async (dataset, askedData) => {
  let ipFreq = graphDataExtractor(dataset, askedData);
  // console.log(ipFreq);

  let resData = [];
  for (const [key, value] of Object.entries(ipFreq)) {
    let resObj = [];
    const details = await getloc(key);
    const country = details.country;
    // resObj.country = details.country;
    resObj.push(country);
    resObj.push(value);
    // resObj[country] = value;
    resData.push(resObj);
  }
  return resData;
  // console.log(resData);
  // let data = {};
  // const details = await getloc("8.8.8.8");
  // console.log(details);
  // data.country = details.country;
  // console.log(data);
};

// visualizeMap();

const visualizeBar = (dataSet, askedData) => {
  return graphDataExtractor(dataSet, askedData);
};
const visualizePieBrowers = (dataSet, askedData) => {
  return graphDataExtractor(dataSet, askedData);
};

const visualizeDoughnutRequestTypes = (dataSet, askedData) => {
  return graphDataExtractor(dataSet, askedData);
};

const visualizeWebResponseTimes = (dataSet, askedData) => {
  return graphDataExtractor(dataSet, askedData);
};
const visualizeBarAPIUsed = (dataSet, askedData) => {
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
module.exports = {
  visualizeMap,
  visualizeBar,
  visualizePieBrowers,
  visualizeDoughnutRequestTypes,
  visualizeWebResponseTimes,
  visualizeBarAPIUsed,
};
