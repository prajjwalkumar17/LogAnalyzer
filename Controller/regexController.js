/** @format */

//MARK regex
const dateTime = /(\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2},\d{3})/;
const date = /(\d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])*)/;
const time = /([0-1]?\d|2[0-3]):([0-5]?\d):([0-5]?\d)/;
const IP = /(\d+.\d+\.\d+\.\d+)/;
const status = /(INFO|ERROR|WARN|TRACE|DEBUG|FATAL)/;
const requestType = /(?<=!Request-Type\=).*?[^#]*/;
const userAgent = /(?<=!User-Agent\=).*?[^#]*/;
const apiUsed = /(?<=!API\=).*?[^#]*/;
const user = /(?<=!User-Name\=).*?[^#]*/;
const userLogin = /(?<=!User-Login\=).*?[^#]*/;
const enterpriseName = /(?<=!EnterpriseName\=).*?[^#]*/;
const enterpriseId = /(?<=!EnterpriseId\=).*?[^#]*/;
const requestBody = /(?<=!Request-Body\=).*?[^#]*/;
const responseTime = /(?<=!Response-Time\=).*?[^#]*/;
const statusCode = /(?<=!Status-Code\=).*?[^#]*/;
const authStatus = /(?<=!Auth-Status\=).*?[^#]*/;
let resultSet = {};

exports.matchREGEX = (resultArray, line) => {
  for (i = 0; i < line.length; i++) {
    if (!line[i] == "") {
      if (line[i].match(IP)) resultSet["IP"] = line[i].match(IP)[0];
      if (line[i].match(dateTime))
        resultSet["TimeStamp"] = line[i].match(dateTime)[0];
      if (line[i].match(date)) resultSet["date"] = line[i].match(date)[0];
      if (line[i].match(time)) resultSet["time"] = line[i].match(time)[0];
      if (line[i].match(status)) resultSet["status"] = line[i].match(status)[0];
      if (line[i].match(requestType))
        resultSet["requestType"] = line[i].match(requestType)[0];
      if (line[i].match(userAgent))
        resultSet["userAgent"] = line[i].match(userAgent)[0].split(" ")[0];
      if (line[i].match(apiUsed))
        resultSet["apiUsed"] = line[i].match(apiUsed)[0];
      if (line[i].match(user)) resultSet["user"] = line[i].match(user)[0];
      if (line[i].match(userLogin))
        resultSet["userLogin"] = line[i].match(userLogin)[0];
      if (line[i].match(enterpriseName))
        resultSet["enterpriseName"] = line[i].match(enterpriseName)[0];
      if (line[i].match(enterpriseId))
        resultSet["enterpriseId"] = line[i].match(enterpriseId)[0];
      if (line[i].match(requestBody))
        resultSet["requestBody"] = line[i].match(requestBody)[0];
      if (line[i].match(responseTime))
        resultSet["responseTime"] = line[i].match(responseTime)[0];
      if (line[i].match(statusCode))
        resultSet["statusCode"] = line[i].match(statusCode)[0];
      if (line[i].match(authStatus))
        resultSet["authStatus"] = line[i].match(authStatus)[0];
    } else {
      resultArray.push(resultSet);
      resultSet = {};
    }
  }
  return resultArray;
};
