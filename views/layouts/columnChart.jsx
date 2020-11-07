
var React = require('react');
var chartHelper = require('../../helpers/chartHelper');
var ReactScript = require('react-inline-script').Script;

function ColumnChart(props) {
  var data = props.data.data;
  var dataString = "";
  var colors = ['#b87333', 'gold', 'silver', '#e5e4e2'];
  var graphTitle =  `${props.data.graphTitle}`;
  Object.keys(data).forEach(function(key,index) {
    dataString += `['${key}', ${data[key]},"${colors[Math.floor(Math.random() * 4)]}"],`;
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
            ["Response Code", "Count", { role: "style" } ],
            ${dataString.toString()}
          ]);
          var view = new google.visualization.DataView(data);
          view.setColumns([0, 1,
                          { calc: "stringify",
                            sourceColumn: 1,
                            type: "string",
                            role: "annotation" },
                          2]);
          var options = {
            title: "${graphTitle.toString()}",
            width: ${props.data.width},
            height: ${props.data.height},
            bar: {groupWidth: "95%"},
            legend: { position: "none" },
          };
          var chart = new google.visualization.ColumnChart(document.getElementById("${props.data.id}"));
          ${eventListener}
          chart.draw(view, options);
        }
      `}
      </ReactScript>
    </div>
  );
}

module.exports = ColumnChart;


