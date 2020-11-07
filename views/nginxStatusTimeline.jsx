var React = require('react');
var DefaultLayout = require('./layouts/default');
var NavBarlayout = require('./layouts/navbar');
var Filterlayout = require('./layouts/filters');
var AreaChart = require('./layouts/areaChart');

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
              <AreaChart data={props.data} fileName={props.fileName} ></AreaChart>
            </div>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
}

module.exports = NginxPage;