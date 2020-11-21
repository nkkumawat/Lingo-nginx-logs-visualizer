$(document).ready(function() {
  $('#filter-form').on('submit', function(e) {
    e.preventDefault();
    var order = $('#order-select').val();
    var ip = $('#ip-input').val();
    var endpoint = $('#endpoint-input').val();
    var date = $('#date-input').val();
    var time = $('#time-input').val();
    if(date) {
      date = convertDate(date);
    }
    $.ajax({
      url: $(this).attr('action'),
      data: {
        order: order,
        ip: ip,
        endpoint: endpoint,
        date: date,
        time: time
      },
      type: 'GET',
      success: function(response) {
        createParamsAndDrawChart(response.data2xx);
        createParamsAndDrawChart(response.data3xx);
        createParamsAndDrawChart(response.data4xx);
        createParamsAndDrawChart(response.data5xx);
      },
      error: function() {
       
      }
    });
  });
});
function convertDate(d){
  var parts = d.split("-");
  var months = {"01": "Jan","02": "Feb","03": "Mar","04": "Apr","05": "May","06": "Jun","07": "Jul","08": "Aug","09": "Sep","10": "Oct","11": "Nov","12": "Dec"};
  return parts[2]+"/"+months[parts[1]]+"/"+parts[0];
 }

function createParamsAndDrawChart(params) {
  var colors = ['#b87333', 'gold', 'silver', '#e5e4e2'];
  var graphTitle =  params.data.graphTitle;
  var dataString = [["Response Code", "Count", { role: "style" }]];
  Object.keys(params.data.data).forEach(function(key,index) {
    dataString.push([key,parseInt(params.data.data[key]),colors[Math.floor(Math.random() * 4)]]);
  });
  google.charts.load("current", {packages:['corechart']});
    google.charts.setOnLoadCallback(drawChart);
    function drawChart() {
      var data = google.visualization.arrayToDataTable(
       dataString
      );
      var view = new google.visualization.DataView(data);
      view.setColumns([0, 1,
        { calc: "stringify",
          sourceColumn: 1,
          type: "string",
          role: "annotation" },
        2]);
      var options = {
        title: graphTitle,
        width: params.data.width,
        height: params.data.height,
        bar: {groupWidth: "95%"},
        legend: { position: "none" },
      };
      var chart = new google.visualization.ColumnChart(document.getElementById(params.data.id));
      chart.draw(view, options);
  }
}