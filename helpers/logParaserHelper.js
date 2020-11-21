const { exec } = require("child_process");
var nginxParser = require("nginxparser");
var constants = require("../config/constants");
var parser = new nginxParser(
  '$remote_addr - $remote_user [$time_local] "$request" $status'
);
const fs = require("fs");

function convertTime(time) {
  var datePart = time.split(" ");
  if (datePart[0]) {
    temp = datePart[0].split(":");
    return "" + temp[0] + " " + temp[1] + ":" + temp[2];
  } else {
    return "";
  }
}
function applyFilter(params) {
  var data = params.data;
  if (params.ipFilter) {
    if (!data.ip_str.includes(params.ipFilter)) {
      data = {};
    }
  }
  return data;
}
module.exports = {
  getRequestCodeAndCount: (params) => {
    return new Promise((resolve, reject) => {
      fs.access(params.fileName, fs.F_OK, (err) => {
        if (err) {
          params.fileName = constants.DEFAULT_FILE;
        }
        exec(
          `cat ${__dirname}/../uploads/${params.fileName} | cut -d '"' -f3 | cut -d ' ' -f2 | sort | uniq -c | sort -rn`,
          (error, stdout, stderr) => {
            if (error) {
              reject({ error: error });
            }
            if (stderr) {
              reject({ error: stderr });
            }
            data = stdout.trim().split("\n");
            var response = {
              graphTitle: "Request Code and Count",
              height: 500,
              width: 600,
              id: "request_code_count",
            };
            resp = {};
            for (i = 0; i < data.length; i += 1) {
              p = data[i].trim().split(" ");
              resp[(p[1] + "").replace(/\n/g, "")] = p[0];
            }
            response.data = resp;
            resolve(response);
          }
        );
      });
    });
  },
  getStatusCodeCountAndLink: (params) => {
    return new Promise((resolve, reject) => {
      fs.access(params.fileName, fs.F_OK, (err) => {
        if (err) {
          params.fileName = constants.DEFAULT_FILE;
        }
        exec(
          `awk '($9 ~ /${params.statusCode}/)' ${__dirname}/../uploads/${params.fileName} | awk '{print $7}' | sort | uniq -c | sort -rn`,
          (error, stdout, stderr) => {
            if (error) {
              reject({ error: error });
            }
            if (stderr) {
              reject({ error: stderr });
            }
            data = stdout.trim().split("\n");
            var response = {
              graphTitle: `Request ${params.statusCode} and Count`,
              height: 500,
              width: 600,
              id: `request_count_${params.statusCode}`,
            };
            resp = {};
            for (i = 0; i < data.length && i < 10; i++) {
              p = data[i].trim().split(" ");
              resp[(p[1] + "").replace(/\n/g, "")] = p[0];
            }
            response.data = resp;
            resolve(response);
          }
        );
      });
    });
  },
  getMostRequestedUrls: (params) => {
    return new Promise((resolve, reject) => {
      fs.access(params.fileName, fs.F_OK, (err) => {
        if (err) {
          params.fileName = constants.DEFAULT_FILE;
        }
        exec(
          `awk -F\\" '{print $2}' ${__dirname}/../uploads/${params.fileName} | awk '{print $2}' | sort | uniq -c | sort -r`,
          (error, stdout, stderr) => {
            if (error) {
              reject({ error: error });
            }
            if (stderr) {
              reject({ error: stderr });
            }
            data = stdout.trim().split("\n");
            var response = {
              graphTitle: "Request and Count",
              height: 500,
              width: 600,
              id: "request_count_most",
            };
            resp = {};
            for (i = 0; i < data.length && i < 10; i++) {
              p = data[i].trim().split(" ");
              resp[(p[1] + "").replace(/\n/g, "")] = p[0];
            }
            response.data = resp;
            resolve(response);
          }
        );
      });
    });
  },
  getMostIpsCount: (params) => {
    return new Promise((resolve, reject) => {
      fs.access(params.fileName, fs.F_OK, (err) => {
        if (err) {
          params.fileName = constants.DEFAULT_FILE;
        }
        exec(
          `awk '{print $1}' ${__dirname}/../uploads/${params.fileName} | sort | uniq -c | sort -nr`,
          (error, stdout, stderr) => {
            if (error) {
              reject({ error: error });
            }
            if (stderr) {
              reject({ error: stderr });
            }
            data = stdout.trim().split("\n");
            var response = {
              graphTitle: "Ips and Count",
              height: 500,
              width: 600,
              id: "request_count_most_ips",
            };
            resp = {};
            for (i = 0; i < data.length && i < 10; i++) {
              p = data[i].trim().split(" ");
              resp[(p[1] + "").replace(/\n/g, "")] = p[0];
            }
            response.data = resp;
            resolve(response);
          }
        );
      });
    });
  },
  getStatusRangeCountAndLink: (params) => {
    return new Promise((resolve, reject) => {
      ipFilter = "";
      filter = params.filter || {};
      if (filter.ipFilter) {
        ipFilter = " | grep '" + params.filter.ipFilter + "'";
      }
      order = "r";
      if (filter.order && params.filter.order === "asc") {
        order = "";
      }
      endpoint = "";
      if (filter.endpoint) {
        endpoint = " | grep '" + params.filter.endpoint + "'";
      }
      date = "";
      if (filter.date) {
        date =
          ' | grep "\\[' + params.filter.date.toString().replace(/-/g, "\\-");
      }
      if (date && filter.time) {
        date += ":" + params.filter.time;
      } else if (filter.time) {
        date = ' | grep ":' + filter.time.toString();
      }
      if (date) {
        date += '"';
      }
      fs.access(filter.fileName, fs.F_OK, (err) => {
        if (err) {
          filter.fileName = constants.DEFAULT_FILE;
        }
        exec(
          `grep "HTTP/1.1\\" ${params.statusRange}" ${__dirname}/../uploads/${filter.fileName} ${ipFilter} ${endpoint} ${date} | awk '{print $7}' | sort | uniq -c | sort -n${order}`,
          (error, stdout, stderr) => {
            if (error) {
              reject({ error: error });
            }
            if (stderr) {
              reject({ error: stderr });
            }
            data = stdout.trim().split("\n");
            var response = {
              graphTitle: `'Request ${params.statusRange}xx and Count'`,
              height: filter.height,
              width: filter.width,
              fileName: filter.fileName,
              id: `request_count_${params.statusRange}`,
              url: params.filter.url,
            };
            resp = {};
            limit = filter.limit || 10;
            for (i = 0; i < data.length && i < limit; i++) {
              p = data[i].trim().split(" ");
              resp[(p[1] + "").replace(/\n/g, "")] = p[0];
            }
            response.data = resp;
            resolve(response);
          }
        );
      });
    });
  },
  getLogsToJson: (params) => {
    return new Promise((resolve, reject) => {
      var logsData = [];
      fs.access(params.fileName, fs.F_OK, (err) => {
        if (err) {
          params.fileName = constants.DEFAULT_FILE;
        }
        parser.read(
          `${__dirname}/../uploads/${params.fileName}`,
          function (data) {
            data.status
              ? (data.status = data.status.substr(0, 3))
              : (data.status = data.status);
            logsData.push(data);
          },
          function (err) {
            if (err) {
              reject({ error: err });
            }
            resolve(logsData);
          }
        );
      });
    });
  },
  getTypeTimelineData: (params) => {
    return new Promise((resolve, reject) => {
      var logsData = {
        "2xx": {},
        "3xx": {},
        "4xx": {},
        "5xx": {},
      };
      params.logsData.forEach((data) => {
        if (data.status.charAt(0) === "5") {
          count = logsData["5xx"][convertTime(data.time_local)]
            ? logsData["5xx"][convertTime(data.time_local)] + 1
            : 1;
          logsData["5xx"][convertTime(data.time_local)] = count;
        } else if (data.status.charAt(0) === "4") {
          count = logsData["4xx"][convertTime(data.time_local)]
            ? logsData["4xx"][convertTime(data.time_local)] + 1
            : 1;
          logsData["4xx"][convertTime(data.time_local)] = count;
        } else if (data.status.charAt(0) === "3") {
          count = logsData["3xx"][convertTime(data.time_local)]
            ? logsData["3xx"][convertTime(data.time_local)] + 1
            : 1;
          logsData["3xx"][convertTime(data.time_local)] = count;
        } else if (data.status.charAt(0) === "2") {
          count = logsData["2xx"][convertTime(data.time_local)]
            ? logsData["2xx"][convertTime(data.time_local)] + 1
            : 1;
          logsData["2xx"][convertTime(data.time_local)] = count;
        }
      });
      var response = {
        height: 500,
        width: 600,
        data: logsData,
      };
      resolve(response);
    });
  },
  getStatusRangeCountAndLinkNew: (params) => {
    return new Promise((resolve, reject) => {
      var logsData = {
        "2xx": {},
        "3xx": {},
        "4xx": {},
        "5xx": {},
      };
      params.logsData.forEach((data) => {
        if (data.status.charAt(0) === "5") {
          count = logsData["5xx"][convertTime(data.time_local)]
            ? logsData["5xx"][convertTime(data.time_local)] + 1
            : 1;
          logsData["5xx"][convertTime(data.time_local)] = count;
        } else if (data.status.charAt(0) === "4") {
          count = logsData["4xx"][convertTime(data.time_local)]
            ? logsData["4xx"][convertTime(data.time_local)] + 1
            : 1;
          logsData["4xx"][convertTime(data.time_local)] = count;
        } else if (data.status.charAt(0) === "3") {
          count = logsData["3xx"][convertTime(data.time_local)]
            ? logsData["3xx"][convertTime(data.time_local)] + 1
            : 1;
          logsData["3xx"][convertTime(data.time_local)] = count;
        } else if (data.status.charAt(0) === "2") {
          count = logsData["2xx"][convertTime(data.time_local)]
            ? logsData["2xx"][convertTime(data.time_local)] + 1
            : 1;
          logsData["2xx"][convertTime(data.time_local)] = count;
        }
      });
      var response = {
        height: 500,
        width: 600,
        data: logsData,
      };
      resolve(response);
    });
  },
};
