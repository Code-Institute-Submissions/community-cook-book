var stepId = 2

function addStep() {
    
    $('#steps-div').append("<input type='text' name='step' id='step["+ stepId +"]' class='form-control' placeholder='Step " + (stepId+1) +"'><br >");
    stepId++
}