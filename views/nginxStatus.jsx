var React = require('react');
var DefaultLayout = require('./layouts/default');
var NavBarlayout = require('./layouts/navbar');
var Filterlayout = require('./layouts/filters');
var ColumnChart = require('./layouts/columnChart');

function NginxPage(props) {
  return (
    <DefaultLayout title={props.title}>
      <NavBarlayout uploadButton="true"></NavBarlayout>
      <div className="logs-container"><br></br>
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-12 wow">
            <Filterlayout url={props.url} fileName={props.fileName}></Filterlayout>
            </div>
            <div className="col-lg-12 wow">
              <ColumnChart data={props.data} ></ColumnChart>
            </div>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
}

module.exports = NginxPage;