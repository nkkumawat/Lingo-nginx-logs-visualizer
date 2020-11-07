
var React = require('react');
var chartHelper = require('../../helpers/chartHelper');
var ReactScript = require('react-inline-script').Script;

function ColumnChart(props) {
  var data = props.data.data;
  var dataString = "";
  var graphTitle =  `${props.data.graphTitle}`;
  Object.keys(data).forEach(function(key,index) {
    dataString += `['${key}', ${data[key]}],`;
  });
  var eventListener = "";
  if(props.onclickUrl) {
    eventListener = 'google.visualization.events.addListener(chart, "click", function() {window.location.assign("'+props.onclickUrl+'")});';
  }
  return (
    <div>
      <div id={props.data.id}></div>
      <ReactScript>{`
        google.charts.load('current', {packages:['corechart']});
        google.charts.setOnLoadCallback(drawChart);
        function drawChart() {
          var data = google.visualization.arrayToDataTable([
            ["Time Line ", "Count" ],
            ${dataString.toString()}
          ]);
          var options = {
            title: "${graphTitle.toString()}",
            hAxis: {title: 'Request Time',  titleTextStyle: {color: '#333'}},
            vAxis: {minValue: 0}
          };
          var chart = new google.visualization.AreaChart(document.getElementById("${props.data.id}"));
          ${eventListener}
          chart.draw(data, options);
        }
      `}
      </ReactScript>
    </div>
  );
}

module.exports = ColumnChart;

