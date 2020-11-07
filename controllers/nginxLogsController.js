
const logParaserHelper = require('../helpers/logParaserHelper');
var constants = require('../config/constants');
 
module.exports = {
  getNginxLogs: (req, res, next) => {
    var fileName = req.cookies[constants.APP_NAME+"_file"] || "log.log";
    logParaserHelper.getRequestCodeAndCount({fileName: fileName}).then((dataRequest) => {
      logParaserHelper.getStatusRangeCountAndLink({statusRange: "4", fileName: fileName}).then((data404) => {
        logParaserHelper.getStatusRangeCountAndLink({statusRange: "5", fileName: fileName}).then((data502) => {
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
    var fileName = req.cookies[constants.APP_NAME+"_file"] || "log.log";
    logParaserHelper.getStatusRangeCountAndLink({
      statusRange: req.params.type.charAt(0),
      fileName: fileName,
      limit: 100
    }).then((data) => {
      data.height = 800;
      data.width = 1300;
      console.log(data);
      return res.render('nginxStatus', {
        data: data,
        url: "/nginx/"+req.params.type+"/filter",
        fileName: fileName
      });
    }).catch((err) => {
      console.log(err);
      return res.render('error', {error: err});
    })
  },
  getNginxStatusFilterLogs:  (req, res, next) => {
    var fileName = req.cookies[constants.APP_NAME+"_file"] || "log.log";
    logParaserHelper.getStatusRangeCountAndLink({
      statusRange: req.params.type.charAt(0),
      fileName: fileName,
      limit: 100,
      ipFilter: req.query.ip,
      order: req.query.order,
      endpoint: req.query.endpoint,
      date: req.query.date,
      time: req.query.time
    }).then((data) => {
      data.height = 800;
      data.width = 1300;
      return res.json({
        data: data,
        url: "/nginx/"+req.params.type+"/filter"
      });
    }).catch((err) => {
      console.log(err);
      return res.render('error', {error: err});
    })
  },
  getStatusTimeLine: (req, res, next) => {
    var fileName = req.cookies[constants.APP_NAME+"_file"] || "log.log";
    var type = req.params.type;
    logParaserHelper.getLogsToJson({
      fileName: fileName
    }).then((data) => {
      console.log(data);
      logParaserHelper.getTypeTimelineData({
        fileName: fileName,
        type: type,
        logsData: data
      }).then((data) => {
        return res.render('nginxStatusTimeline', {
          data: data,
          fileName: fileName
        });
      }).catch((err) => {
        res.render('error', {error: err});
      });
    }).catch((err) => {
      res.render('error', {error: err});
    });
  }
};