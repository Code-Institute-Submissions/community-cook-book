google.charts.load('current', {'packages':['corechart']});
google.charts.setOnLoadCallback(drawChart);



function getMeatChartData(filters, callback) {
    $.getJSON("/db_summary/graph_data", function(result) {
        var data = google.visualization.arrayToDataTable(result.data);
        callback(data);
    });
}

function drawChart() {
    
    var meatChart = new google.visualization.PieChart(document.getElementById('meat-chart'));
    
    getMeatChartData({}, function(meatChartData) {
        meatChart.draw(meatChartData);
    });
}