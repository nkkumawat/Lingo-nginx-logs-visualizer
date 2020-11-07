const { response } = require("../app");
const { exec } = require("child_process");
const { param } = require("../routes");
var nginxParser = require('nginxparser');
var parser = new nginxParser('$remote_addr - $remote_user [$time_local] "$request" $status $body_bytes_sent "$http_referer" "$http_user_agent"');
 

function convertTime(time) {
  var datePart = time.split(" ");
  if(datePart[0]) {
    return datePart[0];
  } else {
    return "";
  }
}
module.exports = {
  getRequestCodeAndCount: (params) => {
    return new Promise((resolve, reject) => {
      exec(`cat ${__dirname}/../uploads/${params.fileName} | cut -d '"' -f3 | cut -d ' ' -f2 | sort | uniq -c | sort -rn`, (error, stdout, stderr) => {
        if (error) {
          reject({error: error});
        }
        if (stderr) {
          reject({ error: stderr });
        }
        data = stdout.trim().split("\n");
        var response = {
          graphTitle: "Request Code and Count",
          height: 500,
          width: 600,
          id: 'request_code_count'
        };
        resp = {};
        for(i = 0; i < data.length; i += 1) {
          p = data[i].trim().split(" ");
          resp[(p[1] + "").replace(/\n/g, "")] = p[0];
        }
        response.data = resp;
        resolve(response);
      });
    });
  },
  getStatusCodeCountAndLink: (params) => {
    return new Promise((resolve, reject) => {
      exec(`awk '($9 ~ /${params.statusCode}/)' ${__dirname}/../uploads/${params.fileName} | awk '{print $7}' | sort | uniq -c | sort -rn`, (error, stdout, stderr) => {
        if (error) {
          reject({error: error});
        }
        if (stderr) {
          reject({error: stderr});
        }
        data = stdout.trim().split("\n");
        var response = {
          graphTitle: `Request ${params.statusCode} and Count`, 
          height: 500,
          width: 600,
          id: `request_count_${params.statusCode}`
        };
        resp = {};
        for(i = 0; i < data.length && i < 10; i ++) {
          p = data[i].trim().split(" ");
          resp[(p[1] + "").replace(/\n/g, "")] = p[0];
        }
        response.data = resp;
        resolve(response);
      });
    });
  },
  getMostRequestedUrls: (params) => {
    return new Promise((resolve, reject) => {
      exec(`awk -F\\" '{print $2}' ${__dirname}/../uploads/${params.fileName} | awk '{print $2}' | sort | uniq -c | sort -r`, (error, stdout, stderr) => {
        if (error) {
          reject({error: error});
        }
        if (stderr) {
          reject({error: stderr});
        }
        data = stdout.trim().split("\n");
        var response = {
          graphTitle: "Request and Count", 
          height: 500,
          width: 600,
          id: 'request_count_most'
        };
        resp = {};
        for(i = 0; i < data.length && i < 10; i ++) {
          p = data[i].trim().split(" ");
          resp[(p[1] + "").replace(/\n/g, "")] = p[0];
        }
        response.data = resp;
        resolve(response);
      });
    });
  },
  getMostIpsCount: (params) => {
    return new Promise((resolve, reject) => {
      exec(`awk '{print $1}' ${__dirname}/../uploads/${params.fileName} | sort | uniq -c | sort -nr`, (error, stdout, stderr) => {
        if (error) {
          reject({error: error});
        }
        if (stderr) {
          reject({error: stderr});
        }
        data = stdout.trim().split("\n");
        var response = {
          graphTitle: "Ips and Count", 
          height: 500,
          width: 600,
          id: 'request_count_most_ips'
        };
        resp = {};
        for(i = 0; i < data.length && i < 10; i ++) {
          p = data[i].trim().split(" ");
          resp[(p[1] + "").replace(/\n/g, "")] = p[0];
        }
        response.data = resp;
        resolve(response);
      });
    });
  },
  getStatusRangeCountAndLink: (params) => {
    return new Promise((resolve, reject) => {
      ipFilter = "";
      if(params.ipFilter) {
        ipFilter = " | grep '"+params.ipFilter+"'";
      }
      order = "r";
      if(params.order && params.order === "asc") {
        order = "";
      }
      endpoint = "";
      if(params.endpoint) {
        endpoint = " | grep '"+params.endpoint+"'";
      }
      date = "";
      if(params.date) {
        date = ' | grep "\\[' + params.date.toString().replace(/-/g, "\\-");
      }
      if(date && params.time) {
        date += ":"+params.time;
      } else if(params.time) {
        date = ' | grep ":' + params.time.toString();
      }
      if(date) {
        date += '"';
      }
      exec(`grep "HTTP/1.1\\" ${params.statusRange}" ${__dirname}/../uploads/${params.fileName} ${ipFilter} ${endpoint} ${date} | awk '{print $7}' | sort | uniq -c | sort -n${order}`, (error, stdout, stderr) => {
        if (error) {
          reject({error: error});
        }
        if (stderr) {
          reject({error: stderr});
        }
        data = stdout.trim().split("\n");
        console.log(data);
        var response = {
          graphTitle: `Request ${params.statusRange}xx and Count`, 
          height: 500,
          width: 600,
          id: `request_count_${params.statusRange}`
        };
        resp = {};
        limit = params.limit || 10;
        for(i = 0; i < data.length && i < limit; i ++) {
          p = data[i].trim().split(" ");
          resp[(p[1] + "").replace(/\n/g, "")] = p[0];
        }
        response.data = resp;
        resolve(response);
      });
    });
  },
  getLogsToJson: (params) => {
    return new Promise((resolve, reject) => {
      var logsData = [];
      parser.read(`${__dirname}/../uploads/${params.fileName}`, function (data) {
        logsData.push(data);
      }, function (err) {
        if (err) {
          reject({error: err});
        }
        resolve(logsData);
      });
    });
  },
  getTypeTimelineData: (params) => {
    return new Promise((resolve, reject) => {
      var logsData = {};
      var type = params.type;
      params.logsData.forEach((data) => {
        if(data.status === type) {
          count = logsData[convertTime(data.time_local)] ? logsData[convertTime(data.time_local)] + 1 : 1;
          logsData[convertTime(data.time_local)] = count;
        }
      });
      var response = {
        graphTitle: `Request ${type} Time and Count`, 
        height: 500,
        width: 600,
        id: `request_count_request_${type}`,
        data: logsData
      };
      resolve(response);
      // parser.read(`${__dirname}/../uploads/${params.fileName}`, function (data) {
      //   logsData.push(data);
      // }, function (err) {
      //   if (err) {
      //     reject({error: err});
      //   }
      //   resolve(logsData);
      // });
    });
  },
  

};