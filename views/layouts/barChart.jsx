
var React = require('react');
var chartHelper = require('../../helpers/chartHelper');
var ReactScript = require('react-inline-script').Script;

function BarChart(props) {
  var data = props.data.data;
  var dataString = "";
  var colors = ['#b87333', 'gold', 'silver', '#e5e4e2'];
  var graphTitle =  `${props.data.graphTitle}`;
  Object.keys(data).forEach(function(key,index) {
    dataString += `['${key || "No data"}', ${data[key] || 0},"${colors[Math.floor(Math.random() * 4)]}"],`;
  });
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
            width: ${props.data.width || 600},
            height: ${props.data.height || 500},
            bar: {groupWidth: "95%"},
            legend: { position: "none" },
          };
          var chart = new google.visualization.BarChart(document.getElementById("${props.data.id}"));
          google.visualization.events.addListener(chart, 'click', function() {
            window.location.assign("")
          });
          chart.draw(view, options);
        }
      `}
      </ReactScript>
    </div>
  );
}

module.exports = BarChart;


