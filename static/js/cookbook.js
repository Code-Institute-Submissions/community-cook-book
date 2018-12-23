var stepId = 2

function addStep() {

    $('#steps-div').append("<input type='text' name='step' id='step[" + stepId + "]' class='form-control' placeholder='Step " + (stepId + 1) + "'><br >");
    stepId++
}


$("#toggle").click(function() {
    $(".filters-div").toggle('slow', function() {
        
    });
    if (this.innerHTML === 'Show Filters<i class="fas fa-angle-double-down icon-margin"></i>') {
        this.innerHTML = 'Hide Filters<i class="fas fa-angle-double-down icon-margin"></i>';
    } else {
        this.innerHTML = 'Show Filters<i class="fas fa-angle-double-down icon-margin"></i>';
    }
});


