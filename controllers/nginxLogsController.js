
const logParaserHelper = require('../helpers/logParaserHelper');
var constants = require('../config/constants');
 
module.exports = {
  getNginxLogs: (req, res, next) => {
    var fileName = req.cookies[constants.APP_NAME+"_file"] || "log.logh";
    var filter = {
      fileName: fileName
    }
    logParaserHelper.getRequestCodeAndCount({fileName: fileName}).then((dataRequest) => {
      logParaserHelper.getStatusRangeCountAndLink({statusRange: "4", filter: filter}).then((data404) => {
        logParaserHelper.getStatusRangeCountAndLink({statusRange: "5", filter: filter}).then((data502) => {
          logParaserHelper.getMostRequestedUrls({fileName: fileName}).then((dataMost) => {
            logParaserHelper.getMostIpsCount({fileName: fileName}).then((dataIps) => {
              return res.render('nginx', {
                dataRequest: dataRequest,
                data404: data404,
                data502: data502,
                dataMost: dataMost,
                dataIps: dataIps
              });
            }).catch((err) => {
              console.log(err);
              return res.render('error', {error: err});
            })
          }).catch((err) => {
            console.log(err);
            return res.render('error', {error: err});
          })
        }).catch((err) => {
          console.log(err);
          return res.render('error', {error: err});
        });
      }).catch((err) => {
        console.log(err);
        return res.render('error', {error: err});
      });
    }).catch((err) => {
      console.log(err);
      return res.render('error', {error: err});
    });
  },
  getNginxStatusLogs: (req, res, next) => {
    var fileName = req.cookies[constants.APP_NAME+"_file"] || "log.logh";
    var filter = {
      fileName: fileName,
      limit: 100,
      height: 500,
      width: 1400,
      url: "/nginx/route-vs-count/filter"
    }
    logParaserHelper.getStatusRangeCountAndLink({statusRange: "2",filter: filter}).then((data2xx) => {      
      logParaserHelper.getStatusRangeCountAndLink({statusRange: "3",filter: filter}).then((data3xx) => {
        logParaserHelper.getStatusRangeCountAndLink({statusRange: "4",filter: filter}).then((data4xx) => {
          logParaserHelper.getStatusRangeCountAndLink({statusRange: "5",filter: filter}).then((data5xx) => {
            return res.render('nginxStatus', {
              data2xx: {data: data2xx},
              data3xx: {data: data3xx},
              data4xx: {data: data4xx},
              data5xx: {data: data5xx}
            });
          }).catch((err) => {
            console.log(err);
            return res.render('error', {error: err});
          })
        }).catch((err) => {
          console.log(err);
          return res.render('error', {error: err});
        })
      }).catch((err) => {
        console.log(err);
        return res.render('error', {error: err});
      })                          
    }).catch((err) => {
      console.log(err);
      return res.render('error', {error: err});
    });
  },
  getNginxStatusFilterLogs:  (req, res, next) => {
    var fileName = req.cookies[constants.APP_NAME+"_file"] || "log.logh";
    var filter = {
      fileName: fileName,
      limit: 100,
      ipFilter: req.query.ip,
      order: req.query.order,
      endpoint: req.query.endpoint,
      date: req.query.date,
      time: req.query.time,
      height: 500,
      width: 1400
    }
    logParaserHelper.getStatusRangeCountAndLink({statusRange: "2",filter: filter}).then((data2xx) => {      
      logParaserHelper.getStatusRangeCountAndLink({statusRange: "3",filter: filter}).then((data3xx) => {
        logParaserHelper.getStatusRangeCountAndLink({statusRange: "4",filter: filter}).then((data4xx) => {
          logParaserHelper.getStatusRangeCountAndLink({statusRange: "5",filter: filter}).then((data5xx) => {
            return res.json({
              data2xx: {data: data2xx},
              data3xx: {data: data3xx},
              data4xx: {data: data4xx},
              data5xx: {data: data5xx}
            });
          }).catch((err) => {
            console.log(err);
            return res.render('error', {error: err});
          })
        }).catch((err) => {
          console.log(err);
          return res.render('error', {error: err});
        })
      }).catch((err) => {
        console.log(err);
        return res.render('error', {error: err});
      })                          
    }).catch((err) => {
      console.log(err);
      return res.render('error', {error: err});
    });
  },
  getStatusTimeLine: (req, res, next) => {
    var fileName = req.cookies[constants.APP_NAME+"_file"] || "log.logh";
    logParaserHelper.getLogsToJson({
      fileName: fileName
    }).then((data) => {
      logParaserHelper.getTypeTimelineData({
        fileName: fileName,
        logsData: data
      }).then((data) => {
        return res.render('nginxStatusTimeline', {
          data: data,
          fileName: fileName,
          url: "/nginx/timeline/filter"
        });
      }).catch((err) => {
        res.render('error', {error: err});
      });
    }).catch((err) => {
      res.render('error', {error: err});
    });
  }
};