var React = require('react');
var util = require('util');
var DefaultLayout = require('./layouts/default');
var SubNavBarlayout = require('./layouts/subNavbar');
var NavBarlayout = require('./layouts/navbar');
var BarChart = require('./layouts/barChart');
var ColumnChart = require('./layouts/columnChart');
var SubHeaderTilelayout = require('./layouts/subHeaderTile');

function NginxPage(props) {
  return (
    <DefaultLayout title={props.title}>
      <NavBarlayout uploadButton="true"></NavBarlayout>
      {/* <SubNavBarlayout uploadButton="true"></SubNavBarlayout> */}
      {/* <SubHeaderTilelayout></SubHeaderTilelayout> */}
      <div className="logs-container"><br></br><br></br><br></br>
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6 wow card-click ">
              <BarChart data={props.dataRequest} ></BarChart>
            </div>
            <div className="col-lg-6 wow card-click ">
              <ColumnChart data={props.data404} onclickUrl="/nginx/route-vs-count"></ColumnChart>
            </div>
            <div className="col-lg-6 wow card-click ">
              <ColumnChart data={props.data502} onclickUrl="/nginx/route-vs-count"></ColumnChart>
            </div>
            <div className="col-lg-6 wow card-click ">
              <ColumnChart data={props.dataMost} ></ColumnChart>
            </div>  
            <div className="col-lg-6 wow card-click ">
              <ColumnChart data={props.dataIps} ></ColumnChart>
            </div>              
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
}

module.exports = NginxPage;