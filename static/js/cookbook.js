var stepId = 2;
var page = 1;
var meal_type = "none";
var time = "none";
var price = "none";
var no_entries = '<div class="col-12 text-center"><h2 class="no-entry-message">Sorry! No recipes found.</h2></div>';



function addStep() {

    $('#steps-div').append("<input type='text' name='step' id='step[" + stepId + "]' class='form-control' placeholder='Step " + (stepId + 1) + "'><br >");
    stepId++;
}

function addEditArea() {
    $('#steps-div').append("<textarea type='text' name='step' id='newstep' class='form-control edit-textarea' placeholder='New Step'>");
}


$("#toggle").click(function() {
    $(".filters-div").toggle('slow', function() {

    });
    if (this.innerHTML === 'Show Filters<i class="fas fa-angle-double-down icon-margin"></i>') {
        this.innerHTML = 'Hide Filters<i class="fas fa-angle-double-down icon-margin"></i>';
    }
    else {
        this.innerHTML = 'Show Filters<i class="fas fa-angle-double-down icon-margin"></i>';
    }
});



// edit the colours of the filters list upon clicking a filter.
$(".filter-list-item").click(function() {
        
        if ($(this).hasClass("active-filter")) {
            $(this).removeClass("active-filter");
        }
       
        else {
            $(this).siblings().removeClass("active-filter");
            $(this).addClass("active-filter");
        }
        
   
});

// pagination functions 


// update button text on page change
function updateButton() {
    $("#button1").text(page);
    $("#button2").text(page + 1);
    $("#button3").text(page + 2);

    // if on page 1, disable the previous button (as you cant go back any further)
    if (page > 1) {
        $('#previous').removeClass("disabled");
    }
    else {
        $('#previous').addClass("disabled");
    }

}

// check if filter is added and get url for the new page

function getURL() {
    
    $.get("/recipes/gethtml/" + meal_type + "/" + time + "/" + price + "/" + page, function(data) {
        data = $.trim(data)
     if (data.length == 0) {
           $("#recipe-wrapper").html(no_entries);
           $("#next").addClass("disabled"); //disable the next page button
                
        }
        else {
            $("#recipe-wrapper").html(data);
            $("#next").removeClass("disabled");
            console.log(page, "ending page");
        }
    });
    
    return
}

// go to the next page. Also used in the 'middle' of the 3 numerical buttons, as that button
// will always be current page + 1, aka the next page
function nextPage() {
    page += 1;
    getURL();
    updateButton();

}

// used for the third of the 3 numerical buttons, as that button will always be
// current page + 2
function skipPage() {
    page += 2;
    getURL();
    updateButton();

}

// previous page button. If on current page, button does nothing.
function lastPage() {
    
    if (page > 1) {
        page -= 1;
        getURL();

    }
    else {
        console.log("Already on page 1");

    }
    updateButton();
    
}



// functions to filter recipes. Changing global vars that
// are passed into getURL(); to whatever filter is clicked
function meatFilter(meat) {
    
    if (meal_type == meat) {
        meal_type = "none" //resets so on double click it can remove filter
    }
    
    else {
        meal_type = meat;
    }
    
    page = 1;
    getURL();
    updateButton();
}

function priceFilter(price_var) {
    
    if (price == price_var) {
        price = "none"; // reset on double click
    }
    
    else {
        price = price_var;
    }
    
    page = 1;
    getURL();
    updateButton();
}

function timeFilter(speed) {
    
    if (time == speed) {
        time = "none"; // reset on double click
    }
    else {
        time = speed;
    }
   
    page = 1;
    getURL();
    updateButton();
}

function resetFilter() {
    time = "none";
    price = "none";
    meal_type = "none";
    getURL();
    $(".filter-list-item").removeClass("active-filter");
}


// individual recipe page

//scroll back to top of page


function topFunction() {
    
    document.body.scrollTop = 0;
    
}