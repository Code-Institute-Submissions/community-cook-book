var stepId = 2
var page = 1
var filter = "none";

function addStep() {

    $('#steps-div').append("<input type='text' name='step' id='step[" + stepId + "]' class='form-control' placeholder='Step " + (stepId + 1) + "'><br >");
    stepId++
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

function getURL(filter) {
    if (filter == "none") {
        $.get("/recipes/gethtml/" + page, function(data) {
            $("#recipe-wrapper").html(data);
            console.log(page, "ending page");
        });

    }

    else {
        $.get("/recipes/gethtml/" + filter + "/" + page, function(data) {
            $("#recipe-wrapper").html(data);
            console.log(page, "ending page");
        });
    }
    return
}

// go to the next page. Also used in the 'middle' of the 3 numerical buttons, as that button
// will always be current page + 1, aka the next page
function nextPage() {
    page += 1;
    getURL(filter);
    updateButton();

}

// used for the third of the 3 numerical buttons, as that button will always be
// current page + 2
function skipPage() {
    page += 2;
    getURL(filter);
    updateButton();

}

// previous page button. If on current page, button does nothing.
function lastPage() {
    
    if (page > 1) {
        page -= 1;
        getURL(filter);
        
    }
    else {
        console.log("Already on page 1");

    }
    updateButton();
    
}



// function to filter recipes
function recipeFilter(mealType) {
    page = 1
    $.get("/recipes/gethtml/" + mealType + "/" + page, function(data) {
        $("#recipe-wrapper").html(data);
        console.log(page, "ending page");

    });
    filter = mealType
    updateButton()
}
