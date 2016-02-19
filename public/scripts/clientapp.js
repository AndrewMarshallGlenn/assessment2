function submitAnimal(){
    event.preventDefault();
    var values = {};
    $.each($('#animalForm').serializeArray(), function(i, field) {
        values[field.name] = field.value;
    });
    console.log(values);
    $.ajax({
        type: 'POST',
        url:'/animals',
        data: values,
        success: function(data) {
            if(data) {
                console.log('from server:', data);
                loadData();
            } else {
                console.log('error');
            }

        }
    });
}

function loadData(){
    $('#animalList').children().remove();
    $.ajax({
        type: 'GET',
        url: '/animals',
        success: function(data) {
            for(var i = 0; i < data.length; i++){
                $('#animalList').append('<div class="animalInfo"></div>');
                $el = $('#animalList').children().last();
                $el.append('<br><h2>'+data[i].animal+'</h2>');
                $el.append('<h4>'+data[i].animal_count+'</h4>');
            }
        }
    });
}

$(document).ready(function() {
    $('#Submit').on('click', submitAnimal);
  //  loadData();

});