google.charts.load('current', {'packages':['corechart']});
google.charts.setOnLoadCallback(drawChart);

var meal_type = time = price = "none";

function getChartData(key, callback) {
    $.getJSON("/db_summary/graph_data/" + key + "/" + meal_type + "/" + time + "/" + price, function(result) {
        var data = google.visualization.arrayToDataTable(result.data);
        callback(data);
    });
}

function drawChart() {
    
    var meatChart = new google.visualization.PieChart(document.getElementById('meat-chart'));
    var meatChartData;
    
    var timeChart = new google.visualization.PieChart(document.getElementById('time-chart'));
    var timeChartData;
    
    var priceChart = new google.visualization.PieChart(document.getElementById('price-chart'));
    var priceChartData;
    
    var options = {
        pieSliceText: "value",
        backgroundColor: "transparent"
        
    };
    
    function updateMeatChart(data) {
        
        meatChartData = data;
        meatChart.draw(meatChartData, options);
    }
    
    function updateTimeChart(data) {
        
        timeChartData = data;
        timeChart.draw(timeChartData, options);
    }
    
    function updatePriceChart(data) {
        
        priceChartData = data;
        priceChart.draw(priceChartData, options);
    }
    
    updateChartData();
    
    
    function meatSelectHandler() {
        
        var selectedItem = meatChart.getSelection()[0];
        if (selectedItem) {
            var value = meatChartData.getValue(selectedItem.row, 0);
            meal_type = value;
            updateChartData();
        }
    }
    
    function timeSelectHandler() {
        
        var selectedItem = timeChart.getSelection()[0];
        if (selectedItem) {
            var value = timeChartData.getValue(selectedItem.row, 0);
            time = value;
            updateChartData();
        }
    }
    
    function priceSelectHandler() {
        
        var selectedItem = priceChart.getSelection()[0];
        if (selectedItem) {
            var value = priceChartData.getValue(selectedItem.row, 0);
            price = value;
            updateChartData();
        }
    }
    
    google.visualization.events.addListener(meatChart, 'select', meatSelectHandler);
    google.visualization.events.addListener(timeChart, 'select', timeSelectHandler);
    google.visualization.events.addListener(priceChart, 'select', priceSelectHandler);
    
    
    function updateChartData() {
        getChartData("time", updateTimeChart);
        getChartData("meal_category", updateMeatChart);
        getChartData("price", updatePriceChart);
    }
    
    $("#reset-button").click(function() {
        meal_type = time = price = "none";
        updateChartData();
    });
    
    $("#meal-category-reset-button").click(function() {
        meal_type = "none";
        updateChartData();
        
    });
    
    $("#time-reset-button").click(function() {
        time = "none";
        updateChartData();
        
    });
    
    $("#price-reset-button").click(function() {
        price = "none";
        updateChartData();
        
    });
    
    // resize charts on window size change
    $(window).resize(function(){
	  	updateChartData();
	});
   
}






