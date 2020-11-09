var React = require('react');
var DefaultLayout = require('./layouts/default');
var NavBarlayout = require('./layouts/navbar');
var Filterlayout = require('./layouts/filters');
var AreaChart = require('./layouts/areaChart');
var constants = require('../config/constants');

function NginxStatusTimelinePage(props) {
  var title = constants.APP_NAME + " | Timeline";
  return (
    <DefaultLayout title={title}>
      <NavBarlayout uploadButton="true"></NavBarlayout>
      <div className="logs-container"><br></br>
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-12 wow">
            <Filterlayout url={props.url} fileName={props.fileName}></Filterlayout>
            </div>
            <div className="col-lg-12 wow">
              <AreaChart data={props.data} graphTitle="Request 2xx Time and Count" type="2xx" fileName={props.fileName} className="margin-left"></AreaChart>
              <AreaChart data={props.data} graphTitle="Request 3xx Time and Count" type="3xx" fileName={props.fileName} className="margin-left"></AreaChart>
              <AreaChart data={props.data} graphTitle="Request 4xx Time and Count" type="4xx" fileName={props.fileName} className="margin-left"></AreaChart>
              <AreaChart data={props.data} graphTitle="Request 5xx Time and Count" type="5xx" fileName={props.fileName} className="margin-left"></AreaChart>
            </div>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
}

module.exports = NginxStatusTimelinePage;