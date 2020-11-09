var React = require('react');
var DefaultLayout = require('./layouts/default');
var NavBarlayout = require('./layouts/navbar');
var Filterlayout = require('./layouts/filters');
var ColumnChart = require('./layouts/columnChart');
var constants = require('../config/constants');


function NginxStatusPage(props) {
  var title = constants.APP_NAME + " | Route count";
  return (
    <DefaultLayout title={title}>
      <NavBarlayout uploadButton="true"></NavBarlayout>
      <div className="logs-container"><br></br>
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-12 wow">
            <Filterlayout url={props.data2xx.data.url} fileName={props.data2xx.data.fileName}></Filterlayout>
            </div>
            <div className="col-lg-12 wow">
              <ColumnChart data={props.data2xx.data} className="margin-left"></ColumnChart>
            </div>
            <div className="col-lg-12 wow">
              <ColumnChart data={props.data3xx.data} className="margin-left"></ColumnChart>
            </div>
            <div className="col-lg-12 wow">
              <ColumnChart data={props.data4xx.data} className="margin-left"></ColumnChart>
            </div>
            <div className="col-lg-12 wow">
              <ColumnChart data={props.data5xx.data} className="margin-left"></ColumnChart>
            </div>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
}

module.exports = NginxStatusPage;